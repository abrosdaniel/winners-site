"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Photo } from "@/components/Photo";
import CountUp from "@/components/CountUp";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { MenuShape } from "@/components/MenuShape";
import { Wrapper } from "@/components/Wrapper";

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const containerRef = useRef<HTMLDivElement>(null);
  const slides = [
    { key: "1", base: "home", mob: "home-mob" },
    { key: "2", base: "players", mob: "players-mob" },
    { key: "3", base: "news", mob: "news-mob" },
    { key: "4", base: "agency", mob: "agency-mob" },
  ];

  useEffect(() => {
    setMounted(true);
    if (!containerRef.current) return;

    const slides = containerRef.current.children;
    const totalSlides = slides.length;
    let currentSlide = 0;

    gsap.set(slides, {
      position: "absolute",
      inset: 0,
      autoAlpha: 0,
      scale: 1,
      zIndex: 0,
    });
    gsap.set(slides[0], { autoAlpha: 1, zIndex: 1 });

    const animateSlides = () => {
      const nextSlide = (currentSlide + 1) % totalSlides;
      const prevSlide = (currentSlide - 1 + totalSlides) % totalSlides;
      gsap.set(slides[nextSlide], {
        scale: 1.15,
        autoAlpha: 0,
        zIndex: 2,
      });

      gsap.set(slides[currentSlide], { zIndex: 1 });
      gsap.set(slides[prevSlide], { zIndex: 0 });

      const timeline = gsap.timeline({
        onComplete: () => {
          currentSlide = nextSlide;
          animateSlides();
        },
      });

      timeline.to(slides[nextSlide], {
        autoAlpha: 1,
        duration: 2.5,
        ease: "ease",
      });

      timeline.to(
        slides[nextSlide],
        {
          scale: 1,
          duration: 5,
          ease: "ease",
        },
        0
      );
    };

    animateSlides();
  }, [mounted, isDesktop]);

  if (!mounted) return null;

  return (
    <>
      <div className="flex flex-col h-full">
        <MenuShape className="bg-[#171D3D] h-24" />
        <div
          ref={containerRef}
          className="relative w-full h-full overflow-hidden"
        >
          {slides.map((item) => (
            <Photo
              key={item.key}
              src={
                isDesktop
                  ? `/assets/img/hero/${item.base}.png`
                  : `/assets/img/hero/${item.mob}.png`
              }
              alt={`${item.base}`}
              className="w-full h-full"
              position="top"
            />
          ))}
        </div>
        <div className="bg-[#171D3D] text-white pt-6 pb-0 px-2 lg:pt-[70px] lg:pb-8 lg:px-0">
          <div className="container mx-auto">
            <div className="flex flex-col justify-between lg:flex-row lg:items-center">
              <div className="flex flex-col font-bold px-3 lg:px-0">
                <h2 className="text-4xl leading-[60px] lg:text-[40px]">
                  ХОККЕЙНОЕ АГЕНТСТВО
                </h2>
                <h1 className="text-[128px] lg:text-[160px] leading-[108px] lg:leading-[160px] lg:h-[130px]">
                  WINNERS
                </h1>
              </div>
              <p className="hidden lg:block font-inter font-normal text-lg leading-[21.8px] lg:w-6/12">
                <span className="text-2xl lg:text-lg lg:leading-5">
                  Winners — агентство спортивного менеджмента.
                </span>
                <br />
                <span className="font-semibold text-orange-500">
                  Мы занимаемся поиском контрактов, юридической и медийной
                  поддержкой
                </span>
                , чтобы наши клиенты могли сосредоточиться на игре. Нас выбирают
                звезды, такие как Артемий Панарин, Илья Ковальчук, Данис
                Зарипов, и многие другие ведущие игроки, доверяя нашему опыту и
                профессионализму.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Wrapper variant="blue" size="big" classWrapper="!py-0 lg:!pb-20">
        <div className="flex text-[#171D3D] flex-row justify-around gap-5 bg-white rounded-full py-5 px-6">
          <div className="flex flex-col">
            <CountUp
              from={0}
              to={18}
              separator=","
              direction="up"
              duration={1}
              className="font-bold text-5xl lg:text-7xl lg:h-16"
            />
            <p className="font-inter font-normal text-xs leading-[14.5px] lg:text-lg lg:leading-[21.5px]">
              лет работы
              <br />
              агентства
            </p>
          </div>
          <div className="flex flex-col">
            <CountUp
              from={0}
              to={73}
              separator=","
              suffix="%"
              direction="up"
              duration={1}
              className="font-bold text-5xl lg:text-7xl lg:h-16"
            />
            <p className="font-inter font-normal text-xs leading-[14.5px] lg:text-lg lg:leading-[21.5px]">
              клиентов агенства
              <br />
              игроки КХЛ и НХЛ
            </p>
          </div>
          <div className="flex flex-col">
            <CountUp
              from={0}
              to={21}
              separator=","
              direction="up"
              duration={1}
              className="font-bold text-5xl lg:text-7xl lg:h-16"
            />
            <p className="font-inter font-normal text-xs leading-[14.5px] lg:text-lg lg:leading-[21.5px]">
              игрок
              <br />
              НХЛ
            </p>
          </div>
          <div className="flex flex-col">
            <CountUp
              from={0}
              to={200}
              separator=","
              suffix="+"
              direction="up"
              duration={1}
              className="font-bold text-5xl lg:text-7xl lg:h-16"
            />
            <p className="font-inter font-normal text-xs leading-[14.5px] lg:text-lg lg:leading-[21.5px]">
              игроков
              <br />
              КХЛ
            </p>
          </div>
        </div>
      </Wrapper>
      <div className="lg:hidden justify-center items-center flex flex-col bg-[#171D3D] text-white pb-10 pt-5 px-2">
        <div className="container mx-auto">
          <p className="font-inter font-normal text-lg leading-[21.8px] lg:w-6/12">
            <span className="text-2xl lg:text-lg lg:leading-5">
              Winners — агентство спортивного менеджмента.
            </span>
            <br />
            <span className="font-semibold text-orange-500">
              Мы занимаемся поиском контрактов, юридической и медийной
              поддержкой
            </span>
            , чтобы наши клиенты могли сосредоточиться на игре.
          </p>
        </div>
      </div>
    </>
  );
}
