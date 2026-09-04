import React, { useState, useEffect } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { PORTFOLIO_ITEMS, CATEGORIES, STUDIO_INFO } from '../data/studioData';
import portfolioHeroImg from '../assets/hero/portfolio-hero.png';
import portfolioHeroVideo from '../assets/hero/portfolio-hero-video.mp4';

export default function PortfolioPage() {
  const { openLightbox, openBookingModal } = useApp();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const initialCategory = searchParams.get('category') || 'all';
  const [activeCategory, setActiveCategory] = useState(initialCategory);

  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) {
      if (cat === 'our-location') {
        navigate('/gallery?category=our-location', { replace: true });
        return;
      }
      if (cat === 'baby-shower') {
        setActiveCategory('maternity');
        return;
      }
      setActiveCategory(cat);
    }
  }, [searchParams, navigate]);

  const handleCategoryChange = (catId) => {
    if (catId === 'our-location') {
      navigate('/gallery?category=our-location');
      return;
    }
    setActiveCategory(catId);
    if (catId === 'all') {
      setSearchParams({});
    } else {
      setSearchParams({ category: catId });
    }
  };

  const filteredItems = activeCategory === 'all'
    ? PORTFOLIO_ITEMS
    : PORTFOLIO_ITEMS.filter((item) => item.category === activeCategory);

  const displayItems = filteredItems;

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
            poster={portfolioHeroImg}
            className="w-full h-full object-cover object-[72%_center] md:object-right transition-transform duration-1000 scale-100 brightness-105 contrast-105"
          >
            <source src={portfolioHeroVideo} type="video/mp4" />
            <img
              alt="Portfolio Camera Background"
              className="w-full h-full object-cover object-[72%_center] md:object-right"
              src={portfolioHeroImg}
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
            <span className="text-primary font-semibold">Portfolio</span>
          </div>

          <h1 className="font-headline text-5xl sm:text-6xl md:text-7xl lg:text-[88px] text-white uppercase leading-none tracking-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]">
            OUR <span className="text-primary drop-shadow-[0_4px_20px_rgba(245,184,0,0.4)]">PORTFOLIO</span>
          </h1>

          <div className="flex items-center gap-3 py-1">
            <div className="w-10 h-[1.5px] bg-primary"></div>
            <span className="material-symbols-outlined text-primary text-xl">camera</span>
            <div className="w-10 h-[1.5px] bg-primary"></div>
          </div>

          <p className="text-stone-200 font-sans text-xs sm:text-sm md:text-base leading-relaxed max-w-xl font-medium drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
            Explore our curated selection of memorable shoots across weddings, pre-weddings, baby showers, and grand event celebrations.
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
            {CATEGORIES.filter(cat => cat.id !== 'our-location' && !['drone', 'live', 'event-shoot'].includes(cat.id)).map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryChange(cat.id)}
                  className={`tab-filter ${isActive ? 'active' : ''}`}
                >
                  <span className="material-symbols-outlined text-[15px] sm:text-[16px]">
                    {cat.icon}
                  </span>
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 3. PHOTO GRID & EMPTY STATE HANDLING                                      */}
        {/* ========================================================================= */}
        <section className="py-12 sm:py-16 px-margin-mobile md:px-margin-desktop">
          {displayItems.length > 0 ? (
            <div className="max-w-container-max mx-auto grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
              {displayItems.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => openLightbox(item, displayItems)}
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
                We are actively updating our gallery with new captures for this category. In the meantime, explore our other featured work.
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
        </section>

        {/* ========================================================================= */}
        {/* 4. BOTTOM CTA BANNER (LIQUID GLASS BANNER)                                */}
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
