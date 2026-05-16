# Quran Web Application

A full-featured Quran reading app cloned from QuranMazid, built with Next.js, TypeScript, Tailwind CSS, and Hono/Bun backend.

## Features

- **📖 Surah Reader** — All 114 Surahs with Arabic text and English translation (Saheeh International)
- **🎵 Audio Playback** — Per-ayah audio via EveryAyah CDN (Abdul Basit Murattal)
- **🔍 Search** — Search ayahs by Arabic or English translation text
- **🔤 Font Settings** — Arabic font selector (KFGQ, Amiri, Scheherazade), font size sliders — persisted in localStorage
- **🌙 Dark Theme** — Matches QuranMazid design exactly
- **📱 Responsive** — Desktop sidebar layout + Mobile drawer + bottom nav

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Language | TypeScript |
| Frontend | Next.js 14 (App Router + SSG) |
| Styling | Tailwind CSS |
| Data Source | [AlQuran.cloud API](https://alquran.cloud/api) |
| Audio | [EveryAyah CDN](https://everyayah.com) |

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Build for Production

```bash
npm run build
npm start
```

## Deploy to Vercel

```bash
npx vercel --prod
```

## Project Structure

```
src/
├── app/
│   ├── surah/[number]/page.tsx   # SSG surah pages
│   ├── api/search/route.ts       # Search API
│   └── layout.tsx
├── components/
│   ├── layout/
│   │   ├── IconSidebar.tsx       # Left icon sidebar
│   │   ├── SurahSidebar.tsx      # 114 surah list
│   │   └── MobileNav.tsx         # Bottom mobile nav
│   ├── reader/
│   │   ├── SurahReader.tsx       # Main reader (client)
│   │   ├── AyahCard.tsx          # Individual verse card
│   │   └── SurahHeader.tsx       # Surah title header
│   ├── settings/
│   │   └── FontSettingsPanel.tsx # Font + reading settings
│   └── ui/
│       └── SearchPanel.tsx       # Search modal
├── hooks/
│   ├── useSettings.ts            # localStorage settings
│   └── useAudio.ts               # Audio playback
├── lib/
│   └── quran-api.ts              # AlQuran.cloud API calls
└── types/index.ts                # TypeScript types
```

## Font Settings Panel

Located in the right panel (accessible via settings icon):

- **Arabic Font Size** — Slider 20–80px
- **Translation Font Size** — Slider 12–32px  
- **Arabic Font Face** — KFGQ / Amiri / Scheherazade New
- All settings persist across sessions via `localStorage`

## API Sources

- Quran text + translation: `https://api.alquran.cloud/v1`
- Audio recitation: `https://everyayah.com/data/Abdul_Basit_Murattal_64kbps/`
- Arabic fonts: Google Fonts (Amiri Quran, Scheherazade New) + KFGQ via jsDelivr CDN
# quran-app
