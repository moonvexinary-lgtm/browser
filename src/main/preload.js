const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('novaAPI', {
  getAllData: () => ipcRenderer.invoke('storage:get-all'),
  addHistoryEntry: (entry) => ipcRenderer.invoke('history:add', entry),
  clearHistory: () => ipcRenderer.invoke('history:clear'),
  saveBookmarks: (bookmarks) => ipcRenderer.invoke('bookmarks:save', bookmarks),
  saveSettings: (settings) => ipcRenderer.invoke('settings:save', settings),
  addDownload: (download) => ipcRenderer.invoke('downloads:add', download),
  openExternal: (url) => ipcRenderer.invoke('external:open', url)
});
