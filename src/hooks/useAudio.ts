"use client";

import { useState, useEffect, useCallback } from "react";
import { getAudioManager } from "@/lib/AudioManager";

export function useAudio({ totalAyahs = 0 }: { totalAyahs?: number } = {}) {
  const manager = getAudioManager();

  // Keep totalAyahs in sync whenever surah changes
  useEffect(() => {
    manager.setTotalAyahs(totalAyahs);
  }, [totalAyahs, manager]);

  // Mirror manager state into React so components re-render on audio events
  const [state, setState] = useState(() => ({ ...manager.state }));

  useEffect(() => {
    const unsub = manager.subscribe(() => setState({ ...manager.state }));
    setState({ ...manager.state }); // sync immediately
    return unsub;
  }, [manager]);

  const playAyah = useCallback(
    (surah: number, ayah: number) => manager.play(surah, ayah),
    [manager]
  );

  const stop = useCallback(() => manager.stop(), [manager]);

  return {
    playAyah,
    stop,
    isPlaying: state.isPlaying,
    isLoading: state.isLoading,
    isAutoPlaying: state.isAutoPlaying,
    currentAyah: state.currentAyah,
    currentSurah: state.currentSurah,
  };
}
