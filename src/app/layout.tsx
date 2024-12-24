import type { Metadata } from "next";
import "@assets/styles/globals.css";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { Suspense } from "react";

import { Providers } from "@/app/providers";
import { Metrika } from "@/components/analytics/YaMetrika";
import { fontBebas, fontInter } from "@assets/fonts/fonts";

import Head from "@/components/Head/Head";
import Foot from "@/components/Foot/Foot";

export const metadata: Metadata = {
  title: "Главная",
  description: "Хоккейное агентство WINNERS",
  applicationName: "WINNERS Hockey Agency",
  generator: "Next.js",
  keywords: [
    "Хоккейное агентство",
    "Игроки",
    "WINNERS",
    "Хоккей",
    "Нападающие",
    "Защитники",
    "Вратари",
    "Хоккейная статистика",
    "Хоккеисты",
    "Хоккейные агенты",
    "Хоккейные мамы",
    "Расшифровки лиг",
    "Хоккейный агент",
    "Игроки КХЛ",
    "Молодежная хоккейная лига",
    "Драфт КХЛ",
    "НХЛ",
    "Европейский хоккей",
    "Хоккейные клубы",
    "Юниорские лиги",
    "Развитие хоккеистов",
    "Агенты НХЛ",
    "Трансферы в хоккее",
    "Хоккейный рынок",
    "Подготовка игроков",
    "Агентские услуги",
    "Личное развитие хоккеиста",
    "Хоккейный тренер",
    "Тренировочные программы",
    "Лига Квебека",
    "Скауты НХЛ",
    "Путь к НХЛ",
    "Хоккейная экипировка",
    "Юниорский хоккей",
    "Молодежные турниры",
    "Скаутинг хоккеистов",
    "Разбор матчей",
    "Хоккейные стратегии",
    "Тренировки на льду",
    "Хоккейные тренажеры",
    "Развитие скорости",
    "Тренировки выносливости",
    "Подготовка к драфту",
    "Международные турниры",
    "Олимпийский хоккей",
    "Молодые таланты",
    "Спонсоры в хоккее",
    "Хоккейные соревнования",
    "Обучение хоккею",
    "Психология хоккея",
    "Травмы хоккеистов",
    "Реабилитация после травм",
    "Юниорская сборная",
    "Контракты хоккеистов",
    "Рекрутинг игроков",
    "Семинары для родителей",
    "Хоккейная техника",
    "Анализ игровых моментов",
    "Пассы в хоккее",
    "Броски в хоккее",
    "Хоккей на траве",
    "Профессиональные хоккеисты",
    "Аренда ледовых арен",
    "Зимние виды спорта",
    "Спортивное питание",
    "Индивидуальные тренировки",
    "Летние хоккейные лагеря",
    "Разбор позиций",
    "Лучшие хоккейные лиги",
    "Спортивные достижения",
    "Молодежные команды",
    "Хоккейные турниры",
    "Выступления на международной арене",
    "Тренерский штаб",
    "Соревнования КХЛ",
    "Физическая подготовка",
    "Техническое мастерство",
    "Выход на профессиональный уровень",
    "Рекорды хоккеистов",
    "История хоккея",
    "Текущие новости хоккея",
  ],
  authors: [
    { name: "WINNERS Agency", url: "https://wnrs.ru" },
    { name: "Daniel Abros", url: "https://abros.dev" },
  ],
  creator: "WINNERS Agency",
  publisher: "WINNERS Agency",
  metadataBase: new URL("https://wnrs.ru"),
  openGraph: {
    title: "Главная",
    description: "Хоккейное агентство WINNERS",
    url: "https://wnrs.ru",
    siteName: "WINNERS Hockey Agency",
    images: [
      {
        url: "https://wnrs.ru/assets/img/og-players.png",
        width: 1200,
        height: 630,
        alt: "Хоккейное агентство WINNERS",
      },
    ],
    locale: "ru_RU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Главная",
    description: "Хоккейное агентство WINNERS",
    images: ["https://wnrs.ru/assets/img/og-players.png"],
  },
  icons: {
    icon: "/assets/icons/logo/logo.png",
    shortcut: "/assets/icons/logo/logo.png",
    apple: "/assets/icons/logo/logo.png",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    noimageindex: false,
    nosnippet: false,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["data"],
    queryFn: async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/data`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      return response.json();
    },
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <html lang="ru">
      <body
        className={`${fontBebas.variable} ${fontInter.variable} overflow-x-hidden antialiased`}
      >
        <Providers dehydratedState={dehydratedState}>
          <Head />
          {children}
          <Foot />
        </Providers>
        {/* <Suspense>
          <Metrika />
        </Suspense> */}
      </body>
    </html>
  );
}
