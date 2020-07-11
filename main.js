/*
    This is the JS entry point file for the application.
    It handles the Node.js and server-side parts of the app,
    such as creation of app windows, and file system actions.
*/

// set constant global variables for application
global.APP_VERSION = '0.1.0';

// get required modules from electron
const { app, Menu, BrowserWindow, ipcMain } = require('electron');

// get Node.js modules used in app
const fs = require('fs');

// global window object
let window;

function createWindow() {
  // window options
  let windowOptions = {
    width: 1000,
    height: 700,
    minWidth: 975,
    minHeight: 600,
    webPreferences: {
      nodeIntegration: true,
    },
    allowRunningInsecureContent: true,
  };

  if (process.platform === 'darwin') {
    windowOptions.titleBarStyle = 'hiddenInset';
  }

  // create window with options
  window = new BrowserWindow(windowOptions);

  // load main HTML file into window with platform info
  window.loadFile('index.html');

  // set variable for onblur and onfocus
  let windowIsFocused = false;
  window.on('focus', () => {
    windowIsFocused = true;
  });
  window.on('blur', () => {
    windowIsFocused = false;
  });

  // send focused info as reply to ipc message from renderer process
  ipcMain.on('is-window-focused', (event) => {
    event.returnValue = windowIsFocused;
  });
}

// create window
app.on('ready', () => {
  createWindow();

  const isMac = process.platform === 'darwin';

  const template = [
    // { role: 'appMenu' }
    ...(isMac
      ? [
          {
            label: app.name,
            submenu: [
              { role: 'about', label: 'About JSON Password Manager' },
              { type: 'separator' },
              { role: 'hide' },
              { role: 'hideothers' },
              { role: 'unhide' },
              { type: 'separator' },
              { role: 'quit', label: 'Quit JSON Password Manager' },
            ],
          },
        ]
      : []),
    // { role: 'fileMenu' }
    {
      label: 'File',
      submenu: [isMac ? { role: 'close' } : { role: 'quit' }],
    },
    // { role: 'editMenu' }
    {
      label: 'Edit',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
        ...(isMac
          ? [
              { role: 'delete' },
              { role: 'selectAll' },
              { type: 'separator' },
              {
                label: 'Speech',
                submenu: [{ role: 'startspeaking' }, { role: 'stopspeaking' }],
              },
            ]
          : [{ role: 'delete' }, { type: 'separator' }, { role: 'selectAll' }]),
      ],
    },
    // { role: 'viewMenu' }
    {
      label: 'View',
      submenu: [
        { role: 'toggledevtools' },
        { type: 'separator' },
        { role: 'resetzoom' },
        { role: 'zoomin' },
        { role: 'zoomout' },
        { type: 'separator' },
        { role: 'togglefullscreen' },
      ],
    },

    // Vault
    {
      label: 'Vault',
      submenu: [
        { type: 'normal', label: 'Exit Vault', accelerator: 'CmdOrCtrl+E' },
        { type: 'normal', label: 'Download Vault Datafile', accelerator: 'CmdOrCtrl+D' },
      ],
    },

    // Accounts
    {
      label: 'Accounts',
      submenu: [
        { type: 'normal', label: 'Add Account', accelerator: 'CmdOrCtrl+N' },
        { type: 'checkbox', label: 'Hide Passwords', checked: true, accelerator: 'CmdOrCtrl+Shift+H' },
      ],
    },

    // Password Generator
    {
      label: 'Password Generator',
      submenu: [{ type: 'normal', label: 'Generate and Paste Password', accelerator: 'CmdOrCtrl+Shift+V' }],
    },

    // { role: 'windowMenu' }
    {
      label: 'Window',
      submenu: [
        { role: 'minimize' },
        { role: 'zoom' },
        ...(isMac ? [{ type: 'separator' }, { role: 'front' }, { type: 'separator' }, { role: 'window' }] : [{ role: 'close' }]),
      ],
    },
    {
      role: 'help',
      submenu: [],
    },
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
});

// quit when all windows are closed
app.on('window-all-closed', () => {
  // on macOS apps stay open until quit in menu-bar or w/Cmd+Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// on macOS re-create app window when app icon is clicked
app.on('activate', () => {
  if (window === null) {
    createWindow();
  }
});
