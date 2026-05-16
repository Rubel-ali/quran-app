import type { Surah, SurahDetail, Ayah } from "@/types";

const BASE_URL = "https://api.alquran.cloud/v1";

export async function getAllSurahs(): Promise<Surah[]> {
  const res = await fetch(`${BASE_URL}/surah`, {
    next: { revalidate: 86400 },
  });
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

export async function getSurahDetail(
  surahNumber: number,
): Promise<SurahDetail> {
  const [arabicRes, translationRes] = await Promise.all([
    fetch(`${BASE_URL}/surah/${surahNumber}`, { next: { revalidate: 86400 } }),
    fetch(`${BASE_URL}/surah/${surahNumber}/en.sahih`, {
      next: { revalidate: 86400 },
    }),
  ]);

  const arabicData = await arabicRes.json();
  const translationData = await translationRes.json();

  const surah = arabicData.data;
  const translationSurah = translationData.data;

  const ayahs: Ayah[] = surah.ayahs.map((a: any, i: number) => ({
    number: a.number,
    numberInSurah: a.numberInSurah,
    text: a.text,
    translation: translationSurah.ayahs[i]?.text || "",
    surahNumber: surah.number,
    surahName: surah.name,
    surahEnglishName: surah.englishName,
    juz: a.juz,
    page: a.page,
    ruku: a.ruku,
  }));

  return {
    number: surah.number,
    name: surah.name,
    englishName: surah.englishName,
    englishNameTranslation: surah.englishNameTranslation,
    numberOfAyahs: surah.numberOfAyahs,
    revelationType: surah.revelationType === "Meccan" ? "Meccan" : "Medinan",
    ayahs,
  };
}

export function getAudioUrl(surahNumber: number, ayahNumber: number): string {
  const paddedSurah = String(surahNumber).padStart(3, "0");
  const paddedAyah = String(ayahNumber).padStart(3, "0");
  return `https://everyayah.com/data/Abdul_Basit_Murattal_64kbps/${paddedSurah}${paddedAyah}.mp3`;
}
