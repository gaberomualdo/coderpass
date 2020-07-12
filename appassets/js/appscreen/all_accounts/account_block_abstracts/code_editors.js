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
      });
    });
  }
};
