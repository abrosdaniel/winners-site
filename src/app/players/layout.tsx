import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Игроки WINNERS — профессиональные хоккеисты под представительством агентства (НХЛ, КХЛ, ВХЛ, МХЛ и другие лиги)",
  description:
    "Игроки WINNERS: хоккеисты под представительством агентства. Профили игроков, статистика, достижения и карьерный путь. НХЛ, КХЛ, ВХЛ, МХЛ и другие лиги.",
  keywords: [
    "игроки хоккейного агентства",
    "игроки WINNERS",
    "хоккеисты",
    "профессиональные хоккеисты",
    "молодые хоккеисты",
    "перспективные игроки",
    "российские хоккеисты",
    "статистика хоккеистов",
    "хоккейная статистика",
    "карьера хоккеистов",
    "игроки КХЛ",
    "игроки ВХЛ",
    "игроки МХЛ",
    "хоккеисты НХЛ",
  ],
  openGraph: {
    title: "Игроки WINNERS — хоккеисты под нашим представительством",
    description:
      "Игроки WINNERS: профили хоккеистов, статистика, достижения и карьерный путь.",
    url: "https://wnrs.ru/players",
    siteName: "WINNERS Hockey Agency",
    type: "website",
    images: [
      {
        url: "https://wnrs.ru/assets/img/og.png",
        width: 736,
        height: 306,
        alt: "WINNERS - Профессиональные хоккеисты НХЛ и КХЛ",
      },
    ],
    locale: "ru_RU",
  },
  twitter: {
    card: "summary_large_image",
    title: "Игроки WINNERS — хоккеисты под нашим представительством",
    description:
      "Игроки WINNERS: профили хоккеистов, статистика, достижения и карьерный путь.",
    images: ["https://wnrs.ru/assets/img/og.png"],
  },
  alternates: {
    canonical: "https://wnrs.ru/players",
  },
  other: {
    "article:section": "Sports",
    "article:tag": "hockey players, NHL, KHL, professional hockey",
  },
};

export default function PlayersLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
