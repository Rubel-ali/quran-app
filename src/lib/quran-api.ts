// lib/api.ts

const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001/api";

// ─────────────────────────────────────────────────────────────
// Get All Surahs
// ─────────────────────────────────────────────────────────────

export async function getAllSurahs() {
  const res = await fetch(`${BASE_URL}/surahs`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch surahs");
  }

  const data = await res.json();

  return data.data.map((s: any) => ({
    number: s.number,
    name: s.name,
    englishName: s.englishName,
    englishNameTranslation: s.englishNameTranslation,
    numberOfAyahs: s.numberOfAyahs,
    revelationType: s.revelationType,
  }));
}

// ─────────────────────────────────────────────────────────────
// Get Surah Detail + Ayahs
// ─────────────────────────────────────────────────────────────

export async function getSurahDetail(surahNumber: number) {
  const res = await fetch(
    `${BASE_URL}/surahs/${surahNumber}/ayahs`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch surah details");
  }

  const data = await res.json();

  const { surah, ayahs } = data.data;

  return {
    number: surah.number,
    name: surah.name,
    englishName: surah.englishName,
    englishNameTranslation: surah.englishNameTranslation,
    numberOfAyahs: surah.numberOfAyahs,
    revelationType: surah.revelationType,

    ayahs: ayahs.map((a: any) => ({
      number: a.number,
      numberInSurah: a.numberInSurah,

      text: a.arabicText,
      translation: a.translationText,

      surahNumber: a.surahNumber,
      surahName: a.surahName,
      surahEnglishName: a.surahEnglishName,

      juz: a.juz,
      page: a.page,
      ruku: a.ruku,
    })),
  };
}

// ─────────────────────────────────────────────────────────────
// Audio URL
// ─────────────────────────────────────────────────────────────

export function getAudioUrl(
  surahNumber: number,
  ayahNumber: number
): string {
  const s = String(surahNumber).padStart(3, "0");
  const a = String(ayahNumber).padStart(3, "0");

  return `https://everyayah.com/data/Abdul_Basit_Murattal_64kbps/${s}${a}.mp3`;
}