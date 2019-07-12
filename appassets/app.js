/*
    This file contains all client-side JavaScript functions
    and actions for the app.
*/

// get IPC renderer module for communication with main process
const { ipcRenderer } = require('electron');

// display app container once window is fully loaded
window.addEventListener("load", function(event){
    document.querySelector("body > div.container").removeAttribute("style");
});

/*  check if passwords match within create vault form (check each time either
    input is changed), and change input button icon accordingly in real-time */
[document.querySelector("body > div.container > div.auth > div.form.create_vault > div.input_container:nth-child(3) > input"), document.querySelector("body > div.container > div.auth > div.form.create_vault > input:nth-child(2)")].forEach(function(input){
    input.addEventListener("input", function(event){
        // value of original (first) password input field
        var inputedPassword = document.querySelector("body > div.container > div.auth > div.form.create_vault > input:nth-child(2)").value;
    
        // value of second password input field ("Confirm Password...")
        var secondInputtedPassword = document.querySelector("body > div.container > div.auth > div.form.create_vault > div.input_container:nth-child(3) > input").value;
    
        // variable for HTML element of button that includes the icons that are to be changed
        var buttonIconContainerHTML = document.querySelector("body > div.container > div.auth > div.form.create_vault > div.input_container:nth-child(3) > button");
    
        // check if two inputted passwords match and change icon accordingly
        if(inputedPassword == secondInputtedPassword) {
            // passwords match — therefore, enable button to show arrow icon
            buttonIconContainerHTML.disabled = false
        }else {
            // passwords do not match — therefore, disable button to show "X" icon
            buttonIconContainerHTML.disabled = true;
        }
    });
});