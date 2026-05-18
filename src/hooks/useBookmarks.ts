"use client";

import { useState, useEffect, useCallback } from "react";
import type { Ayah } from "@/types";

export interface BookmarkedAyah {
  ayah: Ayah;
  savedAt: number;
}

const STORAGE_KEY = "quran-bookmarks";

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState<BookmarkedAyah[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setBookmarks(JSON.parse(raw));
    } catch {}
  }, []);

  const save = useCallback((list: BookmarkedAyah[]) => {
    setBookmarks(list);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    } catch {}
  }, []);

  const isBookmarked = useCallback(
    (surahNumber: number, ayahNumber: number) =>
      bookmarks.some(
        (b) =>
          b.ayah.surahNumber === surahNumber &&
          b.ayah.numberInSurah === ayahNumber,
      ),
    [bookmarks],
  );

  const toggleBookmark = useCallback(
    (ayah: Ayah) => {
      const exists = bookmarks.some(
        (b) =>
          b.ayah.surahNumber === ayah.surahNumber &&
          b.ayah.numberInSurah === ayah.numberInSurah,
      );
      if (exists) {
        save(
          bookmarks.filter(
            (b) =>
              !(
                b.ayah.surahNumber === ayah.surahNumber &&
                b.ayah.numberInSurah === ayah.numberInSurah
              ),
          ),
        );
      } else {
        save([{ ayah, savedAt: Date.now() }, ...bookmarks]);
      }
    },
    [bookmarks, save],
  );

  const removeBookmark = useCallback(
    (surahNumber: number, ayahNumber: number) => {
      save(
        bookmarks.filter(
          (b) =>
            !(
              b.ayah.surahNumber === surahNumber &&
              b.ayah.numberInSurah === ayahNumber
            ),
        ),
      );
    },
    [bookmarks, save],
  );

  return { bookmarks, isBookmarked, toggleBookmark, removeBookmark, mounted };
}
