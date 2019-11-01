/*
    This is the JS entry point file for the application.
    It handles the Node.js and server-side parts of the app,
    such as creation of app windows, and file system actions.
*/

// get required modules from electron
const { app, BrowserWindow, ipcMain } = require("electron");

// get Node.js modules used in app
const fs = require("fs");

// global window object
let window;

function createWindow () {
    // create window
    window = new BrowserWindow({
        width: 1000,
        height: 700,
        minWidth: 800,
        minHeight: 600,
        webPreferences: {
            nodeIntegration: true
        }
    });

    // load main HTML file into window
    window.loadFile("index.html");
}

// create window
app.on("ready", createWindow);

// quit when all windows are closed
app.on("window-all-closed", () => {
    // on macOS apps stay open until quit in menu-bar or w/Cmd+Q
    if (process.platform !== "darwin"){
        app.quit();
    }
});

// on macOS re-create app window when app icon is clicked
app.on("activate", () => {
    if (window === null){
        createWindow();
    }
});

// receive and handle synchronous IPC messages

// read file IPC message
ipcMain.on("readFile", (event, argument) => {
    // read file (included as "argument" variable) using Node.js fs module
    fs.readFile(argument, "UTF-8", (err, data) => {
        // log error if error exists
        if(err) console.error(err);

        // respond to IPC message with read file data
        event.returnValue = data;
    });
});

// write file IPC message
ipcMain.on("writeFile", (event, argument) => {
    // write file using Node.js fs module
    fs.writeFile(argument.file, argument.data, "UTF-8", (err) => {
        // log error if error exists
        if(err) console.error(err);
    });
    event.returnValue = true;
});