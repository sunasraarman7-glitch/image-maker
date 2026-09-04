import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { STUDIO_INFO, SERVICES } from '../data/studioData';
import contactHeroImg from '../assets/hero/contact-hero.png';
import contactHeroVideo from '../assets/hero/contact-hero-video.mp4';

export default function ContactPage() {
  const { showToast, openLightbox } = useApp();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: '',
    date: '',
    message: ''
  });

  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      showToast('Please enter your Name and Phone Number.', 'error');
      return;
    }

    setSubmitting(true);

    // Format WhatsApp message with all filled contact details
    const whatsappMessage = `*📩 IMAGE MAKER STUDIO - CONTACT US INQUIRY*

*👤 Name:* ${formData.name.trim()}
*📞 Phone:* ${formData.phone.trim()}
${formData.email ? `*✉️ Email:* ${formData.email.trim()}\n` : ''}*🎯 Shoot Type / Service:* ${formData.service || 'General Inquiry'}
${formData.date ? `*📅 Event Date:* ${formData.date}\n` : ''}*💬 Message:* ${formData.message ? formData.message.trim() : 'Hello, I would like to inquire about your photography/cinematography services.'}

_Sent via Image Maker Studio Official Website_`;

    const encodedText = encodeURIComponent(whatsappMessage);
    const whatsappLink = `https://wa.me/919638076661?text=${encodedText}`;

    showToast(`Redirecting to WhatsApp with your message...`, 'success');

    setTimeout(() => {
      setSubmitting(false);
      window.open(whatsappLink, '_blank');
      setFormData({
        name: '',
        phone: '',
        email: '',
        service: '',
        date: '',
        message: ''
      });
    }, 600);
  };

  return (
    <div className="w-full text-white">
      {/* ========================================================================= */}
      {/* 1. CINEMATIC VIDEO HERO SECTION (VIBRANT & HIGH VISIBILITY)                */}
      {/* ========================================================================= */}
      <section className="relative z-20 w-full min-h-[58vh] sm:min-h-[65vh] md:min-h-[70vh] bg-[#050505] flex items-center justify-start px-margin-mobile md:px-margin-desktop pt-24 sm:pt-28 md:pt-36 pb-14 md:pb-20 overflow-hidden border-b border-[#1a1a1a] shadow-2xl">
        {/* Background Video Container */}
        <div className="absolute inset-0 z-0 bg-[#050505] overflow-hidden select-none">
          <video
            autoPlay
            loop
            muted
            playsInline
            poster={contactHeroImg}
            className="w-full h-full object-cover object-[68%_center] md:object-right transition-transform duration-1000 scale-100 brightness-105 contrast-105"
          >
            <source src={contactHeroVideo} type="video/mp4" />
            <img
              alt="Contact Us Hero Background"
              className="w-full h-full object-cover object-[68%_center] md:object-right"
              src={contactHeroImg}
            />
          </video>
          {/* Subtle gradient overlay to keep video bright & clearly visible */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/35 to-transparent md:from-black/70 md:via-black/25 md:to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-black/20"></div>
        </div>

        <div className="relative z-10 w-full max-w-container-max mx-auto space-y-4">
          <div className="flex items-center gap-2 text-xs font-sans text-stone-300 drop-shadow-md">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <span className="text-stone-500">&gt;</span>
            <span className="text-primary font-semibold">Contact Us</span>
          </div>

          <div className="space-y-0.5 drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]">
            <h1 className="font-headline text-5xl sm:text-6xl md:text-7xl lg:text-[88px] text-white uppercase leading-none tracking-tight drop-shadow-md">
              LET'S CAPTURE
            </h1>
            <h2 className="font-headline text-5xl sm:text-6xl md:text-7xl lg:text-[88px] text-primary uppercase leading-none tracking-tight drop-shadow-[0_4px_20px_rgba(245,184,0,0.4)]">
              YOUR SPECIAL MOMENTS
            </h2>
          </div>

          <div className="flex items-center gap-3 py-1">
            <div className="w-10 h-[1.5px] bg-primary"></div>
            <span className="material-symbols-outlined text-primary text-xl">camera</span>
            <div className="w-10 h-[1.5px] bg-primary"></div>
          </div>

          <p className="text-stone-200 font-sans text-xs sm:text-sm md:text-base leading-relaxed max-w-xl font-medium drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
            We'd love to hear from you! Whether you have a question, need more information, or are ready to book your shoot, feel free to reach out to us directly on WhatsApp.
          </p>

          {/* 3 Value Proposition Items with Liquid Glass styling */}
          <div className="flex flex-wrap gap-6 sm:gap-8 items-center pt-2 sm:pt-4 liquid-glass-pill p-3 rounded-[8px] inline-flex">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary text-2xl sm:text-3xl fill-1">chat_bubble</span>
              <div>
                <h3 className="font-sans font-bold text-white text-xs uppercase">Quick Response</h3>
                <p className="text-stone-300 text-[11px] font-medium">We reply within 24 hrs</p>
              </div>
            </div>

            <div className="w-[1px] h-8 bg-white/15 hidden md:block"></div>

            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary text-2xl sm:text-3xl fill-1">groups</span>
              <div>
                <h3 className="font-sans font-bold text-white text-xs uppercase">Professional Team</h3>
                <p className="text-stone-300 text-[11px] font-medium">Experienced & Creative</p>
              </div>
            </div>

            <div className="w-[1px] h-8 bg-white/15 hidden md:block"></div>

            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary text-2xl sm:text-3xl fill-1">verified</span>
              <div>
                <h3 className="font-sans font-bold text-white text-xs uppercase">Quality Work</h3>
                <p className="text-stone-300 text-[11px] font-medium">100% Satisfaction</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. BODY CONTENT (REVEALS THE GORGEOUS BACKGROUND IMAGE DIRECTLY BEHIND)   */}
      {/* ========================================================================= */}
      <div className="relative z-10 w-full bg-transparent">
        {/* ========================================================================= */}
        {/* 2. CONTACT FORM & GET IN TOUCH (2 LIQUID GLASS CONTAINERS)                */}
        {/* ========================================================================= */}
        <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-20 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Form Container */}
            <div className="liquid-glass p-6 sm:p-8 rounded-[8px] shadow-2xl">
              <h2 className="font-headline text-3xl text-white mb-6 uppercase tracking-wider">
                SEND US A MESSAGE
              </h2>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-2.5 top-1/2 -translate-y-1/2 text-stone-500 text-lg">person</span>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Your Name *"
                      className="form-input-luxury text-xs"
                    />
                  </div>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-2.5 top-1/2 -translate-y-1/2 text-stone-500 text-lg">call</span>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      placeholder="Phone / WhatsApp Number *"
                      className="form-input-luxury text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-2.5 top-1/2 -translate-y-1/2 text-stone-500 text-lg">mail</span>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Email Address"
                      className="form-input-luxury text-xs"
                    />
                  </div>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-2.5 top-1/2 -translate-y-1/2 text-stone-500 text-lg">photo_camera</span>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="form-input-luxury text-xs bg-transparent appearance-none cursor-pointer"
                    >
                      <option value="" className="bg-[#161616] text-white">Shoot Type / Service</option>
                      {SERVICES.map((s) => (
                        <option key={s.id} value={s.title} className="bg-[#161616] text-white">
                          {s.title}
                        </option>
                      ))}
                    </select>
                    <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-stone-500 text-base pointer-events-none">expand_more</span>
                  </div>
                </div>

                <div className="relative">
                  <span className="material-symbols-outlined absolute left-2.5 top-1/2 -translate-y-1/2 text-stone-500 text-lg">calendar_month</span>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="form-input-luxury text-xs bg-transparent cursor-pointer"
                  />
                </div>

                <div className="relative">
                  <span className="material-symbols-outlined absolute left-2.5 top-3 text-stone-500 text-lg">edit</span>
                  <textarea
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your Message / Event Details *"
                    className="form-input-luxury text-xs resize-none"
                    required
                  ></textarea>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-6 pt-3">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="gold-btn w-full sm:w-auto flex items-center justify-center gap-2"
                  >
                    <span className="material-symbols-outlined text-[18px]">chat</span>
                    <span>{submitting ? 'REDIRECTING...' : 'SEND ON WHATSAPP'}</span>
                  </button>

                  <div className="hidden md:flex items-center gap-2 text-stone-400 italic font-serif text-xs">
                    <svg className="text-primary shrink-0" fill="none" height="24" viewBox="0 0 60 30" width="48" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 1C15 25 45 25 58 10M58 10L45 8M58 10L50 20" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                    </svg>
                    <span>We will reply directly<br />on WhatsApp!</span>
                  </div>
                </div>
              </form>
            </div>

            {/* Info Card Container */}
            <div className="liquid-glass p-6 sm:p-8 rounded-[8px] flex flex-col justify-center space-y-6 shadow-2xl">
              <h2 className="font-headline text-3xl text-white mb-2 uppercase tracking-wider">
                GET IN TOUCH
              </h2>

              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full border border-primary flex items-center justify-center text-primary shrink-0 bg-black/40 shadow-sm">
                    <span className="material-symbols-outlined text-lg">call</span>
                  </div>
                  <div>
                    <h4 className="font-sans font-bold text-white text-xs uppercase mb-0.5">Phone / WhatsApp</h4>
                    <a href={STUDIO_INFO.whatsappUrl} target="_blank" rel="noreferrer" className="text-stone-300 hover:text-primary transition-colors text-xs font-medium">
                      {STUDIO_INFO.phoneDisplay || STUDIO_INFO.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full border border-primary flex items-center justify-center text-primary shrink-0 bg-black/40 shadow-sm">
                    <span className="material-symbols-outlined text-lg">mail</span>
                  </div>
                  <div>
                    <h4 className="font-sans font-bold text-white text-xs uppercase mb-0.5">Email</h4>
                    <a href={`mailto:${STUDIO_INFO.email}`} className="text-stone-300 hover:text-primary transition-colors text-xs break-all font-medium">
                      {STUDIO_INFO.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full border border-primary flex items-center justify-center text-primary shrink-0 bg-black/40 shadow-sm">
                    <span className="material-symbols-outlined text-lg fill-1">location_on</span>
                  </div>
                  <div>
                    <h4 className="font-sans font-bold text-white text-xs uppercase mb-0.5">Address</h4>
                    <p className="text-stone-300 text-xs leading-relaxed max-w-[280px]">
                      {STUDIO_INFO.address}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full border border-primary flex items-center justify-center text-primary shrink-0 bg-black/40 shadow-sm">
                    <span className="material-symbols-outlined text-lg">photo_camera</span>
                  </div>
                  <div>
                    <h4 className="font-sans font-bold text-white text-xs uppercase mb-0.5">Instagram</h4>
                    <a href={STUDIO_INFO.instagramUrl} target="_blank" rel="noreferrer" className="text-stone-300 hover:text-primary transition-colors text-xs font-medium">
                      {STUDIO_INFO.instagramHandle || STUDIO_INFO.instagram}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full border border-primary flex items-center justify-center text-primary shrink-0 bg-black/40 shadow-sm">
                    <span className="material-symbols-outlined text-lg">schedule</span>
                  </div>
                  <div>
                    <h4 className="font-sans font-bold text-white text-xs uppercase mb-0.5">Working Hours</h4>
                    <p className="text-stone-300 text-xs">
                      {STUDIO_INFO.hours}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 3. LOCATION & STUDIO INTERIOR SHOWCASE (LIQUID GLASS CONTAINERS)          */}
        {/* ========================================================================= */}
        <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop pb-20 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Map Card with Exact Street View & Coordinates */}
            <div className="liquid-glass p-6 md:p-8 rounded-[8px] flex flex-col justify-between shadow-2xl">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-headline text-3xl text-white uppercase tracking-wider">
                    FIND US HERE
                  </h2>
                  <span className="liquid-glass-pill px-3 py-1 text-[10px] text-primary font-bold uppercase tracking-widest">
                    Google Maps
                  </span>
                </div>

                <a
                  href={STUDIO_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="block relative w-full h-[280px] mb-6 border border-white/15 rounded-[8px] overflow-hidden shadow-inner group cursor-pointer"
                >
                  <img
                    className="w-full h-full object-cover group-hover:scale-105 filter contrast-110 brightness-90 group-hover:brightness-100 transition-all duration-500"
                    src="https://streetviewpixels-pa.googleapis.com/v1/thumbnail?cb_client=maps_sv.tactile&w=900&h=600&pitch=0&panoid=8sA_F_I6nhlQ6JAHd0lC7A&yaw=284.24734928194795"
                    alt="Image Maker Studio Google Street View"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30"></div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center pointer-events-none">
                    <div className="liquid-glass-pill px-3.5 py-1.5 font-sans font-bold text-[11px] text-primary whitespace-nowrap mb-1.5 shadow-lg border border-primary/50">
                      IMAGE MAKER STUDIO
                    </div>
                    <span className="material-symbols-outlined text-primary text-4xl fill-1 drop-shadow-[0_2px_12px_rgba(245,184,0,0.9)] animate-bounce">
                      location_on
                    </span>
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] text-stone-300 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-[4px]">
                    <span>Royal Complex, Sidhpur</span>
                    <span className="text-primary font-bold flex items-center gap-1">
                      View on Maps <span className="text-xs">↗</span>
                    </span>
                  </div>
                </a>
              </div>

              <a
                href={STUDIO_INFO.googleMapsUrl}
                target="_blank"
                rel="noreferrer"
                className="gold-btn self-start inline-flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-[17px]">directions</span>
                <span>OPEN IN GOOGLE MAPS</span>
              </a>
            </div>

            {/* Studio Main Facility Real Photo Card */}
            <div className="relative h-[420px] lg:h-auto liquid-glass rounded-[8px] overflow-hidden group shadow-2xl border border-white/15 flex flex-col justify-end p-6">
              <img
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                src="https://i.ibb.co/RTTZNvxP/Screenshot-2026-08-30-10-48-35-75-680d03679600f7af0b4c700c6b270fe7-jpg.jpg"
                alt="Image Maker Studio Royal Complex Entrance"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>
              <div className="relative z-10 liquid-glass-pill p-4 rounded-[8px] shadow-2xl border border-white/20">
                <p className="text-primary font-sans font-bold text-[10px] uppercase tracking-widest flex items-center gap-1.5 mb-0.5">
                  <span className="material-symbols-outlined text-sm text-primary">storefront</span>
                  <span>Studio Headquarters &amp; Gallery</span>
                </p>
                <h4 className="text-white font-sans font-bold text-base uppercase">Royal Complex, Sidhpur</h4>
                <p className="text-stone-300 text-xs mt-1 leading-relaxed">
                  G-7, Near Shifa Hospital, Sidhpur (Gujarat) - 384151
                </p>
              </div>
            </div>
          </div>

          {/* Real Shop Images Gallery (6 Photos Grid) */}
          <div className="space-y-6 pt-4">
            <div className="space-y-1">
              <p className="text-primary font-sans font-bold text-xs uppercase tracking-[0.22em]">
                STUDIO TOUR
              </p>
              <h3 className="font-headline text-3xl sm:text-4xl text-white uppercase tracking-tight">
                INSIDE IMAGE MAKER STUDIO
              </h3>
              <div className="w-12 h-[2px] bg-primary shadow-[0_0_8px_#F5B800]"></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {STUDIO_INFO.shopImages.map((shop, idx) => (
                <div
                  key={idx}
                  onClick={() => openLightbox(shop, STUDIO_INFO.shopImages)}
                  className="liquid-glass rounded-[8px] overflow-hidden group shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                >
                  <div className="relative h-[220px] overflow-hidden">
                    <img
                      src={shop.image}
                      alt={shop.title}
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-600"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent"></div>
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                      <p className="text-white text-xs font-bold leading-tight drop-shadow-md">
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
      </div>
    </div>
  );
}
