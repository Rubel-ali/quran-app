"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { clsx } from "clsx";

interface IconSidebarProps {
  onToggleSurahList: () => void;
  onToggleSearch: () => void;
  onToggleSettings: () => void;
  onToggleBookmarks: () => void;
  surahListOpen: boolean;
  searchOpen: boolean;
  settingsOpen: boolean;
  bookmarksOpen: boolean;
}

// SVG Icons
const QuranIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    className="w-5 h-5"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
    />
  </svg>
);

const SearchIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    className="w-5 h-5"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 15.803 7.5 7.5 0 0015.803 15.803z"
    />
  </svg>
);

const BookmarkIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    className="w-5 h-5"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
    />
  </svg>
);

const SettingsIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    className="w-5 h-5"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
    />
  </svg>
);

const MoreIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    className="w-5 h-5"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
    />
  </svg>
);

export default function IconSidebar({
  onToggleSurahList,
  onToggleSearch,
  onToggleSettings,
  onToggleBookmarks,
  surahListOpen,
  searchOpen,
  settingsOpen,
  bookmarksOpen,
}: IconSidebarProps) {
  return (
    <div
      className="hidden md:flex flex-col items-center w-14 border-r border-[#21262d] bg-[#0d1117] shrink-0 py-4 gap-1 z-30"
      style={{ height: "100vh" }}
    >
      {/* Logo */}
      <Link href="/" className="mb-4 p-2">
        <div className="w-8 h-8 rounded-full bg-[#3d8b3d] flex items-center justify-center">
          <span className="text-white text-xs font-bold">Q</span>
        </div>
      </Link>

      {/* Surah List */}
      <SidebarButton
        icon={<QuranIcon />}
        label="Surahs"
        active={surahListOpen}
        onClick={onToggleSurahList}
      />

      {/* Search */}
      <SidebarButton
        icon={<SearchIcon />}
        label="Search"
        active={searchOpen}
        onClick={onToggleSearch}
      />

      {/* Bookmarks */}
      <SidebarButton
        icon={<BookmarkIcon />}
        label="Bookmarks"
        active={bookmarksOpen}
        onClick={onToggleBookmarks}
      />

      <div className="flex-1" />

      {/* Settings */}
      <SidebarButton
        icon={<SettingsIcon />}
        label="Settings"
        active={settingsOpen}
        onClick={onToggleSettings}
      />

      {/* More */}
      <SidebarButton icon={<MoreIcon />} label="More" onClick={() => {}} />
    </div>
  );
}

function SidebarButton({
  icon,
  label,
  active,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      title={label}
      className={clsx(
        "w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-200 group relative",
        active
          ? "bg-[#1c2333] text-[#4caf50]"
          : "text-[#6e7681] hover:text-[#e6edf3] hover:bg-[#161b22]",
      )}
    >
      {icon}
      {active && (
        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-[#4caf50] rounded-r" />
      )}
    </button>
  );
}
