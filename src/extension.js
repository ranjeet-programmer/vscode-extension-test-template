const vscode = require('vscode');
const fs = require('fs');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
    console.log('Congratulations, your extension is now active!');

    // Dynamically register the createTest command
    let createTestDisposable = vscode.commands.registerCommand('extension.createTest', function () {
        generateTestTemplate();
    });

    // Add the disposables to the context.subscriptions array
    context.subscriptions.push(createTestDisposable);
}

function generateTestTemplate() {
    const activeTextEditor = vscode.window.activeTextEditor;
    if (activeTextEditor) {
        const snippetPath = context.asAbsolutePath('./snippets/testTemplate.js');

        fs.readFile(snippetPath, 'utf-8', (err, data) => {
            if (err) {
                console.error('Error reading snippet file:', err);
                return;
            }

            activeTextEditor.edit(editBuilder => {
                const documentStart = new vscode.Position(0, 0);
                editBuilder.insert(documentStart, data);
            });
        });
    }
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
};
