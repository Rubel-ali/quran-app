"use client";

type Listener = () => void;

interface AudioState {
  isPlaying: boolean;
  isLoading: boolean;
  isAutoPlaying: boolean;
  currentAyah: number | null;
  currentSurah: number | null;
  totalAyahs: number;
}

class AudioManager {
  private audio: HTMLAudioElement | null = null;
  private listeners = new Set<Listener>();
  private autoPlayEnabled = false;

  state: AudioState = {
    isPlaying: false,
    isLoading: false,
    isAutoPlaying: false,
    currentAyah: null,
    currentSurah: null,
    totalAyahs: 0,
  };

  // Call this when the surah page mounts so autoplay knows when to stop
  setTotalAyahs(n: number) {
    this.state = { ...this.state, totalAyahs: n };
  }

  subscribe(fn: Listener) {
    this.listeners.add(fn);
    return () => this.listeners.delete(fn);
  }

  private notify() {
    this.listeners.forEach((fn) => fn());
  }

  private setState(patch: Partial<AudioState>) {
    this.state = { ...this.state, ...patch };
    this.notify();
  }

  private getUrl(surah: number, ayah: number) {
    const s = String(surah).padStart(3, "0");
    const a = String(ayah).padStart(3, "0");
    return `https://everyayah.com/data/Abdul_Basit_Murattal_64kbps/${s}${a}.mp3`;
  }

  private killAudio() {
    if (this.audio) {
      this.audio.onended = null;
      this.audio.onerror = null;
      this.audio.oncanplaythrough = null;
      this.audio.pause();
      this.audio.src = "";
      this.audio = null;
    }
  }

  private load(surah: number, ayah: number) {
    this.killAudio();

    this.setState({
      isLoading: true,
      isPlaying: false,
      currentAyah: ayah,
      currentSurah: surah,
    });

    const audio = new Audio(this.getUrl(surah, ayah));
    this.audio = audio;

    audio.oncanplaythrough = () => {
      if (audio !== this.audio) return; // stale, another load happened
      audio
        .play()
        .then(() => {
          this.setState({ isLoading: false, isPlaying: true });
        })
        .catch(() => {
          this.setState({ isLoading: false, isPlaying: false });
        });
    };

    audio.onerror = () => {
      if (audio !== this.audio) return;
      // Skip to next on error
      const next = (this.state.currentAyah ?? 0) + 1;
      if (this.autoPlayEnabled && next <= this.state.totalAyahs) {
        this.load(this.state.currentSurah!, next);
      } else {
        this.stop();
      }
    };

    audio.onended = () => {
      if (audio !== this.audio) return;
      const next = (this.state.currentAyah ?? 0) + 1;
      if (this.autoPlayEnabled && next <= this.state.totalAyahs) {
        this.load(this.state.currentSurah!, next);
      } else {
        this.autoPlayEnabled = false;
        this.setState({
          isPlaying: false,
          isAutoPlaying: false,
          currentAyah: null,
        });
      }
    };
  }

  play(surah: number, ayah: number) {
    // Toggle pause/resume if same ayah
    if (
      this.state.currentAyah === ayah &&
      this.state.currentSurah === surah &&
      this.audio
    ) {
      if (this.audio.paused) {
        this.audio.play();
        this.setState({ isPlaying: true });
      } else {
        this.audio.pause();
        this.setState({ isPlaying: false });
      }
      return;
    }

    this.autoPlayEnabled = true;
    this.setState({ isAutoPlaying: true });
    this.load(surah, ayah);
  }

  stop() {
    this.autoPlayEnabled = false;
    this.killAudio();
    this.setState({
      isPlaying: false,
      isLoading: false,
      isAutoPlaying: false,
      currentAyah: null,
      currentSurah: null,
    });
  }
}

// Singleton instance — created once, lives for the whole session
let manager: AudioManager | null = null;

export function getAudioManager(): AudioManager {
  if (!manager) manager = new AudioManager();
  return manager;
}
