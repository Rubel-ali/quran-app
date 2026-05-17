"use client";

import type { SurahDetail } from "@/types";
import { useSettings } from "@/hooks/useSettings";
import { useAudio } from "@/hooks/useAudio";
import SurahHeader from "@/components/reader/SurahHeader";
import AyahCard from "@/components/reader/AyahCard";

interface SurahReaderProps {
  surah: SurahDetail;
}

export default function SurahReader({ surah }: SurahReaderProps) {
  const { settings, mounted } = useSettings();
  const { playAyah, isPlaying, isLoading, currentAyah, currentSurah } =
    useAudio({ totalAyahs: surah.numberOfAyahs });

  if (!mounted) return null;

  return (
    <>
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
              onPlay={() => playAyah(surah.number, ayah.numberInSurah)}
              
            />
          );
        })}
      </div>
    </>
  );
}