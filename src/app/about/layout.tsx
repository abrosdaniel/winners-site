import type { Metadata } from "next";

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
  return <div>{children}</div>;
}
