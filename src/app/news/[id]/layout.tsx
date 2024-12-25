import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Новости | WINNERS",
  description: "Новости хоккейного агентства WINNERS",
  openGraph: {
    title: "Новости | WINNERS",
    description: "Новости хоккейного агентства WINNERS",
  },
  twitter: {
    title: "Новости | WINNERS",
    description: "Новости хоккейного агентства WINNERS",
  },
};

export default function NewsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
