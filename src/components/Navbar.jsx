import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import Logo from './Logo';
import { STUDIO_INFO } from '../data/studioData';
import { useApp } from '../context/AppContext';

export default function Navbar() {
  const { openBookingModal } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent background scrolling when mobile menu drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'HOME', path: '/', icon: 'home', subtitle: 'Studio Welcome & Cinema Highlights' },
    { name: 'ABOUT US', path: '/about', icon: 'info', subtitle: 'Our Vision, Team & Equipment' },
    { name: 'SERVICES', path: '/services', icon: 'photo_camera', subtitle: '4 Signature Shoot Offerings' },
    { name: 'PORTFOLIO', path: '/portfolio', icon: 'auto_awesome', subtitle: 'Curated Client Masterpieces' },
    { name: 'GALLERY', path: '/gallery', icon: 'grid_view', subtitle: 'Photos & Studio Location' },
    { name: 'CONTACT US', path: '/contact', icon: 'contact_mail', subtitle: 'Bookings & Direct Inquiries' }
  ];

  return (
    <>
      <header 
        className={`fixed top-0 inset-x-0 z-50 w-full transition-all duration-300 liquid-glass-navbar ${
          scrolled 
            ? 'scrolled py-2 sm:py-2.5 lg:py-3.5' 
            : 'py-2.5 sm:py-3 lg:py-4'
        }`}
      >
        <div className="max-w-[1360px] mx-auto px-3.5 sm:px-6 lg:px-8 flex justify-between items-center w-full">
          {/* Brand Logo */}
          <div className="flex items-center">
            <Logo />
          </div>

          {/* Floating Liquid Glass Capsule Shape Navigation Bar (Desktop Prominence) */}
          <nav className="hidden lg:flex items-center space-x-1.5 px-4 py-2 liquid-glass-capsule shadow-xl border border-white/15">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `relative font-sans text-xs xl:text-[12.5px] font-bold tracking-[0.08em] transition-all duration-200 px-4 py-2 rounded-full flex items-center justify-center ${
                    isActive
                      ? 'bg-gradient-to-r from-primary to-[#FFC820] text-black font-extrabold shadow-[0_2px_14px_rgba(245,184,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.6)] scale-[1.02]'
                      : 'text-stone-300 hover:text-white hover:bg-white/10'
                  }`
                }
              >
                {({ isActive }) => (
                  <span className="flex items-center gap-1.5">
                    {isActive && <span className="w-1.5 h-1.5 rounded-full bg-black"></span>}
                    <span>{link.name}</span>
                  </span>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Action Button: Liquid Glass Gold Phone Number Capsule */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            <a
              href={`tel:${STUDIO_INFO.phone}`}
              className="hidden sm:inline-flex items-center gap-2 bg-gradient-to-r from-primary to-[#FFC820] text-black font-sans font-bold text-xs px-4 lg:px-5 py-2 lg:py-2.5 rounded-full shadow-[0_4px_18px_rgba(245,184,0,0.35),inset_0_1.5px_1px_rgba(255,255,255,0.7)] border border-primary hover:scale-[1.03] hover:shadow-[0_6px_22px_rgba(245,184,0,0.55)] active:scale-[0.97] transition-all duration-200"
            >
              <span className="material-symbols-outlined text-[16px]">call</span>
              <span>{STUDIO_INFO.phone}</span>
            </a>

            {/* Mobile Hamburger Button with Premium Liquid Glass feel */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`lg:hidden w-10 h-10 rounded-full flex items-center justify-center focus:outline-none transition-all duration-300 ${
                mobileMenuOpen
                  ? 'bg-primary text-black shadow-[0_0_20px_rgba(245,184,0,0.6)] scale-105'
                  : 'liquid-glass-pill text-primary border border-primary/40 hover:border-primary active:scale-95 shadow-md'
              }`}
              aria-label="Toggle menu"
            >
              <span className="material-symbols-outlined text-2xl transition-transform duration-300">
                {mobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu with Premium Liquid Glass Styling */}
      {mobileMenuOpen && (
        <div className="fixed inset-x-0 top-[52px] sm:top-[60px] bottom-0 z-40 lg:hidden overflow-y-auto liquid-glass-mobile-menu animate-fade-in flex flex-col justify-between p-5 sm:p-6 shadow-2xl">
          {/* Ambient Glow Lights behind the liquid glass */}
          <div className="absolute -top-16 left-1/4 w-72 h-36 bg-primary/20 blur-3xl pointer-events-none rounded-full"></div>
          <div className="absolute bottom-10 right-0 w-60 h-60 bg-primary/10 blur-3xl pointer-events-none rounded-full"></div>

          <div className="relative z-10 space-y-3.5">
            {/* 1. Quick Connect Liquid Glass Dock (WhatsApp, Call, Instagram, Directions) */}
            <div className="grid grid-cols-4 gap-2 pt-1 pb-1">
              <a
                href={STUDIO_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="liquid-glass-quick-action flex flex-col items-center justify-center py-2.5 px-1 text-center group"
                title="WhatsApp Chat"
              >
                <span className="w-8 h-8 rounded-full bg-[#25D366]/20 border border-[#25D366]/40 flex items-center justify-center text-[#25D366] group-hover:scale-110 group-hover:bg-[#25D366]/30 transition-transform mb-1 shadow-[0_0_10px_rgba(37,211,102,0.25)]">
                  <span className="material-symbols-outlined text-[17px]">chat</span>
                </span>
                <span className="text-[10px] font-bold text-stone-300 group-hover:text-white uppercase tracking-wider">WhatsApp</span>
              </a>

              <a
                href={`tel:${STUDIO_INFO.phone}`}
                className="liquid-glass-quick-action flex flex-col items-center justify-center py-2.5 px-1 text-center group"
                title="Direct Phone Call"
              >
                <span className="w-8 h-8 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center text-primary group-hover:scale-110 group-hover:bg-primary/30 transition-transform mb-1 shadow-[0_0_10px_rgba(245,184,0,0.25)]">
                  <span className="material-symbols-outlined text-[17px]">call</span>
                </span>
                <span className="text-[10px] font-bold text-stone-300 group-hover:text-white uppercase tracking-wider">Call Now</span>
              </a>

              <a
                href={STUDIO_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="liquid-glass-quick-action flex flex-col items-center justify-center py-2.5 px-1 text-center group"
                title="Instagram Profile"
              >
                <span className="w-8 h-8 rounded-full bg-[#E1306C]/20 border border-[#E1306C]/40 flex items-center justify-center text-[#E1306C] group-hover:scale-110 group-hover:bg-[#E1306C]/30 transition-transform mb-1 shadow-[0_0_10px_rgba(225,48,108,0.25)]">
                  <span className="material-symbols-outlined text-[17px]">photo_camera</span>
                </span>
                <span className="text-[10px] font-bold text-stone-300 group-hover:text-white uppercase tracking-wider">Instagram</span>
              </a>

              <a
                href={STUDIO_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="liquid-glass-quick-action flex flex-col items-center justify-center py-2.5 px-1 text-center group"
                title="Google Maps Location"
              >
                <span className="w-8 h-8 rounded-full bg-sky-500/20 border border-sky-400/40 flex items-center justify-center text-sky-400 group-hover:scale-110 group-hover:bg-sky-500/30 transition-transform mb-1 shadow-[0_0_10px_rgba(56,189,248,0.25)]">
                  <span className="material-symbols-outlined text-[17px]">near_me</span>
                </span>
                <span className="text-[10px] font-bold text-stone-300 group-hover:text-white uppercase tracking-wider">Map</span>
              </a>
            </div>

            {/* 2. Mobile Navigation Links styled with Liquid Glass & Editorial Subtitles */}
            <nav className="flex flex-col space-y-1.5">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `liquid-glass-menu-item font-sans py-2.5 sm:py-3 px-3.5 transition-all flex items-center justify-between ${
                      isActive 
                        ? 'active text-white' 
                        : 'text-stone-300 hover:text-white'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center border transition-all ${
                          isActive
                            ? 'bg-primary text-black border-primary shadow-[0_0_10px_rgba(245,184,0,0.5)]'
                            : 'bg-white/5 text-stone-400 border-white/10'
                        }`}>
                          <span className="material-symbols-outlined text-base">
                            {link.icon}
                          </span>
                        </div>
                        <div className="flex flex-col text-left">
                          <span className={`text-xs sm:text-sm font-bold tracking-wider ${isActive ? 'font-black text-white' : 'text-stone-200'}`}>
                            {link.name}
                          </span>
                          <span className={`text-[10px] tracking-normal font-sans ${isActive ? 'text-primary font-medium' : 'text-stone-400'}`}>
                            {link.subtitle}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5">
                        {isActive && (
                          <span className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_6px_#F5B800] inline-block animate-pulse"></span>
                        )}
                        <span className={`material-symbols-outlined text-base transition-transform ${isActive ? 'text-primary translate-x-0.5' : 'text-stone-500'}`}>
                          chevron_right
                        </span>
                      </div>
                    </>
                  )}
                </NavLink>
              ))}
            </nav>

            {/* 3. Studio Quality & Trust Strip */}
            <div className="flex items-center justify-center gap-2 py-1.5 px-3 rounded-lg bg-black/40 border border-primary/20 text-center">
              <div className="flex text-primary text-xs gap-0.5">
                <span className="material-symbols-outlined text-[13px] fill-1 text-primary">star</span>
                <span className="material-symbols-outlined text-[13px] fill-1 text-primary">star</span>
                <span className="material-symbols-outlined text-[13px] fill-1 text-primary">star</span>
                <span className="material-symbols-outlined text-[13px] fill-1 text-primary">star</span>
                <span className="material-symbols-outlined text-[13px] fill-1 text-primary">star</span>
              </div>
              <span className="text-[10px] tracking-wider uppercase font-bold text-stone-200">
                5.0 Rated Luxury Studio <span className="text-primary font-black">•</span> 500+ Shoots
              </span>
            </div>
          </div>

          {/* Bottom Actions with Liquid Glass CTAs */}
          <div className="relative z-10 space-y-2.5 pt-3.5 mt-3 border-t border-white/10">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openBookingModal();
              }}
              className="gold-btn w-full justify-center text-xs sm:text-sm py-3 rounded-xl shadow-xl flex items-center gap-2 font-bold tracking-wider"
            >
              <span className="material-symbols-outlined text-lg">calendar_month</span>
              <span>BOOK A SHOOT ONLINE</span>
            </button>
            <a
              href={STUDIO_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="liquid-glass w-full justify-center text-xs sm:text-sm py-2.5 rounded-xl border border-[#25D366]/40 text-[#25D366] font-bold tracking-wider flex items-center gap-2 hover:border-[#25D366] active:scale-[0.98] transition-all shadow-md"
            >
              <span className="material-symbols-outlined text-lg">chat</span>
              <span>WHATSAPP INSTANT INQUIRY</span>
            </a>
            <p className="text-center text-[10px] text-stone-400 font-sans pt-0.5">
              IMAGE MAKER STUDIO • Royal Complex, Sidhpur
            </p>
          </div>
        </div>
      )}
    </>
  );
}
