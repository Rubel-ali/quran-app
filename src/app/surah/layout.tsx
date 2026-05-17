import { getAllSurahs } from "@/lib/quran-api";
import AppShell from "@/components/layout/AppShell";

export default async function SurahLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const allSurahs = await getAllSurahs();

  return <AppShell allSurahs={allSurahs}>{children}</AppShell>;
}
