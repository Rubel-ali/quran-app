import { getAllSurahs, getSurahDetail } from "@/lib/quran-api";
import SurahReader from "@/components/reader/SurahReader";
import type { Metadata } from "next";

interface Props {
  params: { number: string };
}

export async function generateStaticParams() {
  return Array.from({ length: 114 }, (_, i) => ({
    number: String(i + 1),
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const surahNumber = Number(params.number);
  const surah = await getSurahDetail(surahNumber);
  return {
    title: `Surah ${surah.englishName} (${surah.number}) — Quran`,
    description: `Read Surah ${surah.englishName} with Arabic text and English translation. ${surah.numberOfAyahs} ayahs.`,
  };
}

export default async function SurahPage({ params }: Props) {
  const surahNumber = Number(params.number);

  const [surah, allSurahs] = await Promise.all([
    getSurahDetail(surahNumber),
    getAllSurahs(),
  ]);

  return <SurahReader surah={surah} allSurahs={allSurahs} />;
}
