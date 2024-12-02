import type { Metadata } from "next";
import "@assets/styles/globals.css";
import { Providers } from "@/app/providers";
import { fontMontserrat } from "@assets/fonts/fonts";
import Menu from "@components/Menu/Menu";

export const metadata: Metadata = {
  title: "Хоккейное агентство WINNERS",
  description: "Хоккейное агентство WINNERS",
  icons: {
    icon: "/assets/icons/logo/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={`${fontMontserrat.variable} antialiased dark`}>
        <Providers>
          {/* <Menu /> */}
          {children}
        </Providers>
      </body>
    </html>
  );
}
