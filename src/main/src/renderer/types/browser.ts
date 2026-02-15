export interface BrowserTab {
  id: string;
  title: string;
  url: string;
  isActive: boolean;
  isLoading: boolean;
  canGoBack: boolean;
  canGoForward: boolean;
}

export interface HistoryEntry {
  id: string;
  title: string;
  url: string;
  timestamp: string;
}

export interface BookmarkEntry {
  id: string;
  title: string;
  url: string;
  folder?: string;
}

export interface Settings {
  theme: 'light' | 'dark';
  searchEngine: 'duckduckgo' | 'google' | 'bing';
}

export interface DownloadItem {
  id: string;
  fileName: string;
  url: string;
  status: 'completed' | 'downloading';
  timestamp: string;
}
