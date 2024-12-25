"use client";

import { useDataContext } from "@/context/DataContext";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function NotFoundClient({ initialData }: { initialData: any }) {
  const { data } = useDataContext();
  return (
    <div className="w-screen h-full flex flex-col gap-10 items-center justify-center">
      <div className="flex flex-col gap-6 items-center justify-center px-8 text-[#171D3D]">
        <h1 className="font-bold text-9xl lg:text-[160px] leading-[8rem]">
          404
        </h1>
        <h2 className="font-bold text-4xl lg:text-6xl">
          упс, страница не найдена
        </h2>
        <p className="font-inter font-normal text-center text-base lg:text-lg">
          Кажется, такой страницы нет, попробуйте вернуться на главную и начать
          сначала
        </p>
      </div>
      <Button
        className="font-inter bg-orange-500 hover:bg-[#171D3D] py-1 px-10 h-auto rounded-none font-normal text-lg"
        asChild
      >
        <Link href="/">на главную</Link>
      </Button>
    </div>
  );
}
