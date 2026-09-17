import React, { useRef, useState, useEffect } from "react";
import { ChevronDown, Volume2, VolumeX } from "lucide-react";

export const Hero: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [hasVideoLoaded, setHasVideoLoaded] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay may be restricted by browser until user gesture
      });
    }
  }, []);

  const toggleSound = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  return (
    <section
      id="hero-section"
      className="relative w-full h-screen overflow-hidden bg-[#0c0c0e]"
    >
      {/* Original Video Element */}
      <video
        ref={videoRef}
        id="noir-hero-video"
        className="w-full h-full object-cover transition-opacity duration-700"
        autoPlay
        muted
        playsInline
        loop
        poster="/assets/images/Screenshot_20260914-114946.png"
        onLoadedData={() => setHasVideoLoaded(true)}
      >
        <source src="/videos/hero_video.mp4" type="video/mp4" />
        <source src="/videos/noir_hero.mp4" type="video/mp4" />
        <source src="/videos/hero.mp4" type="video/mp4" />
        {/* Fallback image if video is not supported */}
        <img
          src="/assets/images/Screenshot_20260914-114946.png"
          alt="Noir Café Attock"
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </video>

      {/* Subtle minimal sound control for guest preference */}
      <div className="absolute bottom-8 right-8 z-20 flex items-center space-x-3">
        <button
          onClick={toggleSound}
          aria-label={isMuted ? "Unmute audio" : "Mute audio"}
          className="p-2.5 rounded-full bg-black/40 hover:bg-black/70 text-[#FAF8F2] border border-white/10 backdrop-blur-sm transition-all duration-200 cursor-pointer text-xs flex items-center space-x-2"
        >
          {isMuted ? (
            <VolumeX className="w-3.5 h-3.5 text-[#F5F2EA]/70" />
          ) : (
            <Volume2 className="w-3.5 h-3.5 text-[#c5a059]" />
          )}
        </button>
      </div>

      {/* Subtle scroll cue at bottom center */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center pointer-events-none opacity-70">
        <span className="text-[10px] uppercase tracking-[0.3em] text-[#F5F2EA]/60 font-medium mb-1">
          Explore
        </span>
        <ChevronDown className="w-4 h-4 text-[#F5F2EA]/50 animate-bounce" />
      </div>
    </section>
  );
};
