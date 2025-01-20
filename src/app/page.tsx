"use client";

import { Suspense } from "react";
import { useDataContext } from "@/context/DataContext";
import Foot from "@/components/Foot/Foot";

import { HomeNews } from "@/components/home/HomeNews";
import { HomePlayers } from "@/components/home/HomePlayers";
import { HomeAgency } from "@/components/home/HomeAgency";
import { HomePartners } from "@/components/home/HomePartners";
import { HomeWelcome } from "@/components/home/HomeWelcome";

export default function Page() {
  const { data, isLoading } = useDataContext();

  return (
    <>
      <div>
        <Suspense fallback={null}>
          <HomeWelcome />
        </Suspense>
        <Suspense fallback={null}>
          <HomePlayers data={data.players} />
        </Suspense>
        <Suspense fallback={null}>
          <HomeNews data={data.news} />
        </Suspense>
        <Suspense fallback={null}>
          <HomePartners />
        </Suspense>
        <Suspense fallback={null}>
          <HomeAgency data={data.agency} />
        </Suspense>
      </div>
      <Foot />
    </>
  );
}
