"use client";

import { useEffect, useState, useRef } from "react";
import { useData } from "@hooks/useData";
import gsap from "gsap";

// Определяем интерфейс для элемента галереи
interface GalleryItem {
  image: string;
  // Добавьте другие поля, если они есть в data.gallery
}

export default function AboutBlock22() {
  const { data, isLoading } = useData();
  const [mounted, setMounted] = useState(false);
  const [currentImages, setCurrentImages] = useState<string[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const galleryRef = useRef<HTMLDivElement>(null);
  const getImageUrl = (fileId: string) => `/api/img/${fileId}`;

  useEffect(() => {
    setMounted(true);
  }, []);

  // Предварительная загрузка изображений
  useEffect(() => {
    if (!mounted || isLoading || !data?.gallery) return;

    const preloadImages = () => {
      const imagePromises = data.gallery.map((item: GalleryItem) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.src = getImageUrl(item.image);
          img.onload = () => resolve(img);
          img.onerror = reject;
        });
      });

      Promise.all(imagePromises)
        .then(() => {
          setImagesLoaded(true);
        })
        .catch((error) => {
          console.error("Error preloading images:", error);
          setImagesLoaded(true); // Все равно продолжаем, даже если некоторые изображения не загрузились
        });
    };

    preloadImages();
  }, [mounted, isLoading, data]);

  useEffect(() => {
    if (
      !mounted ||
      isLoading ||
      !data?.gallery ||
      !galleryRef.current ||
      !imagesLoaded
    )
      return;

    const getRandomImages = () => {
      const shuffled = [...data.gallery].sort(() => Math.random() - 0.5);
      return shuffled.slice(0, 4).map((item: GalleryItem) => item.image);
    };

    setCurrentImages(getRandomImages());

    const interval = setInterval(() => {
      const images = galleryRef.current?.querySelectorAll(".gallery-item");
      if (!images) return;

      // Анимация исчезновения
      gsap.to(images, {
        opacity: 0,
        duration: 0.2,
        stagger: 0.1,
        onComplete: () => {
          setCurrentImages(getRandomImages());
          // Анимация появления
          gsap.to(images, {
            opacity: 1,
            duration: 0.2,
            stagger: 0.1,
          });
        },
      });
    }, 10000);

    return () => clearInterval(interval);
  }, [mounted, isLoading, data, imagesLoaded]);

  if (!mounted || isLoading || !data?.gallery || !imagesLoaded) return null;

  return (
    <div className="relative lg:mx-56">
      <div
        ref={galleryRef}
        className="gallery grid grid-cols-2 absolute inset-0 py-8 px-11 md:py-10 md:px-20 lg:py-20 lg:px-28 gap-x-10 gap-y-6 md:gap-x-11 md:gap-y-8 lg:gap-x-20 lg:gap-y-10"
      >
        {currentImages.map((imageId, index) => (
          <div
            key={index}
            className="relative overflow-hidden border border-t-[#cac9c8] border-l-[#cac9c8] border-r-[#f2f0ef] border-b-[#f2f0ef] aspect-[4/3]"
          >
            <img
              src={getImageUrl(imageId)}
              alt={`Gallery ${index + 1}`}
              className="absolute top-0 left-0 gallery-item object-cover object-center w-full h-full"
            />
          </div>
        ))}
      </div>
      <img src="/assets/img/about/b22.png" />
    </div>
  );
}
