const { app, BrowserWindow, ipcMain } = require('electron');

// global object window
let window;

function createWindow () {
  
  // create window
  window = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  });

  // load main HTML file into window
  window.loadFile('index.html');
}

// create window
app.on('ready', createWindow);

// quit when all windows are closed
app.on('window-all-closed', function () {
    // on macOS apps stay open until quit in menu-bar or w/Cmd+Q
    if (process.platform !== 'darwin'){
        app.quit();
    }
});

app.on('activate', function () {
    // on macOS re-create app window when app icon is clicked
    if (window === null){
        createWindow();
    }
});