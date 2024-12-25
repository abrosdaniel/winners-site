import { Suspense } from "react";
import Foot from "@/components/Foot/Foot";

import { HomeCarousel } from "@/components/home/HomeCarousel";
import { HomeNews } from "@/components/home/HomeNews";
import { HomePlayers } from "@/components/home/HomePlayers";
import { HomeAgency } from "@/components/home/HomeAgency";
import { HomePartners } from "@/components/home/HomePartners";
import { HomeWelcome } from "@/components/home/HomeWelcome";

async function getData() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/data`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch data");
  return res.json();
}

export default async function Page() {
  const data = await getData();

  return (
    <>
      <div>
        <div className="bg-[#171D3D] h-16 lg:h-0"></div>
        <Suspense fallback={null}>
          <HomeCarousel />
        </Suspense>
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
