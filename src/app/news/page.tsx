"use client";

import * as React from "react";
import { useDataContext } from "@/context/DataContext";
import { useState, useEffect, useMemo } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@ui/tabs";
import { Video } from "@/components/kit/Video";
import Link from "next/link";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";

interface NewsItemProps extends React.ComponentPropsWithoutRef<typeof Link> {
  type: string;
  image: string;
  title: string;
  article: string;
  day: string;
  month: string;
}

const PaginationComponent = ({
  currentPage,
  totalPages,
  paginationItems,
  setCurrentPage,
  withScroll,
}: {
  currentPage: number;
  totalPages: number;
  paginationItems: (number | string)[];
  setCurrentPage: (page: number) => void;
  withScroll: boolean;
}) => {
  if (totalPages <= 1) return null;
  return (
    <Pagination className="mt-10">
      <PaginationContent>
        {paginationItems.map((item, index) => {
          if (item === "ellipsis-start" || item === "ellipsis-end") {
            return (
              <PaginationItem key={`ellipsis-${index}`}>
                <PaginationEllipsis />
              </PaginationItem>
            );
          }

          return (
            <PaginationItem key={index}>
              <PaginationLink
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (typeof item === "number") {
                    setCurrentPage(item);
                    if (withScroll) {
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }
                  }
                }}
                className={`font-inter font-normal text-base rounded-none ${
                  currentPage === item
                    ? "text-white bg-[#FF730A]"
                    : "text-[#1E1E1E]"
                }`}
              >
                {item}
              </PaginationLink>
            </PaginationItem>
          );
        })}
      </PaginationContent>
    </Pagination>
  );
};

const generatePaginationItems = (currentPage: number, totalPages: number) => {
  const items = [];
  const maxVisiblePages = 5;

  if (totalPages <= maxVisiblePages) {
    for (let i = 1; i <= totalPages; i++) {
      items.push(i);
    }
  } else {
    if (currentPage <= 3) {
      for (let i = 1; i <= 4; i++) items.push(i);
      items.push("ellipsis-end", totalPages);
    } else if (currentPage >= totalPages - 2) {
      items.push(1, "ellipsis-start");
      for (let i = totalPages - 3; i <= totalPages; i++) items.push(i);
    } else {
      items.push(
        1,
        "ellipsis-start",
        currentPage - 1,
        currentPage,
        currentPage + 1,
        "ellipsis-end",
        totalPages
      );
    }
  }
  return items;
};

const NewsItem = React.forwardRef<React.ElementRef<typeof Link>, NewsItemProps>(
  ({ className, type, image, title, article, day, month, ...props }, ref) => {
    const getImageUrl = (fileId: string) => `/api/img/${fileId}`;

    return (
      <Link
        className="flex flex-col border border-[#D0D0D0] rounded-xl overflow-hidden justify-center"
        ref={ref}
        {...props}
      >
        {type === "exclusive" && (
          <div className="font-inter bg-[#FF730A] text-white px-2 py-1">
            <h4 className="font-bold text-center text-xs line-clamp-2 lg:text-lg lg:line-clamp-3">
              Э К С К Л Ю З И В
            </h4>
          </div>
        )}
        <div className="flex flex-row">
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
        </div>
      </Link>
    );
  }
);
NewsItem.displayName = "NewsItem";

export const revalidate = 0;

export default function News() {
  const { data, isLoading } = useDataContext();
  const [mounted, setMounted] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentVideoPage, setCurrentVideoPage] = useState(1);
  const [activeTab, setActiveTab] = useState("news"); // Добавляем состояние для активной вкладки
  const itemsPerPage = 10;

  const getImageUrl = (fileId: string) => `/api/img/${fileId}`;

  const { totalPages, totalVideoPages } = useMemo(
    () => ({
      totalPages: Math.ceil((data?.news?.length || 0) / itemsPerPage),
      totalVideoPages: Math.ceil((data?.video?.length || 0) / itemsPerPage),
    }),
    [data?.news?.length, data?.video?.length]
  );

  const { paginationItems, videoPaginationItems } = useMemo(
    () => ({
      paginationItems: generatePaginationItems(currentPage, totalPages),
      videoPaginationItems: generatePaginationItems(
        currentVideoPage,
        totalVideoPages
      ),
    }),
    [currentPage, currentVideoPage, totalPages, totalVideoPages]
  );

  const desktopVideos = useMemo(() => {
    return data?.video?.slice(0, itemsPerPage) || [];
  }, [data?.video]);

  const { paginatedNews, paginatedVideos } = useMemo(() => {
    const paginate = (items: any[], page: number) => {
      const startIndex = (page - 1) * itemsPerPage;
      return items?.slice(startIndex, startIndex + itemsPerPage) || [];
    };

    return {
      paginatedNews: paginate(data?.news, currentPage),
      paginatedVideos: isDesktop
        ? desktopVideos
        : paginate(data?.video, currentVideoPage),
    };
  }, [data, currentPage, currentVideoPage, isDesktop, desktopVideos]);

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

  const DesktopLayout = () => (
    <div className="w-full box-border flex gap-12 max-w-5xl mx-auto zoomer">
      <div className="py-8 w-8/12">
        <h2 className="font-bold text-6xl text-[#171D3D] mb-6">
          ПОСЛЕДНИЕ НОВОСТИ
        </h2>
        <div className="flex flex-col gap-5">
          {paginatedNews.map((item: any) => (
            <NewsItem
              key={item.id}
              href={`/news/${item.id}`}
              type={item.type}
              image={item.image}
              title={item.title}
              article={item.article}
              day={item.date_created.day}
              month={item.date_created.month}
            />
          ))}
        </div>
        <PaginationComponent
          currentPage={currentPage}
          totalPages={totalPages}
          paginationItems={paginationItems}
          setCurrentPage={setCurrentPage}
          withScroll={true}
        />
      </div>
      <div className="py-8 w-4/12 px-14 bg-[#F5F5F5] relative">
        <h2 className="font-bold text-4xl text-[#171D3D] mb-6">
          ПОПУЛЯРНЫЕ ВИДЕО
        </h2>
        <div className="flex flex-col gap-10">
          {desktopVideos.map((video: any) => (
            <Video
              key={video.id}
              video={video.video}
              preview={video.preview}
              title={video.title}
              allVideos={desktopVideos}
              currentId={video.id}
            />
          ))}
        </div>
        <div className="absolute bg-[#F5F5F5] h-16 w-full -bottom-16 left-0"></div>
      </div>
    </div>
  );

  const MobileLayout = () => (
    <div className="px-2 w-full mb-5">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
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
            {paginatedNews.map((item: any) => (
              <NewsItem
                key={item.id}
                href={`/news/${item.id}`}
                type={item.type}
                image={item.image}
                title={item.title}
                article={item.article}
                day={item.date_created.day}
                month={item.date_created.month}
              />
            ))}
          </div>
          <PaginationComponent
            currentPage={currentPage}
            totalPages={totalPages}
            paginationItems={paginationItems}
            setCurrentPage={setCurrentPage}
            withScroll={true}
          />
        </TabsContent>
        <TabsContent value="videos">
          <div className="flex flex-col gap-5">
            {paginatedVideos.map((video: any) => (
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
          {!isDesktop && (
            <PaginationComponent
              currentPage={currentVideoPage}
              totalPages={totalVideoPages}
              paginationItems={videoPaginationItems}
              setCurrentPage={setCurrentVideoPage}
              withScroll={true}
            />
          )}
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
