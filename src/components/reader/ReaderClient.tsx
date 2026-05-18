"use client";

import { useState } from "react";

import type { SurahDetail } from "@/types";

import { useSettings } from "@/hooks/useSettings";

import SurahReader from "./SurahReader";
import FontSettingsPanel from "../settings/FontSettingsPanel";
import MobileNav from "../layout/MobileNav";

interface ReaderClientProps {
  surah: SurahDetail;
}

export default function ReaderClient({
  surah,
}: ReaderClientProps) {
  const {
    settings,
    updateFontSettings,
    updateReadingSettings,
    mounted,
  } = useSettings();

  // MOBILE PANEL STATE
  const [settingsOpen, setSettingsOpen] =
    useState(false);

  if (!mounted) return null;

  return (
    <div className="flex h-screen overflow-hidden bg-[#0d1117]">
      {/* Reader */}
      <div className="flex-1 overflow-y-auto pb-16 md:pb-0">
        <SurahReader
          surah={surah}
          settings={settings}
        />
      </div>

      {/* DESKTOP SETTINGS */}
      <div className="hidden md:block shrink-0">
        <FontSettingsPanel
          fontSettings={settings.font}
          readingSettings={
            settings.reading
          }
          onUpdateFont={
            updateFontSettings
          }
          onUpdateReading={
            updateReadingSettings
          }
          isOpen={true}
          onClose={() => {}}
        />
      </div>

      {/* MOBILE SETTINGS */}
      <div className="md:hidden">
        <FontSettingsPanel
          fontSettings={settings.font}
          readingSettings={
            settings.reading
          }
          onUpdateFont={
            updateFontSettings
          }
          onUpdateReading={
            updateReadingSettings
          }
          isOpen={settingsOpen}
          onClose={() =>
            setSettingsOpen(false)
          }
        />
      </div>

      {/* MOBILE NAV */}
      <MobileNav
        onToggleSurahList={() => {}}
        onToggleSearch={() => {}}
        onToggleBookmarks={() => {}}
        onToggleSettings={() =>
          setSettingsOpen(
            (prev) => !prev,
          )
        }
      />
    </div>
  );
}