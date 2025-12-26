import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Анкета хоккеиста — WINNERS | Заявка на представительство и сопровождение карьеры",
  description:
    "Анкета для хоккеистов WINNERS: отправьте информацию о себе для рассмотрения и дальнейшего сотрудничества. Представительство и сопровождение карьеры, контрактная работа и переговоры.",
  keywords: [
    "анкета хоккеиста",
    "заявка в хоккейное агентство",
    "анкета в хоккейное агентство",
    "стать игроком WINNERS",
    "подать заявку агентство",
    "хоккейное представительство",
    "агент для хоккеиста",
    "карьера хоккеиста",
    "профессиональный хоккей",
    "оценка хоккеиста",
    "регистрация хоккеиста",
    "хоккейный агент анкета",
    "заявка КХЛ",
    "заявка ВХЛ",
    "заявка МХЛ",
    "североамериканские хоккейные лиги",
  ],
  openGraph: {
    title: "Анкета WINNERS — заявка хоккеиста",
    description:
      "Заполните анкету хоккеиста WINNERS: рассмотрим данные, свяжемся для уточнений и обсудим возможный формат представительства.",
    url: "https://wnrs.ru/form",
    siteName: "WINNERS Hockey Agency",
    type: "website",
    locale: "ru_RU",
    images: [
      {
        url: "https://wnrs.ru/assets/img/og.png",
        width: 736,
        height: 306,
        alt: "WINNERS - Стать игроком WINNERS",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Анкета WINNERS — заявка хоккеиста",
    description:
      "Заполните анкету хоккеиста WINNERS: рассмотрим данные, свяжемся для уточнений и обсудим возможный формат представительства.",
    images: ["https://wnrs.ru/assets/img/og.png"],
  },
  alternates: {
    canonical: "https://wnrs.ru/form",
  },
  other: {
    "article:section": "Sports",
    "article:tag": "hockey form, NHL, KHL, professional hockey",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
