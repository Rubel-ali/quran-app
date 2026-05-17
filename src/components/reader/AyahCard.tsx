"use client";

import { clsx } from "clsx";
import type { Ayah, FontSettings, ReadingSettings } from "@/types";

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

const PlayIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M8 5v14l11-7z" />
  </svg>
);

const PauseIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
  </svg>
);

const MoreIcon = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
    />
  </svg>
);

function getFontClass(font: FontSettings["arabicFont"]) {
  if (font === "Amiri") return "font-arabic-amiri";
  if (font === "Scheherazade") return "font-arabic-scheherazade";

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
  const verseLabel = `${ayah.surahNumber}:${ayah.numberInSurah}`;

  return (
    <div
      className={clsx(
        "border-b border-[#161b22] py-6 px-4 md:px-8 transition-colors group",
        isPlaying && "bg-[#0f1a0f]",
      )}
    >
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

        <span className="text-[#6e7681] text-xs">{verseLabel}</span>

        <div className="flex items-center gap-1 ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={onPlay}
            disabled={isLoading}
            className={clsx(
              "w-8 h-8 rounded-full flex items-center justify-center transition-all",
              isPlaying
                ? "bg-[#3d8b3d] text-white"
                : "text-[#6e7681] hover:bg-[#161b22] hover:text-[#e6edf3]",
              isLoading && "opacity-50 cursor-wait",
            )}
          >
            {isLoading ? (
              <svg
                className="w-3 h-3 animate-spin"
                viewBox="0 0 24 24"
                fill="none"
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
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
            ) : isPlaying ? (
              <PauseIcon className="w-3.5 h-3.5" />
            ) : (
              <PlayIcon className="w-3.5 h-3.5" />
            )}
          </button>

          <button
            onClick={onToggleBookmark}
            className={clsx(
              "w-8 h-8 rounded-full flex items-center justify-center transition-all",
              isBookmarked
                ? "text-[#4caf50]"
                : "text-[#6e7681] hover:bg-[#161b22] hover:text-[#e6edf3]",
            )}
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
                strokeWidth={1.5}
                d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
              />
            </svg>
          </button>

          {/* More */}
          <button className="w-8 h-8 rounded-full flex items-center justify-center text-[#6e7681] hover:bg-[#161b22] hover:text-[#e6edf3] transition-all">
            <MoreIcon />
          </button>
        </div>
      </div>

      <p
        dir="rtl"
        className={clsx(
          "arabic-text text-[#e6edf3] text-right mb-5 leading-loose",
          getFontClass(fontSettings.arabicFont),
          isPlaying && "green-glow text-[#a7f3a0]",
        )}
        style={{
          fontSize: `${fontSettings.arabicFontSize}px`,
        }}
      >
        {ayah.text}
      </p>

      {readingSettings.showTranslation && (
        <div className="mt-2">
          <p className="text-[#6e7681] text-xs uppercase tracking-wider mb-1.5">
            SAHEEH INTERNATIONAL
          </p>

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
