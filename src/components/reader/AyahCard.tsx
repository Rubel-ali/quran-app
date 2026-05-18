"use client";

import { clsx } from "clsx";
import { useEffect, useRef } from "react";
import type {
  Ayah,
  FontSettings,
  ReadingSettings,
} from "@/types";

interface AyahCardProps {
  ayah: Ayah;
  fontSettings: FontSettings;
  readingSettings: ReadingSettings;
  isPlaying: boolean;
  isLoading: boolean;
  onPlay: () => void;
  isBookmarked?: boolean;
  onToggleBookmark?: () => void;
}

function getFontClass(
  font: FontSettings["arabicFont"],
) {
  if (font === "Amiri")
    return "font-arabic-amiri";

  if (font === "Scheherazade")
    return "font-arabic-scheherazade";

  return "font-arabic-kfgq";
}

export default function AyahCard({
  ayah,
  fontSettings,
  readingSettings,
  isPlaying,
  isLoading,
  onPlay,
  isBookmarked = false,
  onToggleBookmark,
}: AyahCardProps) {

  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isPlaying && cardRef.current) {
      cardRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [isPlaying]);

  const verseLabel = `${ayah.surahNumber}:${ayah.numberInSurah}`;

  return (
    <div
      ref={cardRef}
      className={clsx(
        "border-b border-[#161b22] py-6 px-4 md:px-8 transition-colors group",
        isPlaying && "bg-[#0f1a0f]",
      )}
    >
      {/* Top */}
      <div className="flex items-center gap-3 mb-4">

        <div
          className={clsx(
            "w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold border transition-colors",
            isPlaying
              ? "bg-[#3d8b3d] border-[#3d8b3d] text-white"
              : "bg-transparent border-[#30363d] text-[#6e7681]",
          )}
        >
          {ayah.numberInSurah}
        </div>

        <span className="text-[#6e7681] text-xs">
          {verseLabel}
        </span>

        <div className="flex items-center gap-1 ml-auto opacity-0 group-hover:opacity-100 transition-opacity">

          {/* Play */}
          <button
            onClick={onPlay}
            disabled={isLoading}
            className={clsx(
              "w-8 h-8 rounded-full flex items-center justify-center transition-all",
              isPlaying
                ? "bg-[#3d8b3d] text-white"
                : "text-[#6e7681] hover:bg-[#161b22] hover:text-[#e6edf3]",
            )}
          >
            {isPlaying ? "❚❚" : "▶"}
          </button>

        </div>
      </div>

      {/* Arabic */}
      <p
        dir="rtl"
        className={clsx(
          "arabic-text text-[#e6edf3] text-right mb-5 leading-loose transition-all duration-200",
          getFontClass(fontSettings.arabicFont),
          isPlaying &&
            "green-glow text-[#a7f3a0]",
        )}
        style={{
          fontSize: `${fontSettings.arabicFontSize}px`,
        }}
      >
        {ayah.text}
      </p>

      {/* Translation */}
      {readingSettings.showTranslation && (
        <div className="mt-2">
          <p
            className="text-[#8b949e] leading-relaxed"
            style={{
              fontSize: `${fontSettings.translationFontSize}px`,
            }}
          >
            {ayah.translation}
          </p>
        </div>
      )}
    </div>
  );
}