// object of editors
const codeEditors = {};

// function for refreshing Code Editor
const refreshCodeEditor = (accountID, value) => {
  // set value of editor to given value
  const editorElement = document.getElementById('codeeditor__' + accountID);
  if (editorElement.innerHTML.trim().length > 0) {
    amdRequire(['vs/editor/editor.main'], () => {
      codeEditors[accountID].setValue(value);
    });
  } else {
    amdRequire(['vs/editor/editor.main'], () => {
      codeEditors[accountID] = monaco.editor.create(document.getElementById('codeeditor__' + accountID), {
        value,
        scrollBeyondLastLine: false,
        theme: 'vs-light',
        lineNumbers: 'off',
        roundedSelection: true,
        fontSize: '15px',
        automaticLayout: true,
        language: 'javascript',
        dragAndDrop: true,
        formatOnType: true,
        copyWithSyntaxHighlighting: false,

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

      // add/remove focused attribute of editor container when editor is focused or blurred accordingly
      codeEditors[accountID].onDidFocusEditorWidget(() => {
        document
          .getElementById('accountid_' + accountID)
          .querySelector('section.edit > div.editor_container')
          .classList.add('focused');
      });
      codeEditors[accountID].onDidBlurEditorWidget(() => {
        document
          .getElementById('accountid_' + accountID)
          .querySelector('section.edit > div.editor_container')
          .classList.remove('focused');
      });
    });
  }
};
