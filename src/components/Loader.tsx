"use client";

import { useEffect, useState } from "react";
import { Photo } from "./Photo";

export default function Loader() {
  const [isVisible, setIsVisible] = useState(true);
  const [shouldUnmount, setShouldUnmount] = useState(false);
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const calculateProgress = () => {
      if (typeof window === "undefined" || !window.performance) {
        return 0;
      }

      const navigation = performance.getEntriesByType(
        "navigation"
      )[0] as PerformanceNavigationTiming;
      if (!navigation) return 0;

      const resources = performance.getEntriesByType(
        "resource"
      ) as PerformanceResourceTiming[];
      const totalResources = resources.length;
      const loadedResources = resources.filter(
        (resource) => resource.transferSize > 0
      ).length;

      const resourceProgress =
        totalResources > 0 ? (loadedResources / totalResources) * 80 : 0;

      const documentProgress = document.readyState === "complete" ? 20 : 10;

      return Math.min(100, Math.round(resourceProgress + documentProgress));
    };

    const updateProgress = () => {
      const currentProgress = calculateProgress();
      setProgress(currentProgress);
    };

    const interval = setInterval(updateProgress, 100);

    const observer = new PerformanceObserver((list) => {
      updateProgress();
    });

    try {
      observer.observe({ entryTypes: ["resource"] });
    } catch (e) {}

    updateProgress();

    return () => {
      clearInterval(interval);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const handleLoad = () => {
      setProgress(100);
      setIsPageLoaded(true);
    };

    if (document.readyState === "complete") {
      setProgress(100);
      setIsPageLoaded(true);
    } else {
      window.addEventListener("load", handleLoad);
    }

    return () => window.removeEventListener("load", handleLoad);
  }, []);

  useEffect(() => {
    if (!isPageLoaded) return;
    const minTimer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => {
        setShouldUnmount(true);
      }, 500);
    }, 2000);

    return () => clearTimeout(minTimer);
  }, [isPageLoaded]);

  if (shouldUnmount) return null;

  return (
    <div
      className={`fixed top-0 left-0 w-screen h-full z-50 bg-[#171D3D] transition-all duration-500 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="relative w-full h-full flex items-center justify-center">
        <Photo
          className="size-52 lg:size-96"
          src="/assets/icons/logo/logo.png"
          alt="logo"
          fit="contain"
        />
        <div className="absolute bottom-0 left-0 w-full">
          <p className="px-5 text-[#FF730A] font-bold text-right text-5xl !leading-[30px] lg:text-8xl lg:!leading-[58px]">
            {progress}%
          </p>
          <div className="relative w-full h-5 bg-[#FF730A]/20">
            <div
              className="absolute left-0 top-0 h-full bg-[#FF730A] transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}
