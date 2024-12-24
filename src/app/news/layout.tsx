import type { Metadata } from "next";

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
      <div className="bg-[#171D3D] h-16 lg:h-0"></div>
      {children}
    </div>
  );
}
