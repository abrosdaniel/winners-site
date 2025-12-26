import type { Metadata } from "next";
import "@assets/styles/globals.css";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { Suspense } from "react";

import { Providers } from "@/app/providers";
import Loader from "@/components/Loader";
import { Metrika } from "@/components/YaMetrika";
import { fontBebas, fontInter } from "@assets/fonts/fonts";
import Menu from "@/shared/Menu";
import Footer from "@/shared/Footer";
import { getServerData } from "@/lib/server-utils";

export const metadata: Metadata = {
  title:
    "WINNERS — профессиональное хоккейное агентство | Представительство и сопровождение карьеры",
  description:
    "Хоккейное агентство WINNERS — профессиональное представительство хоккеистов и сопровождение карьеры. Контрактная работа, переговоры с клубами, юридическое сопровождение и коммуникационное сопровождение игрока. КХЛ, ВХЛ, МХЛ и североамериканские лиги.",
  applicationName: "WINNERS Hockey Agency",
  generator: "Next.js",
  keywords: [
    "хоккейное агентство",
    "агент хоккеиста",
    "хоккейные агенты",
    "представитель хоккеиста",
    "спортивное представительство",
    "хоккейный менеджмент",
    "профессиональный хоккей",
    "карьера хоккеиста",
    "сопровождение карьеры хоккеиста",
    "агентские услуги хоккей",
    "переговоры с клубами",
    "контракты КХЛ",
    "контракты ВХЛ",
    "контракты МХЛ",
    "трансферы КХЛ",
    "трансферы ВХЛ",
    "трансферы МХЛ",
    "североамериканские хоккейные лиги",
    "WINNERS agency",
  ],
  authors: [
    { name: "WINNERS Agency", url: "https://wnrs.ru" },
    { name: "Daniel Abros", url: "https://abros.dev" },
  ],
  creator: "WINNERS Agency",
  publisher: "WINNERS Agency",
  metadataBase: new URL("https://wnrs.ru"),
  openGraph: {
    title: "WINNERS — хоккейное агентство | Представительство игроков",
    description:
      "WINNERS — хоккейное агентство и профессиональное представительство хоккеистов. Ведём карьеру игроков: переговоры с клубами, контракты, юридическое и коммуникационное сопровождение. КХЛ, ВХЛ, МХЛ и североамериканские лиги.",
    url: "https://wnrs.ru",
    siteName: "WINNERS Hockey Agency",
    images: [
      {
        url: "https://periodic-amendments-crafts-patterns.trycloudflare.com/assets/img/og.png",
        width: 736,
        height: 306,
        alt: "WINNERS - Профессиональное хоккейное агентство для игроков НХЛ и КХЛ",
      },
    ],
    locale: "ru_RU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "WINNERS — хоккейное агентство | Представительство игроков",
    description:
      "WINNERS — хоккейное агентство и профессиональное представительство хоккеистов. Ведём карьеру игроков: переговоры с клубами, контракты, юридическое и коммуникационное сопровождение. КХЛ, ВХЛ, МХЛ и североамериканские лиги.",
    images: [
      "https://periodic-amendments-crafts-patterns.trycloudflare.com/assets/img/og.png",
    ],
  },
  icons: {
    icon: "/assets/icons/logo/logo.png",
    shortcut: "/assets/icons/logo/logo.png",
    apple: "/assets/icons/logo/logo.png",
  },
  other: {
    "article:section": "Sports",
    "article:tag": "hockey news, NHL, KHL, professional hockey",
    "telegram:channel": "@winnershockey",
    "instagram:profile": "@winners.hockey",
    "whatsapp:business": "+79688658761",
    "social:telegram": "https://t.me/winnershockey",
    "social:instagram": "https://www.instagram.com/winners.hockey",
    "social:whatsapp": "https://wa.me/79688658761",
    "contact:phone": "+79688658761",
    "contact:telegram": "@winnershockey",
    "contact:instagram": "@winners.hockey",
    "business:contact_data:phone_number": "+79688658761",
    "business:contact_data:website": "https://wnrs.ru",
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
    queryFn: async () => getServerData(),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <html lang="ru">
      <body
        className={`${fontBebas.variable} ${fontInter.variable} overflow-x-hidden antialiased`}
      >
        <Providers dehydratedState={dehydratedState}>
          <Loader />
          <Menu />
          {children}
          <Footer />
        </Providers>

        <Suspense>
          <Metrika />
        </Suspense>
      </body>
    </html>
  );
}
