import type { MetadataRoute } from "next";
import directus from "@services/directus";
import { readItems } from "@directus/sdk";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const news = await directus.request(
    readItems("news", {
      filter: { status: { _eq: "published" } },
      fields: ["id", "date_updated"],
    })
  );

  const staticPages = [
    {
      url: "https://wnrs.ru",
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1,
    },
    {
      url: "https://wnrs.ru/players",
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.9,
    },
    {
      url: "https://wnrs.ru/news",
      lastModified: new Date(),
      changeFrequency: "hourly" as const,
      priority: 0.8,
    },
    {
      url: "https://wnrs.ru/form",
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.7,
    },
    {
      url: "https://wnrs.ru/agency",
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
    {
      url: "https://wnrs.ru/about",
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.5,
    },
  ];

  const newsPages = news.map((article) => ({
    url: `https://wnrs.ru/news/${article.id}`,
    lastModified: article.date_updated
      ? new Date(article.date_updated)
      : new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...newsPages];
}
