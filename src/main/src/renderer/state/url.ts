export function normalizeInput(input: string, searchEngine: 'duckduckgo' | 'google' | 'bing'): string {
  const trimmed = input.trim();
  if (!trimmed) return 'https://duckduckgo.com';

  if (/^https?:\/\//i.test(trimmed)) return trimmed;

  if (/^[\w-]+(\.[\w-]+)+([/?#].*)?$/.test(trimmed)) {
    return `https://${trimmed}`;
  }

  const query = encodeURIComponent(trimmed);
  if (searchEngine === 'google') return `https://www.google.com/search?q=${query}`;
  if (searchEngine === 'bing') return `https://www.bing.com/search?q=${query}`;
  return `https://duckduckgo.com/?q=${query}`;
}

export const HOME_URL = 'https://duckduckgo.com';
