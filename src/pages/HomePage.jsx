import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { STUDIO_INFO, PORTFOLIO_ITEMS, SERVICES, CATEGORIES } from '../data/studioData';
import InstagramReelsSection from '../components/InstagramReelsSection';
import homeHeroImg from '../assets/hero/home-hero.png';
import homeHeroVideo from '../assets/hero/home-hero-video.mp4';

export default function HomePage() {
  const { openBookingModal, openLightbox } = useApp();
  const navigate = useNavigate();
  const [homeCategory, setHomeCategory] = useState('all');
  const [showAllHomePhotos, setShowAllHomePhotos] = useState(false);

  const clientAvatars = [
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDx6l-ciNCdAt6wUlH5dMe5dOPI4_mpewS9LS2B264wsrkRfVEIrq2jO42yyMKo7qxPk3LswqGFIB2UG6Iy9VeE6WOlgYf8mIqeC4Mc_iK5Ri873u4nOl6AvRyG3uJdNxAuWLqzVv5-AnAx9BK0TNLkF8kRcmrkvXO-B93KnlFg8ijaYMeDaZmRss0du_RiseggEkyXNAK15TBY3mDLIElnmPRd9cWHxZQ3EjnDZWhRuQpIcUOLlWWm',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDj16NvKK02zNMIc055wGkUtsms5RC3TrnMapgqasyIyV7g_VhnYnpUaTaU25TDDwbqaiT2Zi9gfbNUuXh2nTjCBWhyG51FvAKP6jZD8xD5t4ebgYkt9JgnpNreM3o4qUqzEFOZfKdLjALlTgsuvBqI665U3P94YfRD0xmWsVMw7I2lVnZj6vVEVEVChB-rzixROKngvXmdi8ZWnANXVF3XFL7KPqV7hkq4V2WgnMiSAPlxQzQJlXd1',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuB4KuNAfiwjf-VdoZE2KHqi9GitDXALy9Tm2PGOvSjVdnBW-nsdhzpBxQvznxvqfm3Oe1ieg26zIYAiFApmhYX5sHf7BfLQSvPWVee4x07yEp9nwfvo4qy05jcFzlYx4kJ7dkMpkNdboD4_2SGEYYzDD9Ab-DZAXsGeKxgteNceKimjpVb8YrM6B3kmNRN7dE0oIcBVaNx-17BI29V1sb6SV9Ejt2rkFVxqITUMtvUASGEySlvrxzxE'
  ];

  return (
    <div className="w-full text-white">
      {/* ========================================================================= */}
      {/* 1. CINEMATIC VIDEO HERO SECTION (VIBRANT & HIGH VISIBILITY)                */}
      {/* ========================================================================= */}
      <section className="relative z-20 w-full min-h-screen bg-[#050505] flex items-center justify-start px-margin-mobile md:px-margin-desktop pt-24 sm:pt-28 md:pt-36 lg:pt-40 pb-14 md:pb-20 overflow-hidden shadow-2xl">
        {/* Background Cinematic Video Container */}
        <div className="absolute inset-0 z-0 bg-[#050505] overflow-hidden select-none">
          <video
            autoPlay
            loop
            muted
            playsInline
            poster={homeHeroImg}
            className="w-full h-full object-cover object-[78%_center] sm:object-[75%_center] md:object-right lg:object-[80%_center] scale-100 transition-transform duration-1000 brightness-105 contrast-105"
          >
            <source src={homeHeroVideo} type="video/mp4" />
            <img
              alt="Hero Wedding Couple Background"
              className="w-full h-full object-cover object-[78%_center] sm:object-[75%_center] md:object-right lg:object-[80%_center]"
              src={homeHeroImg}
            />
          </video>
          {/* Subtle gradient overlay to make video bright & clearly visible */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/35 to-transparent md:from-black/70 md:via-black/25 md:to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-black/20"></div>
        </div>

        {/* Hero Left Content Container */}
        <div className="relative z-10 max-w-2xl space-y-4 sm:space-y-5 md:space-y-6">
          {/* Eyebrow / Small Label with Liquid Glass Pill */}
          <div className="liquid-glass-pill inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
            <span className="text-primary font-sans font-medium uppercase tracking-[0.3em] text-[10px] sm:text-xs">
              WE CAPTURE MOMENTS
            </span>
          </div>

          {/* Sophisticated Editorial Headline in Cormorant Garamond */}
          <div className="space-y-0.5 select-none drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]">
            <h1 className="font-cormorant font-light text-4xl sm:text-6xl md:text-8xl lg:text-[92px] xl:text-[104px] text-white uppercase leading-[0.94] tracking-[-0.015em]">
              YOU KEEP THEM
            </h1>
            <div className="font-cormorant font-normal italic text-primary text-5xl sm:text-7xl md:text-8xl lg:text-[96px] xl:text-[108px] leading-[0.9] pt-1 drop-shadow-[0_4px_24px_rgba(245,184,0,0.4)]">
              Forever.
            </div>
          </div>

          {/* Supporting Text */}
          <p className="text-stone-200 font-sans text-xs sm:text-sm md:text-base font-medium tracking-wide max-w-xl leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
            Professional Photography &amp; Cinematography<br className="hidden sm:inline" />
            <span className="text-stone-300 font-normal"> For every special moment in Sidhpur &amp; across Gujarat</span>
          </p>

          {/* Hero Action Buttons */}
          <div className="flex flex-wrap items-center gap-3.5 sm:gap-4 pt-1 sm:pt-2">
            <Link
              to="/portfolio"
              className="gold-btn flex items-center justify-center gap-2 text-xs font-semibold tracking-wider uppercase px-5 sm:px-6 py-2.5 sm:py-3 shadow-[0_4px_20px_rgba(245,184,0,0.35)] w-full sm:w-auto"
            >
              <span className="material-symbols-outlined text-[17px]">photo_camera</span>
              <span>VIEW OUR WORK</span>
            </Link>

            <button
              onClick={() => openBookingModal()}
              className="outline-btn flex items-center justify-center gap-2 text-xs font-semibold tracking-wider uppercase px-5 sm:px-6 py-2.5 sm:py-3 w-full sm:w-auto"
            >
              <span className="material-symbols-outlined text-[17px]">calendar_month</span>
              <span>BOOK A SHOOT</span>
            </button>
          </div>

          {/* Social Proof Avatars & 5-Star Rating with Liquid Glass container */}
          <div className="liquid-glass-pill flex items-center gap-3 sm:gap-3.5 pt-2 sm:pt-2 p-2.5 rounded-[8px] inline-flex">
            <div className="flex -space-x-2">
              {clientAvatars.map((av, idx) => (
                <img
                  key={idx}
                  src={av}
                  alt={`Client ${idx + 1}`}
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 border-primary/80 object-cover shadow-lg"
                />
              ))}
            </div>
            <div>
              <div className="flex items-center gap-1 text-primary text-xs">
                <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
              </div>
              <p className="text-stone-200 font-sans text-[11px] sm:text-xs uppercase tracking-wider mt-0.5 font-medium">
                <span className="text-primary font-bold text-xs sm:text-sm">200+</span> Happy Couples &amp; Clients
              </p>
            </div>
          </div>
        </div>

        {/* Right Vertical Social & Contact Dock (WhatsApp, Instagram, Email, Phone) */}
        <div className="hidden md:flex absolute right-6 lg:right-10 top-1/2 -translate-y-1/2 flex-col gap-3.5 z-20">
          <a
            href={STUDIO_INFO.whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="liquid-glass-pill w-11 h-11 rounded-full flex items-center justify-center text-stone-300 hover:text-primary transition-all duration-200"
            aria-label="WhatsApp"
            title="WhatsApp"
          >
            <span className="material-symbols-outlined text-[18px]">chat</span>
          </a>
          <a
            href={STUDIO_INFO.instagramUrl}
            target="_blank"
            rel="noreferrer"
            className="liquid-glass-pill w-11 h-11 rounded-full flex items-center justify-center text-stone-300 hover:text-primary transition-all duration-200"
            aria-label="Instagram"
            title="Instagram"
          >
            <span className="material-symbols-outlined text-[18px]">photo_camera</span>
          </a>
          <a
            href={`mailto:${STUDIO_INFO.email}`}
            className="liquid-glass-pill w-11 h-11 rounded-full flex items-center justify-center text-stone-300 hover:text-primary transition-all duration-200"
            aria-label="Email"
            title="Email"
          >
            <span className="material-symbols-outlined text-[18px]">mail</span>
          </a>
          <a
            href={`tel:${STUDIO_INFO.phone}`}
            className="liquid-glass-pill w-11 h-11 rounded-full flex items-center justify-center text-stone-300 hover:text-primary transition-all duration-200"
            aria-label="Phone"
            title="Phone"
          >
            <span className="material-symbols-outlined text-[18px]">call</span>
          </a>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. BODY CONTENT (REVEALS THE GORGEOUS BACKGROUND IMAGE DIRECTLY BEHIND)   */}
      {/* ========================================================================= */}
      <div className="relative z-10 w-full bg-transparent">
        {/* ========================================================================= */}
        {/* 2. SERVICES SECTION (6 LIQUID GLASS CARDS)                                */}
        {/* ========================================================================= */}
        <section className="py-20 px-margin-mobile md:px-margin-desktop border-t border-stone-800/80">
          <div className="text-center mb-12 space-y-1.5">
            <p className="text-primary font-sans font-medium text-xs uppercase tracking-[0.25em]">
              WHAT WE DO
            </p>
            <h2 className="font-headline text-4xl sm:text-5xl text-white uppercase tracking-tight">
              OUR SERVICES
            </h2>
            <div className="w-12 h-[2px] bg-primary mx-auto mt-2 shadow-[0_0_8px_#F5B800]"></div>
          </div>

          {/* 4 Services Ultra Liquid Glass Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-container-max mx-auto">
            {SERVICES.map((srv) => (
              <div
                key={srv.id}
                onClick={() => navigate(`/portfolio?category=${srv.id}`)}
                className="liquid-glass-card p-5 flex flex-col items-center text-center group cursor-pointer"
              >
                {/* Liquid Glass Icon Orb */}
                <div className="liquid-glass-orb w-14 h-14 rounded-full flex items-center justify-center mb-4 text-primary group-hover:scale-110 group-hover:border-primary group-hover:shadow-[0_0_20px_rgba(245,184,0,0.6)] transition-all duration-300">
                  <span className="material-symbols-outlined text-3xl">
                    {srv.icon}
                  </span>
                </div>
                <h3 className="font-sans font-bold text-primary text-xs uppercase tracking-wider mb-2 group-hover:text-white transition-colors drop-shadow-sm">
                  {srv.title}
                </h3>
                <p className="text-stone-300 text-[11px] leading-relaxed font-normal">
                  {srv.shortDesc}
                </p>

                {/* Subtle explore prompt on hover */}
                <div className="mt-4 pt-2 border-t border-white/10 w-full flex items-center justify-center gap-1 text-[10px] text-primary font-bold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span>Explore</span>
                  <span className="material-symbols-outlined text-xs">arrow_forward</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 3. OUR WORK / FEATURED MOMENTS (58 STUDIO PHOTOS - 2 IN A ROW ON MOBILE)  */}
        {/* ========================================================================= */}
        <section id="featured-moments" className="py-20 px-margin-mobile md:px-margin-desktop border-t border-stone-800/80">
          <div className="text-center mb-8 space-y-1.5">
            <p className="text-primary font-sans font-medium text-xs uppercase tracking-[0.25em]">
              OUR WORK
            </p>
            <h2 className="font-headline text-4xl sm:text-5xl text-white uppercase tracking-tight">
              FEATURED MOMENTS
            </h2>
            <div className="w-12 h-[2px] bg-primary mx-auto mt-2 shadow-[0_0_8px_#F5B800]"></div>
          </div>

          {/* Category Filter Tabs for Home Page */}
          <div className="max-w-container-max mx-auto flex items-center justify-center gap-1.5 sm:gap-2.5 overflow-x-auto no-scrollbar scroll-smooth mb-8 py-1 px-1">
            {[
              { id: 'all', label: 'ALL MOMENTS', icon: 'grid_view' },
              { id: 'wedding', label: 'WEDDING', icon: 'diamond' },
              { id: 'pre-wedding', label: 'PRE-WEDDING', icon: 'groups' },
              { id: 'maternity', label: 'MATERNITY', icon: 'pregnant_woman' },
              { id: 'children', label: 'CHILDREN', icon: 'child_care' }
            ].map((cat) => {
              const isActive = homeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setHomeCategory(cat.id);
                    setShowAllHomePhotos(false);
                  }}
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

          {/* Photos Grid with Curated Preview and "VIEW ALL PHOTOGRAPHS" Option */}
          {(() => {
            const totalCategoryItems = homeCategory === 'all'
              ? PORTFOLIO_ITEMS
              : PORTFOLIO_ITEMS.filter((item) => item.category === homeCategory);

            let homeDisplayItems = totalCategoryItems;
            if (!showAllHomePhotos) {
              if (homeCategory === 'all') {
                const wedding = PORTFOLIO_ITEMS.filter((i) => i.category === 'wedding');
                const preWedding = PORTFOLIO_ITEMS.filter((i) => i.category === 'pre-wedding');
                const maternity = PORTFOLIO_ITEMS.filter((i) => i.category === 'maternity');
                const children = PORTFOLIO_ITEMS.filter((i) => i.category === 'children');

                // Interleaved curated selection of 12 top highlights across all 4 categories
                homeDisplayItems = [
                  wedding[0], preWedding[0], maternity[0], children[0],
                  wedding[1], preWedding[1], maternity[1], children[1],
                  wedding[2], preWedding[2], maternity[2], children[2]
                ].filter(Boolean);
              } else {
                homeDisplayItems = totalCategoryItems.slice(0, homeCategory === 'children' ? 4 : 8);
              }
            }

            const hasMorePhotos = totalCategoryItems.length > homeDisplayItems.length;

            return (
              <>
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 max-w-container-max mx-auto mb-8">
                  {homeDisplayItems.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => openLightbox(item, totalCategoryItems)}
                      className="img-card aspect-[3/4] cursor-pointer group rounded-[8px] overflow-hidden shadow-2xl"
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-250 flex flex-col justify-end p-2.5 sm:p-3.5">
                        <span className="text-primary text-[8.5px] sm:text-[9px] uppercase font-bold tracking-wider">
                          {item.category}
                        </span>
                        <span className="text-white text-[11px] sm:text-xs font-bold leading-tight line-clamp-2">
                          {item.title}
                        </span>
                        <div className="flex items-center gap-1 text-primary text-[10px] mt-1 font-semibold">
                          <span className="material-symbols-outlined text-xs">zoom_in</span>
                          <span>View</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Primary Action Option: VIEW ALL PHOTOGRAPHS */}
                <div className="text-center flex flex-col items-center justify-center gap-4">
                  {hasMorePhotos ? (
                    <button
                      onClick={() => setShowAllHomePhotos(true)}
                      className="gold-btn group inline-flex items-center gap-2.5 px-8 py-3.5 text-xs sm:text-sm tracking-wider uppercase font-bold hover:scale-105 transition-all shadow-xl"
                      id="view-all-photographs-btn"
                    >
                      <span className="material-symbols-outlined text-[18px] group-hover:rotate-12 transition-transform">
                        photo_library
                      </span>
                      <span>VIEW ALL PHOTOGRAPHS ({totalCategoryItems.length})</span>
                      <span className="material-symbols-outlined text-[18px] group-hover:translate-y-0.5 transition-transform">
                        expand_more
                      </span>
                    </button>
                  ) : showAllHomePhotos && totalCategoryItems.length > 8 ? (
                    <button
                      onClick={() => {
                        setShowAllHomePhotos(false);
                        const el = document.getElementById('featured-moments');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="outline-btn inline-flex items-center gap-2 px-6 py-2.5 text-xs tracking-wider uppercase font-bold hover:scale-105 transition-all"
                    >
                      <span className="material-symbols-outlined text-[18px]">expand_less</span>
                      <span>SHOW LESS</span>
                    </button>
                  ) : null}

                  {/* Secondary Links to Full Gallery & Portfolio */}
                  <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                    <Link
                      to="/gallery"
                      className="outline-btn text-xs tracking-wider uppercase inline-flex items-center gap-2 px-5 py-2.5 hover:scale-105"
                    >
                      <span className="material-symbols-outlined text-[16px]">grid_view</span>
                      <span>VIEW FULL GALLERY</span>
                    </Link>
                    <Link
                      to="/portfolio"
                      className="gold-btn text-xs tracking-wider uppercase inline-flex items-center gap-2 px-5 py-2.5 hover:scale-105"
                    >
                      <span className="material-symbols-outlined text-[16px]">photo_camera</span>
                      <span>EXPLORE ALL PORTFOLIO</span>
                    </Link>
                  </div>
                </div>
              </>
            );
          })()}
        </section>

        {/* ========================================================================= */}
        {/* 4. INSTAGRAM FEED & REELS SHOWCASE                                       */}
        {/* ========================================================================= */}
        <InstagramReelsSection />

        {/* ========================================================================= */}
        {/* 5. ABOUT US & WHY CHOOSE US COMBINED SECTION                             */}
        {/* ========================================================================= */}
        <section className="py-20 px-margin-mobile md:px-margin-desktop border-t border-stone-800/80">
          <div className="max-w-container-max mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Column: About Us Narrative */}
            <div className="lg:col-span-4 space-y-4">
              <p className="text-primary font-sans font-medium text-xs uppercase tracking-[0.25em]">
                ABOUT US
              </p>
              <h2 className="font-headline text-4xl sm:text-5xl text-white uppercase leading-none">
                CAPTURING MEMORIES<br />
                CREATING STORIES
              </h2>
              <p className="text-stone-200 text-xs sm:text-sm leading-relaxed font-normal">
                IMAGE MAKER STUDIO is a professional photography and cinematography studio based in Sidhpur, Gujarat. We believe in capturing real emotions and unforgettable moments that you can cherish for a lifetime. With creativity, passion and the latest technology, we turn your special moments into timeless memories.
              </p>
              <div className="font-cormorant italic text-primary text-3xl pt-1 drop-shadow-[0_2px_12px_rgba(245,184,0,0.4)]">
                Image Maker Studio
              </div>
            </div>

            {/* Middle Column: Photographer in studio holding DSLR */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="relative rounded-[8px] overflow-hidden border border-white/15 shadow-2xl group w-full">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBlGg9ocmMjAaEilFlOaFaN0zG_lGst4qIBFehOamHPxi-FNFTvWpXCQgTvQoz2AzScaKoa0tuSsp2amFDq7M0ExvXmWpdrHJr1oPKRmi2ZluhNaV8Idm_lr2MY2V9G1DHFPVd0EbZ2xlskuIvOiL9kxnqKGFnAwLg-lfSrMTs9oj00psVT9s34NowNIz0NXj0H2ow60tInY57AYLf9XcI72kJTARz9cy0oqkxKtAuMFnmxO9Dqmma8hv4IEMwYW8EWAA"
                  alt="Image Maker Studio Photographer"
                  className="w-full h-[380px] object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              </div>
            </div>

            {/* Right Column: Why Choose Us (4 Liquid Glass Cards) */}
            <div className="lg:col-span-4 space-y-4">
              <div className="mb-3">
                <p className="text-primary font-sans font-medium text-xs uppercase tracking-[0.25em]">
                  WHY CHOOSE US?
                </p>
                <div className="w-10 h-[2px] bg-primary mt-1.5 shadow-[0_0_8px_#F5B800]"></div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {/* Card 1 */}
                <div className="liquid-glass p-4 rounded-[8px]">
                  <div className="w-9 h-9 border border-primary flex items-center justify-center text-primary mb-2.5 rounded-[4px] bg-black/40">
                    <span className="material-symbols-outlined text-[20px]">groups</span>
                  </div>
                  <h4 className="font-sans font-bold text-white text-xs uppercase mb-1">
                    PROFESSIONAL TEAM
                  </h4>
                  <p className="text-stone-300 text-[11px] leading-relaxed">
                    Experienced photographers & cinematographers.
                  </p>
                </div>

                {/* Card 2 */}
                <div className="liquid-glass p-4 rounded-[8px]">
                  <div className="w-9 h-9 border border-primary flex items-center justify-center text-primary mb-2.5 rounded-[4px] bg-black/40">
                    <span className="material-symbols-outlined text-[20px]">photo_camera</span>
                  </div>
                  <h4 className="font-sans font-bold text-white text-xs uppercase mb-1">
                    PREMIUM EQUIPMENT
                  </h4>
                  <p className="text-stone-300 text-[11px] leading-relaxed">
                    Using latest cinema cameras, prime lenses & studio lighting.
                  </p>
                </div>

                {/* Card 3 */}
                <div className="liquid-glass p-4 rounded-[8px]">
                  <div className="w-9 h-9 border border-primary flex items-center justify-center text-primary mb-2.5 rounded-[4px] bg-black/40">
                    <span className="material-symbols-outlined text-[20px]">lightbulb</span>
                  </div>
                  <h4 className="font-sans font-bold text-white text-xs uppercase mb-1">
                    CREATIVE APPROACH
                  </h4>
                  <p className="text-stone-300 text-[11px] leading-relaxed">
                    We create unique concepts for every shoot.
                  </p>
                </div>

                {/* Card 4 */}
                <div className="liquid-glass p-4 rounded-[8px]">
                  <div className="w-9 h-9 border border-primary flex items-center justify-center text-primary mb-2.5 rounded-[4px] bg-black/40">
                    <span className="material-symbols-outlined text-[20px]">favorite</span>
                  </div>
                  <h4 className="font-sans font-bold text-white text-xs uppercase mb-1">
                    CUSTOMER SATISFACTION
                  </h4>
                  <p className="text-stone-300 text-[11px] leading-relaxed">
                    Your happiness is our first priority.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
