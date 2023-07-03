const { app, BrowserWindow, ipcMain, dialog } = require("electron");
const path = require("path");
const url = require("url");

  // Create Electron-window
function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
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

  //mainWindow.removeMenu();
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

ipcMain.handle("open-filesys-dialog", async (event, settings) => {
  return dialog.showOpenDialogSync(null, {
    title: settings?.title || "",
    buttonLabel: settings?.buttonLabel || "",
    filters: settings?.filters || "",
    properties: settings?.properties || []
  });
});

ipcMain.handle("save-filesys-dialog", async (event, settings) => {
  return dialog.showSaveDialogSync(null, {
    title: settings?.title || "",
    buttonLabel: settings?.buttonLabel || "",
    filters: settings?.filters || "",
    properties: settings?.properties || []
  });
});
