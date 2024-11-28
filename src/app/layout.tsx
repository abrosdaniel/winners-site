import type { Metadata } from "next";
import "@assets/styles/globals.css";
import { Providers } from "@/app/providers";
import { fontMontserrat } from "@assets/fonts/fonts";

export const metadata: Metadata = {
  title: "Хоккейное агентство WINNERS",
  description: "Хоккейное агентство WINNERS",
  icons: {
    icon: "/assets/icons/logo/logo.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={`${fontMontserrat.variable} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
