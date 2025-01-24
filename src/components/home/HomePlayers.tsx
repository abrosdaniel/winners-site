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

  const splitName = (name: string) => {
    const [first, ...rest] = name.trim().split(/\s+/);
    return { first, rest: rest.join(" ") };
  };

  // Перемешиваем игроков один раз при инициализации
  const [shuffledPlayers] = useState(() => {
    const filteredPlayers = data.filter(
      (player) => player.league?.name === "НХЛ" || player.league?.name === "КХЛ"
    );

    const indices = Array.from({ length: filteredPlayers.length }, (_, i) => i);
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }
    return indices.map((index) => filteredPlayers[index]);
  });

  // Отдельное состояние для отображаемых игроков
  const [displayedPlayers, setDisplayedPlayers] = useState<any[]>([]);
  const getImageUrl = (fileId: string) => `/api/img/${fileId}`;

  useEffect(() => {
    setMounted(true);
    const updateDisplayedItems = () => {
      const isLarge = window.matchMedia("(min-width: 1024px)").matches;
      setIsLargeScreen(isLarge);

      // Берем первые N игроков из уже перемешанного массива
      const limit = isLarge ? 8 : 4;
      setDisplayedPlayers(shuffledPlayers.slice(0, limit));
    };

    if (mounted) {
      updateDisplayedItems();
      window.addEventListener("resize", updateDisplayedItems);
      return () => window.removeEventListener("resize", updateDisplayedItems);
    }
  }, [mounted, shuffledPlayers]);

  if (!mounted) return null;

  return (
    <div className="justify-center items-center flex flex-col my-5 px-2 max-w-5xl mx-auto lg:px-0 lg:my-6 zoomer">
      <h2 className="font-bold text-5xl w-full text-[#171D3D] lg:text-6xl">
        клиенты агентства
      </h2>
      <div className="flex flex-wrap gap-2 pt-2 w-full lg:gap-5 lg:pt-3">
        {displayedPlayers.map((item) => (
          <div
            key={item.id}
            className="w-[calc(50%-0.25rem)] flex flex-col pb-3 lg:w-[calc(25%-0.94rem)] border-[#D0D0D0] border rounded-xl overflow-hidden"
          >
            <img
              className="w-full aspect-[6/5] object-cover object-top"
              src={getImageUrl(item.photo)}
              alt={item.name}
            />
            <div className="border-y border-[#D0D0D0] flex p-2 gap-3 items-center">
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
                  {splitName(item.name).first}
                  <br />
                  {splitName(item.name).rest}
                </h3>
                <p className="font-inter font-semibold text-sm text-[#5B5B5B] h-7 lg:text-base leading-none lg:leading-none">
                  {item.team.name}
                </p>
              </div>
            </div>
            <div className="flex justify-between p-2">
              <div>
                <p className="font-inter font-normal text-base text-[#5B5B5B] lg:text-lg">
                  {item.birthday}
                </p>
                <p className="font-inter font-normal text-base text-[#5B5B5B] lg:text-lg">
                  {item.height}/{item.weight}
                </p>
              </div>
              <div>
                <p className="font-inter font-normal text-base text-[#5B5B5B] lg:text-lg lowercase">
                  {item.role}
                </p>
                <p className="font-inter font-normal text-base text-[#5B5B5B] lg:text-lg lowercase">
                  {item.grip}
                </p>
              </div>
            </div>
            <Button
              className="bg-orange-500 hover:bg-[#171D3D] mx-3 lg:py-1 lg:px-2 h-auto rounded-none font-normal text-base lg:text-lg leading-none font-inter"
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
        className="text-orange-500 bg-white border border-orange-500 rounded-none mx-auto mt-6 hover:bg-orange-500 hover:text-white font-normal text-base lg:text-lg leading-none font-inter h-auto lg:py-1"
        asChild
      >
        <Link href="/players">смотреть всех игроков</Link>
      </Button>
    </div>
  );
}
