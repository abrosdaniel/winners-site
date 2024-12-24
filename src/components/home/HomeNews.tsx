"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

interface HomeNewsProps {
  data: any[];
}

export function HomeNews({ data }: HomeNewsProps) {
  const [mounted, setMounted] = useState(false);
  const getImageUrl = (fileId: string) => `/api/img/${fileId}`;

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="justify-center items-center flex flex-col bg-[#171D3D] text-white py-14 px-2">
      <h2 className="font-bold text-5xl w-full lg:text-6xl lg:w-10/12">
        Новости
      </h2>
      <div className="flex flex-col gap-3 mt-4 mb-12 lg:w-10/12 lg:flex-row lg:h-[490px]">
        <Link
          className="flex border border-[#D0D0D0] rounded-lg bg-white overflow-hidden h-64 lg:border-none lg:h-auto lg:w-2/3"
          href={`/news/${data[0].id}`}
        >
          <img
            className="w-1/2 object-cover"
            src={getImageUrl(data[0].image)}
            alt={data[0].title}
          />
          <div className="w-1/2 pl-2 relative font-inter flex flex-col justify-center gap-2">
            <span className="bg-orange-500 absolute top-4 right-4 py-[1.5px] px-3 font-normal text-xs rounded-full lg:py-[9.5px]">
              НОВОЕ
            </span>
            <p className="font-semibold text-[#171D3D] text-base line-clamp-3 lg:text-2xl">
              {data[0].title}
            </p>
            <div
              className="font-normal text-sm text-[#5B5B5B] line-clamp-3 lg:text-base"
              dangerouslySetInnerHTML={{ __html: data[0].article }}
            />
          </div>
        </Link>
        <div className="flex flex-row gap-3 lg:w-1/3">
          {data.slice(1, 3).map((item) => (
            <Link
              key={item.id}
              className="flex-1 border border-[#D0D0D0] rounded-lg bg-white overflow-hidden"
              href={`/news/${item.id}`}
            >
              <div className="px-2 relative font-inter flex flex-col justify-center gap-8">
                <span className="absolute top-3 left-3 py-[1.5px] px-3 font-normal text-xs text-[#D2D2D2] rounded-full border border-[#D2D2D2] lg:left-auto lg:right-3">
                  ПОСЛЕДНИЕ НОВОСТИ
                </span>
                <p className="mt-14 font-semibold text-[#171D3D] text-base line-clamp-3">
                  {item.title}
                </p>
                <p className="mb-4 font-medium text-[#D0D0D0] text-[10px]">
                  {item.date_created.day} {item.date_created.month}
                </p>
              </div>
              <img
                className="object-cover lg:h-full"
                src={getImageUrl(item.image)}
                alt={item.title}
              />
            </Link>
          ))}
        </div>
      </div>
      <h2 className="font-bold text-5xl w-full lg:text-6xl lg:w-10/12">ЛИГИ</h2>
      <div className="flex flex-row justify-center items-center mt-4 gap-3 lg:gap-20">
        <img
          className="h-[43px] lg:h-[90px]"
          src="/assets/img/home/khl.png"
          alt="KHL"
        />
        <img
          className="h-[43px] lg:h-[90px]"
          src="/assets/img/home/nhl.png"
          alt="NHL"
        />
        <img
          className="h-[43px] lg:h-[90px]"
          src="/assets/img/home/ahl.png"
          alt="AHL"
        />
        <img
          className="h-[43px] lg:h-[90px]"
          src="/assets/img/home/vhl.png"
          alt="VHL"
        />
        <img
          className="h-[43px] lg:h-[90px]"
          src="/assets/img/home/mhl.png"
          alt="MHL"
        />
        <img
          className="h-[31px] lg:h-[66px]"
          src="/assets/img/home/del.png"
          alt="Penny Del"
        />
        <img
          className="h-[43px] lg:h-[90px]"
          src="/assets/img/home/nl.png"
          alt="National League"
        />
        <img
          className="h-[43px] lg:h-[90px]"
          src="/assets/img/home/extraliga.png"
          alt="Extra League"
        />
      </div>
    </div>
  );
}
