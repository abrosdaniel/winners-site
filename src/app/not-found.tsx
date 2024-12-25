import { getServerData } from "@/lib/server-utils";
import { NotFoundClient } from "./NotFoundClient";
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

export default async function NotFound() {
  const initialData = await getServerData();

  return <NotFoundClient initialData={initialData} />;
}
