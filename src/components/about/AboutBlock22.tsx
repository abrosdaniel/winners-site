"use client";

import { useEffect, useState, useRef } from "react";
import { useData } from "@hooks/useData";
import gsap from "gsap";

export default function AboutBlock22() {
  const { data, isLoading } = useData();
  const [mounted, setMounted] = useState(false);
  const [currentImages, setCurrentImages] = useState<string[]>([]);
  const [nextImages, setNextImages] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const galleryRef = useRef<HTMLDivElement>(null);
  const getImageUrl = (fileId: string) => `/api/img/${fileId}`;

  const preloadImages = (imageUrls: string[]) => {
    return Promise.all(
      imageUrls.map((url) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = resolve;
          img.onerror = reject;
          img.src = getImageUrl(url);
        });
      })
    );
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || isLoading || !data?.gallery || !galleryRef.current) return;

    const getNextImages = () => {
      const totalImages = data.gallery.length;
      const images = [];

      for (let i = 0; i < 4; i++) {
        const index = (currentIndex + i) % totalImages;
        images.push(data.gallery[index].image);
      }

      setCurrentIndex((prevIndex) => (prevIndex + 4) % totalImages);
      return images;
    };

    if (currentImages.length === 0) {
      const initialImages = getNextImages();
      setCurrentImages(initialImages);
      const nextSet = getNextImages();
      setNextImages(nextSet);
    }

    const interval = setInterval(async () => {
      if (isTransitioning) return;
      setIsTransitioning(true);

      try {
        const nextSet = getNextImages();
        await preloadImages(nextSet);
        await new Promise<void>((resolve) => {
          gsap.to(".gallery-item", {
            opacity: 0,
            duration: 0.5,
            stagger: 0.1,
            onComplete: resolve,
          });
        });
        setCurrentImages(nextImages);
        setNextImages(nextSet);
        await new Promise((resolve) => setTimeout(resolve, 50));
        gsap.fromTo(
          ".gallery-item",
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.5,
            stagger: 0.1,
            onComplete: () => {
              setIsTransitioning(false);
            },
          }
        );
      } catch (error) {
        console.error("Error in transition:", error);
        setIsTransitioning(false);
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [mounted, isLoading, data, currentIndex, nextImages, isTransitioning]);

  if (!mounted || isLoading || !data?.gallery) return null;

  return (
    <div className="relative max-w-5xl mx-auto">
      <div
        ref={galleryRef}
        className="gallery grid grid-cols-2 absolute inset-0 py-8 px-11 md:py-10 md:px-20 lg:py-20 lg:px-28 gap-x-10 gap-y-6 md:gap-x-11 md:gap-y-8 lg:gap-x-20 lg:gap-y-10"
      >
        {currentImages.map((imageId, index) => (
          <div
            key={`current-${imageId}-${index}`}
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
