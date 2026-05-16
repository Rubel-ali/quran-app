"use client";

import { useState, useCallback, useRef } from "react";
import Link from "next/link";
import type { SearchResult } from "@/types";

interface SearchPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchPanel({ isOpen, onClose }: SearchPanelProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const debounceRef = useRef<NodeJS.Timeout>();

  const handleSearch = useCallback(async (q: string) => {
    setQuery(q);
    if (!q.trim()) {
      setResults([]);
      setSearched(false);
      return;
    }

    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`);
        const data = await res.json();
        setResults(data.results || []);
        setSearched(true);
      } catch {
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 400);
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-start justify-center pt-20 px-4">
      <div className="bg-[#111827] border border-[#30363d] rounded-xl w-full max-w-xl shadow-2xl overflow-hidden animate-fade-in">
        {/* Search input */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-[#21262d]">
          <svg
            className="w-5 h-5 text-[#6e7681] shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 15.803 7.5 7.5 0 0015.803 15.803z"
            />
          </svg>
          <input
            autoFocus
            type="text"
            placeholder="Search ayahs by Arabic or translation..."
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            className="flex-1 bg-transparent text-[#e6edf3] text-sm placeholder-[#6e7681] outline-none"
          />
          <button
            onClick={onClose}
            className="text-[#6e7681] hover:text-[#e6edf3] text-sm px-2 py-0.5 border border-[#30363d] rounded"
          >
            Esc
          </button>
        </div>

        {/* Results */}
        <div className="max-h-96 overflow-y-auto">
          {loading && (
            <div className="flex items-center justify-center py-8">
              <div className="w-6 h-6 border-2 border-[#3d8b3d] border-t-transparent rounded-full animate-spin" />
            </div>
          )}

          {!loading && searched && results.length === 0 && (
            <div className="text-center py-8 text-[#6e7681] text-sm">
              No ayahs found for &quot;{query}&quot;
            </div>
          )}

          {!loading &&
            results.map((r, i) => (
              <Link
                key={i}
                href={`/surah/${r.surah.number}`}
                onClick={onClose}
                className="block px-4 py-3 border-b border-[#161b22] hover:bg-[#161b22] transition-colors"
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[#4caf50] text-xs font-medium">
                    {r.surah.englishName} {r.ayah.surahNumber}:
                    {r.ayah.numberInSurah}
                  </span>
                  <span className="text-[#30363d] text-xs">·</span>
                  <span className="text-[#6e7681] text-xs">
                    {r.surah.revelationType}
                  </span>
                </div>
                <p className="text-[#8b949e] text-sm leading-relaxed line-clamp-2">
                  {r.ayah.translation}
                </p>
              </Link>
            ))}

          {!query && (
            <div className="px-4 py-6 text-center text-[#6e7681] text-sm">
              Type to search across all 6,236 ayahs
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
