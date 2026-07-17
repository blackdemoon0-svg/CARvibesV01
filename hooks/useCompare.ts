'use client';

import { useState, useEffect, useCallback } from 'react';

const COMPARE_KEY = 'carvibes-compare';
const MAX_COMPARE = 3;

export function useCompare() {
  const [compareList, setCompareList] = useState<string[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(COMPARE_KEY);
      if (stored) setCompareList(JSON.parse(stored));
    } catch {}
  }, []);

  const persist = (vals: string[]) => {
    setCompareList(vals);
    try {
      localStorage.setItem(COMPARE_KEY, JSON.stringify(vals));
    } catch {}
  };

  const isInCompare = useCallback((id: string) => compareList.includes(id), [compareList]);

  const toggleCompare = useCallback(
    (id: string) => {
      setCompareList((prev) => {
        if (prev.includes(id)) {
          const next = prev.filter((c) => c !== id);
          try {
            localStorage.setItem(COMPARE_KEY, JSON.stringify(next));
          } catch {}
          return next;
        }
        if (prev.length >= MAX_COMPARE) return prev;
        const next = [...prev, id];
        try {
          localStorage.setItem(COMPARE_KEY, JSON.stringify(next));
        } catch {}
        return next;
      });
    },
    []
  );

  const removeFromCompare = useCallback((id: string) => {
    setCompareList((prev) => {
      const next = prev.filter((c) => c !== id);
      try {
        localStorage.setItem(COMPARE_KEY, JSON.stringify(next));
      } catch {}
      return next;
    });
  }, []);

  const clearCompare = useCallback(() => persist([]), []);

  return {
    compareList,
    compareCount: compareList.length,
    isInCompare,
    toggleCompare,
    removeFromCompare,
    clearCompare,
    maxCompare: MAX_COMPARE,
  };
}
