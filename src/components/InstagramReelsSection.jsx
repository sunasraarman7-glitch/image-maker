import React from 'react';
import { STUDIO_INFO } from '../data/studioData';

export default function InstagramReelsSection() {
  return (
    <section className="py-20 px-margin-mobile md:px-margin-desktop border-t border-stone-800/80">
      <div className="max-w-container-max mx-auto space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 text-primary font-sans font-bold text-xs uppercase tracking-[0.22em]">
              <span className="material-symbols-outlined text-[16px]">photo_camera</span>
              <span>INSTAGRAM FEED & REELS</span>
            </div>
            <h2 className="font-headline text-4xl sm:text-5xl text-white uppercase tracking-tight">
              TRENDING ON INSTAGRAM
            </h2>
            <div className="w-12 h-[2px] bg-primary shadow-[0_0_8px_#F5B800]"></div>
          </div>

          <a
            href={STUDIO_INFO.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] text-white font-sans font-bold text-xs uppercase tracking-wider px-5 py-2.5 rounded-[6px] shadow-lg hover:opacity-95 hover:scale-105 transition-all duration-200 self-start md:self-auto border border-white/20"
          >
            <span className="material-symbols-outlined text-sm">photo_camera</span>
            <span>FOLLOW {_IMAGE_MAKER_STUDIO(STUDIO_INFO.instagram)}</span>
          </a>
        </div>

        {/* 5 Instagram Reels Grid with Liquid Glass cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4">
          {STUDIO_INFO.instagramReels.map((reel) => (
            <a
              key={reel.id}
              href={reel.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-[9/16] rounded-[8px] overflow-hidden border border-white/15 hover:border-primary transition-all duration-300 shadow-xl hover:shadow-[0_0_30px_rgba(245,184,0,0.3)] flex flex-col justify-between p-3 bg-[#111111]/80 backdrop-blur-md hover:-translate-y-1.5"
            >
              {/* Thumbnail Image */}
              <img
                src={reel.image}
                alt={reel.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-108 transition-transform duration-600"
              />

              {/* Dark Gradient Overlay with Glass Reflection */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/60 group-hover:via-black/15 transition-colors"></div>

              {/* Top Badge: Instagram Reel Tag */}
              <div className="relative z-10 flex items-center justify-between">
                <span className="inline-flex items-center gap-1 bg-black/65 backdrop-blur-md border border-white/15 text-white text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-[4px] shadow-sm">
                  <span className="material-symbols-outlined text-[11px] text-primary">play_circle</span>
                  <span>REEL</span>
                </span>

                <span className="text-white/90 text-[9px] font-medium bg-black/50 backdrop-blur-md px-1.5 py-0.5 rounded-[4px] border border-white/10">
                  {reel.views}
                </span>
              </div>

              {/* Center Play Icon (Pulsing on hover) */}
              <div className="relative z-10 self-center w-11 h-11 rounded-full bg-primary/95 text-black flex items-center justify-center shadow-[0_0_20px_rgba(245,184,0,0.5)] group-hover:scale-115 group-hover:bg-primary transition-all duration-300">
                <span className="material-symbols-outlined text-2xl font-bold ml-0.5">play_arrow</span>
              </div>

              {/* Bottom Details */}
              <div className="relative z-10 space-y-1 bg-black/40 backdrop-blur-sm p-2 rounded-[6px] border border-white/10">
                <span className="text-primary text-[9px] font-bold uppercase tracking-wider block">
                  {reel.category}
                </span>
                <h4 className="text-white text-xs font-bold leading-tight line-clamp-2 group-hover:text-primary transition-colors">
                  {reel.title}
                </h4>
                <div className="flex items-center gap-1 text-[10px] text-stone-300 pt-0.5 opacity-90 group-hover:text-white">
                  <span>Watch on Instagram</span>
                  <span className="text-xs">↗</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function _IMAGE_MAKER_STUDIO(handle) {
  return handle ? `@${handle.replace('@', '')}` : '@_image_maker_studio';
}
