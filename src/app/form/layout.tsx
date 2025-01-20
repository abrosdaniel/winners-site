import type { Metadata } from "next";
import Foot from "@/components/Foot/Foot";

export const metadata: Metadata = {
  title: "Анкета",
  description: "Анкета хоккейного агентства WINNERS",
  openGraph: {
    title: "Анкета",
    description: "Анкета хоккейного агентства WINNERS",
    url: "https://wnrs.ru/form",
  },
  twitter: {
    title: "Анкета",
    description: "Анкета хоккейного агентства WINNERS",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      {children}
      <Foot />
    </div>
  );
}
