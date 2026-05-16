import type { SurahDetail } from "@/types";

interface SurahHeaderProps {
  surah: SurahDetail;
}

export default function SurahHeader({ surah }: SurahHeaderProps) {
  return (
    <div className="text-center py-8 border-b border-[#21262d]">
      <h1 className="text-[#e6edf3] text-2xl font-bold mb-1">
        Surah {surah.englishName}
      </h1>
      <p className="text-[#8b949e] text-sm">
        Ayah-{surah.numberOfAyahs},{" "}
        {surah.revelationType === "Meccan" ? "Makkah" : "Madinah"}
      </p>
    </div>
  );
}
