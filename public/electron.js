const { app, BrowserWindow } = require("electron");
const path = require("path");
const url = require("url");

  // Create Electron-window
function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      //preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
      //enableRemoteModule: true,
      contextIsolation: false,
    }
  });

  const appURL = app.isPackaged
    ? url.format({
        pathname: path.join(__dirname, "index.html"),
        protocol: "file:",
        slashes: true,
      })
    : "http://localhost:3000";

  mainWindow.loadURL(appURL);
}

  // Creates the Electron-window once the initialization is done
app.whenReady().then(() => {
  createWindow();

  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

  // Quit when the Electron-window closes
app.on("window-all-closed", function () {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
