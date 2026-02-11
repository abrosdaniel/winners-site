"use client";

import { useQuery } from "@tanstack/react-query";
import directus from "@/services/directus";
import { readItems } from "@directus/sdk";
import Link from "next/link";
import { useState, useEffect, useMemo } from "react";
import { Photo } from "@/components/Photo";

type RecomendateArticleProps = {
  currentArticleId: string;
};

export default function RecomendateArticle({
  currentArticleId,
}: RecomendateArticleProps) {
  const [isDesktop, setIsDesktop] = useState(false);
  const { data } = useQuery({
    queryKey: ["other-news", currentArticleId],
    queryFn: async () =>
      await directus.request(
        readItems("news", {
          fields: ["*.*"],
          filter: {
            status: { _eq: "published" },
            id: { _neq: currentArticleId },
          },
          sort: ["-date_created"],
          limit: 5,
        }),
      ),
  });

  useEffect(() => {
    const updateIsDesktop = () => {
      setIsDesktop(window.matchMedia("(min-width: 1024px)").matches);
    };

    updateIsDesktop();
    window.addEventListener("resize", updateIsDesktop);
    return () => window.removeEventListener("resize", updateIsDesktop);
  }, []);

  const formatDate = (isoDate: string) => {
    const date = new Date(isoDate);
    const months = [
      "января",
      "февраля",
      "марта",
      "апреля",
      "мая",
      "июня",
      "июля",
      "августа",
      "сентября",
      "октября",
      "ноября",
      "декабря",
    ];
    return `${date.getDate()} ${months[date.getMonth()]}`;
  };

  const getArticles = () => {
    if (!data) return [];

    const latestArticles = data.slice(0, isDesktop ? 5 : 2);

    return latestArticles;
  };

  const recommendedArticles = useMemo(() => getArticles(), [data, isDesktop]);

  return (
    <div className="grid grid-cols-2 lg:grid-cols-1 gap-4 lg:gap-8">
      {recommendedArticles.map((item) => (
        <Link
          key={item.id}
          href={`/news/${item.id}`}
          className="flex flex-col gap-2 lg:gap-4"
        >
          <Photo
            className="w-full aspect-video rounded-xl"
            src={`/api/img/${item.image.id}`}
            alt={item.title}
          />
          <div className="flex flex-col">
            <h3 className="font-inter font-semibold text-base line-clamp-4 text-[#171D3D]">
              {item.title}
            </h3>
            <p className="font-inter font-medium text-[#888888] text-xs">
              {formatDate(item.date_created)}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
