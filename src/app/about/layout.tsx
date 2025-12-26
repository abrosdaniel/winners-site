import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "О WINNERS — хоккейное агентство | История и подход к работе с игроками",
  description:
    "WINNERS — хоккейное агентство. История агентства, команда и принципы работы с игроками: переговоры с клубами, контрактная работа, юридическое и коммуникационное сопровождение карьеры.",
  keywords: [
    "о WINNERS",
    "история WINNERS",
    "история агентства",
    "основание агентства",
    "развитие WINNERS",
    "вехи развития",
    "хронология WINNERS",
    "становление агентства",
    "подход агентства",
    "принципы работы",
    "достижения агентства",
    "традиции агентства",
    "профессиональная история",
    "хоккейное агентство",
  ],
  openGraph: {
    title: "О WINNERS — история и команда",
    description:
      "Хоккейное агентство WINNERS: история, команда и принципы работы с игроками. Переговоры, контрактная работа, юридическое и коммуникационное сопровождение карьеры.",
    url: "https://wnrs.ru/about",
    siteName: "WINNERS Hockey Agency",
    type: "website",
    locale: "ru_RU",
    images: [
      {
        url: "https://wnrs.ru/assets/img/og.png",
        width: 736,
        height: 306,
        alt: "WINNERS - История WINNERS",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "О WINNERS — история и команда",
    description:
      "Хоккейное агентство WINNERS: история, команда и принципы работы с игроками. Переговоры, контрактная работа, юридическое и коммуникационное сопровождение карьеры.",
    images: ["https://wnrs.ru/assets/img/og.png"],
  },
  alternates: {
    canonical: "https://wnrs.ru/about",
  },
  other: {
    "article:section": "Sports",
    "article:tag": "hockey about, NHL, KHL, professional hockey",
    "founding-year": "2001",
    "years-in-business": "15+",
    "company-heritage": "established",
    "business-legacy": "professional-sports",
    "players-represented": "300+",
    "leagues-covered": "NHL,KHL,SHL,Liiga",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
