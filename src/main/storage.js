const fs = require('fs/promises');
const path = require('path');

const DEFAULT_DATA = {
  history: [],
  bookmarks: [],
  settings: {
    theme: 'dark',
    searchEngine: 'duckduckgo'
  },
  downloads: []
};

class StorageService {
  constructor(userDataPath) {
    this.filePath = path.join(userDataPath, 'novasurf-data.json');
  }

  async ensureFile() {
    try {
      await fs.access(this.filePath);
    } catch {
      await fs.writeFile(this.filePath, JSON.stringify(DEFAULT_DATA, null, 2), 'utf8');
    }
  }

  async read() {
    await this.ensureFile();
    const raw = await fs.readFile(this.filePath, 'utf8');
    return { ...DEFAULT_DATA, ...JSON.parse(raw) };
  }

  async write(data) {
    await fs.writeFile(this.filePath, JSON.stringify(data, null, 2), 'utf8');
  }

  async getAll() {
    return this.read();
  }

  async addHistory(entry) {
    const data = await this.read();
    data.history = [entry, ...data.history].slice(0, 500);
    await this.write(data);
    return data.history;
  }

  async clearHistory() {
    const data = await this.read();
    data.history = [];
    await this.write(data);
    return data.history;
  }

  async saveBookmarks(bookmarks) {
    const data = await this.read();
    data.bookmarks = bookmarks;
    await this.write(data);
    return data.bookmarks;
  }

  async saveSettings(settings) {
    const data = await this.read();
    data.settings = { ...data.settings, ...settings };
    await this.write(data);
    return data.settings;
  }

  async addDownload(download) {
    const data = await this.read();
    data.downloads = [download, ...data.downloads].slice(0, 100);
    await this.write(data);
    return data.downloads;
  }
}

module.exports = { StorageService };
