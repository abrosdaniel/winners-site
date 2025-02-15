"use client";

import { useDataContext } from "@/context/DataContext";
import Link from "next/link";
import { useState, useEffect, useMemo } from "react";

type RecomendateArticleProps = {
  currentArticleId: string;
};

export default function RecomendateArticle({
  currentArticleId,
}: RecomendateArticleProps) {
  const { data } = useDataContext();
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const updateIsDesktop = () => {
      setIsDesktop(window.matchMedia("(min-width: 1024px)").matches);
    };

    updateIsDesktop();
    window.addEventListener("resize", updateIsDesktop);
    return () => window.removeEventListener("resize", updateIsDesktop);
  }, []);

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
      (item: any) => item.id !== currentArticleId
    );

    const sortedArticles = otherArticles.sort((a: any, b: any) => {
      const dateA = parseDate(a.date_created);
      const dateB = parseDate(b.date_created);
      return dateB.getTime() - dateA.getTime();
    });

    const latestArticles = sortedArticles.slice(0, isDesktop ? 5 : 2);

    return latestArticles;
  };

  const getImageUrl = (fileId: string) => `/api/img/${fileId}`;

  const recommendedArticles = useMemo(
    () => getRandomArticles(),
    [data, isDesktop]
  );

  return (
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
  );
}
