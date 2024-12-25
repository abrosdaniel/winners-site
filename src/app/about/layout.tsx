import type { Metadata } from "next";
import Foot from "@/components/Foot/Foot";

export const metadata: Metadata = {
  title: "История агентства",
  description: "История хоккейного агентства WINNERS",
  openGraph: {
    title: "История агентства",
    description: "История хоккейного агентства WINNERS",
    url: "https://wnrs.ru/about",
  },
  twitter: {
    title: "История агентства",
    description: "История хоккейного агентства WINNERS",
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
