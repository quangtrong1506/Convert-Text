const { clearText, removeVietnameseCharacters, QUICK_PICK_ITEM } = require('./helpers.js');

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
            if (selection && !selection.isEmpty) {
                const selectionRange = new vscode.Range(
                    selection.start.line,
                    selection.start.character,
                    selection.end.line,
                    selection.end.character
                );
                const highlighted = editor.document.getText(selectionRange);
                let newText = highlighted;
                const qp = vscode.window.createQuickPick();
                qp.items = QUICK_PICK_ITEM;
                qp.show();
                await qp.onDidChangeSelection((selectedItems) => {
                    const select = selectedItems[0];
                    switch (select.label) {
                        //? camelCase
                        case QUICK_PICK_ITEM[0].label:
                            newText = clearText(newText);
                            newText = newText
                                .replace(/\s+[a-z]/g, (x) => x[1].toUpperCase())
                                .replace(/\s/g, '')
                                .replace(/\w/, (x) => x[0].toLowerCase());
                            break;
                        //? PascalCase
                        case QUICK_PICK_ITEM[1].label:
                            newText = clearText(newText);
                            newText = newText
                                .replace(/\s+[a-z]/g, (x) => x[1].toUpperCase())
                                .replaceAll(/\s/g, '')
                                .replace(/\w/, (x) => x[0].toUpperCase());
                            break;

                        //? CONSTANT
                        case QUICK_PICK_ITEM[2].label:
                            newText = clearText(newText);
                            newText = newText.toUpperCase().replaceAll(/\s/g, '_');
                            break;
                        //? underscore
                        case QUICK_PICK_ITEM[3].label:
                            newText = clearText(newText);
                            newText = newText.toLowerCase().replaceAll(/\s/g, '_');
                            break;
                        //? Link
                        case QUICK_PICK_ITEM[4].label:
                            newText = clearText(newText);
                            newText = newText.replaceAll(/\s/g, '-');
                            break;
                        //? Uppercase
                        case QUICK_PICK_ITEM[5].label:
                            newText = newText.toUpperCase();
                            break;
                        //? lowercase
                        case QUICK_PICK_ITEM[6].label:
                            newText = newText.toLowerCase();
                            break;

                        case QUICK_PICK_ITEM[7].label:
                            newText = newText.replace(/[^A-Za-z0-9\s]/g, '');
                            break;
                        case QUICK_PICK_ITEM[8].label:
                            while (newText.match(/  /)) {
                                newText = newText.replaceAll('  ', ' ');
                            }
                            break;
                        case QUICK_PICK_ITEM[9].label:
                            newText = removeVietnameseCharacters(newText);
                            break;
                        default:
                            break;
                    }
                    qp.dispose();
                    editor.edit((editBuilder) => {
                        editBuilder.replace(selectionRange, newText);
                    });
                });
            } else {
                vscode.window.showWarningMessage('Please select the text to convert!', {
                    modal: true,
                });
            }
        }
    );
    context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
    activate,
    deactivate,
};
