import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Команда WINNERS — хоккейные агенты и скауты | Представительство игроков",
  description:
    "Команда WINNERS: хоккейные агенты и скауты. Представительство игроков, переговоры с клубами, контрактная работа, юридическое и коммуникационное сопровождение.",
  keywords: [
    "команда WINNERS",
    "хоккейные агенты",
    "агент хоккеиста",
    "хоккейные скауты",
    "скауты хоккея",
    "международные скауты",
    "хоккейные представители",
    "спортивные агенты",
    "агенты хоккея",
    "команда агентства",
    "профессиональные агенты хоккея",
    "эксперты хоккея",
    "хоккейные консультанты",
    "переговоры с клубами",
    "контракты хоккеистов",
  ],
  openGraph: {
    title: "Команда WINNERS — хоккейные агенты и скауты",
    description:
      "Хоккейные агенты и скауты WINNERS: представительство игроков, переговоры с клубами, контрактная работа, юридическое и коммуникационное сопровождение.",
    url: "https://wnrs.ru/agency",
    siteName: "WINNERS Hockey Agency",
    type: "website",
    locale: "ru_RU",
    images: [
      {
        url: "https://wnrs.ru/assets/img/og.png",
        width: 736,
        height: 306,
        alt: "WINNERS - Команда профессионалов WINNERS",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Команда WINNERS — хоккейные агенты и скауты",
    description:
      "Хоккейные агенты и скауты WINNERS: представительство игроков, переговоры с клубами, контрактная работа, юридическое и коммуникационное сопровождение.",
    images: ["https://wnrs.ru/assets/img/og.png"],
  },
  alternates: {
    canonical: "https://wnrs.ru/agency",
  },
  other: {
    "article:section": "Sports",
    "article:tag": "hockey agency, NHL, KHL, professional hockey",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
