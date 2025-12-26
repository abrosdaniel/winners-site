import type { Metadata } from "next";

export const revalidate = 0;

export const metadata: Metadata = {
  title: "Новости — WINNERS Agency | Контракты, переходы и события в хоккее",
  description:
    "Новости хоккея от WINNERS: обновления по игрокам агентства, контракты и переходы, официальные объявления клубов, интервью и комментарии.",
  keywords: [
    "новости хоккея",
    "свежие новости хоккея",
    "новости WINNERS",
    "агентские новости",
    "новости игроков",
    "контракты хоккеистов",
    "подписания игроков",
    "хоккейные переходы",
    "хоккейные трансферы",
    "новости КХЛ",
    "новости ВХЛ",
    "новости МХЛ",
    "североамериканские хоккейные лиги",
    "интервью хоккеистов",
    "хоккейная аналитика",
  ],
  openGraph: {
    title: "Новости WINNERS — хоккейные события и объявления",
    description:
      "Новости хоккея от WINNERS: обновления по игрокам агентства, контракты и переходы, официальные объявления и интервью.",
    url: "https://wnrs.ru/news",
    siteName: "WINNERS Hockey Agency",
    type: "website",
    locale: "ru_RU",
    images: [
      {
        url: "https://wnrs.ru/assets/img/og.png",
        width: 736,
        height: 306,
        alt: "WINNERS - Новости хоккея",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Новости WINNERS — хоккейные события и объявления",
    description:
      "Новости хоккея от WINNERS: обновления по игрокам агентства, контракты и переходы, официальные объявления и интервью.",
    images: ["https://wnrs.ru/assets/img/og.png"],
  },
  alternates: {
    canonical: "https://wnrs.ru/news",
  },
  other: {
    "article:section": "Sports",
    "article:tag": "hockey news, NHL, KHL, professional hockey",
  },
};

export default function NewsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
