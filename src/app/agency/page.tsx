"use client";

import { useDataContext } from "@/context/DataContext";

import { Button } from "@ui/button";
import Link from "next/link";

export default function Agency() {
  const { data, isLoading } = useDataContext();
  const getImageUrl = (fileId: string) => `/api/img/${fileId}`;
  const splitName = (name: string) => {
    const [first, ...rest] = name.trim().split(/\s+/);
    return { first, rest: rest.join(" ") };
  };

  return (
    <>
      <img
        className="object-cover object-top h-44 w-full lg:h-[400px]"
        src="/assets/img/head/agency.png"
      />
      <div className="py-8 px-2 w-full box-border max-w-5xl mx-auto relative zoomer">
        <h2 className="font-bold text-6xl text-[#171D3D]">команда агентства</h2>
        <div className="flex flex-wrap gap-2 w-full pt-2 lg:gap-5 lg:pt-5">
          {data.agency.map((item: any) => (
            <div
              className="w-[calc(50%-0.25rem)] flex flex-col pb-6 lg:w-[calc(25%-1rem)]"
              key={item.id}
            >
              <img
                className="w-full aspect-square object-cover object-center rounded-xl lg:aspect-[6/5]"
                src={getImageUrl(item.photo)}
              />
              <h3 className="font-bold text-[29px] leading-7 lg:leading-[30px] pt-3 text-[#171D3D] lg:text-3xl">
                {splitName(item.name).first}
                <br />
                {splitName(item.name).rest}
              </h3>
              <p className="font-inter font-normal text-sm text-[#5B5B5B] lg:text-base">
                {item.type}
              </p>
              <Button
                className="hover:bg-transparent font-normal text-lg leading-none font-inter  h-auto pl-0 justify-start py-0"
                variant="link"
                asChild
              >
                <Link href={`mailto:${item.email}`}>
                  <img
                    className="h-4"
                    src="/assets/icons/social/email-org.svg"
                  />
                  <p className="font-inter font-normal text-base text-[#5B5B5B]">
                    {item.email}
                  </p>
                </Link>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
