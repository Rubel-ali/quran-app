"use client";

import { useState, useRef, useCallback } from "react";
import { getAudioUrl } from "@/lib/quran-api";

export function useAudio({ totalAyahs = 0 }: { totalAyahs?: number } = {}) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentAyah, setCurrentAyah] = useState<number | null>(null);
  const [currentSurah, setCurrentSurah] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);

  // Refs to avoid stale closures inside audio event listeners
  const totalAyahsRef = useRef(totalAyahs);
  totalAyahsRef.current = totalAyahs;
  const currentAyahRef = useRef<number | null>(null);
  const currentSurahRef = useRef<number | null>(null);
  const autoPlayEnabledRef = useRef(false);

  const _loadAndPlay = useCallback(
    (surahNumber: number, ayahNumber: number) => {
      // Stop previous audio cleanly
      if (audioRef.current) {
        audioRef.current.onended = null;
        audioRef.current.onerror = null;
        audioRef.current.oncanplaythrough = null;
        audioRef.current.pause();
        audioRef.current.src = "";
      }

      // Update state & refs
      setIsLoading(true);
      setIsPlaying(false);
      setCurrentAyah(ayahNumber);
      setCurrentSurah(surahNumber);
      currentAyahRef.current = ayahNumber;
      currentSurahRef.current = surahNumber;

      const audio = new Audio(getAudioUrl(surahNumber, ayahNumber));
      audioRef.current = audio;

      audio.oncanplaythrough = () => {
        setIsLoading(false);
        audio.play().catch(() => {
          setIsPlaying(false);
          setIsLoading(false);
        });
        setIsPlaying(true);
      };

      audio.onerror = () => {
        // Skip broken ayah and move to next
        setIsLoading(false);
        const next = (currentAyahRef.current ?? 0) + 1;
        if (autoPlayEnabledRef.current && next <= totalAyahsRef.current) {
          _loadAndPlay(currentSurahRef.current!, next);
        } else {
          setIsPlaying(false);
          setIsAutoPlaying(false);
          autoPlayEnabledRef.current = false;
          setCurrentAyah(null);
          currentAyahRef.current = null;
        }
      };

      audio.onended = () => {
        const next = (currentAyahRef.current ?? 0) + 1;
        if (autoPlayEnabledRef.current && next <= totalAyahsRef.current) {
          // Auto-play next ayah in same surah
          setIsAutoPlaying(true);
          _loadAndPlay(currentSurahRef.current!, next);
        } else {
          // Surah finished or autoplay off
          setIsPlaying(false);
          setIsAutoPlaying(false);
          autoPlayEnabledRef.current = false;
          setCurrentAyah(null);
          currentAyahRef.current = null;
        }
      };
    },
    [], // stable — all state accessed via refs
  );

  const playAyah = useCallback(
    (surahNumber: number, ayahNumber: number) => {
      // Toggle pause/resume if same ayah
      if (
        currentAyahRef.current === ayahNumber &&
        currentSurahRef.current === surahNumber &&
        audioRef.current
      ) {
        if (audioRef.current.paused) {
          audioRef.current.play();
          setIsPlaying(true);
        } else {
          audioRef.current.pause();
          setIsPlaying(false);
        }
        return;
      }

      // Enable autoplay and start
      autoPlayEnabledRef.current = true;
      setIsAutoPlaying(true);
      _loadAndPlay(surahNumber, ayahNumber);
    },
    [_loadAndPlay],
  );

  const stop = useCallback(() => {
    autoPlayEnabledRef.current = false;
    if (audioRef.current) {
      audioRef.current.onended = null;
      audioRef.current.onerror = null;
      audioRef.current.pause();
      audioRef.current.src = "";
    }
    setIsPlaying(false);
    setIsAutoPlaying(false);
    setCurrentAyah(null);
    setCurrentSurah(null);
    currentAyahRef.current = null;
    currentSurahRef.current = null;
  }, []);

  return {
    playAyah,
    stop,
    isPlaying,
    currentAyah,
    currentSurah,
    isLoading,
    isAutoPlaying,
  };
}
