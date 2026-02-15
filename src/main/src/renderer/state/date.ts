export function groupByDate<T extends { timestamp: string }>(entries: T[]): Record<string, T[]> {
  return entries.reduce((acc, entry) => {
    const label = new Date(entry.timestamp).toLocaleDateString();
    acc[label] = acc[label] || [];
    acc[label].push(entry);
    return acc;
  }, {} as Record<string, T[]>);
}
