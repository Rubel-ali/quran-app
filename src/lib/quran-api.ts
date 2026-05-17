const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001/api";

export async function getAllSurahs() {
  const res = await fetch(`${BASE_URL}/surahs`, { next: { revalidate: 86400 } });
  const data = await res.json();
  return data.data;
}

export async function getSurahDetail(surahNumber: number) {
  const res = await fetch(`${BASE_URL}/surahs/${surahNumber}/ayahs`, {
    next: { revalidate: 86400 },
  });
  const data = await res.json();

  const { surah, ayahs } = data.data;

  return {
    number: surah.number,
    name: surah.name,
    englishName: surah.english_name,
    englishNameTranslation: surah.english_name_translation,
    numberOfAyahs: surah.number_of_ayahs,
    revelationType: surah.revelation_type,
    ayahs: ayahs.map((a: any) => ({
      number: a.number,
      numberInSurah: a.number_in_surah,
      text: a.arabic_text,
      translation: a.translation_text,
      surahNumber: a.surah_number,
      surahName: a.surah_name,
      surahEnglishName: a.surah_english_name,
      juz: a.juz,
      page: a.page,
      ruku: a.ruku,
    })),
  };
}

export function getAudioUrl(surahNumber: number, ayahNumber: number): string {
  const s = String(surahNumber).padStart(3, "0");
  const a = String(ayahNumber).padStart(3, "0");
  return `https://everyayah.com/data/Abdul_Basit_Murattal_64kbps/${s}${a}.mp3`;
}