"use client";

import { useQuery } from "@tanstack/react-query";
import directus from "@/services/directus";
import { readItems } from "@directus/sdk";
import { useMediaQuery } from "@/hooks/useMediaQuery";

import { Wrapper } from "@/components/Wrapper";
import { Photo } from "@/components/Photo";
import { MenuShape } from "@/components/MenuShape";
import {
  Players,
  PlayersTitle,
  PlayersFilters,
  PlayersList,
  PlayersPagination,
} from "@/shared/Players";

export default function PlayersPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["players"],
    queryFn: async () =>
      await directus.request(
        readItems("players", {
          fields: ["*.*"],
          filter: { status: { _eq: "published" } },
          limit: -1,
        }),
      ),
  });
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  return (
    <>
      <MenuShape className="bg-[#171D3D]" />
      <Photo
        src="/assets/img/hero/players.png"
        alt="Игроки"
        className="h-44 lg:h-[540px]"
        position={isDesktop ? "center" : "top"}
      />
      <Wrapper size="small">
        <Players
          data={data}
          isLoading={isLoading}
          pageItems={isDesktop ? 16 : 8}
          className="flex flex-col gap-5 lg:gap-10"
        >
          <PlayersTitle>игроки агентства</PlayersTitle>
          <PlayersFilters />
          <PlayersList className="gap-x-2 gap-y-5 lg:gap-x-5 lg:gap-y-8" />
          <PlayersPagination />
        </Players>
      </Wrapper>
    </>
  );
}
