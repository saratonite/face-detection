const { app, BrowserWindow, ipcMain, ipcRenderer } = require("electron");
const path = require("path");
const url = require("url");
let win;

function createWindow() {
  win = new BrowserWindow({
    name: "Motion Detection",
    frame: true,
    backgroundColor: "#cccccc"
  });

  // Enable Dev Tools only Dev mode
  win.webContents.openDevTools();

  win.loadURL(
    url.format({
      pathname: path.join(__dirname, "/dist/index.html"),
      protocol: "file:",
      slashes: true
    })
  );

  // App Window Events

  win.on("closed", () => {
    win = null;
  });

  win.webContents.on("did-fail-load", function() {
    // TODO :Log Not implemented
    // restartApp();
  });

  win.webContents.on("plugin-crashed", function() {
    // TODO : Not implemented
  });

  win.webContents.on("crashed", function() {
    // TODO : Log
    restartApp();
  });

  return win;
}

// Disable chrome autoplay-policy
app.commandLine.appendSwitch("autoplay-policy", "no-user-gesture-required");

// Make app single instance

app.requestSingleInstanceLock();
app.on("second-instance", (event, argv, cwd) => {
  // Someone tried to run a second instance
  console.log("Second instance");
  app.quit();
});

function restartApp() {
  app.relaunch();
  app.exit(0);
  app.quit();
}

// Electron App Events
try {
  app.on("ready", createWindow);
} catch (e) {
  restartApp();
}

// on macOS, closing the window doesn't quit the app
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// initialize the app's main window
app.on("activate", () => {
  if (win === null) {
    createWindow();
  }
});

// ipcMain Events

ipcMain.on("restart", (event, arg) => {
  //TODO: Schedule jobs

  app.relaunch();
  app.exit(0);
  app.quit();
});

ipcMain.on("quitAndInstall", (event, arg) => {
  //TODO:
});

ipcMain.on("restart-now", (event, arg) => {
  // TODO :
});

//TODO: Auto updater logic
