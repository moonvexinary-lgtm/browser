import { MutableRefObject, useEffect } from 'react';
import { BrowserTab } from '../types/browser';

interface BrowserViewProps {
  tabs: BrowserTab[];
  activeId: string;
  webviewRefs: MutableRefObject<Record<string, Electron.WebviewTag | null>>;
  onTabUpdate: (id: string, patch: Partial<BrowserTab>) => void;
  onVisited: (id: string, title: string, url: string) => void;
  onDownloadHint: (url: string) => void;
}

export default function BrowserView({ tabs, activeId, webviewRefs, onTabUpdate, onVisited, onDownloadHint }: BrowserViewProps) {
  useEffect(() => {
    tabs.forEach((tab) => {
      const view = webviewRefs.current[tab.id];
      if (!view || (view as any).__novaBound) return;
      (view as any).__novaBound = true;

      view.addEventListener('did-start-loading', () => onTabUpdate(tab.id, { isLoading: true }));
      view.addEventListener('did-stop-loading', () => {
        onTabUpdate(tab.id, {
          isLoading: false,
          title: view.getTitle(),
          url: view.getURL(),
          canGoBack: view.canGoBack(),
          canGoForward: view.canGoForward()
        });
        onVisited(tab.id, view.getTitle(), view.getURL());
      });
      view.addEventListener('page-title-updated', () => onTabUpdate(tab.id, { title: view.getTitle() }));
      view.addEventListener('did-fail-load', () => onTabUpdate(tab.id, { title: 'Failed to load page' }));
      view.addEventListener('new-window', (e: any) => {
        if (e.url) window.novaAPI.openExternal(e.url);
      });
      view.addEventListener('will-navigate', (e: any) => {
        if (/\.(zip|pdf|exe|dmg|msi)$/i.test(e.url)) onDownloadHint(e.url);
      });
    });
  }, [tabs, onDownloadHint, onTabUpdate, onVisited, webviewRefs]);

  return (
    <div className="browser-stage">
      {tabs.map((tab) => (
        <webview
          key={tab.id}
          ref={(el) => {
            webviewRefs.current[tab.id] = el;
          }}
          className={`browser-view ${tab.id === activeId ? 'active' : ''}`}
          src={tab.url}
          allowpopups="true"
        />
      ))}
    </div>
  );
}
