"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import type { Surah } from "@/types";
import IconSidebar from "@/components/layout/IconSidebar";
import SurahSidebar from "@/components/layout/SurahSidebar";
import SearchPanel from "@/components/ui/SearchPanel";
import MobileNav from "@/components/layout/MobileNav";

interface AppShellProps {
  allSurahs: Surah[];
  children: React.ReactNode;
}

export default function AppShell({ allSurahs, children }: AppShellProps) {
  const [surahListOpen, setSurahListOpen] = useState(true);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [bookmarkOpen, setBookmarkOpen] = useState(false);

  const pathname = usePathname();
  // Extract current surah number from URL e.g. /surah/2 → 2
  const currentSurahNum = pathname.startsWith("/surah/")
    ? Number(pathname.split("/surah/")[1])
    : undefined;

  const toggleSurahList = () => {
    setSurahListOpen((v) => !v);
    setSettingsOpen(false);
  };
  const toggleSettings = () => {
    setSettingsOpen((v) => !v);
    setSurahListOpen(false);
  };
  const toggleSearch = () => setSearchOpen((v) => !v);
  const toggleBookmarks = () => setBookmarkOpen((v) => !v);

  return (
    <div className="flex h-screen overflow-hidden bg-[#0d1117]">
      {/* Left icon sidebar */}
      <IconSidebar
        onToggleSurahList={toggleSurahList}
        onToggleSearch={toggleSearch}
        onToggleSettings={toggleSettings}
        onToggleBookmarks={toggleBookmarks}
        surahListOpen={surahListOpen}
        searchOpen={searchOpen}
        settingsOpen={settingsOpen}
        bookmarksOpen={bookmarkOpen}
      />

      {/* Surah list sidebar */}
      <SurahSidebar
        surahs={allSurahs}
        currentSurah={currentSurahNum}
        isOpen={surahListOpen}
        onClose={() => setSurahListOpen(false)}
      />

      {/* Main scrollable area */}
      <main className="flex-1 flex flex-col overflow-hidden">

        {/* Page content — only this part swaps on navigation */}
        <div className="flex-1 overflow-y-auto pb-16 md:pb-0">{children}</div>
      </main>

      {/* Modals */}
      <SearchPanel isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* Mobile bottom nav */}
      <MobileNav
        onToggleSurahList={toggleSurahList}
        onToggleSearch={toggleSearch}
        onToggleSettings={toggleSettings}
        onToggleBookmarks={toggleBookmarks}
      />
    </div>
  );
}
