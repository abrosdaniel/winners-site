"use client";

import { useDataContext } from "@/context/DataContext";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function NewsArticle() {
  const { data, isLoading } = useDataContext();
  const params = useParams();
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

  const article = data.news.find(
    (item: any) => item.id.toString() === params.id
  );

  const getRandomArticles = () => {
    const otherArticles = data.news.filter(
      (item: any) => item.id !== article?.id
    );
    return otherArticles
      .sort(() => Math.random() - 0.5)
      .slice(0, isDesktop ? 5 : 2);
  };

  if (!article) return <div>Статья не найдена</div>;

  const recommendedArticles = getRandomArticles();

  return (
    <div className="w-full box-border relative flex flex-col items-center">
      <img
        className="w-full aspect-video object-cover object-center h-44 lg:h-[400px]"
        src={getImageUrl(article.image)}
      />
      <div className="flex flex-col lg:flex-row lg:gap-4">
        <div className="px-2 lg:px-0 lg:w-4/6 lg:pl-40 mt-5 lg:mt-14">
          <h1 className="font-inter font-bold text-2xl leading-7 text-[#171D3D] lg:text-4xl mb-6">
            {article.title}
          </h1>
          <div
            className="article font-inter font-normal text-base leading-5 text-black lg:text-lg mb-16"
            dangerouslySetInnerHTML={{ __html: article.article }}
          />
        </div>
        <div className="bg-[#F5F5F5] px-2 py-10 lg:w-2/6 lg:pl-14 lg:py-14 lg:pr-40">
          <h2 className="font-bold text-4xl text-[#171D3D] lg:text-4xl lg:mb-4">
            Другие новости
          </h2>
          <div className="grid grid-cols-1 gap-8">
            {recommendedArticles.map((item: any) => (
              <Link
                key={item.id}
                href={`/news/${item.id}`}
                className="flex flex-col gap-2 lg:gap-4"
              >
                <img
                  className="w-full aspect-video object-cover object-center rounded-xl"
                  src={getImageUrl(item.image)}
                />
                <h3 className="font-inter font-semibold text-lg text-[#171D3D]">
                  {item.title}
                </h3>
                <p className="font-inter font-medium text-[#888888] text-xs">
                  {item.date_created.day} {item.date_created.month}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
