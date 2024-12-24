import type { Metadata } from "next";

type Props = {
  params: { id: string };
  children: React.ReactNode;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/data`);
    const data = await res.json();
    const article = data.news.find(
      (item: any) => item.id.toString() === params.id
    );

    return {
      title: article ? `${article.title} | WINNERS` : "Новости | WINNERS",
      description: article
        ? `${article.title} | WINNERS`
        : "Новости хоккейного агентства WINNERS",
      openGraph: {
        title: article ? `${article.title} | WINNERS` : "Новости | WINNERS",
        description: article
          ? `${article.title} | WINNERS`
          : "Новости хоккейного агентства WINNERS",
      },
      twitter: {
        title: article ? `${article.title} | WINNERS` : "Новости | WINNERS",
        description: article
          ? `${article.title} | WINNERS`
          : "Новости хоккейного агентства WINNERS",
      },
    };
  } catch (error) {
    return {
      title: "Новости",
      description: "Новости хоккейного агентства WINNERS",
      openGraph: {
        title: "Новости",
        description: "Новости хоккейного агентства WINNERS",
      },
      twitter: {
        title: "Новости",
        description: "Новости хоккейного агентства WINNERS",
      },
    };
  }
}

export default function NewsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
