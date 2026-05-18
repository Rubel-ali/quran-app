"use client";

import { useState, useEffect, useCallback } from "react";
import type {
  AppSettings,
  FontSettings,
  ReadingSettings,
} from "@/types";

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
  const [settings, setSettings] =
    useState<AppSettings>(DEFAULT_SETTINGS);

  const [mounted, setMounted] = useState(false);

  // ─────────────────────────────────────────────
  // Load settings from localStorage
  // ─────────────────────────────────────────────
  useEffect(() => {
    setMounted(true);

    try {
      const stored = localStorage.getItem(
        "quran-app-settings",
      );

      if (stored) {
        const parsed = JSON.parse(stored);

        const merged: AppSettings = {
          font: {
            ...DEFAULT_SETTINGS.font,
            ...(parsed.font || {}),
          },

          reading: {
            ...DEFAULT_SETTINGS.reading,
            ...(parsed.reading || {}),
          },
        };

        setSettings(merged);
      }
    } catch (error) {
      console.error(
        "Failed to load settings:",
        error,
      );
    }
  }, []);

  // ─────────────────────────────────────────────
  // Save helper
  // ─────────────────────────────────────────────
  const saveSettings = (next: AppSettings) => {
    try {
      localStorage.setItem(
        "quran-app-settings",
        JSON.stringify(next),
      );
    } catch (error) {
      console.error(
        "Failed to save settings:",
        error,
      );
    }
  };

  // ─────────────────────────────────────────────
  // Update Font Settings
  // ─────────────────────────────────────────────
  const updateFontSettings = useCallback(
    (updates: Partial<FontSettings>) => {
      setSettings((prev) => {
        const next: AppSettings = {
          ...prev,

          font: {
            ...prev.font,
            ...updates,
          },
        };

        saveSettings(next);

        return next;
      });
    },
    [],
  );

  // ─────────────────────────────────────────────
  // Update Reading Settings
  // ─────────────────────────────────────────────
  const updateReadingSettings = useCallback(
    (updates: Partial<ReadingSettings>) => {
      setSettings((prev) => {
        const next: AppSettings = {
          ...prev,

          reading: {
            ...prev.reading,
            ...updates,
          },
        };

        saveSettings(next);

        return next;
      });
    },
    [],
  );

  return {
    settings,
    updateFontSettings,
    updateReadingSettings,
    mounted,
  };
}