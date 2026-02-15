import { Settings } from '../types/browser';

interface SettingsPanelProps {
  settings: Settings;
  onUpdate: (partial: Partial<Settings>) => void;
}

export default function SettingsPanel({ settings, onUpdate }: SettingsPanelProps) {
  return (
    <div className="settings-panel glass">
      <label>
        Theme
        <select value={settings.theme} onChange={(e) => onUpdate({ theme: e.target.value as Settings['theme'] })}>
          <option value="dark">Dark</option>
          <option value="light">Light</option>
        </select>
      </label>
      <label>
        Search Engine
        <select value={settings.searchEngine} onChange={(e) => onUpdate({ searchEngine: e.target.value as Settings['searchEngine'] })}>
          <option value="duckduckgo">DuckDuckGo</option>
          <option value="google">Google</option>
          <option value="bing">Bing</option>
        </select>
      </label>
    </div>
  );
}
