import { BrowserTab } from '../types/browser';

interface TabBarProps {
  tabs: BrowserTab[];
  activeId: string;
  onSelect: (id: string) => void;
  onClose: (id: string) => void;
  onNewTab: () => void;
}

export default function TabBar({ tabs, activeId, onSelect, onClose, onNewTab }: TabBarProps) {
  return (
    <div className="tabbar glass">
      <div className="tabs-scroll">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`tab ${tab.id === activeId ? 'active' : ''}`}
            onClick={() => onSelect(tab.id)}
          >
            <span className={`tab-loading ${tab.isLoading ? 'spinning' : ''}`} />
            <span className="tab-title">{tab.title || 'New Tab'}</span>
            <span
              className="tab-close"
              onClick={(e) => {
                e.stopPropagation();
                onClose(tab.id);
              }}
            >
              ×
            </span>
          </button>
        ))}
      </div>
      <button className="icon-btn" onClick={onNewTab} title="New tab (Ctrl/Cmd+T)">
        +
      </button>
    </div>
  );
}
