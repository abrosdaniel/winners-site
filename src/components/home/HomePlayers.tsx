"use client";

import Link from "next/link";
import { Button } from "@ui/button";
import { useEffect, useState } from "react";

interface HomePlayersProps {
  data: any[];
}

export function HomePlayers({ data }: HomePlayersProps) {
  const [mounted, setMounted] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const [displayedPlayers, setDisplayedPlayers] = useState<any[]>([]);
  const getImageUrl = (fileId: string) => `/api/img/${fileId}`;

  useEffect(() => {
    setMounted(true);
    const updateDisplayedItems = () => {
      const isLarge = window.matchMedia("(min-width: 1024px)").matches;
      setIsLargeScreen(isLarge);

      const indices = Array.from({ length: data.length }, (_, i) => i);
      for (let i = indices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [indices[i], indices[j]] = [indices[j], indices[i]];
      }

      const limit = isLarge ? 8 : 4;
      const randomPlayers = indices.slice(0, limit).map((index) => data[index]);

      setDisplayedPlayers(randomPlayers);
    };

    if (mounted) {
      updateDisplayedItems();
      window.addEventListener("resize", updateDisplayedItems);
      return () => window.removeEventListener("resize", updateDisplayedItems);
    }
  }, [data, mounted]);

  if (!mounted) return null;

  return (
    <div className="justify-center items-center flex flex-col gap-3 my-12 px-2 lg:px-0 lg:my-16">
      <h2 className="font-bold text-5xl w-full text-[#171D3D] lg:text-6xl lg:w-10/12">
        клиенты агентства
      </h2>
      <div className="flex flex-wrap gap-2 pt-2 w-full lg:gap-5 lg:pt-5 lg:w-10/12">
        {displayedPlayers.map((item) => (
          <div
            key={item.id}
            className="w-[calc(50%-0.25rem)] flex flex-col pb-3 lg:w-[calc(25%-0.94rem)] border-[#D0D0D0] border rounded-xl overflow-hidden"
          >
            <img
              className="w-full aspect-[6/5] object-cover object-top lg:aspect-[6/5]"
              src={getImageUrl(item.photo)}
              alt={item.name}
            />
            <div className="border-y border-[#D0D0D0] flex p-3 gap-3 items-center">
              <div>
                {item.team.icon && (
                  <img
                    className="w-7 object-center"
                    src={getImageUrl(item.team.icon)}
                    alt={item.team.name}
                  />
                )}
              </div>
              <div>
                <h3 className="font-bold text-2xl text-[#171D3D] lg:text-[26px] leading-[21.6px] lg:leading-[26px] w-min lg:w-max">
                  {item.name}
                </h3>
                <p className="font-inter font-semibold text-sm text-[#5B5B5B] h-7 lg:text-base leading-none lg:leading-none">
                  {item.team.name}
                </p>
              </div>
            </div>
            <div className="flex justify-between p-3">
              <div>
                <p className="font-inter font-normal text-base text-[#5B5B5B] lg:text-lg">
                  {item.birthday}
                </p>
                <p className="font-inter font-normal text-base text-[#5B5B5B] lg:text-lg">
                  {item.height}/{item.weight}
                </p>
              </div>
              <div>
                <p className="font-inter font-normal text-base text-[#5B5B5B] lg:text-lg">
                  {item.role}
                </p>
                <p className="font-inter font-normal text-base text-[#5B5B5B] lg:text-lg">
                  {item.grip}
                </p>
              </div>
            </div>
            <Button
              className="bg-orange-500 hover:bg-[#171D3D] mx-3 h-auto rounded-none font-normal text-lg leading-none font-inter"
              asChild
            >
              <Link href={item.stats} target="_blank">
                статистика
              </Link>
            </Button>
          </div>
        ))}
      </div>
      <Button
        className="text-orange-500 bg-white border border-orange-500 rounded-none mx-auto hover:bg-orange-500 hover:text-white font-normal text-lg leading-none font-inter"
        variant="link"
        asChild
      >
        <Link href="/players">смотреть всех игроков</Link>
      </Button>
    </div>
  );
}
