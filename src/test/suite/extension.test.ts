import * as assert from "assert";
import * as vscode from "vscode";
import * as myExtension from "../../extension";

suite("Extension Test Suite", () => {
  vscode.window.showInformationMessage("Start all tests.");

  test("Should save snippets", () => {
    const snippetName = "testSnippet";
    const snippetContent = "console.log('test');";

    // Simulating saving a snippet
    myExtension.saveSnippet(snippetName, snippetContent); // This is a hypothetical function you'd have to implement.

    // Asserting that the snippet is saved correctly
    assert.equal(myExtension.getSnippet(snippetName), snippetContent); // getSnippet is also hypothetical and should be implemented.
  });
});
