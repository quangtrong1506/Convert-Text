const {
    cleanText,
    removeVietnameseCharacters,
    QUICK_PICK_ITEM,
    translateAPI,
    LIST_LANGUAGE,
} = require('./helpers.js');
// import { QUICK_PICK_ITEM, cleanText, removeVietnameseCharacters, translateAPI } from './helpers.js';

const vscode = require('vscode');
/**
 * @param {vscode.ExtensionContext} context
 */

function activate(context) {
    let disposable = vscode.commands.registerCommand(
        'quangtrong.vscode.convert-text',
        async function () {
            const editor = vscode.window.activeTextEditor;
            if (!editor) return vscode.window.showWarningMessage('Please open a file');
            const selection = editor.selection;
            if (selection && !selection.isEmpty) showQuickPick();
            else
                vscode.window.showWarningMessage('Please select the text to convert!', {
                    modal: true,
                });
        }
    );
    context.subscriptions.push(disposable);
}

const showQuickPick = async () => {
    const qp = vscode.window.createQuickPick();
    qp.items = QUICK_PICK_ITEM;
    qp.show();
    const editor = vscode.window.activeTextEditor;
    const selectionRange = new vscode.Range(
        editor.selection.start.line,
        editor.selection.start.character,
        editor.selection.end.line,
        editor.selection.end.character
    );
    const highlighted = editor.document.getText(selectionRange);
    let text = highlighted;
    await qp.onDidChangeSelection(async (selectedItems) => {
        const select = selectedItems[0];
        let isSelectLanguage = false;
        switch (select.label) {
            //? camelCase
            case QUICK_PICK_ITEM[0].label:
                text = cleanText(text);
                text = text
                    .replace(/\s+[a-z]/g, (x) => x[1].toUpperCase())
                    .replace(/\s/g, '')
                    .replace(/\w/, (x) => x[0].toLowerCase());
                break;
            //? PascalCase
            case QUICK_PICK_ITEM[1].label:
                text = cleanText(text);
                text = text
                    .replace(/\s+[a-z]/g, (x) => x[1].toUpperCase())
                    .replaceAll(/\s/g, '')
                    .replace(/\w/, (x) => x[0].toUpperCase());
                break;

            //? CONSTANT
            case QUICK_PICK_ITEM[2].label:
                text = cleanText(text);
                text = text.toUpperCase().replaceAll(/\s/g, '_');
                break;
            //? underscore
            case QUICK_PICK_ITEM[3].label:
                text = cleanText(text);
                text = text.toLowerCase().replaceAll(/\s/g, '_');
                break;
            //? Link
            case QUICK_PICK_ITEM[4].label:
                text = cleanText(text);
                text = text.replaceAll(/\s/g, '-');
                break;
            //? Uppercase
            case QUICK_PICK_ITEM[5].label:
                text = text.toUpperCase();
                break;
            //? lowercase
            case QUICK_PICK_ITEM[6].label:
                text = text.toLowerCase();
                break;
            case QUICK_PICK_ITEM[7].label:
                text = text.replace(/[^A-Za-z0-9\s]/g, '');
                break;
            case QUICK_PICK_ITEM[8].label:
                while (text.match(/  /)) {
                    text = text.replaceAll('  ', ' ');
                }
                break;
            case QUICK_PICK_ITEM[9].label:
                text = removeVietnameseCharacters(text);
                break;
            //? vi >en
            case QUICK_PICK_ITEM[10].label:
                let tmp = await translate(text, 'vi', 'en');
                if (tmp) text = tmp;
                break;
            //? en >vi
            case QUICK_PICK_ITEM[11].label:
                let tmp2 = await translate(text, 'en', 'vi');
                if (tmp2) text = tmp2;
                break;
            //? translate
            case QUICK_PICK_ITEM[12].label:
                isSelectLanguage = true;

            default:
                console.log(select);
                break;
        }
        qp.dispose();
        if (isSelectLanguage) selectTranslationLanguage(text);
        else
            editor.edit((editBuilder) => {
                editBuilder.replace(selectionRange, text);
            });
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

const selectTranslationLanguage = async (text) => {
    const options = {
        text: text,
        from: 'en',
        to: 'en',
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
            const editor = vscode.window.activeTextEditor;
            const selectionRange = new vscode.Range(
                editor.selection.start.line,
                editor.selection.start.character,
                editor.selection.end.line,
                editor.selection.end.character
            );
            const highlighted = editor.document.getText(selectionRange);
            let newText = await translate(highlighted, options.from, options.to);
            if (newText) editTextInEditor(newText);
        });
    });
};
const editTextInEditor = (text) => {
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
function deactivate() {}

module.exports = {
    activate,
    deactivate,
};
