import type { Metadata } from "next";
import directus from "@services/directus";
import { readItems } from "@directus/sdk";
import RecomendateArticle from "@/components/news/RecomendateArticle";

type Props = {
  params: { id: string };
};

type NewsArticleProps = {
  id: string;
  title: string;
  article: string;
  image: string;
};

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const { id } = params;
  const [news] = await directus.request(
    readItems("news", {
      filter: { id: { _eq: id }, status: { _eq: "published" } },
      fields: ["*"],
    })
  );

  if (!news) {
    return {
      title: "Новость не найдена",
      description: "Кажется, такой новости не существует. Попробуйте еще раз.",
      openGraph: {
        title: "Новость не найдена",
        description:
          "Кажется, такой новости не существует. Попробуйте еще раз.",
        url: "https://wnrs.ru",
        siteName: "WINNERS Hockey Agency",
        images: [
          {
            url: "https://wnrs.ru/assets/img/og-players.png",
            width: 1200,
            height: 630,
            alt: "Хоккейное агентство WINNERS",
          },
        ],
        locale: "ru_RU",
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: "Новость не найдена",
        description:
          "Кажется, такой новости не существует. Попробуйте еще раз.",
        images: ["https://wnrs.ru/assets/img/og-players.png"],
      },
    };
  }

  return {
    title: news.title,
    description: news.description,
    openGraph: {
      title: news.title,
      description: news.description,
      url: `https://wnrs.ru/news/${news.id}`,
      siteName: "WINNERS Hockey Agency",
      images: [
        {
          url: `https://wnrs.ru/api/img/${news.image}`,
          width: 1200,
          height: 630,
          alt: "Хоккейное агентство WINNERS",
        },
      ],
      locale: "ru_RU",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: news.title,
      description: news.article,
      images: [`https://wnrs.ru/api/img/${news.image}`],
    },
  };
};

async function fetchArticle(id: string): Promise<NewsArticleProps | null> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  try {
    const res = await fetch(`${baseUrl}/api/news/${id}`);
    if (!res.ok) {
      console.error("Failed to fetch article:", res.status, res.statusText);
      return null;
    }
    const json = await res.json();
    return json;
  } catch (error) {
    console.error("Error fetching article:", error);
    return null;
  }
}

export default async function NewsArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const article = await fetchArticle(resolvedParams.id);

  const getImageUrl = (fileId: string) => `/api/img/${fileId}`;

  if (!article) {
    return <div>Статья не найдена</div>;
  }

  return (
    <div className="w-full box-border relative flex flex-col items-center max-w-5xl mx-auto zoomer">
      <img
        className="w-full aspect-video object-cover object-top h-48 lg:h-[450px]"
        src={getImageUrl(article.image)}
      />
      <div className="flex flex-col lg:flex-row lg:gap-4">
        <div className="px-2 lg:px-0 lg:w-4/6 mt-5 lg:mt-7">
          <h1 className="font-inter font-bold text-2xl leading-7 text-[#171D3D] lg:text-4xl mb-6">
            {article.title}
          </h1>
          <div
            className="article font-inter font-normal text-base leading-5 text-black lg:text-lg mb-16"
            dangerouslySetInnerHTML={{ __html: article.article }}
          />
        </div>
        <div className="bg-[#F5F5F5] px-2 py-5 lg:w-2/6 lg:px-7 lg:py-7 flex flex-col gap-5 lg:gap-0 relative">
          <h2 className="font-bold text-4xl text-[#171D3D] lg:text-4xl lg:mb-4">
            Другие новости
          </h2>
          <RecomendateArticle currentArticleId={article.id} />
          <div className="absolute bg-[#F5F5F5] h-16 w-full -bottom-16 left-0"></div>
        </div>
      </div>
    </div>
  );
}
