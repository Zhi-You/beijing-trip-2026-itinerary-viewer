import { useCallback, useState } from 'react';

function readCollapsed(storageKey: string): Set<string> {
  try {
    const raw = localStorage.getItem(storageKey);
    if (!raw) return new Set();
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return new Set();
    return new Set(parsed.filter((id) => typeof id === 'string'));
  } catch {
    return new Set();
  }
}

/** Day collapse is stored apart from the timeline board so card order and notes stay untouched. */
export function useCollapsedDays(storageKey: string) {
  const [collapsed, setCollapsed] = useState<Set<string>>(() => readCollapsed(storageKey));

  const isCollapsed = useCallback((dayId: string) => collapsed.has(dayId), [collapsed]);

  const toggleCollapsed = useCallback(
    (dayId: string) => {
      setCollapsed((prev) => {
        const next = new Set(prev);
        if (next.has(dayId)) next.delete(dayId);
        else next.add(dayId);
        try {
          localStorage.setItem(storageKey, JSON.stringify([...next]));
        } catch {
          /* ignore quota / private mode */
        }
        return next;
      });
    },
    [storageKey],
  );

  return { isCollapsed, toggleCollapsed };
}
