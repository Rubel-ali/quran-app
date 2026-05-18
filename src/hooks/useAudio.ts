"use client";

import { useState, useEffect, useCallback } from "react";
import { getAudioManager } from "@/lib/AudioManager";

export function useAudio({ totalAyahs = 0 }: { totalAyahs?: number } = {}) {
  const manager = getAudioManager();

  useEffect(() => {
    manager.setTotalAyahs(totalAyahs);
  }, [totalAyahs, manager]);

  const [state, setState] = useState(() => ({ ...manager.state }));

  useEffect(() => {
    const unsub = manager.subscribe(() => setState({ ...manager.state }));
    setState({ ...manager.state });
    return () => {
      unsub();
    };
  }, [manager]);

  const playAyah = useCallback(
    (surah: number, ayah: number) => manager.play(surah, ayah),
    [manager],
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
