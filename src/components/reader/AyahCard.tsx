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
  if (font === "Amiri") {
    return "font-arabic-amiri";
  }

  if (font === "Scheherazade") {
    return "font-arabic-scheherazade";
  }

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
        {/* Ayah Number */}
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

        {/* Verse Label */}
        <span className="text-[#6e7681] text-xs">
          {verseLabel}
        </span>

        {/* Actions */}
        <div className="flex items-center gap-1 ml-auto opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
          
          {/* Bookmark */}
          <button
            onClick={onToggleBookmark}
            className={clsx(
              "w-8 h-8 rounded-full flex items-center justify-center transition-all",
              isBookmarked
                ? "bg-[#1c2333] text-[#4caf50]"
                : "text-[#6e7681] hover:bg-[#161b22] hover:text-[#e6edf3]",
            )}
            aria-label="Toggle bookmark"
          >
            <svg
              className="w-4 h-4"
              fill={isBookmarked ? "currentColor" : "none"}
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 5v16l7-5 7 5V5a2 2 0 00-2-2H7a2 2 0 00-2 2z"
              />
            </svg>
          </button>

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
            aria-label={
              isPlaying
                ? "Pause audio"
                : "Play audio"
            }
          >
            {isLoading ? (
              <svg
                className="w-4 h-4 animate-spin"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                />
              </svg>
            ) : isPlaying ? (
              "❚❚"
            ) : (
              "▶"
            )}
          </button>
        </div>
      </div>

      {/* Arabic Text */}
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