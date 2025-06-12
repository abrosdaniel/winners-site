import type { Metadata } from "next";
import Foot from "@/components/Foot/Foot";

export const revalidate = 0;

export const metadata: Metadata = {
  title: "Новости",
  description: "Новости хоккейного агентства WINNERS",
  openGraph: {
    title: "Новости",
    description: "Новости хоккейного агентства WINNERS",
    url: "https://wnrs.ru/news",
  },
  twitter: {
    title: "Новости",
    description: "Новости хоккейного агентства WINNERS",
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
