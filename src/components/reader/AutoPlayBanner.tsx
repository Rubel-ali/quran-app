"use client";

import { useAudio } from "@/hooks/useAudio";

export default function AutoPlayBanner() {
  const { isAutoPlaying, isPlaying, currentAyah, currentSurah, stop } =
    useAudio();

  if (!isAutoPlaying && !isPlaying) return null;
  if (!currentSurah || !currentAyah) return null;

  return (
    <div className="bg-[#0f1a0f] border-b border-[#3d8b3d]/40 px-4 py-2 flex items-center justify-between shrink-0">
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-[#4caf50] animate-pulse" />
        <span className="text-[#4caf50] text-xs font-medium">
          Now playing — Surah {currentSurah}, Ayah {currentAyah}
        </span>
      </div>
      <button
        onClick={stop}
        className="text-[#6e7681] hover:text-[#f85149] text-xs transition-colors px-2 py-1 rounded hover:bg-[#161b22]"
      >
        Stop
      </button>
    </div>
  );
}
