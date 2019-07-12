/*
    This file contains all global client-side 
    JavaScript functions and actions for the app.
*/

// get IPC renderer module for communication with main process, and get remote
// module for direct usage of main process functions within render process.
const { ipcRenderer, remote } = require('electron');

// get fs module from remote module to read and write from filesystem
const fs = remote.require("fs");

// create functions that utilize fs module for ease of use

// read file
const readFile = (filename) => {
    // read file using Node.js fs module
    return fs.readFileSync(filename, "UTF-8", (err, data) => {
        // log error if error exists
        if(err) console.error(err);

        // return read file data
        return data;
    });
};

// write file
const writeFile = (filename, filedata) => {
    // write file using Node.js fs module
    fs.writeFile(filename, filedata, "UTF-8", (err) => {
        // log error if error exists
        if(err) console.error(err);
    });
};

// display app container once window is fully loaded
window.addEventListener("load", (event) => {
    document.querySelector("body > div.container").removeAttribute("style");
});