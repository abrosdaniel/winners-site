"use client";

import * as React from "react";
import { useDataContext } from "@/context/DataContext";
import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@ui/tabs";
import { Video } from "@/components/kit/Video";
import Link from "next/link";

interface NewsItemProps extends React.ComponentPropsWithoutRef<typeof Link> {
  image: string;
  title: string;
  article: string;
  day: string;
  month: string;
}

export default function News() {
  const { data, isLoading } = useDataContext();
  const [mounted, setMounted] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const getImageUrl = (fileId: string) => `/api/img/${fileId}`;
  const getVideoUrl = (fileId: string) => `/api/vid/${fileId}`;

  useEffect(() => {
    setMounted(true);
    const updateIsDesktop = () => {
      setIsDesktop(window.matchMedia("(min-width: 1024px)").matches);
    };
    updateIsDesktop();
    window.addEventListener("resize", updateIsDesktop);
    return () => window.removeEventListener("resize", updateIsDesktop);
  }, []);

  if (!mounted || isLoading) return null;

  const NewsItem = React.forwardRef<
    React.ElementRef<typeof Link>,
    NewsItemProps
  >(({ className, image, title, article, day, month, ...props }, ref) => {
    return (
      <Link
        className="flex flex-row border border-[#D0D0D0] rounded-xl overflow-hidden justify-center"
        ref={ref}
        {...props}
      >
        <img
          className="w-1/2 aspect-video object-cover object-center"
          src={getImageUrl(image)}
        />
        <div className="w-1/2 font-inter flex flex-col gap-2 p-4 justify-center">
          <h3 className="font-bold text-sm text-[#171D3D] line-clamp-2 lg:text-xl lg:line-clamp-3">
            {title}
          </h3>
          <div
            className="article font-normal text-xs text-[#5B5B5B] line-clamp-2 lg:text-base lg:line-clamp-3"
            dangerouslySetInnerHTML={{ __html: article }}
          />
          <p className="text-xs font-medium text-[#B3B3B3]">
            {day} {month}
          </p>
        </div>
      </Link>
    );
  });
  NewsItem.displayName = "NewsItem";

  const DesktopLayout = () => (
    <div
      className="w-full box-border flex gap-12 max-w-5xl mx-auto"
      style={{ zoom: window.innerWidth >= 1024 ? 0.9 : 1 }}
    >
      <div className="py-8 w-8/12">
        <h2 className="font-bold text-6xl text-[#171D3D] mb-6">
          ПОСЛЕДНИЕ НОВОСТИ
        </h2>
        <div className="flex flex-col gap-5">
          {data.news.map((item: any) => (
            <NewsItem
              key={item.id}
              href={`/news/${item.id}`}
              image={item.image}
              title={item.title}
              article={item.article}
              day={item.date_created.day}
              month={item.date_created.month}
            />
          ))}
        </div>
      </div>
      <div className="py-8 w-4/12 px-14 bg-[#F5F5F5]">
        <h2 className="font-bold text-4xl text-[#171D3D] mb-6">
          ПОПУЛЯРНЫЕ ВИДЕО
        </h2>
        <div className="flex flex-col gap-10">
          {data.video.map((video: any) => (
            <Video
              key={video.id}
              video={video.video}
              preview={video.preview}
              title={video.title}
              allVideos={data.video}
              currentId={video.id}
            />
          ))}
        </div>
      </div>
    </div>
  );

  const MobileLayout = () => (
    <div className="px-2 w-full mb-5">
      <Tabs defaultValue="news" className="w-full">
        <TabsList className="w-full mt-5 mb-6 bg-transparent font-inter flex flex-row gap-2">
          <TabsTrigger
            value="news"
            className="w-1/2 border border-[#D2D2D2] data-[state=active]:bg-orange-500 data-[state=active]:text-white data-[state=active]:border-orange-500"
          >
            Новости
          </TabsTrigger>
          <TabsTrigger
            value="videos"
            className="w-1/2 border border-[#D2D2D2] data-[state=active]:bg-orange-500 data-[state=active]:text-white data-[state=active]:border-orange-500"
          >
            Видео
          </TabsTrigger>
        </TabsList>
        <TabsContent value="news">
          <div className="flex flex-wrap gap-5">
            {data.news.map((item: any) => (
              <NewsItem
                key={item.id}
                href={`/news/${item.id}`}
                image={item.image}
                title={item.title}
                article={item.article}
                day={item.date_created.day}
                month={item.date_created.month}
              />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="videos">
          <div className="flex flex-col gap-5">
            {data.video.map((video: any) => (
              <Video
                key={video.id}
                video={video.video}
                preview={video.preview}
                title={video.title}
                allVideos={data.video}
                currentId={video.id}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );

  return (
    <>
      <img
        className="object-cover object-top h-44 w-full lg:h-[400px]"
        src="/assets/img/head/news.png"
      />
      {isDesktop ? <DesktopLayout /> : <MobileLayout />}
    </>
  );
}
