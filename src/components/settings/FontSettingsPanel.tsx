"use client";

import React from "react";

import { clsx } from "clsx";
import type { FontSettings, ReadingSettings } from "@/types";
import ToggleRow from "./ToggleRow";

interface FontSettingsPanelProps {
  fontSettings: FontSettings;
  readingSettings: ReadingSettings;
  onUpdateFont: (updates: Partial<FontSettings>) => void;
  onUpdateReading: (updates: Partial<ReadingSettings>) => void;
  isOpen: boolean;
  onClose: () => void;
}

const ARABIC_FONTS = [
  { key: "Amiri" as const, label: "Amiri" },
  { key: "Scheherazade" as const, label: "Scheherazade" },
];

export default function FontSettingsPanel({
  fontSettings,
  readingSettings,
  onUpdateFont,
  onUpdateReading,
  isOpen,
  onClose,
}: FontSettingsPanelProps) {
  const [readingOpen, setReadingOpen] = React.useState(false);
  const [fontOpen, setFontOpen] = React.useState(true);

  const getFontClass = (font: FontSettings["arabicFont"]) => {
    if (font === "Amiri") return "font-arabic-amiri";
    if (font === "Scheherazade") return "font-arabic-scheherazade";
    return "font-arabic-kfgq";
  };

  return (
    <>
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/60 z-40"
          onClick={onClose}
        />
      )}

      <div
        className={clsx(
          "fixed md:relative top-0 right-0 h-full w-72 bg-[#0d1117] border-l border-[#21262d] flex flex-col z-50 transition-transform duration-300 overflow-y-auto",
          "md:translate-x-0",
          isOpen ? "translate-x-0" : "translate-x-full md:translate-x-0",
        )}
        style={{ height: "100vh" }}
      >
        <div className="p-4 border-b border-[#21262d]">
          <div className="flex rounded-full border border-[#30363d] overflow-hidden">
            <button
              onClick={() => onUpdateReading({ mode: "translation" })}
              className={clsx(
                "flex-1 py-2 text-sm font-medium transition-colors",
                readingSettings.mode === "translation"
                  ? "bg-[#1c2333] text-[#e6edf3]"
                  : "text-[#6e7681] hover:text-[#e6edf3]",
              )}
            >
              Translation
            </button>
            <button
              onClick={() => onUpdateReading({ mode: "reading" })}
              className={clsx(
                "flex-1 py-2 text-sm font-medium transition-colors",
                readingSettings.mode === "reading"
                  ? "bg-[#1c2333] text-[#e6edf3]"
                  : "text-[#6e7681] hover:text-[#e6edf3]",
              )}
            >
              Reading
            </button>
          </div>
        </div>

        {/* Reading Settings */}
        <div className="border-b border-[#21262d]">
          <button
            onClick={() => setReadingOpen((v) => !v)}
            className="w-full flex items-center justify-between px-4 py-3 text-[#e6edf3] hover:bg-[#161b22] transition-colors"
          >
            <div className="flex items-center gap-2">
              <svg
                className="w-4 h-4 text-[#6e7681]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
                />
              </svg>
              <span className="text-sm font-medium">Reading Settings</span>
            </div>
            <svg
              className={clsx(
                "w-4 h-4 text-[#6e7681] transition-transform",
                readingOpen && "rotate-180",
              )}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {readingOpen && (
            <div className="px-4 pb-4 space-y-3 animate-fade-in">
              <ToggleRow
                label="Show Translation"
                enabled={readingSettings.showTranslation}
                onChange={(v) => onUpdateReading({ showTranslation: v })}
              />
              <ToggleRow
                label="Show Transliteration"
                enabled={readingSettings.showTransliteration}
                onChange={(v) => onUpdateReading({ showTransliteration: v })}
              />
            </div>
          )}
        </div>

        <div>
          <button
            onClick={() => setFontOpen((v) => !v)}
            className="w-full flex items-center justify-between px-4 py-3 text-[#4caf50] hover:bg-[#161b22] transition-colors"
          >
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-[#3d8b3d] flex items-center justify-center">
                <span className="text-white text-[8px] font-bold">T</span>
              </div>
              <span className="text-sm font-medium">Font Settings</span>
            </div>
            <svg
              className={clsx(
                "w-4 h-4 text-[#6e7681] transition-transform",
                fontOpen && "rotate-180",
              )}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {fontOpen && (
            <div className="px-4 pb-6 space-y-5 animate-fade-in">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[#e6edf3] text-sm">
                    Arabic Font Size
                  </span>
                  <span className="text-[#4caf50] text-sm font-mono">
                    {fontSettings.arabicFontSize}
                  </span>
                </div>
                <input
                  type="range"
                  min={20}
                  max={80}
                  value={fontSettings.arabicFontSize}
                  onChange={(e) =>
                    onUpdateFont({ arabicFontSize: Number(e.target.value) })
                  }
                  style={
                    {
                      "--progress": `${((fontSettings.arabicFontSize - 20) / 60) * 100}%`,
                    } as React.CSSProperties
                  }
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[#e6edf3] text-sm">
                    Translation Font Size
                  </span>
                  <span className="text-[#4caf50] text-sm font-mono">
                    {fontSettings.translationFontSize}
                  </span>
                </div>
                <input
                  type="range"
                  min={12}
                  max={32}
                  value={fontSettings.translationFontSize}
                  onChange={(e) =>
                    onUpdateFont({
                      translationFontSize: Number(e.target.value),
                    })
                  }
                  style={
                    {
                      "--progress": `${((fontSettings.translationFontSize - 12) / 20) * 100}%`,
                    } as React.CSSProperties
                  }
                />
              </div>

              <div>
                <div className="mb-2">
                  <span className="text-[#e6edf3] text-sm">
                    Arabic Font Face
                  </span>
                </div>
                <div className="relative">
                  <div className="space-y-2">
                    {ARABIC_FONTS.map((f) => {
                      const active = fontSettings.arabicFont === f.key;

                      return (
                        <button
                          key={f.key}
                          type="button"
                          onClick={() =>
                            onUpdateFont({
                              arabicFont: f.key,
                            })
                          }
                          className={clsx(
                            "w-full rounded-lg border px-3 py-3 text-left transition-all flex items-center justify-between",
                            active
                              ? "border-[#4caf50] bg-[#1c2333] text-[#4caf50]"
                              : "border-[#30363d] bg-[#161b22] text-white hover:border-[#4caf50]",
                          )}
                        >
                          <span>{f.label}</span>

                          {active && (
                            <svg
                              className="w-5 h-5 text-[#4caf50]"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2.5}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          )}
                        </button>
                      );
                    })}
                  </div>
                  <svg
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6e7681] pointer-events-none"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                      className="rotate-90"
                    />
                  </svg>
                </div>

                <div className="mt-3 p-3 bg-[#161b22] rounded-lg text-center">
                  <p
                    dir="rtl"
                    className={clsx(
                      "text-[#e6edf3]",
                      getFontClass(fontSettings.arabicFont),
                    )}
                    style={{ fontSize: "24px", lineHeight: 2 }}
                  >
                    بِسْمِ اللَّهِ
                  </p>
                  <p className="text-[#6e7681] text-xs mt-1">
                    {fontSettings.arabicFont}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="m-4 p-4 bg-[#1c2333] rounded-xl border border-[#30363d]">
          <p className="text-[#e6edf3] text-sm font-semibold mb-1">
            Help spread the knowledge of Islam
          </p>
          <p className="text-[#8b949e] text-xs mb-3 leading-relaxed">
            Your regular support helps us reach our religious brothers and
            sisters with the message of Islam.
          </p>
          <button className="w-full bg-[#3d8b3d] hover:bg-[#4caf50] text-white text-sm font-semibold py-2 rounded-lg transition-colors">
            Support Us
          </button>
        </div>
      </div>
    </>
  );
}
