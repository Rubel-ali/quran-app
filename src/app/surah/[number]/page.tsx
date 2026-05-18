import { getAllSurahs, getSurahDetail } from "@/lib/quran-api";
import SurahReader from "@/components/reader/SurahReader";
import type { Metadata } from "next";
import ReaderClient from "@/components/reader/ReaderClient";
interface Props {
  params: { number: string };
}

export async function generateStaticParams() {
  return Array.from({ length: 114 }, (_, i) => ({
    number: String(i + 1),
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const surah = await getSurahDetail(Number(params.number));
  return {
    title: `Surah ${surah.englishName} (${surah.number}) — Quran`,
    description: `Read Surah ${surah.englishName} with Arabic text and English translation. ${surah.numberOfAyahs} ayahs.`,
  };
}

export default async function SurahPage({ params }: Props) {
  const surah = await getSurahDetail(Number(params.number));
  return <ReaderClient surah={surah} />;
}
