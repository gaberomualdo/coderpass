// useful functions
const clonedeep = require('lodash/clonedeep');

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

let updateWindowFocus;
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
  updateWindowFocus = () => {
    window.webContents.send('window-focus-change', window.isFocused());
  };

  window.on('focus', () => {
    updateWindowFocus();
  });
  window.on('blur', () => {
    updateWindowFocus();
  });

  ipcMain.on('update-window-focus', (e) => {
    updateWindowFocus();
    e.returnValue = '';
  });
}

// create window
let curAppMenuTemplate;
let defaultAppMenuTemplate;
app.on('ready', () => {
  createWindow();

  const isMac = process.platform === 'darwin';
  const isInDevelopment = process.mainModule.filename.indexOf('app.asar') === -1;

  curAppMenuTemplate = [
    // { role: 'appMenu' }
    ...(isMac
      ? [
          {
            label: app.name,
            submenu: [
              { role: 'about', label: 'About JSON Password Manager' },
              { type: 'separator' },
              { role: 'hide', label: 'Hide JSON Password Manager' },
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
        { type: 'separator' },
        { role: 'resetzoom' },
        { role: 'zoomin' },
        { role: 'zoomout' },
        { type: 'separator' },
        { role: 'togglefullscreen' },
      ],
    },

    // Developer Tools (only in development mode)
    ...(isInDevelopment
      ? [
          {
            label: 'Developer',
            submenu: [
              { type: 'normal', label: 'Note: this tab will not be displayed in production', enabled: false },
              { role: 'toggledevtools' },
              { role: 'reload' },
            ],
          },
        ]
      : []),

    // Vault
    {
      label: 'Vault',
      submenu: [
        { type: 'normal', label: 'Exit Vault', accelerator: 'CmdOrCtrl+E', click: () => window.webContents.send('menu-exit-vault', '') },
        {
          type: 'normal',
          label: 'Download Vault Datafile',
          accelerator: 'CmdOrCtrl+D',
          click: () => window.webContents.send('menu-download-vault-datafile', ''),
        },
      ],
    },

    // Accounts
    {
      label: 'Accounts',
      submenu: [
        { type: 'normal', label: 'Add Account', accelerator: 'CmdOrCtrl+N', click: () => window.webContents.send('menu-add-account', '') },
        {
          type: 'checkbox',
          label: 'Hide Passwords',
          checked: false,
          accelerator: 'CmdOrCtrl+Shift+H',
          click: () => window.webContents.send('menu-toggle-hide-pwd', ''),
        },
        { type: 'separator' },
        { type: 'normal', label: 'Your Accounts', enabled: false },
      ],
    },

    // Password Generator
    {
      label: 'Password Generator',
      submenu: [
        {
          type: 'normal',
          label: 'Generate and Paste Password',
          accelerator: 'CmdOrCtrl+Shift+V',
          click: () => window.webContents.send('menu-generate-and-paste-pwd', ''),
        },
      ],
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

  const appMenu = Menu.buildFromTemplate(curAppMenuTemplate);
  Menu.setApplicationMenu(appMenu);

  // remove any object references
  defaultAppMenuTemplate = clonedeep(curAppMenuTemplate);
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

const getMenuTabIdxForName = (name) => {
  let tabIdx = 0;
  curAppMenuTemplate.forEach((curTab, curTabIdx) => {
    if (curTab.label && curTab.label === name) {
      tabIdx = curTabIdx;
    }
  });
  return tabIdx;
};

// set accounts tab in app menu to add given accounts items
ipcMain.on('set-accounts-menu', (e, accounts) => {
  const tabIdx = getMenuTabIdxForName('Accounts');

  // set Accounts tab to original state
  curAppMenuTemplate[tabIdx] = clonedeep(defaultAppMenuTemplate[tabIdx]);

  // add account names to tab
  accounts.forEach(({ name, id }) => {
    curAppMenuTemplate[tabIdx].submenu.push({ label: name, click: () => window.webContents.send('menu-show-account', id) });
  });

  // set app menu
  let appMenu = Menu.buildFromTemplate(curAppMenuTemplate);
  Menu.setApplicationMenu(appMenu);

  // send IPC response
  e.returnValue = '';
});

// update 'Hide Passwords' checkbox menu item
ipcMain.on('menu-toggle-hide-pwd', (e) => {
  const tabIdx = getMenuTabIdxForName('Accounts');

  Menu.getApplicationMenu().items[tabIdx].submenu.items[1].checked = !Menu.getApplicationMenu().items[tabIdx].submenu.items[1].checked;

  e.returnValue = '';
});

// write text to window web contents
ipcMain.on('write-text-to-page', (e, text) => {
  text.split('').forEach((char) => {
    window.webContents.sendInputEvent({
      type: 'char',
      keyCode: char,
    });
  });
  e.returnValue = '';
});
