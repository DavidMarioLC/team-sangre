"use client";

import { sendGTMEvent } from "@next/third-parties/google";
import { useRef } from "react";

export default function VideoPlayer() {
  const videoRef = useRef<HTMLVideoElement>(null);

  function handlePlay() {
    sendGTMEvent({ event: "video_play", video_title: "develacion-team-sangre" });
  }

  function handlePause() {
    const video = videoRef.current;
    if (!video) return;
    const progress = Math.round((video.currentTime / video.duration) * 100);
    sendGTMEvent({ event: "video_pause", video_title: "develacion-team-sangre", video_progress: progress });
  }

  function handleEnded() {
    sendGTMEvent({ event: "video_complete", video_title: "develacion-team-sangre" });
  }

  return (
    <video
      ref={videoRef}
      muted
      width="1920"
      height="1080"
      controls
      preload="metadata"
      poster="/videos/miniatura.jpg"
      className="w-full h-full object-cover aspect-video"
      loop
      autoPlay
      onPlay={handlePlay}
      onPause={handlePause}
      onEnded={handleEnded}
    >
      <source
        src="https://wdoobjyxglipuljfcusq.supabase.co/storage/v1/object/public/media/develacion-team-sangre.mp4"
        type="video/mp4"
      />
      Tu navegador no soporta el elemento de video.
    </video>
  );
}
