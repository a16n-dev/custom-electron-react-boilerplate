const {
  app, BrowserWindow, ipcMain, dialog,
} = require('electron');
const path = require('path');
const { argv } = require('yargs');

const isDev = process.env.NODE_ENV === 'development';

const { autoUpdater } = require('electron-updater');

autoUpdater.checkForUpdatesAndNotify();

// Check for app updates
// require('update-electron-app')()

let mainWin;

const createWindow = () => {
  // Create the browser window.
  mainWin = new BrowserWindow({
    width: 800,
    height: 600,
    minHeight: 200,
    minWidth: 300,
    frame: false,
    icon: `${__dirname}/icon/x500.png`,
    webPreferences: {
      preload: path.join(__dirname, './preload.js'),
      nodeIntegration: false,
      enableRemoteModule: false,
      contextIsolation: true,
      allowRendererProcessReuse: true,
    },
  });

  // and load the index.html of the app.
  if (!isDev) {
    mainWin.loadFile('app/dist/index.html');
  } else {
    mainWin.loadFile('app/dev/index-dev.html');
    mainWin.webContents.openDevTools();
  }
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
  createWindow();
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

ipcMain.handle('fullscreen', async (e, d) => {
  mainWin.setFullScreen(d);
  return 0;
});

ipcMain.handle('getFile', async (e) => argv._);

ipcMain.handle('selectFile', async (e) => await dialog.showOpenDialog({
  BrowserWindow: mainWin,
  properties: ['openFile'],
  filters: [
    { name: 'Media files', extensions: ['mkv', 'avi', 'mp4'] },
  ],
}));

ipcMain.handle('winAction', async (e, d) => {
  switch (d) {
    case 'close':
      app.quit();
      break;
    case 'minimise':
      mainWin.minimize();
      break;
    case 'toggleMaximise':
      mainWin.isMaximized() ? mainWin.unmaximize() : mainWin.maximize();
  }
});
