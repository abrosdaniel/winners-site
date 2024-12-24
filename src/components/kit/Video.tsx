"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@ui/dialog";
import { useEffect, useRef, useState } from "react";

interface VideoProps {
  video: string;
  preview: string;
  title: string;
  allVideos?: any[];
  currentId?: number;
}

export function Video({
  video,
  preview,
  title,
  allVideos,
  currentId,
}: VideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [videoError, setVideoError] = useState<string | null>(null);
  const [currentTitle, setCurrentTitle] = useState(title);
  const [currentVideoId, setCurrentVideoId] = useState(currentId);

  const getImageUrl = (fileId: string) => `/api/img/${fileId}`;
  const getVideoUrl = (fileId: string) =>
    `${process.env.NEXT_PUBLIC_DIRECTUS_URL}/assets/${fileId}`;

  useEffect(() => {
    const updateIsDesktop = () => {
      setIsDesktop(window.matchMedia("(min-width: 1024px)").matches);
    };
    updateIsDesktop();
    window.addEventListener("resize", updateIsDesktop);
    return () => window.removeEventListener("resize", updateIsDesktop);
  }, []);

  const getRecommendedVideos = () => {
    if (!allVideos) return [];
    const otherVideos = allVideos
      .filter((item) => item.id !== currentVideoId)
      .sort((a, b) => a.id - b.id)
      .slice(0, isDesktop ? 5 : 2);
    return otherVideos;
  };

  const handleOpenChange = (open: boolean) => {
    setIsDialogOpen(open);
    setVideoError(null);
    if (!open && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const handleVideoError = (e: any) => {
    console.error("Video error event:", e);
    if (videoRef.current) {
      console.error("Video error details:", {
        error: videoRef.current.error,
        networkState: videoRef.current.networkState,
        readyState: videoRef.current.readyState,
        src: videoRef.current.src,
      });
    }
    setVideoError("Ошибка при воспроизведении видео");
  };

  const handleVideoClick = (
    newVideo: string,
    newTitle: string,
    newId: number
  ) => {
    setVideoError(null);
    setCurrentTitle(newTitle);
    setCurrentVideoId(newId);

    if (videoRef.current) {
      const videoElement = videoRef.current;
      videoElement.src = getVideoUrl(newVideo);
      videoElement.load();
      videoElement.play().catch((error) => {
        console.error("Error playing video:", error);
        setVideoError("Ошибка при воспроизведении видео");
      });
    }
  };

  const recommendedVideos = getRecommendedVideos();

  return (
    <Dialog onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <div className="cursor-pointer flex flex-row gap-2 items-center lg:flex-col border lg:border-none border-[#D0D0D0] rounded-xl overflow-hidden justify-center">
          <div className="relative w-1/2 lg:w-full">
            <img
              src={getImageUrl(preview)}
              alt={title}
              className="w-full aspect-video object-cover object-center lg:rounded-xl"
              loading="lazy"
            />
            <div className="absolute left-0 bottom-0 flex items-center justify-center">
              <div className="w-14 h-14 rounded-xl bg-orange-500/80 flex items-center justify-center group-hover:bg-orange-500 transition-colors">
                <div className="w-9 h-9 border border-white rounded-full flex items-center justify-center">
                  <img
                    className="p-3 translate-x-[1px]"
                    src="/assets/icons/ui/play.svg"
                    alt="play"
                  />
                </div>
              </div>
            </div>
          </div>
          <h3 className="w-1/2 lg:w-full font-inter font-semibold text-sm lg:text-lg text-[#171D3D] line-clamp-3">
            {title}
          </h3>
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-[95vw] border-none lg:max-w-[60vw] p-0 bg-transparent">
        <div className="flex flex-col">
          {isDialogOpen && (
            <div className="relative bg-[#171D3D] rounded-xl overflow-hidden">
              <video
                ref={videoRef}
                controls
                className="w-full aspect-video"
                src={getVideoUrl(video)}
                autoPlay
                preload="auto"
                playsInline
                onError={handleVideoError}
              >
                Ваш браузер не поддерживает видео
              </video>
              <DialogTitle className="font-inter font-semibold text-white p-3 text-base">
                {currentTitle}
              </DialogTitle>
              {videoError && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                  <p className="text-white text-lg">{videoError}</p>
                </div>
              )}
            </div>
          )}
          {allVideos && recommendedVideos.length > 0 && (
            <div className="pt-6">
              <DialogDescription className="font-bold text-4xl text-white mb-5">
                ДРУГИЕ ВИДЕО WINNERS
              </DialogDescription>
              <div className="grid grid-cols-2 gap-3 lg:grid-cols-5">
                {recommendedVideos.map((item) => (
                  <div
                    key={item.id}
                    className="cursor-pointer bg-[#171D3D] rounded-xl overflow-hidden"
                    onClick={() =>
                      handleVideoClick(item.video, item.title, item.id)
                    }
                  >
                    <div className="relative">
                      <img
                        src={getImageUrl(item.preview)}
                        alt={item.title}
                        className="w-full aspect-video object-cover"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-14 h-14 rounded-xl bg-orange-500/80 flex items-center justify-center group-hover:bg-orange-500 transition-colors">
                          <div className="w-9 h-9 border border-white rounded-full flex items-center justify-center">
                            <img
                              className="p-3 translate-x-[1px]"
                              src="/assets/icons/ui/play.svg"
                              alt="play"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <h4 className="font-inter font-semibold text-white p-1 text-sm">
                      {item.title}
                    </h4>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
