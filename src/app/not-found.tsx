import NotFound from "@/shared/NotFound";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404",
  description:
    "Кажется, такой страницы нет, попробуйте вернуться на главную и начать сначала",
  openGraph: {
    title: "404",
    description:
      "Кажется, такой страницы нет, попробуйте вернуться на главную и начать сначала",
  },
  twitter: {
    title: "404",
    description:
      "Кажется, такой страницы нет, попробуйте вернуться на главную и начать сначала",
  },
};

export default async function NotFoundPage() {
  return <NotFound />;
}
