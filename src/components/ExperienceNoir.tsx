import React, { useRef, useState } from "react";
import { Play, Pause, Volume2, VolumeX, Maximize2 } from "lucide-react";

interface Chapter {
  label: string;
  time: number; // in seconds
  description: string;
}

const CHAPTERS: Chapter[] = [
  { label: "Exterior Façade", time: 0, description: "Illuminated nighttime architecture" },
  { label: "Main Dining Hall", time: 2.5, description: "Warm timber & curved mustard seating" },
  { label: "Banquette Lounge", time: 5.0, description: "Intimate private booths & ambient light" },
  { label: "Live Culinary Lounge", time: 7.5, description: "Charcoal sizzle & artisan plating" },
];

export const ExperienceNoir: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [activeChapter, setActiveChapter] = useState(0);

  const handlePlayToggle = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleMuteToggle = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  const handleChapterClick = (index: number, time: number) => {
    setActiveChapter(index);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      if (!isPlaying) {
        videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
      }
    }
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const curr = videoRef.current.currentTime;
    for (let i = CHAPTERS.length - 1; i >= 0; i--) {
      if (curr >= CHAPTERS[i].time) {
        setActiveChapter(i);
        break;
      }
    }
  };

  const handleFullscreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      }
    }
  };

  return (
    <section
      id="experience"
      className="relative bg-[#0c0c0e] py-24 px-4 sm:px-6 lg:px-8 border-b border-white/[0.05]"
    >
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/[0.08] pb-8">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 text-[11px] uppercase tracking-[0.3em] text-[#c5a059] font-medium">
              <span>Authentic Walkthrough</span>
            </div>
            <h2 className="font-editorial text-3xl sm:text-5xl text-[#FAF8F2] tracking-tight font-normal">
              Experience Noir
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#F5F2EA]/60 max-w-md font-light leading-relaxed">
            Step directly into our space. Explore the interplay of rich dark textures,
            bespoke amber lighting, and the live rhythm of our restaurant in Attock.
          </p>
        </div>

        {/* Video Canvas & Controls Container */}
        <div className="relative rounded-xl overflow-hidden border border-white/[0.08] bg-black/40 shadow-2xl">
          <video
            ref={videoRef}
            id="noir-experience-video"
            className="w-full aspect-video md:aspect-[21/9] object-cover"
            playsInline
            muted={isMuted}
            poster="/assets/images/Screenshot_20260913-175240~2.jpg"
            onTimeUpdate={handleTimeUpdate}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          >
            <source src="/videos/experience_noir.mp4" type="video/mp4" />
            <source src="/videos/noir_walkthrough.mp4" type="video/mp4" />
            <source src="/videos/experience.mp4" type="video/mp4" />
            <img
              src="/assets/images/Screenshot_20260913-175240~2.jpg"
              alt="Noir Café Interior Walkthrough"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </video>

          {/* Central Play/Pause Button Overlay if paused */}
          {!isPlaying && (
            <div
              onClick={handlePlayToggle}
              className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-[2px] cursor-pointer group transition-all"
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#c5a059]/90 text-[#0c0c0e] flex items-center justify-center shadow-2xl transform transition-transform group-hover:scale-110">
                <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-current translate-x-0.5" />
              </div>
            </div>
          )}

          {/* Floating Minimal Video Overlay Bar */}
          <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between p-3 rounded-lg bg-black/60 backdrop-blur-md border border-white/10 text-xs text-[#F5F2EA]">
            <div className="flex items-center space-x-3">
              <button
                onClick={handlePlayToggle}
                aria-label={isPlaying ? "Pause video" : "Play video"}
                className="p-1.5 rounded hover:bg-white/10 text-[#FAF8F2] transition-colors cursor-pointer"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
              </button>
              <button
                onClick={handleMuteToggle}
                aria-label={isMuted ? "Unmute video" : "Mute video"}
                className="p-1.5 rounded hover:bg-white/10 text-[#FAF8F2] transition-colors cursor-pointer"
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-[#c5a059]" />}
              </button>
              <span className="text-[11px] text-[#F5F2EA]/60 tracking-wider">
                {CHAPTERS[activeChapter].label}
              </span>
            </div>

            <button
              onClick={handleFullscreen}
              aria-label="Fullscreen video"
              className="p-1.5 rounded hover:bg-white/10 text-[#FAF8F2] transition-colors cursor-pointer"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Video Chapter Timestamps Navigation (Seeks to timestamps within the video) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2">
          {CHAPTERS.map((chapter, idx) => {
            const isCurrent = activeChapter === idx;
            return (
              <button
                key={chapter.label}
                onClick={() => handleChapterClick(idx, chapter.time)}
                className={`p-4 text-left rounded-lg transition-all border cursor-pointer ${
                  isCurrent
                    ? "bg-white/[0.05] border-[#c5a059] shadow-lg shadow-[#c5a059]/5"
                    : "bg-white/[0.02] border-white/[0.06] hover:border-white/20"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] uppercase tracking-widest text-[#c5a059] font-mono">
                    00:{chapter.time.toString().padStart(2, "0")}
                  </span>
                  {isCurrent && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#c5a059]" />
                  )}
                </div>
                <div className="text-xs sm:text-sm font-medium text-[#FAF8F2]">
                  {chapter.label}
                </div>
                <div className="text-[11px] text-[#F5F2EA]/50 truncate mt-0.5">
                  {chapter.description}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
