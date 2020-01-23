/*
    This is the JS entry point file for the application.
    It handles the Node.js and server-side parts of the app,
    such as creation of app windows, and file system actions.
*/

// set constant global variables for application
global.APP_VERSION = "0.1.0";

// get required modules from electron
const { app, BrowserWindow, ipcMain } = require("electron");

// get Node.js modules used in app
const fs = require("fs");

// global window object
let window;

function createWindow () {
    // window options
    let windowOptions = {
        width: 1000,
        height: 700,
        minWidth: 800,
        minHeight: 600,
        webPreferences: {
            nodeIntegration: true
        },
    };

    if(process.platform === "darwin") {
        windowOptions.titleBarStyle = 'hiddenInset';
    }

    // create window with options
    window = new BrowserWindow(windowOptions);

    // load main HTML file into window with platform info
    window.loadFile("index.html");

    // set variable for onblur and onfocus
    let windowIsFocused = false;
    window.on("focus", () => {
        windowIsFocused = true;
    });
    window.on("blur", () => {
        windowIsFocused = false;
    });

    // send focused info as reply to ipc message from renderer process
    ipcMain.on("is-window-focused", (event) => {
        event.returnValue = windowIsFocused;
    });
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