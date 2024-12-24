"use client";

import { useEffect, useState, useRef } from "react";
import { useData } from "@hooks/useData";
import gsap from "gsap";

export default function AboutBlock22() {
  const { data, isLoading } = useData();
  const [mounted, setMounted] = useState(false);
  const [currentImages, setCurrentImages] = useState<string[]>([]);
  const galleryRef = useRef<HTMLDivElement>(null);
  const getImageUrl = (fileId: string) => `/api/img/${fileId}`;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || isLoading || !data?.gallery || !galleryRef.current) return;

    const getRandomImages = () => {
      const shuffled = [...data.gallery].sort(() => Math.random() - 0.5);
      return shuffled.slice(0, 4).map((item) => item.image);
    };

    setCurrentImages(getRandomImages());

    const interval = setInterval(() => {
      const images = galleryRef.current?.querySelectorAll(".gallery-item");
      if (!images) return;

      // Анимация исчезновения
      gsap.to(images, {
        opacity: 0,
        scale: 0.8,
        duration: 0.5,
        stagger: 0.1,
        onComplete: () => {
          setCurrentImages(getRandomImages());
          // Анимация появления
          gsap.to(images, {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            stagger: 0.1,
          });
        },
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [mounted, isLoading, data]);

  if (!mounted || isLoading || !data?.gallery) return null;

  return (
    <div className="relative lg:mx-56">
      <div
        ref={galleryRef}
        className="gallery grid grid-cols-2 absolute inset-0 py-8 px-11 md:py-10 md:px-20 lg:py-20 lg:px-28 gap-x-10 gap-y-6 md:gap-x-11 md:gap-y-8 lg:gap-x-20 lg:gap-y-10"
      >
        {currentImages.map((imageId, index) => (
          <div
            key={index}
            className="overflow-hidden border border-t-[#cac9c8] border-l-[#cac9c8] border-r-[#f2f0ef] border-b-[#f2f0ef]"
          >
            <img
              src={getImageUrl(imageId)}
              alt={`Gallery ${index + 1}`}
              className="gallery-item object-cover object-center aspect-square"
            />
          </div>
        ))}
      </div>
      <img src="/assets/img/about/b22.png" />
    </div>
  );
}
