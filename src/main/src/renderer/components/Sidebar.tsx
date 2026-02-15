import { BookmarkEntry, HistoryEntry } from '../types/browser';
import { groupByDate } from '../state/date';

interface SidebarProps {
  open: boolean;
  view: 'history' | 'bookmarks';
  history: HistoryEntry[];
  bookmarks: BookmarkEntry[];
  onNavigate: (url: string) => void;
  onDeleteBookmark: (id: string) => void;
  onClearHistory: () => void;
  onSwitchView: (view: 'history' | 'bookmarks') => void;
}

export default function Sidebar(props: SidebarProps) {
  const groupedHistory = groupByDate(props.history);

  return (
    <aside className={`sidebar ${props.open ? 'open' : ''}`}>
      <div className="sidebar-header">
        <button className={props.view === 'history' ? 'active' : ''} onClick={() => props.onSwitchView('history')}>History</button>
        <button className={props.view === 'bookmarks' ? 'active' : ''} onClick={() => props.onSwitchView('bookmarks')}>Bookmarks</button>
      </div>

      {props.view === 'history' ? (
        <>
          <button className="danger" onClick={props.onClearHistory}>Clear History</button>
          <div className="sidebar-content">
            {Object.entries(groupedHistory).map(([date, entries]) => (
              <div key={date}>
                <h4>{date}</h4>
                {entries.map((item) => (
                  <button key={item.id} className="list-item" onClick={() => props.onNavigate(item.url)}>
                    <span>{item.title || item.url}</span>
                    <small>{new URL(item.url).hostname}</small>
                  </button>
                ))}
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="sidebar-content">
          {props.bookmarks.map((item) => (
            <div key={item.id} className="bookmark-row">
              <button className="list-item" onClick={() => props.onNavigate(item.url)}>
                <span>{item.title}</span>
                <small>{item.folder || 'General'}</small>
              </button>
              <button className="icon-btn" onClick={() => props.onDeleteBookmark(item.id)}>🗑</button>
            </div>
          ))}
        </div>
      )}
    </aside>
  );
}
