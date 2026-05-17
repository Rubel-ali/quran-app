"use client";

import { useState, useEffect, useCallback } from "react";
import type { AppSettings, FontSettings, ReadingSettings } from "@/types";

const DEFAULT_SETTINGS: AppSettings = {
  font: {
    arabicFont: "KFGQ",
    arabicFontSize: 40,
    translationFontSize: 18,
  },
  reading: {
    showTranslation: true,
    showTransliteration: false,
    mode: "translation",
  },
};

export function useSettings() {
  const [settings, setSettings] = useState<AppSettings>(DEFAULT_SETTINGS);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const stored = localStorage.getItem("quran-app-settings");
      if (stored) {
        const parsed = JSON.parse(stored);
        setSettings({ ...DEFAULT_SETTINGS, ...parsed });
      }
    } catch {
      // ignore
    }
  }, []);

  const updateFontSettings = useCallback((updates: Partial<FontSettings>) => {
    setSettings((prev) => {
      const next = { ...prev, font: { ...prev.font, ...updates } };
      try {
        localStorage.setItem("quran-app-settings", JSON.stringify(next));
      } catch {}
      return next;
    });
  }, []);

  const updateReadingSettings = useCallback(
    (updates: Partial<ReadingSettings>) => {
      setSettings((prev) => {
        const next = { ...prev, reading: { ...prev.reading, ...updates } };
        try {
          localStorage.setItem("quran-app-settings", JSON.stringify(next));
        } catch {}
        return next;
      });
    },
    [],
  );

  return { settings, updateFontSettings, updateReadingSettings, mounted };
}
