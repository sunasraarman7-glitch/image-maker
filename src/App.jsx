import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import BookShootModal from './components/BookShootModal';
import LightboxModal from './components/LightboxModal';
import Toast from './components/Toast';

import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import PortfolioPage from './pages/PortfolioPage';
import GalleryPage from './pages/GalleryPage';
import ContactPage from './pages/ContactPage';
import siteBg from './assets/site-bg.png';

export default function App() {
  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col font-sans selection:bg-primary selection:text-black relative">
      {/* Global Fixed Luxury Background Image (Camera + Gold Floral + Marbled Table) */}
      <div className="fixed inset-0 z-0 pointer-events-none select-none overflow-hidden">
        <img
          src={siteBg}
          alt="Website Background Texture"
          className="w-full h-full object-cover object-center"
        />
        {/* Subtle atmospheric vignette */}
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <ScrollToTop />
        <Navbar />

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/portfolio" element={<PortfolioPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        <Footer />

        {/* Global Modals & Notifications */}
        <BookShootModal />
        <LightboxModal />
        <Toast />
      </div>
    </div>
  );
}
