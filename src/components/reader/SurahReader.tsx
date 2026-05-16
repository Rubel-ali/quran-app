"use client";

import { useState } from "react";
import type { SurahDetail, Surah } from "@/types";
import { useAudio } from "@/hooks/useAudio";
import IconSidebar from "@/components/layout/IconSidebar";
import SurahSidebar from "@/components/layout/SurahSidebar";
import SearchPanel from "@/components/ui/SearchPanel";
import MobileNav from "@/components/layout/MobileNav";
import SurahHeader from "@/components/reader/SurahHeader";
import AyahCard from "@/components/reader/AyahCard";

interface SurahReaderProps {
  surah: SurahDetail;
  allSurahs: Surah[];
}

export default function SurahReader({ surah, allSurahs }: SurahReaderProps) {
  const [surahListOpen, setSurahListOpen] = useState(true);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [bookmarkOpen, setBookmarkOpen] = useState(false);

  const { settings, updateFontSettings, updateReadingSettings, mounted } =
    useSettings();

  // Pass totalAyahs so audio hook can auto-advance to next ayah
  const {
    playAyah,
    stop,
    isPlaying,
    currentAyah,
    currentSurah,
    isLoading,
    isAutoPlaying,
  } = useAudio({ totalAyahs: surah.numberOfAyahs });

  const { bookmarks, isBookmarked, toggleBookmark, removeBookmark } =
    useBookmarks();

  const toggleSurahList = () => {
    setSurahListOpen((v) => !v);
    setSettingsOpen(false);
  };

  const toggleSettings = () => {
    setSettingsOpen((v) => !v);
    setSurahListOpen(false);
  };

  const toggleSearch = () => setSearchOpen((v) => !v);
  const toggleBookmarkPanel = () => setBookmarkOpen((v) => !v);

  if (!mounted) return null;

  return (
    <div className="flex h-screen overflow-hidden bg-[#0d1117]">
      {/* Left Icon Sidebar */}
      <IconSidebar
        onToggleSurahList={toggleSurahList}
        onToggleSearch={toggleSearch}
        onToggleSettings={toggleSettings}
        onToggleBookmarks={toggleBookmarkPanel}
        surahListOpen={surahListOpen}
        searchOpen={searchOpen}
        settingsOpen={settingsOpen}
        bookmarksOpen={bookmarkOpen}
      />

      {/* Surah List Sidebar */}
      <SurahSidebar
        surahs={allSurahs}
        currentSurah={surah.number}
        isOpen={surahListOpen}
        onClose={() => setSurahListOpen(false)}
      />

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pb-16 md:pb-0">
        {/* Autoplay banner */}
        {isAutoPlaying && (
          <div className="sticky top-0 z-10 bg-[#0f1a0f] border-b border-[#3d8b3d]/40 px-4 py-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#4caf50] animate-pulse" />
              <span className="text-[#4caf50] text-xs font-medium">
                Auto-playing Surah {surah.englishName} — Ayah {currentAyah} of{" "}
                {surah.numberOfAyahs}
              </span>
            </div>
            <button
              onClick={stop}
              className="text-[#6e7681] hover:text-[#f85149] text-xs transition-colors px-2 py-1 rounded hover:bg-[#161b22]"
            >
              Stop
            </button>
          </div>
        )}

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
            const bookmarked = isBookmarked(surah.number, ayah.numberInSurah);

            return (
              <AyahCard
                key={ayah.number}
                ayah={ayah}
                fontSettings={settings.font}
                readingSettings={settings.reading}
                isPlaying={playing}
                isLoading={loading}
                onPlay={() => playAyah(surah.number, ayah.numberInSurah)}
                isBookmarked={bookmarked}
                onToggleBookmark={() => toggleBookmark(ayah)}
              />
            );
          })}
        </div>
      </main>

      {/* Right Settings Panel */}
      <FontSettingsPanel
        fontSettings={settings.font}
        readingSettings={settings.reading}
        onUpdateFont={updateFontSettings}
        onUpdateReading={updateReadingSettings}
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
      />

      {/* Search Modal */}
      <SearchPanel isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* Bookmark Panel */}
      <BookmarkPanel
        bookmarks={bookmarks}
        onRemove={removeBookmark}
        isOpen={bookmarkOpen}
        onClose={() => setBookmarkOpen(false)}
      />

      {/* Mobile Bottom Nav */}
      <MobileNav
        onToggleSurahList={toggleSurahList}
        onToggleSearch={toggleSearch}
        onToggleSettings={toggleSettings}
        onToggleBookmarks={toggleBookmarkPanel}
      />
    </div>
  );
}
