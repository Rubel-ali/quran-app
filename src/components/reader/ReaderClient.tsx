"use client";

import type { SurahDetail } from "@/types";
import { useSettings } from "@/hooks/useSettings";
import SurahReader from "./SurahReader";
import FontSettingsPanel from "../settings/FontSettingsPanel";

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

  if (!mounted) return null;

  return (
    <div className="flex h-screen overflow-hidden bg-[#0d1117]">
      {/* Reader Section */}
      <div className="flex-1 overflow-y-auto">
        <SurahReader
          surah={surah}
          settings={settings}
        />
      </div>

      {/* Fixed Settings Panel */}
      <div className="sticky top-0 h-screen shrink-0">
        <FontSettingsPanel
          fontSettings={settings.font}
          readingSettings={settings.reading}
          onUpdateFont={updateFontSettings}
          onUpdateReading={updateReadingSettings}
          isOpen={true}
          onClose={() => {}}
        />
      </div>
    </div>
  );
}