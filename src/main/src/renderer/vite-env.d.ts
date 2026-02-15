/// <reference types="vite/client" />

interface NovaHistoryEntry {
  id: string;
  title: string;
  url: string;
  timestamp: string;
}

interface Bookmark {
  id: string;
  title: string;
  url: string;
  folder?: string;
}

interface NovaSettings {
  theme: 'light' | 'dark';
  searchEngine: 'duckduckgo' | 'google' | 'bing';
}

interface DownloadEntry {
  id: string;
  fileName: string;
  url: string;
  status: 'completed' | 'downloading';
  timestamp: string;
}

interface Window {
  novaAPI: {
    getAllData: () => Promise<{
      history: NovaHistoryEntry[];
      bookmarks: Bookmark[];
      settings: NovaSettings;
      downloads: DownloadEntry[];
    }>;
    addHistoryEntry: (entry: NovaHistoryEntry) => Promise<NovaHistoryEntry[]>;
    clearHistory: () => Promise<NovaHistoryEntry[]>;
    saveBookmarks: (bookmarks: Bookmark[]) => Promise<Bookmark[]>;
    saveSettings: (settings: Partial<NovaSettings>) => Promise<NovaSettings>;
    addDownload: (download: DownloadEntry) => Promise<DownloadEntry[]>;
    openExternal: (url: string) => Promise<void>;
  };
}
