import type { Metadata } from "next";

async function getNews(id: string) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!;
  try {
    const res = await fetch(`${baseUrl}/api/news/${id}`, {
      next: { revalidate: 60 },
    });
    console.log("Article API Response:", res);

    if (!res.ok) {
      throw new Error("Failed to fetch news");
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching news:", error);
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const news = await getNews(resolvedParams.id);

  if (!news) {
    return {
      title: "Новости | WINNERS",
      description: "Новости хоккейного агентства WINNERS",
    };
  }

  const title = news.title;
  const description =
    news.article.replace(/<[^>]*>/g, "").slice(0, 200) + "...";
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!;

  return {
    title: `${title} | WINNERS`,
    description: description,
    openGraph: {
      title: title,
      description: description,
      url: `${baseUrl}/news/${resolvedParams.id}`,
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
