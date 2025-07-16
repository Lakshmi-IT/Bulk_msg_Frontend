// electron/main.cjs (or main.js if not using type: module)
const { app, BrowserWindow } = require('electron');
const path = require('path');
const fs = require('fs');

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  const filePath = path.join(__dirname, '../dist/index.html');

  // ✅ Check if file exists before loading
  if (fs.existsSync(filePath)) {
    win.loadFile(filePath);
  } else {
    console.error('File not found:', filePath);
  }

  // Optional: open devtools
  win.webContents.openDevTools();
}

app.whenReady().then(createWindow);
