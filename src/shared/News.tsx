"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Photo } from "@/components/Photo";
import { sanitizeHtml } from "@/lib/sanitize-html";

interface NewsProps {
  data: any[];
}

function NewsPreview({ data }: NewsProps) {
  const [mounted, setMounted] = useState(false);
  const getImageUrl = (fileId: string) => `/api/img/${fileId}`;

  const leagues = [
    {
      name: "KHL",
      image: "/assets/img/leagues/khl.png",
      className: "h-[43px] lg:h-[90px]",
    },
    {
      name: "NHL",
      image: "/assets/img/leagues/nhl.png",
      className: "h-[43px] lg:h-[90px]",
    },
    {
      name: "AHL",
      image: "/assets/img/leagues/ahl.png",
      className: "h-[43px] lg:h-[90px]",
    },
    {
      name: "VHL",
      image: "/assets/img/leagues/vhl.png",
      className: "h-[43px] lg:h-[90px]",
    },
    {
      name: "MHL",
      image: "/assets/img/leagues/mhl.png",
      className: "h-[43px] lg:h-[90px]",
    },
    {
      name: "Penny Del",
      image: "/assets/img/leagues/del.png",
      className: "h-[43px] lg:h-[90px]",
    },
    {
      name: "National League",
      image: "/assets/img/leagues/nl.png",
      className: "h-[43px] lg:h-[90px]",
    },
    {
      name: "Extra League",
      image: "/assets/img/leagues/extraliga.png",
      className: "h-[43px] lg:h-[90px] scale-125",
    },
  ];
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !data || data.length === 0) return null;

  return (
    <div className="justify-center items-center flex flex-col gap-[70px] lg:gap-20">
      <div className="w-full flex flex-col gap-5 lg:gap-10">
        <h2 className="group font-bold text-5xl lg:text-6xl relative max-w-fit">
          <a href="/news">Новости</a>
          <div className="h-1 w-0 absolute bottom-0 left-0 bg-white group-hover:w-full transition-all duration-300"></div>
        </h2>
        <div className="flex flex-col gap-2.5 lg:flex-row lg:gap-5">
          {data[0] && (
            <Link
              className="flex border border-[#D0D0D0] rounded-lg bg-white overflow-hidden lg:border-none lg:w-3/5"
              href={`/news/${data[0].id}`}
            >
              <Photo
                src={getImageUrl(data[0].image)}
                alt={data[0].title}
                className="aspect-square w-1/2"
              />
              <div className="w-1/2 px-2 relative font-inter flex flex-col justify-center gap-2">
                <span className="bg-orange-500 absolute top-4 right-4 py-[1.5px] px-3 font-normal text-xs rounded-full lg:py-[9.5px]">
                  НОВОЕ
                </span>
                <p className="font-semibold text-[#171D3D] text-base leading-4 line-clamp-3 lg:text-2xl lg:leading-6">
                  {data[0].title}
                </p>
                <div
                  className="font-normal text-sm leading-4 text-[#5B5B5B] line-clamp-3 lg:text-base"
                  dangerouslySetInnerHTML={{
                    __html: sanitizeHtml(data[0].article),
                  }}
                />
              </div>
            </Link>
          )}
          <div className="flex flex-col gap-2.5 lg:gap-5 lg:w-2/5">
            {data.slice(1, 4).map(
              (item) =>
                item && (
                  <Link
                    key={item.id}
                    className="group flex-1 p-3.5 border border-[#D0D0D0] rounded-lg overflow-hidden hover:bg-white transition-all duration-300"
                    href={`/news/${item.id}`}
                  >
                    <div className="font-inter flex flex-col justify-center gap-2.5">
                      <div className="flex justify-between items-center">
                        <p className="font-medium text-[#D0D0D0] text-[10px]">
                          {item.date_created.day} {item.date_created.month}
                        </p>
                        <span className="py-[1.5px] px-3 font-normal text-xs text-[#D2D2D2] rounded-full border border-[#D2D2D2]">
                          ПОСЛЕДНИЕ НОВОСТИ
                        </span>
                      </div>
                      <p className="font-semibold text-white text-base leading-4 line-clamp-3 group-hover:text-[#171D3D] transition-all duration-300">
                        {item.title}
                      </p>
                    </div>
                  </Link>
                )
            )}
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col gap-5 lg:gap-10">
        <h2 className="font-bold text-5xl lg:text-6xl">ЛИГИ</h2>
        <div className="flex flex-row justify-around items-center">
          {leagues.map((league) => (
            <Photo
              src={league.image}
              alt={league.name}
              key={league.name}
              className={cn("aspect-square", league.className)}
              fit="contain"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export { NewsPreview };
