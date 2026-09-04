import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { TEAM, STUDIO_INFO } from '../data/studioData';
import aboutHeroImg from '../assets/hero/about-hero.png';
import portfolioHeroVideo from '../assets/hero/portfolio-hero-video.mp4';

export default function AboutPage() {
  const { openLightbox } = useApp();
  const statsList = [
    {
      count: '500+',
      label: 'Projects Completed',
      icon: 'photo_camera'
    },
    {
      count: '200+',
      label: 'Happy Clients',
      icon: 'sentiment_satisfied'
    },
    {
      count: '5+',
      label: 'Years Of Experience',
      icon: 'military_tech'
    },
    {
      count: '1',
      label: 'Studio In Sidhpur',
      icon: 'location_on'
    }
  ];

  const whyChooseList = [
    {
      title: 'EXPERIENCED PROFESSIONALS',
      desc: 'Our team has years of experience in photography and cinematography.',
      icon: 'star',
      fill: 1
    },
    {
      title: 'PREMIUM EQUIPMENT',
      desc: 'We use latest cinema cameras, prime lenses and studio lighting to deliver the best quality.',
      icon: 'photo_camera',
      fill: 1
    },
    {
      title: 'CREATIVE APPROACH',
      desc: 'We create unique concepts for every shoot.',
      icon: 'lightbulb',
      fill: 0
    },
    {
      title: 'CLIENT SATISFACTION',
      desc: 'Your happiness is our priority. We go the extra mile to exceed your expectations.',
      icon: 'favorite',
      fill: 1
    }
  ];

  return (
    <div className="w-full text-white">
      {/* ========================================================================= */}
      {/* 1. CINEMATIC VIDEO HERO SECTION (VIBRANT & HIGH VISIBILITY)                */}
      {/* ========================================================================= */}
      <section className="relative z-20 w-full min-h-[60vh] sm:min-h-[70vh] md:min-h-[80vh] bg-[#050505] flex items-center justify-start px-margin-mobile md:px-margin-desktop pt-24 sm:pt-28 md:pt-36 pb-14 md:pb-20 overflow-hidden border-b border-[#1a1a1a] shadow-2xl">
        {/* Background Video Container */}
        <div className="absolute inset-0 z-0 bg-[#050505] overflow-hidden select-none">
          <video
            autoPlay
            loop
            muted
            playsInline
            poster={aboutHeroImg}
            className="w-full h-full object-cover object-[70%_center] md:object-right transition-transform duration-1000 scale-100 brightness-105 contrast-105"
          >
            <source src={portfolioHeroVideo} type="video/mp4" />
            <img
              alt="About Us Hero Background"
              className="w-full h-full object-cover object-[70%_center] md:object-right"
              src={aboutHeroImg}
            />
          </video>
          {/* Subtle gradient overlay to keep video bright & clearly visible */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/35 to-transparent md:from-black/70 md:via-black/25 md:to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-black/20"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="flex items-center gap-2 text-xs font-sans text-stone-300 drop-shadow-md">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <span className="text-stone-500">&gt;</span>
            <span className="text-primary font-semibold">About Us</span>
          </div>

          <div className="space-y-0.5 drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]">
            <h1 className="font-headline text-5xl sm:text-6xl md:text-7xl lg:text-[88px] text-white uppercase leading-none tracking-tight drop-shadow-md">
              ABOUT
            </h1>
            <h2 className="font-headline text-5xl sm:text-6xl md:text-7xl lg:text-[88px] text-primary uppercase leading-none tracking-tight drop-shadow-[0_4px_20px_rgba(245,184,0,0.4)]">
              IMAGE MAKER STUDIO
            </h2>
          </div>

          <div className="flex items-center gap-3 py-1">
            <div className="w-10 h-[1.5px] bg-primary"></div>
            <span className="material-symbols-outlined text-primary text-xl">camera</span>
            <div className="w-10 h-[1.5px] bg-primary"></div>
          </div>

          <p className="text-stone-200 font-sans text-xs sm:text-sm md:text-base leading-relaxed max-w-xl font-medium drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
            We are a passionate team of photographers and cinematographers based in Sidhpur, Gujarat. We believe every moment has a story, and we are here to capture yours with creativity, perfection and a cinematic touch.
          </p>

          <div className="font-cormorant italic text-primary text-3xl pt-2 drop-shadow-[0_2px_12px_rgba(245,184,0,0.4)]">
            Image Maker Studio
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. BODY CONTENT (REVEALS THE GORGEOUS BACKGROUND IMAGE DIRECTLY BEHIND)   */}
      {/* ========================================================================= */}
      <div className="relative z-10 w-full bg-transparent">
        {/* ========================================================================= */}
        {/* 2. STATS BAR (4 LIQUID GLASS CARDS)                                       */}
        {/* ========================================================================= */}
        <section className="border-b border-stone-800/80 py-12 px-margin-mobile md:px-margin-desktop">
          <div className="max-w-container-max mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {statsList.map((stat, idx) => (
              <div key={idx} className="liquid-glass p-6 rounded-[8px] flex flex-col items-center">
                <div className="w-12 h-12 rounded-full border border-primary flex items-center justify-center text-primary mb-3 bg-black/70 shadow-md group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-2xl">{stat.icon}</span>
                </div>
                <h3 className="font-headline text-4xl sm:text-5xl text-primary font-bold tracking-tight drop-shadow-[0_2px_10px_rgba(245,184,0,0.3)]">
                  {stat.count}
                </h3>
                <p className="text-stone-300 text-xs font-sans uppercase tracking-wider mt-1 font-semibold">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 3. OUR STORY SECTION                                                     */}
        {/* ========================================================================= */}
        <section className="py-20 px-margin-mobile md:px-margin-desktop">
          <div className="max-w-container-max mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 relative">
              <div className="relative rounded-[8px] overflow-hidden border border-white/15 shadow-2xl group">
                <img
                  src="https://i.ibb.co/RTTZNvxP/Screenshot-2026-08-30-10-48-35-75-680d03679600f7af0b4c700c6b270fe7-jpg.jpg"
                  alt="Image Maker Studio Sidhpur Facility"
                  className="w-full h-[400px] object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
              </div>

              <a
                href={STUDIO_INFO.googleMapsUrl}
                target="_blank"
                rel="noreferrer"
                className="absolute -bottom-6 -right-4 liquid-glass-pill p-4 rounded-[8px] hidden sm:flex items-center gap-3 hover:scale-105 transition-transform cursor-pointer border border-primary/50 shadow-2xl"
              >
                <div className="w-10 h-10 rounded-full bg-primary text-black flex items-center justify-center font-bold">
                  <span className="material-symbols-outlined text-xl">location_on</span>
                </div>
                <div>
                  <p className="text-primary font-bold text-xs flex items-center gap-1">
                    <span>Royal Complex, Sidhpur</span>
                    <span className="text-[10px]">↗</span>
                  </p>
                  <p className="text-stone-300 text-[10px]">View Exact Google Maps Location</p>
                </div>
              </a>
            </div>

            <div className="lg:col-span-6 space-y-6">
              <div className="space-y-1.5">
                <p className="text-primary font-sans font-bold text-xs uppercase tracking-[0.22em]">
                  OUR STORY
                </p>
                <h2 className="font-headline text-4xl sm:text-5xl text-white uppercase leading-none">
                  PASSION FOR PERFECTION<br />
                  EYE FOR BEAUTY
                </h2>
                <div className="w-12 h-[2px] bg-primary mt-2"></div>
              </div>

              <p className="text-stone-200 text-xs sm:text-sm leading-relaxed font-normal">
                Founded with a dream to redefine photography in Sidhpur and Gujarat, IMAGE MAKER STUDIO has grown into a premiere full-service photography and cinematography studio. We specialize in luxury wedding coverage, artistic pre-weddings, radiant maternity sessions, and adorable children photography.
              </p>

              <p className="text-stone-300 text-xs sm:text-sm leading-relaxed font-normal">
                Every frame we capture is crafted with attention to light, mood, and genuine human emotion. Our state-of-the-art camera systems, premium prime lenses, and artistic cinematography ensure your memories are immortalized with breathtaking fidelity.
              </p>

              <div className="pt-2">
                <Link to="/contact" className="gold-btn inline-flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px]">chat</span>
                  <span>CONTACT US TODAY</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 3.5 REAL STUDIO TOUR GALLERY (6 SHOP PHOTOS)                             */}
        {/* ========================================================================= */}
        <section className="py-16 px-margin-mobile md:px-margin-desktop border-t border-stone-800/80">
          <div className="max-w-container-max mx-auto space-y-10">
            <div className="text-center space-y-1.5">
              <p className="text-primary font-sans font-bold text-xs uppercase tracking-[0.22em]">
                OUR WORKSPACE &amp; FACILITY
              </p>
              <h2 className="font-headline text-4xl sm:text-5xl text-white uppercase tracking-tight">
                INSIDE IMAGE MAKER STUDIO
              </h2>
              <div className="w-12 h-[2px] bg-primary mx-auto mt-2 shadow-[0_0_8px_#F5B800]"></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {STUDIO_INFO.shopImages.map((shop, idx) => (
                <div
                  key={idx}
                  onClick={() => openLightbox(shop, STUDIO_INFO.shopImages)}
                  className="liquid-glass rounded-[8px] overflow-hidden group shadow-xl hover:-translate-y-1.5 transition-all duration-300 cursor-pointer"
                >
                  <div className="relative h-[230px] overflow-hidden">
                    <img
                      src={shop.image}
                      alt={shop.title}
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-600"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
                    <div className="absolute bottom-3.5 left-3.5 right-3.5 flex items-center justify-between">
                      <p className="text-white text-xs font-bold leading-snug drop-shadow-md">
                        {shop.title}
                      </p>
                      <span className="material-symbols-outlined text-primary text-sm shrink-0">zoom_in</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 4. MEET OUR TEAM (3 LIQUID GLASS CARDS)                                   */}
        {/* ========================================================================= */}
        <section className="py-20 px-margin-mobile md:px-margin-desktop border-t border-stone-800/80">
          <div className="max-w-container-max mx-auto space-y-12">
            <div className="text-center space-y-1.5">
              <p className="text-primary font-sans font-bold text-xs uppercase tracking-[0.22em]">
                THE TALENT
              </p>
              <h2 className="font-headline text-4xl sm:text-5xl text-white uppercase tracking-tight">
                MEET OUR TEAM
              </h2>
              <div className="w-12 h-[2px] bg-primary mx-auto mt-2 shadow-[0_0_8px_#F5B800]"></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {TEAM.map((member, idx) => (
                <div
                  key={idx}
                  className="liquid-glass rounded-[8px] overflow-hidden group shadow-2xl"
                >
                  <div className="relative h-[320px] overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-600"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                  </div>
                  <div className="p-6 text-center space-y-1">
                    <h3 className="font-headline text-2xl text-white tracking-wider group-hover:text-primary transition-colors">
                      {member.name}
                    </h3>
                    <p className="text-primary text-xs font-sans font-bold uppercase tracking-widest">
                      {member.role}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 5. WHY CHOOSE US (4 LIQUID GLASS CARDS)                                   */}
        {/* ========================================================================= */}
        <section className="py-20 px-margin-mobile md:px-margin-desktop border-t border-stone-800/80">
          <div className="max-w-container-max mx-auto space-y-12">
            <div className="text-center space-y-1.5">
              <p className="text-primary font-sans font-bold text-xs uppercase tracking-[0.22em]">
                OUR STRENGTHS
              </p>
              <h2 className="font-headline text-4xl sm:text-5xl text-white uppercase tracking-tight">
                WHY CHOOSE US?
              </h2>
              <div className="w-12 h-[2px] bg-primary mx-auto mt-2 shadow-[0_0_8px_#F5B800]"></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {whyChooseList.map((item, idx) => (
                <div
                  key={idx}
                  className="liquid-glass p-6 rounded-[8px]"
                >
                  <div className="w-12 h-12 rounded-full border border-primary flex items-center justify-center text-primary mb-4 group-hover:scale-110 group-hover:drop-shadow-[0_0_10px_#F5B800] transition-all bg-black/40">
                    <span className="material-symbols-outlined text-2xl">{item.icon}</span>
                  </div>
                  <h4 className="font-sans font-bold text-white text-sm uppercase tracking-wider mb-2 group-hover:text-primary transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-stone-300 text-xs leading-relaxed font-normal">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
