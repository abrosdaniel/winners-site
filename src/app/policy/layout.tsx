import type { Metadata } from "next";
import Foot from "@/components/Foot/Foot";

export const metadata: Metadata = {
  title: "Политика конфиденциальности",
  description: "Политика конфиденциальности хоккейного агентства WINNERS",
  openGraph: {
    title: "Политика конфиденциальности",
    description: "Политика конфиденциальности хоккейного агентства WINNERS",
    url: "https://wnrs.ru/policy",
  },
  twitter: {
    title: "Политика конфиденциальности",
    description: "Политика конфиденциальности хоккейного агентства WINNERS",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div className="bg-[#171D3D] h-16 lg:h-0"></div>
      {children}
      <Foot />
    </div>
  );
}
