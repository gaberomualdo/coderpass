/*
    This file contains all client-side JavaScript functions
    and actions for the app.
*/

// get IPC renderer module for communication with main process
const { ipcRenderer } = require('electron');

// display app container once window is fully loaded
window.addEventListener("load", (event) => {
    document.querySelector("body > div.container").removeAttribute("style");
});

// in auth screen, decide whether to show "Create Vault" form or "Enter Vault" form;
// use IIFE to prevent creation of global variables
(() => {
    const vaultEncryptedText = ipcRenderer.sendSync('readFile', 'vault/data.txt');
})();

// check if passwords match within create vault form (check each time either
// input is changed), and change input button icon accordingly in real-time
(() => {
    // var for list of password input HTML elements
    const passwordInputElements = [document.querySelector("body > div.container > div.auth > div.form.create_vault > div.input_container:nth-child(3) > input"), document.querySelector("body > div.container > div.auth > div.form.create_vault > input:nth-child(2)")];
    
    // loop through each, and add oninput event to check if input values match whenever
    passwordInputElements.forEach((inputBox) => {
        inputBox.addEventListener("input", (event) => {
            // variable for HTML element of button that includes the icons that are to be changed
            const buttonIconContainerHTML = document.querySelector("body > div.container > div.auth > div.form.create_vault > div.input_container:nth-child(3) > button");
            
            // check if two inputted passwords match and change icon accordingly
            buttonIconContainerHTML.disabled = !(passwordInputElements[0].value == passwordInputElements[1].value);
        });
    });
})();