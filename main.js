const { app, BrowserWindow } = require('electron');

function createWindow () {
  
  // Create window.
  let window = new BrowserWindow({
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