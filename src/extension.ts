import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  // Register a completion item provider for TypeScript (.ts) and TypeScript React (.tsx) files
  const provider = vscode.languages.registerCompletionItemProvider(
    ["typescript", "typescriptreact"],
    {
      provideCompletionItems(
        document: vscode.TextDocument,
        position: vscode.Position
      ) {
        // Sample completion item
        const completionItem = new vscode.CompletionItem("helloWorld");
        completionItem.insertText = "Hello World!";
        completionItem.documentation = new vscode.MarkdownString(
          "Inserts a 'Hello World' snippet"
        );
        // For now, return a list with a single completion item
        return [completionItem];
      },
    }
  );
  context.subscriptions.push(provider);
}

export function deactive() {}
