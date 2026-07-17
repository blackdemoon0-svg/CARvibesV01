'use client';

import { useState, useEffect, useCallback } from 'react';

const FAVORITES_KEY = 'carvibes-favorites';
const RECENTLY_VIEWED_KEY = 'carvibes-recently-viewed';

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(FAVORITES_KEY);
      if (stored) setFavorites(JSON.parse(stored));
    } catch {}
  }, []);

  const persist = (vals: string[]) => {
    setFavorites(vals);
    try {
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(vals));
    } catch {}
  };

  const isFavorite = useCallback((id: string) => favorites.includes(id), [favorites]);

  const toggleFavorite = useCallback((id: string) => {
    setFavorites((prev) => {
      const next = prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id];
      try {
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(next));
      } catch {}
      return next;
    });
  }, []);

  const clearFavorites = useCallback(() => persist([]), []);

  return { favorites, isFavorite, toggleFavorite, clearFavorites };
}

export function useRecentlyViewed() {
  const [recentlyViewed, setRecentlyViewed] = useState<string[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(RECENTLY_VIEWED_KEY);
      if (stored) setRecentlyViewed(JSON.parse(stored));
    } catch {}
  }, []);

  const addRecentlyViewed = useCallback((id: string) => {
    setRecentlyViewed((prev) => {
      const next = [id, ...prev.filter((v) => v !== id)].slice(0, 20);
      try {
        localStorage.setItem(RECENTLY_VIEWED_KEY, JSON.stringify(next));
      } catch {}
      return next;
    });
  }, []);

  const clearRecentlyViewed = useCallback(() => {
    setRecentlyViewed([]);
    try {
      localStorage.removeItem(RECENTLY_VIEWED_KEY);
    } catch {}
  }, []);

  return { recentlyViewed, addRecentlyViewed, clearRecentlyViewed };
}
