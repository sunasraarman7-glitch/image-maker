import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { SERVICES, STUDIO_INFO } from '../data/studioData';
import Logo from './Logo';

export default function BookShootModal() {
  const { isBookingOpen, closeBookingModal, selectedService, showToast } = useApp();
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: '',
    date: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (selectedService) {
      setFormData(prev => ({ ...prev, service: selectedService }));
    }
  }, [selectedService, isBookingOpen]);

  if (!isBookingOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      showToast('Please provide at least your Name and Phone Number.', 'error');
      return;
    }

    setIsSubmitting(true);

    // Format WhatsApp message with all filled details
    const whatsappMessage = `*📸 IMAGE MAKER STUDIO - BOOK A SHOOT INQUIRY*

*👤 Name:* ${formData.name.trim()}
*📞 Phone:* ${formData.phone.trim()}
${formData.email ? `*✉️ Email:* ${formData.email.trim()}\n` : ''}*🎯 Shoot Type / Service:* ${formData.service || 'General Photography / Cinematography'}
${formData.date ? `*📅 Preferred Event Date:* ${formData.date}\n` : ''}${formData.message ? `*💬 Details / Message:* ${formData.message.trim()}\n` : ''}
_Inquiry sent via Image Maker Studio Official Website_`;

    const encodedText = encodeURIComponent(whatsappMessage);
    const whatsappLink = `https://wa.me/919638076661?text=${encodedText}`;

    showToast(`Redirecting to WhatsApp with your booking details...`, 'success');

    setTimeout(() => {
      setIsSubmitting(false);
      window.open(whatsappLink, '_blank');
      setFormData({
        name: '',
        phone: '',
        email: '',
        service: '',
        date: '',
        message: ''
      });
      closeBookingModal();
    }, 600);
  };

  return (
    <div 
      className="fixed inset-0 z-[90] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in"
      onClick={closeBookingModal}
    >
      <div 
        className="relative w-full max-w-2xl liquid-glass border border-primary/60 p-6 md:p-10 shadow-[0_0_60px_rgba(0,0,0,0.95)] max-h-[90vh] overflow-y-auto rounded-[16px]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={closeBookingModal}
          className="absolute top-5 right-5 text-stone-400 hover:text-primary transition-colors p-2 rounded-full hover:bg-white/10"
          aria-label="Close modal"
        >
          <span className="material-symbols-outlined text-2xl">close</span>
        </button>

        {/* Header with Brand Logo */}
        <div className="mb-8 flex flex-col items-start">
          <div className="mb-4">
            <Logo />
          </div>
          <p className="font-sans font-bold text-primary text-xs uppercase tracking-[0.22em] mb-1">RESERVATION</p>
          <h2 className="font-headline text-3xl sm:text-4xl text-white uppercase leading-none">
            BOOK YOUR <span className="text-primary">SHOOT</span>
          </h2>
          <div className="w-12 h-0.5 bg-primary mt-2"></div>
          <p className="text-stone-400 text-xs sm:text-sm mt-2">
            Fill out the details below, and you will be redirected to WhatsApp to confirm your booking directly with us.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="relative">
              <span className="material-symbols-outlined absolute left-0 top-1/2 -translate-y-1/2 text-stone-500 text-lg">person</span>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Your Full Name *"
                className="form-input-luxury text-xs"
              />
            </div>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-0 top-1/2 -translate-y-1/2 text-stone-500 text-lg">call</span>
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
              <span className="material-symbols-outlined absolute left-0 top-1/2 -translate-y-1/2 text-stone-500 text-lg">mail</span>
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
              <span className="material-symbols-outlined absolute left-0 top-1/2 -translate-y-1/2 text-stone-500 text-lg">photo_camera</span>
              <select
                name="service"
                value={formData.service}
                onChange={handleChange}
                className="form-input-luxury text-xs bg-transparent appearance-none cursor-pointer"
              >
                <option value="" className="bg-[#161616] text-white">Select Shoot Type / Service</option>
                {SERVICES.map((s) => (
                  <option key={s.id} value={s.title} className="bg-[#161616] text-white">
                    {s.title}
                  </option>
                ))}
              </select>
              <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-stone-500 text-base pointer-events-none">expand_more</span>
            </div>
          </div>

          <div className="relative">
            <span className="material-symbols-outlined absolute left-0 top-1/2 -translate-y-1/2 text-stone-500 text-lg">calendar_month</span>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="form-input-luxury text-xs bg-transparent cursor-pointer"
            />
          </div>

          <div className="relative">
            <span className="material-symbols-outlined absolute left-0 top-3 text-stone-500 text-lg">edit</span>
            <textarea
              name="message"
              rows={3}
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell us about your event, location, or special requests..."
              className="form-input-luxury text-xs resize-none"
            ></textarea>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="gold-btn w-full sm:w-auto px-7 py-3 flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-[18px]">chat</span>
              <span>{isSubmitting ? 'REDIRECTING...' : 'SEND ON WHATSAPP'}</span>
            </button>

            <div className="text-stone-400 text-xs text-center sm:text-right">
              Or call directly: <br />
              <a href={`tel:${STUDIO_INFO.phone}`} className="text-primary font-bold hover:underline">
                {STUDIO_INFO.phoneDisplay || STUDIO_INFO.phone}
              </a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
