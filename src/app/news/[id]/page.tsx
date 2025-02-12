"use client";

import { useParams } from "next/navigation";
import RecommendedArticles from "./recommended-articles";
import { useState, useEffect } from "react";

export default function NewsArticle() {
  const params = useParams();
  const [isDesktop, setIsDesktop] = useState(false);
  const [article, setArticle] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const getImageUrl = (fileId: string) => `/api/img/${fileId}`;
  const articleId = typeof params?.id === "string" ? params.id : "";

  useEffect(() => {
    const updateIsDesktop = () => {
      setIsDesktop(window.matchMedia("(min-width: 1024px)").matches);
    };

    updateIsDesktop();
    window.addEventListener("resize", updateIsDesktop);
    return () => window.removeEventListener("resize", updateIsDesktop);
  }, []);

  useEffect(() => {
    const fetchArticle = async () => {
      if (!articleId) return;

      try {
        setIsLoading(true);
        const res = await fetch(`/api/news/${articleId}`);
        const data = await res.json();

        if (!res.ok) throw new Error(data.error || "Failed to fetch article");

        setArticle(data);
      } catch (error) {
        console.error("Error fetching article:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticle();
  }, [articleId]);

  if (isLoading) {
    return (
      <div className="w-screen h-screen justify-center items-center flex">
        <p className="text-2xl">Загрузка...</p>
      </div>
    );
  }

  if (!article)
    return (
      <div className="w-screen h-screen justify-center items-center flex">
        <p className="text-2xl">Статья не найдена</p>
      </div>
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
          <RecommendedArticles currentId={articleId} isDesktop={isDesktop} />
          <div className="absolute bg-[#F5F5F5] h-16 w-full -bottom-16 left-0"></div>
        </div>
      </div>
    </div>
  );
}
