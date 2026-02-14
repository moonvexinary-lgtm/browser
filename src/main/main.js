const path = require('path');
const { app, BrowserWindow, ipcMain, shell } = require('electron');
const { StorageService } = require('./storage');

const isDev = !!process.env.VITE_DEV_SERVER_URL;
let mainWindow;
let storage;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1360,
    height: 900,
    minWidth: 980,
    minHeight: 620,
    backgroundColor: '#10131c',
    titleBarStyle: 'hiddenInset',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      webviewTag: true,
      sandbox: false
    }
  });

  if (isDev) {
    mainWindow.loadURL(process.env.VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(path.join(__dirname, '../../dist/renderer/index.html'));
  }
}

app.whenReady().then(() => {
  storage = new StorageService(app.getPath('userData'));

  ipcMain.handle('storage:get-all', async () => storage.getAll());
  ipcMain.handle('history:add', async (_, entry) => storage.addHistory(entry));
  ipcMain.handle('history:clear', async () => storage.clearHistory());
  ipcMain.handle('bookmarks:save', async (_, bookmarks) => storage.saveBookmarks(bookmarks));
  ipcMain.handle('settings:save', async (_, settings) => storage.saveSettings(settings));
  ipcMain.handle('downloads:add', async (_, download) => storage.addDownload(download));
  ipcMain.handle('external:open', async (_, url) => shell.openExternal(url));

  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
