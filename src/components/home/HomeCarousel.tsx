"use client";

import { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import { Carousel, CarouselContent, CarouselItem } from "@ui/carousel";

export function HomeCarousel() {
  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent className="-ml-0">
        {[
          { key: "1", base: "main", mob: "main-mob" },
          { key: "2", base: "players", mob: "players-mob" },
          { key: "3", base: "news", mob: "news-mob" },
          { key: "4", base: "agency", mob: "agency-mob" },
          { key: "5", base: "form", mob: "form-mob" },
        ].map((item) => (
          <CarouselItem key={item.key} className="pl-0">
            <picture>
              <source
                srcSet={`/assets/img/head/${item.base}.png`}
                media="(min-width: 1024px)"
              />
              <img
                className="object-cover object-top h-[545px] w-full lg:h-[462px]"
                src={`/assets/img/head/${item.mob}.png`}
                alt={`${item.base}`}
              />
            </picture>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
