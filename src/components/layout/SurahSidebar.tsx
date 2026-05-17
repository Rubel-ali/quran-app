"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { clsx } from "clsx";
import type { Surah } from "@/types";

interface SurahSidebarProps {
  surahs: Surah[];
  currentSurah?: number;
  isOpen: boolean;
  onClose: () => void;
}

export default function SurahSidebar({
  surahs,
  currentSurah,
  isOpen,
  onClose,
}: SurahSidebarProps) {
  const [search, setSearch] = useState("");

  const filtered = surahs.filter((s) => {
    const englishName = (s.englishName ?? "").toLowerCase();
    const name = (s.name ?? "").toLowerCase();
    const searchText = (search ?? "").toLowerCase();

    return (
      englishName.includes(searchText) ||
      name.includes(searchText) ||
      String(s.number).includes(searchText)
    );
  });

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/60 z-40"
          onClick={onClose}
        />
      )}

      {/* Sidebar panel */}
      <div
        className={clsx(
          "fixed md:relative top-0 left-0 h-full w-72 bg-[#0d1117] border-r border-[#21262d] flex flex-col z-50 transition-transform duration-300",
          "md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
        )}
        style={{ height: "100vh" }}
      >
        {/* Header */}
        <div className="p-4 border-b border-[#21262d]">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-[#e6edf3] font-semibold text-sm">Surah List</h2>
            <button
              onClick={onClose}
              className="md:hidden text-[#6e7681] hover:text-[#e6edf3]"
            >
              <svg
                className="w-5 h-5"
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
          <input
            type="text"
            placeholder="Search surah..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#161b22] border border-[#30363d] rounded-lg px-3 py-2 text-sm text-[#e6edf3] placeholder-[#6e7681] outline-none focus:border-[#3d8b3d] transition-colors"
          />
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto">
          {filtered.map((surah) => (
            <Link
              key={surah.number}
              href={`/surah/${surah.number}`}
              onClick={() => {
                if (window.innerWidth < 768) onClose();
              }}
              className={clsx(
                "flex items-center gap-3 px-4 py-3 hover:bg-[#161b22] transition-colors border-b border-[#161b22] group",
                currentSurah === surah.number &&
                  "bg-[#1c2333] border-l-2 border-l-[#4caf50]",
              )}
            >
              {/* Number badge */}
              <div
                className={clsx(
                  "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-colors",
                  currentSurah === surah.number
                    ? "bg-[#3d8b3d] text-white"
                    : "bg-[#161b22] text-[#6e7681] group-hover:bg-[#21262d] group-hover:text-[#8b949e]",
                )}
              >
                {surah.number}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span
                    className={clsx(
                      "text-sm font-medium truncate",
                      currentSurah === surah.number
                        ? "text-[#4caf50]"
                        : "text-[#e6edf3]",
                    )}
                  >
                    {surah.englishName}
                  </span>
                  <span
                    className="text-[#6e7681] text-xs ml-2 font-arabic-amiri shrink-0"
                    dir="rtl"
                  >
                    {surah.name}
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-[#6e7681] text-xs">
                    {surah.numberOfAyahs} Ayahs
                  </span>
                  <span className="text-[#30363d] text-xs">·</span>
                  <span className="text-[#6e7681] text-xs">
                    {surah.revelationType === "Meccan" ? "Makkah" : "Madinah"}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
