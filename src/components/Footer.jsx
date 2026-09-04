import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from './Logo';
import { STUDIO_INFO, SERVICES } from '../data/studioData';
import footerBg from '../assets/footer-bg.png';

export default function Footer() {
  const location = useLocation();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact Us', path: '/contact' }
  ];

  return (
    <footer className="relative w-full text-sm text-stone-200 overflow-hidden border-t border-[#222222]">
      {/* Background Image Container with Clear Visibility */}
      <div className="absolute inset-0 z-0 select-none overflow-hidden">
        <img
          src={footerBg}
          alt="Footer Details Background"
          className="w-full h-full object-cover object-center opacity-85 scale-100 transition-transform duration-1000"
        />
        {/* Directional gradient overlay to ensure crystal clear contrast for all text */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/92 via-black/75 to-black/90"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-black/60"></div>
      </div>

      {/* Footer Content */}
      <div className="relative z-10 max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Column 1: Brand & Socials */}
        <div className="space-y-5">
          <Logo isFooter={true} />

          <p className="text-xs text-stone-300 max-w-xs leading-relaxed font-medium">
            We capture moments,<br />you keep them forever.
          </p>

          {/* 4 Direct Contact Options: WHATSAPP, INSTAGRAM, EMAIL, PHONE */}
          <div className="flex items-center gap-3 pt-1">
            {/* WHATSAPP */}
            <a
              href={STUDIO_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border border-stone-600 bg-black/75 flex items-center justify-center text-stone-200 hover:text-primary hover:border-primary transition-all duration-200 shadow-md hover:scale-110"
              aria-label="WhatsApp"
              title="WhatsApp"
            >
              <span className="material-symbols-outlined text-[18px]">chat</span>
            </a>

            {/* INSTAGRAM */}
            <a
              href={STUDIO_INFO.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border border-stone-600 bg-black/75 flex items-center justify-center text-stone-200 hover:text-primary hover:border-primary transition-all duration-200 shadow-md hover:scale-110"
              aria-label="Instagram"
              title="Instagram"
            >
              <span className="material-symbols-outlined text-[18px]">photo_camera</span>
            </a>

            {/* EMAIL */}
            <a
              href={`mailto:${STUDIO_INFO.email}`}
              className="w-10 h-10 rounded-full border border-stone-600 bg-black/75 flex items-center justify-center text-stone-200 hover:text-primary hover:border-primary transition-all duration-200 shadow-md hover:scale-110"
              aria-label="Email"
              title="Email"
            >
              <span className="material-symbols-outlined text-[18px]">mail</span>
            </a>

            {/* PHONE */}
            <a
              href={`tel:${STUDIO_INFO.phone}`}
              className="w-10 h-10 rounded-full border border-stone-600 bg-black/75 flex items-center justify-center text-stone-200 hover:text-primary hover:border-primary transition-all duration-200 shadow-md hover:scale-110"
              aria-label="Phone"
              title="Phone"
            >
              <span className="material-symbols-outlined text-[18px]">call</span>
            </a>
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h4 className="text-white font-sans font-bold uppercase tracking-wider text-xs mb-4">
            QUICK LINKS
          </h4>
          <ul className="space-y-2.5 text-xs">
            {quickLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className={`transition-colors duration-200 flex items-center gap-1.5 ${isActive
                        ? 'text-primary font-bold'
                        : 'text-stone-300 hover:text-primary'
                      }`}
                  >
                    {isActive ? (
                      <span className="text-primary text-[10px] font-bold">&gt;</span>
                    ) : null}
                    <span>{link.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Column 3: Our Services */}
        <div>
          <h4 className="text-white font-sans font-bold uppercase tracking-wider text-xs mb-4">
            OUR SERVICES
          </h4>
          <ul className="space-y-2.5 text-xs">
            {SERVICES.map((s) => (
              <li key={s.id}>
                <Link
                  to={`/services`}
                  className="flex items-center gap-2 text-stone-300 hover:text-primary transition-colors duration-200"
                >
                  <span className="w-1.5 h-1.5 bg-primary rounded-full shrink-0"></span>
                  <span>{s.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 4: Contact Us */}
        <div>
          <h4 className="text-white font-sans font-bold uppercase tracking-wider text-xs mb-4">
            CONTACT US
          </h4>
          <ul className="space-y-3.5 text-xs">
            <li>
              <a
                href={`tel:${STUDIO_INFO.phone}`}
                className="flex items-start gap-2.5 text-stone-200 hover:text-primary transition-colors group"
              >
                <span className="material-symbols-outlined text-primary text-[17px] shrink-0 mt-0.5">
                  call
                </span>
                <span className="font-semibold">{STUDIO_INFO.phoneDisplay || STUDIO_INFO.phone}</span>
              </a>
            </li>
            <li>
              <a
                href={`mailto:${STUDIO_INFO.email}`}
                className="flex items-start gap-2.5 text-stone-200 hover:text-primary transition-colors group break-all"
              >
                <span className="material-symbols-outlined text-primary text-[17px] shrink-0 mt-0.5">
                  mail
                </span>
                <span>{STUDIO_INFO.email}</span>
              </a>
            </li>
            <li>
              <a
                href={STUDIO_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2.5 text-stone-200 hover:text-primary transition-colors group"
              >
                <span className="material-symbols-outlined text-primary text-[17px] shrink-0 mt-0.5">
                  location_on
                </span>
                <span className="leading-relaxed group-hover:underline">
                  {STUDIO_INFO.address}
                </span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative z-10 border-t border-[#222222]/80 bg-black/70 backdrop-blur-sm py-5 px-margin-mobile md:px-margin-desktop">
        <div className="max-w-container-max mx-auto flex flex-col sm:flex-row justify-between items-center gap-3 text-[11px] text-stone-400">
          <p>
            © 2026 <span className="text-primary font-bold">IMAGE MAKER STUDIO.</span> All Rights Reserved.
          </p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-stone-300 hover:text-primary transition-colors group"
          >
            <span>Back to Top</span>
            <span className="w-5 h-5 rounded-full border border-stone-600 flex items-center justify-center group-hover:border-primary group-hover:text-primary transition-colors text-[10px]">
              ↑
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
}
