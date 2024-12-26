"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export default function AboutBlock3() {
  const [mounted, setMounted] = useState(false);
  const b3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    gsap.registerPlugin(ScrollTrigger);

    const akb = b3Ref.current?.querySelector(".akb");
    const map = b3Ref.current?.querySelector(".map");

    if (akb && map) {
      const ctx = gsap.context(() => {
        gsap.fromTo(
          akb,
          { scale: 0 },
          {
            scale: 1,
            scrollTrigger: {
              trigger: b3Ref.current,
              start: "50% 90%",
              end: "50% 40%",
              scrub: true,
            },
          }
        );

        gsap.fromTo(
          map,
          { opacity: 0 },
          {
            opacity: 1,
            scrollTrigger: {
              trigger: b3Ref.current,
              start: "50% 100%",
              end: "50% 50%",
              scrub: true,
            },
          }
        );
      }, b3Ref);

      return () => ctx.revert();
    }
  }, [mounted]);

  if (!mounted) return null;

  return (
    <div className="font-inter px-5 py-24 overflow-hidden h-[680px] lg:px-80 bg-white">
      <div className="z-10 relative font-normal flex flex-col gap-5 lg:w-10/12 lg:h-full lg:justify-center">
        <h3 className="text-3xl lg:text-4xl text-[#171D3D]">
          Одной из первых команд, с которой он сотрудничал, был{" "}
          <span className="font-medium">«Ак Барс»</span>
        </h3>
        <p className="text-lg leading-[21.8px] text-[#5B5B5B] w-10/12 lg:w-7/12">
          «Ак Барс» выступал в российской Суперлиге. Будучи неравнодушным к
          хоккею, Юрий Леонидович уже тогда представлял, насколько тяжёл путь к
          успеху для каждого игрока.
        </p>
      </div>
      <div
        ref={b3Ref}
        className="z-0 relative translate-x-[40px] -translate-y-[220px] lg:translate-x-[80%] lg:-translate-y-full"
      >
        <img
          className="akb absolute h-[44.5px] lg:h-[55px] top-[310px] lg:top-[390px] left-[220px] lg:left-[280px]"
          src="/assets/img/about/b4-akb.png"
        />
        <img
          className="map h-[516px] lg:h-[640px] max-w-max lg:max-w-7xl"
          src="/assets/img/about/b4-map.svg"
        />
      </div>
    </div>
  );
}
