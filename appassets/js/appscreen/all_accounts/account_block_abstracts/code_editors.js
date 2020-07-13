// object of editors
const codeEditors = {};

// function for refreshing Code Editor
const refreshCodeEditor = (accountID, value) => {
  // set value of editor to given value
  const editorElement = document.getElementById('codeeditor_' + accountID);

  if (editorElement.innerHTML.trim().length > 0) {
    // editor has already been created, so just set the current one's value
    monacoSandbox(function (amdRequire) {
      amdRequire(['vs/editor/editor.main'], () => {
        codeEditors[accountID].setValue(value);
      });
    });
  } else {
    monacoSandbox(function (amdRequire) {
      amdRequire(['vs/editor/editor.main'], () => {
        // editor not created yet, so create one in codeeditor container
        codeEditors[accountID] = monaco.editor.create(document.getElementById('codeeditor_' + accountID), {
          value,
          scrollBeyondLastLine: false,
          theme: 'vs-dark',
          lineNumbers: 'off',
          roundedSelection: true,
          fontSize: '14px',
          automaticLayout: true,
          dragAndDrop: true,
          formatOnType: true,
          copyWithSyntaxHighlighting: false,

          language: 'json',

          scrollbar: {
            verticalScrollbarSize: 8,
            horizontalScrollbarSize: 8,
          },

          // no minimap
          minimap: {
            enabled: false,
          },

          // no context menu
          contextmenu: false,

          // no overview ruler
          hideCursorInOverviewRuler: true,
          overviewRulerBorder: false,
          overviewRulerLanes: 0,
        });

        codeEditors[accountID]._standaloneKeybindingService.addDynamicKeybinding('-editor.action.nextMatchFindAction');

        // loaded set add loaded attributeto editor
        document.getElementById('codeeditor_' + accountID).classList.add('loaded');

        // add/remove focused attribute of editor container when editor is focused or blurred accordingly
        codeEditors[accountID].onDidFocusEditorWidget(() => {
          document
            .getElementById('accountid_' + accountID)
            .querySelector('section.edit div.editor_container')
            .classList.add('focused');
        });
        codeEditors[accountID].onDidBlurEditorWidget(() => {
          document
            .getElementById('accountid_' + accountID)
            .querySelector('section.edit div.editor_container')
            .classList.remove('focused');
        });

        // on change, check for any errors in JSON and show them as tooltip in done editing icon
        codeEditors[accountID].onDidChangeModelContent(() => {
          const editorContent = codeEditors[accountID].getValue();

          const errors = [];

          if (!isValidJSONString(editorContent)) {
            errors.push('Invalid JSON');
          } else {
            const parsedEditorContent = JSON.parse(editorContent);
            if (
              parsedEditorContent.name != undefined &&
              parsedEditorContent.properties != undefined &&
              typeof parsedEditorContent.name == 'string' &&
              typeof parsedEditorContent.properties == 'object'
            ) {
              // save new value in vault
              vaultContents.accounts[accountID] = parsedEditorContent;

              // refresh database
              refreshVaultDatabase();

              // refresh account block
              refreshAccountBlock(accountID);
            } else {
              // throw error, and revert back to editing
              if (parsedEditorContent.name == undefined) {
                errors.push("Missing: 'name'");
              } else if (parsedEditorContent.properties == undefined) {
                errors.push("Missing: 'properties'");
              } else if (!(typeof parsedEditorContent.name == 'string')) {
                errors.push("'name' must be a String");
              } else if (!(typeof parsedEditorContent.properties == 'object')) {
                errors.push("'properties' must an Object");
              }
            }
          }

          if (errors.length > 0) {
            document.getElementById('accountid_' + accountID).classList.add('editing_error');
            document
              .getElementById('accountid_' + accountID)
              .querySelector('div.buttons > button.edit')
              .setAttribute('aria-label', errors.join('\n'));
            document
              .getElementById('accountid_' + accountID)
              .querySelector('div.buttons > button.edit')
              .setAttribute('data-balloon-pos', 'left');
            document
              .getElementById('accountid_' + accountID)
              .querySelector('div.buttons > button.edit')
              .setAttribute('disabled', 'true');
          } else {
            document.getElementById('accountid_' + accountID).classList.remove('editing_error');
            document
              .getElementById('accountid_' + accountID)
              .querySelector('div.buttons > button.edit')
              .removeAttribute('aria-label');
            document
              .getElementById('accountid_' + accountID)
              .querySelector('div.buttons > button.edit')
              .removeAttribute('data-balloon-pos');
            document
              .getElementById('accountid_' + accountID)
              .querySelector('div.buttons > button.edit')
              .removeAttribute('disabled');
          }
        });
      });
    });
  }
};
