import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { GALLERY_ITEMS, PORTFOLIO_ITEMS, LOCATION_ITEMS, CATEGORIES, STUDIO_INFO } from '../data/studioData';
import InstagramReelsSection from '../components/InstagramReelsSection';
import galleryHeroImg from '../assets/hero/gallery-hero.png';
import galleryHeroVideo from '../assets/hero/gallery-hero-video.mp4';

export default function GalleryPage() {
  const { openLightbox, openBookingModal } = useApp();
  const [searchParams, setSearchParams] = useSearchParams();

  const initialCategory = searchParams.get('category') || 'all';
  const [activeCategory, setActiveCategory] = useState(initialCategory);

  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) {
      if (cat === 'baby-shower') {
        setActiveCategory('maternity');
        return;
      }
      setActiveCategory(cat);
    }
  }, [searchParams]);

  const handleCategoryChange = (catId) => {
    setActiveCategory(catId);
    if (catId === 'all') {
      setSearchParams({});
    } else {
      setSearchParams({ category: catId });
    }
  };

  const filteredShoots = activeCategory === 'all'
    ? PORTFOLIO_ITEMS
    : PORTFOLIO_ITEMS.filter((item) => item.category === activeCategory);

  return (
    <div className="w-full text-white">
      {/* ========================================================================= */}
      {/* 1. CINEMATIC VIDEO HERO SECTION (VIBRANT & HIGH VISIBILITY)                */}
      {/* ========================================================================= */}
      <section className="relative z-20 w-full min-h-[55vh] sm:min-h-[60vh] md:min-h-[65vh] bg-[#050505] flex items-center justify-start px-margin-mobile md:px-margin-desktop pt-24 sm:pt-28 md:pt-36 pb-14 md:pb-20 overflow-hidden border-b border-[#1a1a1a] shadow-2xl">
        {/* Background Video Container */}
        <div className="absolute inset-0 z-0 bg-[#050505] overflow-hidden select-none">
          <video
            autoPlay
            loop
            muted
            playsInline
            poster={galleryHeroImg}
            className="w-full h-full object-cover object-[72%_center] md:object-right transition-transform duration-1000 scale-100 brightness-105 contrast-105"
          >
            <source src={galleryHeroVideo} type="video/mp4" />
            <img
              alt="Gallery Camera Background"
              className="w-full h-full object-cover object-[72%_center] md:object-right"
              src={galleryHeroImg}
            />
          </video>
          {/* Subtle gradient overlay to keep video bright & clearly visible */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/35 to-transparent md:from-black/70 md:via-black/25 md:to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-black/20"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="flex items-center gap-2 text-xs font-sans text-stone-300 drop-shadow-md">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <span className="text-stone-500">&gt;</span>
            <span className="text-primary font-semibold">Gallery</span>
          </div>

          <h1 className="font-headline text-5xl sm:text-6xl md:text-7xl lg:text-[88px] text-white uppercase leading-none tracking-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]">
            OUR <span className="text-primary drop-shadow-[0_4px_20px_rgba(245,184,0,0.4)]">GALLERY</span>
          </h1>

          <div className="flex items-center gap-3 py-1">
            <div className="w-10 h-[1.5px] bg-primary"></div>
            <span className="material-symbols-outlined text-primary text-xl">camera</span>
            <div className="w-10 h-[1.5px] bg-primary"></div>
          </div>

          <p className="text-stone-200 font-sans text-xs sm:text-sm md:text-base leading-relaxed max-w-xl font-medium drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
            Moments come and go, but memories last forever. Explore our signature client work and step inside our studio premises in Sidhpur.
          </p>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. BODY CONTENT (REVEALS THE GORGEOUS BACKGROUND IMAGE DIRECTLY BEHIND)   */}
      {/* ========================================================================= */}
      <div className="relative z-10 w-full bg-transparent">
        {/* ========================================================================= */}
        {/* 2. FILTER TABS (COMPACT SINGLE-ROW SWIPEABLE LIQUID GLASS BAR)            */}
        {/* ========================================================================= */}
        <section className="py-2.5 sm:py-4 px-margin-mobile md:px-margin-desktop border-b border-stone-800/80 sticky top-[60px] sm:top-[64px] z-30 backdrop-blur-xl bg-[#050505]/85 shadow-lg">
          <div className="max-w-container-max mx-auto flex items-center gap-1.5 sm:gap-2.5 overflow-x-auto no-scrollbar scroll-smooth sm:flex-wrap sm:justify-center py-0.5">
            {CATEGORIES.filter(cat => !['drone', 'live', 'event-shoot'].includes(cat.id)).map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryChange(cat.id)}
                  className={`tab-filter ${isActive ? 'active' : ''}`}
                >
                  <span className="material-symbols-outlined text-[15px] sm:text-[16px]">
                    {cat.altIcon || cat.icon}
                  </span>
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 3. GALLERY CONTENT AREA                                                   */}
        {/* ========================================================================= */}
        <section className="py-12 sm:py-16 px-margin-mobile md:px-margin-desktop">
          <div className="max-w-container-max mx-auto">
            {/* VIEW A: ONLY "OUR LOCATION" FILTER IS ACTIVE */}
            {activeCategory === 'our-location' && (
              <div className="space-y-10">
                {/* Title Header for OUR LOCATION */}
                <div className="text-center space-y-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary text-[11px] font-bold tracking-widest uppercase">
                    <span className="material-symbols-outlined text-sm">location_on</span>
                    <span>STUDIO PREMISES & VISIT</span>
                  </div>
                  <h2 className="font-headline text-4xl sm:text-5xl md:text-6xl text-white uppercase tracking-tight">
                    OUR <span className="text-primary drop-shadow-[0_0_20px_rgba(245,184,0,0.4)]">LOCATION</span>
                  </h2>
                  <div className="w-16 h-[2px] bg-primary mx-auto shadow-[0_0_8px_#F5B800]"></div>
                  <p className="text-stone-300 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed pt-1">
                    {STUDIO_INFO.address}
                  </p>
                  <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                    <a
                      href={STUDIO_INFO.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="gold-btn inline-flex items-center gap-2 text-xs py-2.5 px-5 shadow-xl"
                    >
                      <span className="material-symbols-outlined text-base">near_me</span>
                      <span>GET DIRECTIONS ON GOOGLE MAPS</span>
                    </a>
                    <a
                      href={`tel:${STUDIO_INFO.phone}`}
                      className="outline-btn inline-flex items-center gap-2 text-xs py-2 px-4"
                    >
                      <span className="material-symbols-outlined text-primary text-base">call</span>
                      <span>{STUDIO_INFO.phoneDisplay || STUDIO_INFO.phone}</span>
                    </a>
                  </div>
                </div>

                {/* 6 Location Photos Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {LOCATION_ITEMS.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => openLightbox(item, LOCATION_ITEMS)}
                      className="img-card aspect-[4/3] cursor-pointer group rounded-[8px] overflow-hidden shadow-2xl border border-white/10 hover:border-primary/60 transition-all duration-300"
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-250 flex flex-col justify-end p-3 sm:p-5">
                        <span className="bg-primary text-black text-[9px] sm:text-[10px] uppercase font-black tracking-wider px-2 py-0.5 rounded-[4px] w-fit inline-flex items-center gap-1 shadow-md mb-1.5">
                          <span className="material-symbols-outlined text-xs">location_on</span>
                          OUR LOCATION
                        </span>
                        <span className="text-white text-xs sm:text-base font-bold leading-tight line-clamp-2">
                          {item.title}
                        </span>
                        <div className="flex items-center gap-1 text-primary text-[11px] sm:text-xs mt-2 font-semibold">
                          <span className="material-symbols-outlined text-xs">zoom_in</span>
                          <span>View Full Screen</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* VIEW B: "ALL" CATEGORY ACTIVE - SHOWS CLIENT STORIES THEN DEDICATED "OUR LOCATION" SECTION */}
            {activeCategory === 'all' && (
              <div className="space-y-16">
                {/* 1. Portfolio Client Shoots Section */}
                <div>
                  <div className="mb-6 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-primary inline-block"></span>
                      <h2 className="font-headline text-2xl sm:text-3xl text-white uppercase tracking-wider">
                        PORTFOLIO HIGHLIGHTS & CLIENT STORIES
                      </h2>
                    </div>
                    <span className="text-stone-400 text-xs font-mono">{PORTFOLIO_ITEMS.length} Photos</span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
                    {PORTFOLIO_ITEMS.map((item, idx) => (
                      <div
                        key={idx}
                        onClick={() => openLightbox(item, PORTFOLIO_ITEMS)}
                        className="img-card aspect-[4/3] sm:aspect-[4/3.5] cursor-pointer group rounded-[8px] overflow-hidden shadow-2xl"
                      >
                        <img
                          src={item.image}
                          alt={item.title}
                          loading="lazy"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-250 flex flex-col justify-end p-2.5 sm:p-4">
                          <span className="text-primary text-[8.5px] sm:text-[9px] uppercase font-bold tracking-wider">
                            {item.category}
                          </span>
                          <span className="text-white text-[11px] sm:text-sm font-bold leading-tight mt-0.5 line-clamp-2">
                            {item.title}
                          </span>
                          <div className="flex items-center gap-1 text-primary text-[11px] mt-1.5 font-semibold">
                            <span className="material-symbols-outlined text-xs">zoom_in</span>
                            <span>View Details</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 2. DEDICATED OUR LOCATION SECTION */}
                <div className="pt-12 border-t border-stone-800/80">
                  <div className="text-center mb-10 space-y-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary text-[11px] font-bold tracking-widest uppercase">
                      <span className="material-symbols-outlined text-sm">location_on</span>
                      <span>STUDIO PREMISES & VISIT</span>
                    </div>
                    <h2 className="font-headline text-4xl sm:text-5xl md:text-6xl text-white uppercase tracking-tight">
                      OUR <span className="text-primary drop-shadow-[0_0_20px_rgba(245,184,0,0.4)]">LOCATION</span>
                    </h2>
                    <div className="w-16 h-[2px] bg-primary mx-auto shadow-[0_0_8px_#F5B800]"></div>
                    <p className="text-stone-300 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed pt-1">
                      {STUDIO_INFO.address}
                    </p>
                    <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                      <a
                        href={STUDIO_INFO.googleMapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="gold-btn inline-flex items-center gap-2 text-xs py-2.5 px-5 shadow-xl"
                      >
                        <span className="material-symbols-outlined text-base">near_me</span>
                        <span>GET DIRECTIONS ON GOOGLE MAPS</span>
                      </a>
                      <a
                        href={`tel:${STUDIO_INFO.phone}`}
                        className="outline-btn inline-flex items-center gap-2 text-xs py-2 px-4"
                      >
                        <span className="material-symbols-outlined text-primary text-base">call</span>
                        <span>{STUDIO_INFO.phoneDisplay || STUDIO_INFO.phone}</span>
                      </a>
                    </div>
                  </div>

                  {/* 6 Location Photos Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {LOCATION_ITEMS.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => openLightbox(item, LOCATION_ITEMS)}
                        className="img-card aspect-[4/3] cursor-pointer group rounded-[8px] overflow-hidden shadow-2xl border border-white/10 hover:border-primary/60 transition-all duration-300"
                      >
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-250 flex flex-col justify-end p-3 sm:p-5">
                          <span className="bg-primary text-black text-[9px] sm:text-[10px] uppercase font-black tracking-wider px-2 py-0.5 rounded-[4px] w-fit inline-flex items-center gap-1 shadow-md mb-1.5">
                            <span className="material-symbols-outlined text-xs">location_on</span>
                            OUR LOCATION
                          </span>
                          <span className="text-white text-xs sm:text-base font-bold leading-tight line-clamp-2">
                            {item.title}
                          </span>
                          <div className="flex items-center gap-1 text-primary text-[11px] sm:text-xs mt-2 font-semibold">
                            <span className="material-symbols-outlined text-xs">zoom_in</span>
                            <span>View Full Screen</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* VIEW C: SPECIFIC SHOOT CATEGORY ACTIVE (WEDDING, PRE-WEDDING, ETC.) */}
            {activeCategory !== 'all' && activeCategory !== 'our-location' && (
              <div>
                {filteredShoots.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
                    {filteredShoots.map((item, idx) => (
                      <div
                        key={idx}
                        onClick={() => openLightbox(item, filteredShoots)}
                        className="img-card aspect-[4/3] sm:aspect-[4/3.5] cursor-pointer group rounded-[8px] overflow-hidden shadow-2xl"
                      >
                        <img
                          src={item.image}
                          alt={item.title}
                          loading="lazy"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-250 flex flex-col justify-end p-2.5 sm:p-4">
                          <span className="text-primary text-[8.5px] sm:text-[9px] uppercase font-bold tracking-wider">
                            {item.category}
                          </span>
                          <span className="text-white text-[11px] sm:text-sm font-bold leading-tight mt-0.5 line-clamp-2">
                            {item.title}
                          </span>
                          <div className="flex items-center gap-1 text-primary text-[11px] mt-1.5 font-semibold">
                            <span className="material-symbols-outlined text-xs">zoom_in</span>
                            <span>View Details</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="max-w-xl mx-auto liquid-glass rounded-[8px] p-8 sm:p-10 text-center space-y-4 border border-white/10 shadow-2xl">
                    <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center text-primary mx-auto">
                      <span className="material-symbols-outlined text-3xl">photo_library</span>
                    </div>
                    <h3 className="font-headline text-2xl sm:text-3xl text-white uppercase tracking-wide">
                      NEW SHOTS COMING SOON
                    </h3>
                    <p className="text-stone-300 text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
                      We are actively updating our gallery with new captures for this category. In the meantime, explore our other featured work or studio location.
                    </p>
                    <button
                      onClick={() => handleCategoryChange('all')}
                      className="gold-btn inline-flex items-center gap-2 mt-2"
                    >
                      <span className="material-symbols-outlined text-base">grid_view</span>
                      <span>VIEW ALL MOMENTS</span>
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 4. INSTAGRAM REELS SHOWCASE                                              */}
        {/* ========================================================================= */}
        <InstagramReelsSection />

        {/* ========================================================================= */}
        {/* 5. BOTTOM CTA BANNER (LIQUID GLASS BANNER)                                */}
        {/* ========================================================================= */}
        <section className="py-12 px-margin-mobile md:px-margin-desktop border-t border-stone-800/80">
          <div className="max-w-container-max mx-auto liquid-glass rounded-[8px] p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden shadow-2xl">
            <div className="flex items-center gap-5 z-10">
              <div className="w-16 h-16 border border-primary flex items-center justify-center text-primary shrink-0 rounded-[8px] bg-black/40 shadow-inner">
                <span className="material-symbols-outlined text-3xl">photo_camera</span>
              </div>
              <div>
                <p className="text-primary font-sans font-bold text-xs uppercase tracking-[0.22em] mb-1">
                  HAVE A SPECIAL MOMENT IN MIND?
                </p>
                <h2 className="font-headline text-3xl sm:text-4xl text-white uppercase leading-none mb-1">
                  LET US CAPTURE IT BEAUTIFULLY
                </h2>
                <p className="text-stone-300 text-xs font-medium">
                  Book your shoot today and let us turn your moments into timeless memories.
                </p>
              </div>
            </div>

            <div className="flex flex-col items-center md:items-end gap-3 z-10 w-full md:w-auto">
              <button
                onClick={() => openBookingModal()}
                className="gold-btn w-full md:w-auto flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-[17px]">calendar_month</span>
                <span>BOOK A SHOOT</span>
              </button>
              <a
                href={`tel:${STUDIO_INFO.phone}`}
                className="text-stone-300 hover:text-primary transition-colors text-xs font-bold flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-primary text-[16px]">call</span>
                <span>{STUDIO_INFO.phoneDisplay || STUDIO_INFO.phone}</span>
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
