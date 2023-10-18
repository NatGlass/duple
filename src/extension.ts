import * as vscode from "vscode";

// The 'activate' function is called when the extension is activated. It's the main entry point of the extension.
// The 'context' parameter is used for keeping state, subscribing to events, and registering components.
export function activate(context: vscode.ExtensionContext) {
  // Here we are registering a command using the 'registerCommand' method. This method registers the command with VS Code and returns a disposable.
  // A disposable is an object that tells VS Code how to clean up this command when it's no longer needed (usually when the extension is deactivated).
  const addSnippetCommand = vscode.commands.registerCommand(
    "extension.addSnippet",
    async () => {
      // 'window.activeTextEditor' gives access to the currently active editor (if any). The 'window' namespace contains UI-related functionality.
      const editor = vscode.window.activeTextEditor;

      if (editor) {
        // The 'selection' property of an editor holds the positions of the user's text selection (start and end).
        const selection = editor.selection;
        // 'getText' allows us to retrieve all text represented by the given range or selection.
        const selectedText = editor.document.getText(selection);

        // Check if any text was selected
        if (!selectedText) {
          vscode.window.showInformationMessage("Nothing to save as a snippet.");
          return;
        }

        // 'showInputBox' displays an input box to ask the user for input. Here we're asking for a name for the snippet.
        const name = await vscode.window.showInputBox({
          prompt: "Enter a name for your snippet",
        });

        if (name) {
          // The 'globalState' is a key-value store that lets you persist state across restarts of the editor. Here we're saving the snippet.
          context.globalState.update(name, selectedText);
          vscode.window.showInformationMessage(
            `Your snippet "$${name}" has been saved successfully!`
          );
        } else {
          // If the user didn't input anything, show a warning message.
          vscode.window.showInformationMessage(
            "No name provided for the snippet."
          );
        }
      }
    }
  );

  // 'subscriptions' hold all disposables, so VS Code can clean up everything related to the extension when it's deactivated.
  // We push our command (which is a disposable) onto this array.
  context.subscriptions.push(addSnippetCommand);

  // Registering a completion item provider for TypeScript files. A completion item provider provides IntelliSense completion items.
  const provider = vscode.languages.registerCompletionItemProvider(
    ["typescript", "typescriptreact"], // This provider is registered for '.ts' and '.tsx' files.
    {
      // The 'provideCompletionItems' method is called whenever IntelliSense is triggered.
      provideCompletionItems() {
        // We'll fill this array with all the snippets that we've saved so far.
        const completionItems: vscode.CompletionItem[] = [];

        // 'context.globalState.keys()' returns all keys in the global state, so we iterate over them to retrieve all saved snippets.
        context.globalState.keys().forEach((key) => {
          // Get the snippet text using the key.
          const snippetContent = context.globalState.get<string>(key);

          if (snippetContent) {
            // Create a completion item using the snippet's name (the key).
            const item = new vscode.CompletionItem(key);

            // Set the completion text to be inserted when the user selects this item.
            item.insertText = new vscode.SnippetString(snippetContent);

            // Add the item to our array of completion items.
            completionItems.push(item);
          }
        });
        // This method returns the completion items to be shown in the IntelliSense dropdown.
        return completionItems;
      },
    }
  );

  // Push the provider onto the subscriptions array so it's disposed of correctly on deactivation.
  context.subscriptions.push(provider);
}

// Deactivate extension if needed
export function deactivate() {}
