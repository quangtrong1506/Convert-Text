const vscode = require('vscode');

const {
    QUICK_PICK_ITEM,
    SELECT_FEATURE_ITEM,
    LIST_LANGUAGE,
    SELECT_FORMAT_TYPES,
} = require('./constant.js');

const {
    cleanText,
    removeVietnameseCharacters,
    translateAPI,
    cleanWhiteSpace,
    variableToString,
} = require('./helpers.js');

const activate = (context) => {
    let selectFeature = vscode.commands.registerCommand(
        'quangtrong.vscode.text.feature',
        async function () {
            if (!getText()) return;
            const feature = vscode.window.createQuickPick();
            feature.items = SELECT_FEATURE_ITEM;
            feature.show();
            feature.onDidChangeSelection((select) => {
                switch (select[0].label) {
                    case SELECT_FEATURE_ITEM[0].label:
                        openConversionOptions();
                        break;
                    case SELECT_FEATURE_ITEM[1].label:
                        break;
                    case SELECT_FEATURE_ITEM[2].label:
                        break;
                    default:
                        break;
                }
                feature.dispose();
            });
        }
    );
    let selectConversionOptions = vscode.commands.registerCommand(
        'quangtrong.vscode.text.convert',
        openConversionOptions
    );
    let selectLanguage = vscode.commands.registerCommand(
        'quangtrong.vscode.text.translate',
        selectCurrentLanguage
    );
    let selectFormat = vscode.commands.registerCommand(
        'quangtrong.vscode.text.format',
        selectFormatType
    );
    context.subscriptions.push(selectFeature);
    context.subscriptions.push(selectConversionOptions);
    context.subscriptions.push(selectLanguage);
    context.subscriptions.push(selectFormat);
};
const openConversionOptions = () => {
    let text = getText();
    if (!text) return;
    const qp = vscode.window.createQuickPick();
    qp.items = QUICK_PICK_ITEM;
    qp.show();
    qp.onDidChangeSelection((selectedItems) => {
        const select = selectedItems[0];
        switch (select.label) {
            //? camelCase
            case QUICK_PICK_ITEM[0].label:
                text = variableToString(text);
                text = cleanText(text);
                text = text
                    .replace(/\s+[a-z]/g, (x) => x[1].toUpperCase())
                    .replace(/\s/g, '')
                    .replace(/\w/, (x) => x[0].toLowerCase());
                break;
            //? PascalCase
            case QUICK_PICK_ITEM[1].label:
                text = variableToString(text);
                text = cleanText(text);
                text = text
                    .replace(/\s+[a-z]/g, (x) => x[1].toUpperCase())
                    .replaceAll(/\s/g, '')
                    .replace(/\w/, (x) => x[0].toUpperCase());
                break;
            //? CONSTANT
            case QUICK_PICK_ITEM[2].label:
                text = variableToString(text);
                text = cleanText(text);
                text = text.toUpperCase().replaceAll(/\s/g, '_');
                break;
            //? underscore
            case QUICK_PICK_ITEM[3].label:
                text = variableToString(text);
                text = cleanText(text);
                text = text.toLowerCase().replaceAll(/\s/g, '_');
                break;
            //? Link
            case QUICK_PICK_ITEM[4].label:
                text = variableToString(text);
                text = cleanText(text);
                text = text.replaceAll(/\s/g, '-');
                break;
            case QUICK_PICK_ITEM[5].label:
                text = text
                    .toLowerCase()
                    .replace(/\w/, (x) => x[0].toUpperCase())
                    .replace(/[^a-zA-Z0-9]/g, ' ')
                    .trim();
                text = variableToString(text);
                break;
            case QUICK_PICK_ITEM[6].label:
                text = removeVietnameseCharacters(text).trim();
                break;
            //? Uppercase
            // case QUICK_PICK_ITEM[5].label:
            //     text = text.toUpperCase();
            //     break;
            // //? lowercase
            // case QUICK_PICK_ITEM[6].label:
            //     text = text.toLowerCase();
            //     break;
            // case QUICK_PICK_ITEM[9].label:
            //     text = removeVietnameseCharacters(text);
            //     break;
            default:
                console.log(select);
                break;
        }
        qp.dispose();
        setText(text);
    });
};

