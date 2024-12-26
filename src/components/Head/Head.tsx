"use client";

import { useEffect, useState } from "react";

import { Button } from "@ui/button";
import Link from "next/link";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@ui/sheet";
import { Menu, MoveLeft } from "lucide-react";

export default function Head() {
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const updateScreenSize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
    };
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 64);
    };

    updateScreenSize();
    window.addEventListener("resize", updateScreenSize);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("resize", updateScreenSize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {isLargeScreen ? (
        <nav className="fixed top-2 left-1/2 -translate-x-1/2 bg-[#171D3D] rounded-full h-16 w-10/12 flex justify-between items-center py-2 px-20 z-50">
          <Link className="h-full" href="/">
            <img className="h-full" src="/assets/icons/logo/logo.png" />
          </Link>
          <div>
            <Button
              className="text-white hover:bg-transparent hover:text-white font-normal text-lg leading-none font-inter"
              variant="link"
              asChild
            >
              <Link href="/players">игроки</Link>
            </Button>
            <Button
              className="text-white hover:bg-transparent hover:text-white font-normal text-lg leading-none font-inter"
              variant="link"
              asChild
            >
              <Link href="/about">о нас</Link>
            </Button>
            <Button
              className="text-white hover:bg-transparent hover:text-white font-normal text-lg leading-none font-inter"
              variant="link"
              asChild
            >
              <Link href="/news">новости</Link>
            </Button>
            <Button
              className="text-white hover:bg-transparent hover:text-white font-normal text-lg leading-none font-inter"
              variant="link"
              asChild
            >
              <Link href="/agency">команда</Link>
            </Button>
            <Button
              className="text-white hover:bg-transparent hover:text-white font-normal text-lg leading-none font-inter"
              variant="link"
              asChild
            >
              <Link href="#contacts">контакты</Link>
            </Button>
          </div>
          <Button
            className="bg-orange-500 hover:bg-[#171D3D] py-1 h-auto rounded-none font-normal text-lg leading-none font-inter border border-orange-500 hover:border-white"
            asChild
          >
            <Link href="/form">заполнить анкету</Link>
          </Button>
        </nav>
      ) : (
        <nav
          className={`fixed top-0 left-0 bg-[#171D3D] w-screen flex justify-between items-center py-2 px-6 z-50 ${
            isScrolled ? "rounded-[50px] h-14 top-1" : "rounded-none h-16 top-0"
          } transition-all duration-1000`}
        >
          <div className="flex h-full gap-10">
            <Link className="h-full" href="/">
              <img
                className={`${
                  isScrolled ? "h-10" : "h-20"
                } transition-all duration-1000`}
                src="/assets/icons/logo/logo.png"
              />
            </Link>
            <Link
              className="text-white flex flex-col justify-center mt-2"
              href="/"
            >
              <p className="text-sm leading-none font-bold">
                ХОККЕЙНОЕ АГЕНТСТВО
              </p>
              <h1 className="text-3xl leading-none font-bold">WINNERS</h1>
            </Link>
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Menu className="h-10 w-10 text-white" />
            </SheetTrigger>
            <SheetContent
              side="right"
              className="bg-[#171D3D] border-0 w-screen py-5 px-24"
            >
              <SheetClose className="absolute left-8" asChild>
                <MoveLeft className="h-9 w-9 text-white" />
              </SheetClose>
              <SheetHeader className="flex flex-col justify-center items-center gap-14">
                <SheetClose asChild>
                  <Link href="/">
                    <img
                      className="h-28 w-24"
                      src="/assets/icons/logo/logo.png"
                    />
                  </Link>
                </SheetClose>
                <SheetTitle>
                  <SheetClose asChild>
                    <Link className="text-white font-bold" href="/">
                      <p className="text-lg leading-none">
                        ХОККЕЙНОЕ АГЕНТСТВО
                      </p>
                      <h1 className="text-5xl leading-none">WINNERS</h1>
                    </Link>
                  </SheetClose>
                </SheetTitle>
              </SheetHeader>
              <div className="text-white mt-14 flex flex-col gap-3">
                <SheetClose asChild>
                  <Button
                    className="hover:bg-transparent hover:text-white font-bold text-4xl leading-none"
                    variant="ghost"
                    asChild
                  >
                    <Link href="/players">игроки</Link>
                  </Button>
                </SheetClose>
                <SheetClose asChild>
                  <Button
                    className="hover:bg-transparent hover:text-white font-bold text-4xl leading-none"
                    variant="ghost"
                    asChild
                  >
                    <Link href="/about">о нас</Link>
                  </Button>
                </SheetClose>
                <SheetClose asChild>
                  <Button
                    className="hover:bg-transparent hover:text-white font-bold text-4xl leading-none"
                    variant="ghost"
                    asChild
                  >
                    <Link href="/news">новости</Link>
                  </Button>
                </SheetClose>
                <SheetClose asChild>
                  <Button
                    className="hover:bg-transparent hover:text-white font-bold text-4xl leading-none"
                    variant="ghost"
                    asChild
                  >
                    <Link href="/agency">команда</Link>
                  </Button>
                </SheetClose>
                <SheetClose asChild>
                  <Button
                    className="hover:bg-transparent hover:text-white font-bold text-4xl leading-none"
                    variant="ghost"
                    asChild
                  >
                    <Link href="#contacts">контакты</Link>
                  </Button>
                </SheetClose>
              </div>
              <div className="text-white mt-14 flex flex-col gap-16">
                <SheetClose asChild>
                  <Button
                    className="bg-orange-500 hover:bg-[#171D3D] py-1 h-auto rounded-none font-normal text-lg font-inter"
                    asChild
                  >
                    <Link href="/form">заполнить анкету</Link>
                  </Button>
                </SheetClose>
                <div className="text-white font-bold text-2xl leading-none flex flex-col gap-3 items-center font-inter">
                  <a href={`mailto:info@wnrs.ru`}>info@wnrs.ru</a>
                  <div className="flex gap-2 justify-center items-center">
                    <img
                      className="h-7 w-7 p-2 rounded-full bg-white"
                      src="/assets/icons/social/phone.svg"
                    />
                    <a
                      href="https://wa.me/79688658761"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      +7 968 865 87 61
                    </a>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </nav>
      )}
    </>
  );
}
