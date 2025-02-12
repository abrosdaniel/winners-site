import type { Metadata } from "next";
import { headers } from "next/headers";

async function getNews(id: string) {
  try {
    const headersList = await headers();
    const domain = headersList.get("host") || "localhost:3000";
    const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
    const res = await fetch(`${protocol}://${domain}/api/news/${id}`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch news");
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching news:", error);
    return null;
  }
}

type GenerateMetadataProps = {
  params: { id: string };
};

export async function generateMetadata(
  props: GenerateMetadataProps
): Promise<Metadata> {
  const news = await getNews(props.params.id);

  if (!news) {
    return {
      title: "Новости | WINNERS",
      description: "Новости хоккейного агентства WINNERS",
    };
  }

  const title = news.title;
  const description =
    news.article.replace(/<[^>]*>/g, "").slice(0, 200) + "...";

  const headersList = await headers();
  const domain = headersList.get("host") || "localhost:3000";
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
  const baseUrl = `${protocol}://${domain}`;

  return {
    title: `${title} | WINNERS`,
    description: description,
    openGraph: {
      title: title,
      description: description,
      url: `${baseUrl}/news/${props.params.id}`,
      siteName: "WINNERS Hockey Agency",
      images: [
        {
          url: news.image
            ? `${baseUrl}/api/img/${news.image}`
            : `${baseUrl}/assets/img/og-players.png`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: "ru_RU",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: title,
      description: description,
      images: [
        news.image
          ? `${baseUrl}/api/img/${news.image}`
          : `${baseUrl}/assets/img/og-players.png`,
      ],
    },
  };
}

export default function NewsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
