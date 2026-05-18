"use client";

import type { SurahDetail, AppSettings } from "@/types";
import { useAudio } from "@/hooks/useAudio";
import SurahHeader from "@/components/reader/SurahHeader";
import AyahCard from "@/components/reader/AyahCard";
import AutoPlayBanner from "./AutoPlayBanner";

interface SurahReaderProps {
  surah: SurahDetail;
  settings: AppSettings;
}

export default function SurahReader({
  surah,
  settings,
}: SurahReaderProps) {
  const { playAyah, isPlaying, isLoading, currentAyah, currentSurah } =
    useAudio({ totalAyahs: surah.numberOfAyahs });

  return (
    <>
    <AutoPlayBanner />
      <SurahHeader surah={surah} />

      <div className="max-w-3xl mx-auto">
        {surah.ayahs.map((ayah) => {
          const playing =
            isPlaying &&
            currentAyah === ayah.numberInSurah &&
            currentSurah === surah.number;

          const loading =
            isLoading &&
            currentAyah === ayah.numberInSurah &&
            currentSurah === surah.number;

          return (
            <AyahCard
              key={ayah.number}
              ayah={ayah}
              fontSettings={settings.font}
              readingSettings={settings.reading}
              isPlaying={playing}
              isLoading={loading}
              onPlay={() =>
                playAyah(surah.number, ayah.numberInSurah)
              }
            />
          );
        })}
      </div>
    </>
  );
}