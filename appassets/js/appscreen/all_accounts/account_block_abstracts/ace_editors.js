// ACE object of editors
const aceeditors = {};

// function for refreshing Ace Editor
const refreshAceEditor = (accountID, value) => {
    // set value of editor to given value
    const editorElement = document.getElementById("aceeditor__" + accountID);
    if(editorElement.classList.contains("ace_editor")) {
        aceeditors[accountID].setValue(value, -1);
        aceeditors[accountID].setValue(value, 1);
    }else {
        // set value of editor to given value (passed as argument)
        editorElement.innerHTML = value;

        // initialize ace editor within that element
        aceeditors[accountID] = ace.edit("aceeditor__" + accountID);
        aceeditors[accountID].setTheme("ace/theme/chrome");
        aceeditors[accountID].session.setMode("ace/mode/javascript");
        aceeditors[accountID].setOptions({
            fontSize: "12pt"
        });
    }
}

// every 16ms, check if editors are focused and add/remove focused attribute accordingly
setInterval(() => {
    Object.keys(aceeditors).forEach((accountID, editor) => {
        if(aceeditors[accountID].isFocused()) {
            document.getElementById("accountid_" + accountID).querySelector("section.edit > div.editor_container").classList.add("focused");
        }else {
            document.getElementById("accountid_" + accountID).querySelector("section.edit > div.editor_container").classList.remove("focused");
        }
    });
}, 16);