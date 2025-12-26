"use client";

import { Button } from "@ui/button";
import Link from "next/link";
import { Photo } from "@/components/Photo";

export default function Foot() {
  const icons = [
    {
      src: "/assets/img/foot/khl.png",
      alt: "KHL",
    },
    {
      src: "/assets/img/foot/vhl.png",
      alt: "VHL",
    },
    {
      src: "/assets/img/foot/nhl.png",
      alt: "NHL",
    },
    {
      src: "/assets/img/foot/mhl.png",
      alt: "MHL",
    },
  ];

  const ItemList = ({
    children,
    href,
    type = "in",
  }: {
    children: React.ReactNode;
    href: string;
    type?: "in" | "out";
  }) => {
    return (
      <Button
        className="text-white hover:bg-transparent hover:text-white font-normal text-lg leading-none font-inter h-auto pl-0 justify-start"
        variant="link"
        asChild
      >
        <Link
          href={href}
          target={type === "out" ? "_blank" : undefined}
          rel={type === "out" ? "noopener noreferrer" : undefined}
        >
          {children}
        </Link>
      </Button>
    );
  };

  return (
    <footer
      id="contacts"
      className="relative bg-[#171D3D] rounded-b-none rounded-t-3xl w-full overflow-hidden lg:rounded-full"
    >
      <div className="relative container mx-auto overflow-hidden">
        <div className="absolute inset-x-0 top-0 w-full h-full z-10 flex flex-row gap-14 pt-20 px-14 lg:pt-0 lg:justify-center lg:gap-32 lg:box-border lg:top-1/2 lg:-translate-y-1/2 lg:max-h-52">
          <div className="w-1/2 pt-20 lg:flex-none lg:flex lg:pt-0 lg:gap-32">
            {icons.slice(0, 2).map((icon) => (
              <Photo
                key={icon.alt}
                className="flex-1 w-full aspect-[6/7] mb-32 lg:mb-0"
                src={icon.src}
                alt={icon.alt}
                fit="contain"
              />
            ))}
          </div>
          <div className="w-1/2  lg:flex-none lg:flex  lg:gap-32">
            {icons.slice(2).map((icon) => (
              <Photo
                key={icon.alt}
                className="flex-1 w-full aspect-[6/7] mb-32 lg:mb-0"
                src={icon.src}
                alt={icon.alt}
                fit="contain"
              />
            ))}
          </div>
        </div>
        <div className="relative py-10 px-12 z-20 flex flex-col lg:py-5 lg:px-0 lg:flex-row lg:justify-between lg:items-center lg:mt-20 lg:mb-14">
          <Photo
            className="w-28 aspect-square mb-5 mx-auto lg:mb-0 lg:mx-0"
            src="/assets/icons/logo/logo.png"
            alt="logo"
            fit="contain"
          />
          <div className="text-white font-bold text-3xl leading-none flex flex-col gap-2 items-start font-inter pb-14 lg:pb-0">
            <a href={`mailto:info@wnrs.ru`}>info@wnrs.ru</a>
            <div className="flex gap-2 justify-center items-center">
              <div className="p-2 rounded-full bg-white">
                <Photo
                  className="size-3"
                  src="/assets/icons/social/phone.svg"
                  alt="phone"
                />
              </div>
              <a
                href="https://wa.me/79688658761"
                target="_blank"
                rel="noopener noreferrer"
              >
                +7 968 865 87 61
              </a>
            </div>
          </div>
          <div className="flex justify-between pb-10 lg:pb-0 lg:gap-24">
            <div className="flex flex-col">
              <ItemList href="/players">игроки</ItemList>
              <ItemList href="/about">о нас</ItemList>
              <ItemList href="/news">новости</ItemList>
              <ItemList href="/agency">команда</ItemList>
              <ItemList href="#contacts">контакты</ItemList>
            </div>
            <div className="flex flex-col">
              <ItemList
                href="https://www.instagram.com/winners_hockey"
                type="out"
              >
                <div className="h-7 w-7 p-2 rounded-full bg-white flex justify-center items-center">
                  <Photo
                    className="size-3"
                    src="/assets/icons/social/inst.svg"
                    alt="instagram"
                  />
                </div>
                instagram*
              </ItemList>
              <ItemList href="https://t.me/winnershockey" type="out">
                <div className="h-7 w-7 p-2 rounded-full bg-white flex justify-center items-center">
                  <Photo
                    className="size-3"
                    src="/assets/icons/social/telegram.svg"
                    alt="telegram"
                  />
                </div>
                telegram
              </ItemList>
              <ItemList href="https://wa.me/79688658761" type="out">
                <div className="h-7 w-7 p-2 rounded-full bg-white flex justify-center items-center">
                  <Photo
                    className="size-3"
                    src="/assets/icons/social/phone.svg"
                    alt="whatsapp"
                  />
                </div>
                what’sapp
              </ItemList>
              <ItemList href={`mailto:info@wnrs.ru`}>
                <div className="h-7 w-7 p-2 rounded-full bg-white flex justify-center items-center">
                  <Photo
                    className="size-3"
                    src="/assets/icons/social/email.svg"
                    alt="email"
                  />
                </div>
                email
              </ItemList>
            </div>
          </div>
          <div className="flex flex-col gap-2 pb-4 lg:pb-0">
            <Button
              className="bg-orange-500 hover:bg-transparent w-fit py-1 h-8 rounded-none font-normal text-lg leading-none font-inter border border-orange-500 hover:border-white"
              asChild
            >
              <Link href="/form">заполнить анкету</Link>
            </Button>
          </div>
        </div>
        <div className="relative container mx-auto flex flex-col gap-2 z-20 px-12 pb-10 text-xs font-normal text-[#B3B3B3] font-inter lg:flex-row lg:justify-center lg:gap-5 lg:w-full lg:pb-5">
          <p>© {new Date().getFullYear()} ХОККЕЙНОЕ АГЕНТСТВО WINNERS</p>
          <a href="/policy">Политика конфиденциальности</a>
          <p>
            *Meta признана экстремистской организацией и запрещена на территории
            России
          </p>
        </div>
      </div>
    </footer>
  );
}
