"use client";

import Link from "next/link";
import type { BookmarkedAyah } from "@/hooks/useBookmarks";

interface BookmarkPanelProps {
  bookmarks: BookmarkedAyah[];
  onRemove: (surahNumber: number, ayahNumber: number) => void;
  isOpen: boolean;
  onClose: () => void;
}

export default function BookmarkPanel({
  bookmarks,
  onRemove,
  isOpen,
  onClose,
}: BookmarkPanelProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-start justify-center pt-20 px-4">
      <div className="bg-[#111827] border border-[#30363d] rounded-xl w-full max-w-xl shadow-2xl overflow-hidden animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-[#21262d]">
          <div className="flex items-center gap-2">
            <svg
              className="w-4 h-4 text-[#4caf50]"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
            </svg>
            <h2 className="text-[#e6edf3] font-semibold text-sm">
              Bookmarks{" "}
              {bookmarks.length > 0 && (
                <span className="text-[#6e7681] font-normal">
                  ({bookmarks.length})
                </span>
              )}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-[#6e7681] hover:text-[#e6edf3] text-sm px-2 py-0.5 border border-[#30363d] rounded"
          >
            Esc
          </button>
        </div>

        {/* List */}
        <div className="max-h-[70vh] overflow-y-auto">
          {bookmarks.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center px-6">
              <svg
                className="w-12 h-12 text-[#30363d] mb-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
                />
              </svg>
              <p className="text-[#6e7681] text-sm">No bookmarks yet</p>
              <p className="text-[#484f58] text-xs mt-1">
                Tap the bookmark icon on any ayah to save it here
              </p>
            </div>
          ) : (
            bookmarks.map((b) => (
              <div
                key={`${b.ayah.surahNumber}-${b.ayah.numberInSurah}`}
                className="flex items-start gap-3 px-4 py-3 border-b border-[#161b22] hover:bg-[#161b22] transition-colors group"
              >
                {/* Badge */}
                <div className="w-8 h-8 rounded-full bg-[#1c2333] border border-[#30363d] flex items-center justify-center text-xs text-[#6e7681] shrink-0 mt-0.5">
                  {b.ayah.numberInSurah}
                </div>

                {/* Content */}
                <Link
                  href={`/surah/${b.ayah.surahNumber}`}
                  onClick={onClose}
                  className="flex-1 min-w-0"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[#4caf50] text-xs font-medium">
                      {b.ayah.surahEnglishName} {b.ayah.surahNumber}:
                      {b.ayah.numberInSurah}
                    </span>
                  </div>
                  <p
                    dir="rtl"
                    className="text-[#e6edf3] text-sm mb-1 font-arabic-amiri leading-relaxed line-clamp-1"
                  >
                    {b.ayah.text}
                  </p>
                  <p className="text-[#6e7681] text-xs leading-relaxed line-clamp-2">
                    {b.ayah.translation}
                  </p>
                </Link>

                {/* Remove */}
                <button
                  onClick={() =>
                    onRemove(b.ayah.surahNumber, b.ayah.numberInSurah)
                  }
                  className="opacity-0 group-hover:opacity-100 text-[#484f58] hover:text-[#f85149] transition-all p-1 rounded shrink-0"
                  title="Remove bookmark"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
