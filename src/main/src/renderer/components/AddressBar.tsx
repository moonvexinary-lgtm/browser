interface AddressBarProps {
  value: string;
  loading: boolean;
  canGoBack: boolean;
  canGoForward: boolean;
  onChange: (value: string) => void;
  onSubmit: () => void;
  onBack: () => void;
  onForward: () => void;
  onReload: () => void;
  onHome: () => void;
  onBookmark: () => void;
  onToggleSidebar: () => void;
}

export default function AddressBar(props: AddressBarProps) {
  return (
    <div className="address-row glass">
      <button className="icon-btn" onClick={props.onBack} disabled={!props.canGoBack}>←</button>
      <button className="icon-btn" onClick={props.onForward} disabled={!props.canGoForward}>→</button>
      <button className="icon-btn" onClick={props.onReload}>⟳</button>
      <button className="icon-btn" onClick={props.onHome}>⌂</button>

      <form
        className="address-form"
        onSubmit={(e) => {
          e.preventDefault();
          props.onSubmit();
        }}
      >
        <input
          id="address-input"
          value={props.value}
          onChange={(e) => props.onChange(e.target.value)}
          placeholder="Search or enter URL"
        />
        <div className={`loading-bar ${props.loading ? 'active' : ''}`} />
      </form>

      <button className="icon-btn" onClick={props.onBookmark}>☆</button>
      <button className="icon-btn" onClick={props.onToggleSidebar}>☰</button>
    </div>
  );
}