const selectCurrentLanguage = async (text) => {
    const options = {
        text: text,
        from: '',
        to: '',
    };
    const from = vscode.window.createQuickPick();
    from.items = LIST_LANGUAGE.map((language) => {
        let item = {
            label: language.label,
            description: `(${language.code})`,
        };
        return item;
    });
    from.title = 'Current language';
    from.placeholder = 'Current language';
    from.show();
    await from.onDidChangeSelection(async (selectedItems) => {
        const label = selectedItems[0].label;
        options.from = LIST_LANGUAGE.find((item) => item.label === label).code;
        from.dispose();
        ///
        const to = vscode.window.createQuickPick();
        const listLanguageTo = LIST_LANGUAGE.filter((item) => item.code != options.to);
        to.items = listLanguageTo.map((language) => {
            let item = {
                label: language.label,
                description: `(${language.code})`,
            };
            return item;
        });
        to.title = 'Translate into language';
        to.placeholder = 'Translate into language';
        to.show();
        await to.onDidChangeSelection(async (selectedItems) => {
            const label = selectedItems[0].label;
            options.to = LIST_LANGUAGE.find((item) => item.label === label).code;
            to.dispose();
            let newText = await translate(getText(), options.from, options.to);
            if (newText) setText(newText);
        });
    });
};
const selectFormatType = () => {
    const select = vscode.window.createQuickPick();
    select.items = SELECT_FORMAT_TYPES;
    select.show();
    select.onDidChangeSelection((selectedItems) => {
        let text = '';
        switch (selectedItems[0].label) {
            case SELECT_FORMAT_TYPES[0].label:
                text = cleanWhiteSpace(getText()).toUpperCase();
                setText(text);
                break;
            case SELECT_FORMAT_TYPES[1].label:
                text = cleanWhiteSpace(getText()).toLowerCase();
                setText(text);
                break;
            case SELECT_FORMAT_TYPES[2].label:
                text = cleanWhiteSpace(getText());
                text = text
                    .replace(/\s+[a-z]/g, (x) => ' ' + x[1].toUpperCase())
                    .replace(/\w/, (x) => x[0].toUpperCase());
                setText(text);
                break;
            case SELECT_FORMAT_TYPES[3].label:
                text = cleanWhiteSpace(getText());
                text = removeVietnameseCharacters(text);
                setText(text);
                break;
            case SELECT_FORMAT_TYPES[4].label:
                text = cleanWhiteSpace(getText());
                setText(text);
                break;
            default:
                break;
        }
        select.dispose();
    });
};
//Todo: Get the currently selected text
const getText = () => {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
        vscode.window.showWarningMessage('Please open a file');
        return;
    }
    const selection = editor.selection;
    if (!selection || selection.isEmpty) {
        vscode.window.showWarningMessage('Please select the text to convert!', {
            modal: true,
        });
        return;
    }
    const selectionRange = new vscode.Range(
        editor.selection.start.line,
        editor.selection.start.character,
        editor.selection.end.line,
        editor.selection.end.character
    );
    const highlighted = editor.document.getText(selectionRange);
    return highlighted;
};
//Todo: Place text in the currently selected area
const setText = (text) => {
    const editor = vscode.window.activeTextEditor;
    const selectionRange = new vscode.Range(
        editor.selection.start.line,
        editor.selection.start.character,
        editor.selection.end.line,
        editor.selection.end.character
    );
    editor.edit((editBuilder) => {
        editBuilder.replace(selectionRange, text);
    });
};

const translate = async (text = 'Hello', from, to) => {
    try {
        console.log({ Text: text, from, to });
        const response = await translateAPI({ Text: text, from, to });
        return response[0].translations[0].text;
    } catch (error) {
        console.log('Lỗi');
        if (error.name === 'FetchError')
            vscode.window.showErrorMessage('Please check your internet connection again!');
        else vscode.window.showErrorMessage('Internal error, please try again later!');
        return null;
    }
};

const deactivate = () => {};

module.exports = {
    activate,
    deactivate,
};
