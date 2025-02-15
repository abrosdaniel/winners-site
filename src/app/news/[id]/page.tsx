"use client";

import { useDataContext } from "@/context/DataContext";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useState, useEffect, useMemo } from "react";

export default function NewsArticle() {
  const { data, isLoading } = useDataContext();
  const params = useParams();
  console.log("Params ID:", params.id);
  const [isDesktop, setIsDesktop] = useState(false);
  const getImageUrl = (fileId: string) => `/api/img/${fileId}`;

  useEffect(() => {
    const updateIsDesktop = () => {
      setIsDesktop(window.matchMedia("(min-width: 1024px)").matches);
    };

    updateIsDesktop();
    window.addEventListener("resize", updateIsDesktop);
    return () => window.removeEventListener("resize", updateIsDesktop);
  }, []);

  if (isLoading || !data?.news) return null;

  const article = useMemo(() => {
    return data.news.find((item: any) => item.id.toString() === params.id);
  }, [data, params.id]);

  const parseDate = (dateStr: { day: string; month: string; year: number }) => {
    const months: { [key: string]: number } = {
      января: 0,
      февраля: 1,
      марта: 2,
      апреля: 3,
      мая: 4,
      июня: 5,
      июля: 6,
      августа: 7,
      сентября: 8,
      октября: 9,
      ноября: 10,
      декабря: 11,
    };
    return new Date(
      dateStr.year,
      months[dateStr.month.toLowerCase()],
      parseInt(dateStr.day)
    );
  };

  const getRandomArticles = () => {
    if (!data?.news) return [];

    const otherArticles = data.news.filter(
      (item: any) => item.id !== article?.id
    );

    const sortedArticles = otherArticles.sort((a: any, b: any) => {
      const dateA = parseDate(a.date_created);
      const dateB = parseDate(b.date_created);
      return dateB.getTime() - dateA.getTime();
    });

    const latestArticles = sortedArticles.slice(0, isDesktop ? 5 : 2);

    return latestArticles;
  };

  if (!article) return <div>Статья не найдена</div>;

  const recommendedArticles = useMemo(
    () => getRandomArticles(),
    [data, isDesktop]
  );

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
          <div className="grid grid-cols-2 lg:grid-cols-1 gap-4 lg:gap-8">
            {recommendedArticles.map((item: any) => (
              <Link
                key={item.id}
                href={`/news/${item.id}`}
                className="flex flex-col gap-2 lg:gap-4"
              >
                <img
                  className="w-full aspect-video object-cover object-center rounded-xl"
                  src={getImageUrl(item.image)}
                  alt={item.title}
                />
                <div className="flex flex-col">
                  <h3 className="font-inter font-semibold text-base line-clamp-4 text-[#171D3D]">
                    {item.title}
                  </h3>
                  <p className="font-inter font-medium text-[#888888] text-xs">
                    {item.date_created.day} {item.date_created.month}
                  </p>
                </div>
              </Link>
            ))}
          </div>
          <div className="absolute bg-[#F5F5F5] h-16 w-full -bottom-16 left-0"></div>
        </div>
      </div>
    </div>
  );
}
