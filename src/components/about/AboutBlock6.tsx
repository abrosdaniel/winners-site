"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export default function AboutBlock5() {
  const [mounted, setMounted] = useState(false);
  const b5Ref = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !b5Ref.current || !sliderRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    // Ждем загрузки всех изображений
    const images = sliderRef.current.querySelectorAll("img");
    Promise.all(
      Array.from(images).map((img) => {
        if (img.complete) return Promise.resolve();
        return new Promise((resolve) => {
          img.onload = resolve;
        });
      })
    ).then(() => {
      const containerWidth = b5Ref.current!.offsetWidth;
      const sliderWidth = sliderRef.current!.scrollWidth;

      const ctx = gsap.context(() => {
        gsap.fromTo(
          sliderRef.current,
          { x: 0 },
          {
            x: -(sliderWidth - containerWidth),
            scrollTrigger: {
              trigger: b5Ref.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      }, b5Ref);

      return () => ctx.revert();
    });
  }, [mounted]);

  if (!mounted) return null;

  return (
    <div className="font-inter relative box-border">
      <div className="flex flex-col gap-11 lg:gap-16 py-12 relative z-20">
        <div>
          <h3 className="font-normal text-lg leading-[21.7px] text-[#171D3D] px-5 lg:px-80 lg:w-9/12">
            Среди игроков, с которыми Николаев работал в те годы, были Алексей
            Чупин, Эдуард Кудерметов, Евгений Фёдоров, Евгений Варламов, Виталий
            Атюшов, Андрей Скопинцев, Сергей Вашедкевич, Александр Кувалдин и
            Александр Гоголев.
          </h3>
        </div>
        <div ref={b5Ref} className="overflow-hidden">
          <div ref={sliderRef} className="flex flex-row gap-5 w-max">
            {Array.from({ length: 9 }, (_, index) => (
              <img
                key={index}
                className="h-[300px] basis-1/3 lg:basis-1/6"
                src={`/assets/img/about/b5-${index + 1}.png`}
                alt={`Slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
        <div className="flex lg:justify-end">
          <h3 className="font-normal text-lg leading-[21.7px] text-[#171D3D] px-5 lg:px-80 lg:w-9/12">
            В 2003 году в агентство пришли такие звёзды, как Алексей Морозов и
            Данис Зарипов. К ним также присоединились игроки Алексей Кайгородов,
            Алексей Копейкин, Константин и Кирилл Кольцовы, Александр Свитов.
          </h3>
        </div>
      </div>
    </div>
  );
}
