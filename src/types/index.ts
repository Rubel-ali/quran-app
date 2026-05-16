export interface Surah {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: "Meccan" | "Medinan";
}

export interface Ayah {
  number: number;
  numberInSurah: number;
  text: string;
  translation: string;
  surahNumber: number;
  surahName: string;
  surahEnglishName: string;
  juz: number;
  page: number;
  ruku: number;
}

export interface SurahDetail extends Surah {
  ayahs: Ayah[];
}

export interface FontSettings {
  arabicFont: "KFGQ" | "Amiri" | "Scheherazade";
  arabicFontSize: number;
  translationFontSize: number;
}

export interface ReadingSettings {
  showTranslation: boolean;
  showTransliteration: boolean;
  mode: "translation" | "reading";
}

export interface AppSettings {
  font: FontSettings;
  reading: ReadingSettings;
}

export interface AudioState {
  isPlaying: boolean;
  currentAyah: number | null;
  surahNumber: number | null;
}

export interface SearchResult {
  ayah: Ayah;
  surah: Surah;
  matchType: "arabic" | "translation";
}
