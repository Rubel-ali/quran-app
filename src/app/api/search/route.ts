import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get("q")?.trim() || "";

  if (!q || q.length < 2) {
    return NextResponse.json({ results: [] });
  }

  try {
    const res = await fetch(
      `https://api.alquran.cloud/v1/search/${encodeURIComponent(q)}/all/en.sahih`
    );
    const data = await res.json();

    if (data.code !== 200 || !data.data?.matches) {
      return NextResponse.json({ results: [] });
    }

    const results = data.data.matches.slice(0, 20).map((match: any) => ({
      ayah: {
        number: match.number,
        numberInSurah: match.numberInSurah,
        text: match.text,
        translation: match.text,
        surahNumber: match.surah.number,
        surahName: match.surah.name,
        surahEnglishName: match.surah.englishName,
        juz: match.juz,
        page: match.page,
        ruku: match.ruku,
      },
      surah: {
        number: match.surah.number,
        name: match.surah.name,
        englishName: match.surah.englishName,
        englishNameTranslation: match.surah.englishNameTranslation,
        numberOfAyahs: match.surah.numberOfAyahs,
        revelationType: match.surah.revelationType,
      },
      matchType: "translation",
    }));

    return NextResponse.json({ results });
  } catch {
    return NextResponse.json({ results: [] });
  }
}
