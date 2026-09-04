import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { SERVICES, STUDIO_INFO } from '../data/studioData';
import servicesHeroImg from '../assets/hero/services-hero.png';
import servicesHeroVideo from '../assets/hero/services-hero-video.mp4';

export default function ServicesPage() {
  const { openBookingModal } = useApp();

  return (
    <div className="w-full text-white">
      {/* ========================================================================= */}
      {/* 1. CINEMATIC VIDEO HERO SECTION (VIBRANT & HIGH VISIBILITY)                */}
      {/* ========================================================================= */}
      <section className="relative z-20 w-full min-h-[55vh] sm:min-h-[65vh] md:min-h-[70vh] bg-[#050505] flex items-center justify-start px-margin-mobile md:px-margin-desktop pt-24 sm:pt-28 md:pt-36 pb-14 md:pb-20 overflow-hidden border-b border-[#1a1a1a] shadow-2xl">
        {/* Background Video Container */}
        <div className="absolute inset-0 z-0 bg-[#050505] overflow-hidden select-none">
          <video
            autoPlay
            loop
            muted
            playsInline
            poster={servicesHeroImg}
            className="w-full h-full object-cover object-[72%_center] md:object-right transition-transform duration-1000 scale-100 brightness-105 contrast-105"
          >
            <source src={servicesHeroVideo} type="video/mp4" />
            <img
              alt="Services Camera Background"
              className="w-full h-full object-cover object-[72%_center] md:object-right"
              src={servicesHeroImg}
            />
          </video>
          {/* Subtle gradient overlay to keep video bright & clearly visible */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/35 to-transparent md:from-black/70 md:via-black/25 md:to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-black/20"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-2xl space-y-3 md:space-y-4">
          <p className="text-primary font-sans font-bold text-xs uppercase tracking-[0.22em] flex items-center gap-2 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
            <span className="text-primary text-xs">✦</span>
            <span>WHAT WE DO</span>
          </p>

          <h1 className="font-headline text-5xl sm:text-6xl md:text-7xl lg:text-[88px] text-white uppercase leading-none tracking-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]">
            OUR SERVICES
          </h1>

          <div className="w-12 h-[2px] bg-primary shadow-[0_0_8px_#F5B800]"></div>

          <p className="text-stone-200 font-sans text-xs sm:text-sm md:text-base leading-relaxed max-w-xl font-medium drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
            From precious moments to grand celebrations, we capture it all with creativity and perfection.
          </p>

          {/* Breadcrumbs with home icon */}
          <div className="flex items-center gap-2 text-xs font-sans text-stone-300 pt-2 drop-shadow-md">
            <Link to="/" className="text-primary hover:underline flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px]">home</span>
            </Link>
            <span className="text-stone-500">/</span>
            <span className="text-stone-300 font-medium">Services</span>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. BODY CONTENT (REVEALS THE GORGEOUS BACKGROUND IMAGE DIRECTLY BEHIND)   */}
      {/* ========================================================================= */}
      <div className="relative z-10 w-full bg-transparent">
        {/* ========================================================================= */}
        {/* 2. SERVICES GRID (4 LIQUID GLASS CARDS)                                   */}
        {/* ========================================================================= */}
        <section className="py-20 px-margin-mobile md:px-margin-desktop">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-container-max mx-auto">
            {SERVICES.map((srv) => (
              <div
                key={srv.id}
                className="liquid-glass rounded-[8px] overflow-hidden flex flex-col justify-between group shadow-xl hover:-translate-y-1 transition-all duration-300 border border-white/15 hover:border-primary/60"
              >
                <div>
                  {/* Service Image with Top Badge Icon */}
                  <div className="relative h-[250px] overflow-hidden">
                    <img
                      src={srv.image}
                      alt={srv.title}
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-600"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent"></div>

                    {/* Top-Right Round Gold Icon Badge */}
                    <div className="absolute top-4 right-4 w-11 h-11 rounded-full border border-primary bg-black/85 backdrop-blur-md flex items-center justify-center text-primary shadow-lg group-hover:scale-110 group-hover:drop-shadow-[0_0_10px_#F5B800] transition-all">
                      <span className="material-symbols-outlined text-2xl">
                        {srv.icon}
                      </span>
                    </div>

                    {/* Bottom-Left Category Tag */}
                    <div className="absolute bottom-3 left-3">
                      <span className="bg-black/75 backdrop-blur-md border border-primary/40 text-primary text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-[4px] shadow-sm">
                        {srv.title}
                      </span>
                    </div>
                  </div>

                  {/* Service Content */}
                  <div className="p-6 space-y-4">
                    <div>
                      <h3 className="font-sans font-bold text-white text-lg uppercase tracking-wider group-hover:text-primary transition-colors">
                        {srv.title}
                      </h3>
                      <div className="w-8 h-[2px] bg-primary mt-1.5 shadow-[0_0_6px_#F5B800]"></div>
                    </div>

                    <p className="text-stone-300 text-xs sm:text-sm leading-relaxed font-normal">
                      {srv.description}
                    </p>

                    {/* Key Highlights / Features list */}
                    {srv.features && srv.features.length > 0 && (
                      <div className="pt-2 border-t border-white/10 space-y-2">
                        <p className="text-primary font-sans font-bold text-[10px] uppercase tracking-widest">
                          SERVICE HIGHLIGHTS
                        </p>
                        <ul className="space-y-1.5 text-xs text-stone-300">
                          {srv.features.map((feat, idx) => (
                            <li key={idx} className="flex items-center gap-2">
                              <span className="material-symbols-outlined text-primary text-sm shrink-0 fill-1">
                                check_circle
                              </span>
                              <span>{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>

                {/* Service Footer CTA Buttons */}
                <div className="p-6 pt-0 flex flex-col sm:flex-row items-center gap-3">
                  <button
                    onClick={() => openBookingModal(srv.title)}
                    className="w-full sm:w-1/2 gold-btn text-xs py-2.5 flex items-center justify-center gap-1.5"
                  >
                    <span className="material-symbols-outlined text-[16px]">calendar_month</span>
                    <span>BOOK SHOOT</span>
                  </button>

                  <Link
                    to={`/portfolio?category=${srv.id}`}
                    className="w-full sm:w-1/2 outline-btn text-xs py-2.5 flex items-center justify-center gap-1.5"
                  >
                    <span className="material-symbols-outlined text-[16px]">photo_camera</span>
                    <span>OUR WORK</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 3. BOTTOM CTA BANNER (LIQUID GLASS BANNER)                                */}
        {/* ========================================================================= */}
        <section className="py-16 px-margin-mobile md:px-margin-desktop border-t border-stone-800/80">
          <div className="max-w-container-max mx-auto liquid-glass rounded-[8px] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden shadow-2xl">
            <div className="space-y-3 z-10">
              <p className="text-primary font-sans font-bold text-xs uppercase tracking-[0.22em]">
                LOOKING FOR CUSTOM PACKAGES?
              </p>
              <h2 className="font-headline text-3xl sm:text-5xl text-white uppercase leading-none">
                LET'S CREATE SOMETHING EXTRAORDINARY
              </h2>
              <p className="text-stone-300 text-xs sm:text-sm max-w-xl font-normal">
                We offer bespoke photography & cinematography packages tailored to your exact event dates, venues, and special requests.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 z-10 shrink-0">
              <button
                onClick={() => openBookingModal()}
                className="gold-btn w-full sm:w-auto"
              >
                GET A QUOTE
              </button>
              <a
                href={`tel:${STUDIO_INFO.phone}`}
                className="outline-btn w-full sm:w-auto flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-[17px]">call</span>
                <span>CALL NOW</span>
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
