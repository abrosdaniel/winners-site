"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export function HomeWelcome() {
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const slides = [
    { key: "1", base: "main", mob: "main-mob" },
    { key: "2", base: "players", mob: "players-mob" },
    { key: "3", base: "news", mob: "news-mob" },
    { key: "4", base: "agency", mob: "agency-mob" },
    { key: "5", base: "form", mob: "form-mob" },
  ];

  useEffect(() => {
    setMounted(true);
    if (!containerRef.current) return;

    const slides = containerRef.current.children;
    const totalSlides = slides.length;
    let currentSlide = 0;

    // Начальная настройка
    gsap.set(slides, { position: "absolute", top: 0, left: 0 });
    gsap.set(slides, { autoAlpha: 0 });
    gsap.set(slides[0], { autoAlpha: 1 });

    const animateSlides = () => {
      const nextSlide = (currentSlide + 1) % totalSlides;

      // Анимация исчезновения текущего слайда
      gsap.to(slides[currentSlide], {
        autoAlpha: 0,
        duration: 1.5,
        ease: "power2.inOut",
      });

      // Анимация появления следующего слайда
      gsap.to(slides[nextSlide], {
        autoAlpha: 1,
        duration: 1.5,
        ease: "power2.inOut",
      });

      currentSlide = nextSlide;
    };

    const interval = setInterval(animateSlides, 5000); // Меняем слайды каждые 5 секунд

    return () => clearInterval(interval);
  }, [mounted]);

  if (!mounted) return null;

  return (
    <div className="flex flex-col h-[calc(100vh+170px)] lg:h-screen">
      <div
        ref={containerRef}
        className="relative w-full h-full overflow-hidden"
      >
        {slides.map((item) => (
          <div key={item.key} className="w-full h-full">
            <picture>
              <source
                srcSet={`/assets/img/head/${item.base}.png`}
                media="(min-width: 1024px)"
              />
              <img
                className="object-cover object-top w-full h-full"
                src={`/assets/img/head/${item.mob}.png`}
                alt={`${item.base}`}
              />
            </picture>
          </div>
        ))}
      </div>
      <div className="justify-center items-center flex flex-col bg-[#171D3D] text-white pt-5 pb-12 px-2">
        <div className="lg:w-10/12">
          <div className="flex flex-col lg:flex-row lg:gap-28 lg:items-center">
            <div className="flex flex-col font-bold">
              <h2 className="text-4xl lg:text-[40px]">ХОККЕЙНОЕ АГЕНТСТВО</h2>
              <h1 className="text-[128px] lg:text-[160px] leading-[128px] lg:leading-[160px]">
                WINNERS
              </h1>
            </div>
            <div className="flex lg:hidden text-[#171D3D] px-9 py-5 flex-row gap-5 bg-white rounded-full mb-7">
              <div className="flex flex-col">
                <p className="font-bold text-5xl">18</p>
                <p className="font-inter font-normal text-xs leading-[14.5px]">
                  лет работы
                  <br />
                  агентства
                </p>
              </div>
              <div className="flex flex-col">
                <p className="font-bold text-5xl">73%</p>
                <p className="font-inter font-normal text-xs leading-[14.5px]">
                  клиентов агенства
                  <br />
                  игроки КХЛ и НХЛ
                </p>
              </div>
              <div className="flex flex-col">
                <p className="font-bold text-5xl">21</p>
                <p className="font-inter font-normal text-xs leading-[14.5px]">
                  игрок
                  <br />
                  НХЛ
                </p>
              </div>
              <div className="flex flex-col">
                <p className="font-bold text-5xl">200+</p>
                <p className="font-inter font-normal text-xs leading-[14.5px]">
                  игроков
                  <br />
                  КХЛ
                </p>
              </div>
            </div>
            <p className="font-inter font-normal text-lg leading-[21.8px] lg:w-6/12">
              <span className="text-[32px] leading-[38.5px] lg:text-lg lg:leading-5">
                Winners — агентство спортивного менеджмента.
              </span>
              <br />
              <span className="font-semibold text-orange-500">
                Мы занимаемся поиском контрактов, юридической и медийной
                поддержкой
              </span>
              , чтобы наши клиенты могли сосредоточиться на игре.{" "}
              <span className="hidden lg:block">
                Нас выбирают звезды, такие как Артемий Панарин, Илья Ковальчук,
                Данис Зарипов, и многие другие ведущие игроки, доверяя нашему
                опыту и профессионализму.
              </span>
            </p>
          </div>
          <div className="hidden lg:flex text-[#171D3D] flex-row justify-center py-5 gap-28 bg-white rounded-full my-7">
            <div className="flex flex-col">
              <p className="font-bold text-7xl">18</p>
              <p className="font-inter font-normal text-lg leading-[21.5px]">
                лет работы агентства
              </p>
            </div>
            <div className="flex flex-col">
              <p className="font-bold text-7xl">73%</p>
              <p className="font-inter font-normal text-lg leading-[21.5px]">
                клиентов агенства
                <br />
                игроки КХЛ и НХЛ
              </p>
            </div>
            <div className="flex flex-col">
              <p className="font-bold text-7xl">200+</p>
              <p className="font-inter font-normal text-lg leading-[21.5px]">
                игроков КХЛ
              </p>
            </div>
            <div className="flex flex-col">
              <p className="font-bold text-7xl">21</p>
              <p className="font-inter font-normal text-lg leading-[21.5px]">
                игрок НХЛ
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
