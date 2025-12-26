"use client";

import { useDataContext } from "@/context/DataContext";
import { MenuShape } from "@/components/MenuShape";
import { Photo } from "@/components/Photo";
import { Wrapper } from "@/components/Wrapper";
import { Agents, AgentsTitle, AgentsList } from "@/shared/Agents";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export default function Agency() {
  const { data } = useDataContext();
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  return (
    <>
      <MenuShape className="bg-[#171D3D]" />
      <Photo
        className="h-44 lg:h-[540px]"
        src="/assets/img/hero/agency.png"
        alt="Команда агентства"
        position={isDesktop ? "center" : "top"}
      />
      <Wrapper size="small">
        <Agents className="flex flex-col gap-5 lg:gap-10" data={data.agency}>
          <AgentsTitle>команда агентства</AgentsTitle>
          <AgentsList className="gap-x-2 gap-y-5 lg:gap-x-5 lg:gap-y-8" />
        </Agents>
      </Wrapper>
    </>
  );
}
