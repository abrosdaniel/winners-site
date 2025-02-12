"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

function getMonthNumber(month: string) {
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
  return months[month.toLowerCase()];
}

export default function RecommendedArticles({
  currentId,
  isDesktop,
}: {
  currentId: string;
  isDesktop: boolean;
}) {
  const [articles, setArticles] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const getImageUrl = (fileId: string) => `/api/img/${fileId}`;

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await fetch(`/api/data`);
        const data = await res.json();

        if (!res.ok || !data.news) {
          setArticles([]);
          return;
        }

        const otherArticles = data.news.filter(
          (item: any) => item.id !== currentId
        );
        const sortedArticles = otherArticles
          .sort((a: any, b: any) => {
            const dateA = new Date(
              a.date_created.year,
              getMonthNumber(a.date_created.month),
              parseInt(a.date_created.day)
            );
            const dateB = new Date(
              b.date_created.year,
              getMonthNumber(b.date_created.month),
              parseInt(b.date_created.day)
            );
            return dateB.getTime() - dateA.getTime();
          })
          .slice(0, isDesktop ? 5 : 2);

        setArticles(sortedArticles);
      } catch (error) {
        console.error("Error fetching recommended articles:", error);
        setArticles([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticles();
  }, [currentId, isDesktop]);

  if (isLoading) {
    return <div>Загрузка рекомендаций...</div>;
  }

  if (articles.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-2 lg:grid-cols-1 gap-4 lg:gap-8">
      {articles.map((item: any) => (
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
