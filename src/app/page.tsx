"use client";

import { useQuery } from "@tanstack/react-query";
import directus from "@/services/directus";
import { readItems } from "@directus/sdk";
import { useMediaQuery } from "@/hooks/useMediaQuery";

import Hero from "@/shared/Hero";
import { NewsPreview } from "@/shared/News";
import {
  Players,
  PlayersTitle,
  PlayersList,
  PlayersLink,
} from "@/shared/Players";
import { Agents, AgentsTitle, AgentsList, AgentsLink } from "@/shared/Agents";
import { Partners } from "@/shared/Partners";
import { Wrapper } from "@/components/Wrapper";

export default function Page() {
  const { data: players, isLoading: isPlayersLoading } = useQuery({
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
  const { data: news, isLoading: isNewsLoading } = useQuery({
    queryKey: ["news"],
    queryFn: async () =>
      await directus.request(
        readItems("news", {
          fields: ["*"],
          filter: { status: { _eq: "published" } },
          sort: ["-date_created"],
          limit: -1,
        }),
      ),
  });
  const { data: agency, isLoading: isAgencyLoading } = useQuery({
    queryKey: ["agency"],
    queryFn: async () =>
      await directus.request(
        readItems("agency", {
          fields: ["*"],
          limit: -1,
        }),
      ),
  });
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  return (
    <>
      <Hero />
      <Wrapper>
        <Players
          className="flex flex-col gap-5 lg:gap-10"
          data={players}
          isLoading={isPlayersLoading}
          maxItems={isDesktop ? 8 : 4}
          filter={[{ key: "league.name", value: "КХЛ" }]}
        >
          <PlayersTitle>клиенты агентства</PlayersTitle>
          <PlayersList className="gap-x-2 gap-y-5 lg:gap-x-5 lg:gap-y-8" />
          <PlayersLink href="/players">смотреть всех игроков</PlayersLink>
        </Players>
      </Wrapper>
      <Wrapper variant="blue">
        <NewsPreview data={news || []} />
      </Wrapper>
      <Wrapper>
        <Partners />
      </Wrapper>
      <Wrapper classWrapper="!pt-0">
        <Agents
          className="flex flex-col gap-5 lg:gap-10"
          data={agency}
          isLoading={isAgencyLoading}
          maxItems={isDesktop ? 4 : 2}
        >
          <AgentsTitle>наша команда</AgentsTitle>
          <AgentsList className="gap-2 lg:gap-5" />
          <AgentsLink href="/agents">вся команда агентства</AgentsLink>
        </Agents>
      </Wrapper>
    </>
  );
}
