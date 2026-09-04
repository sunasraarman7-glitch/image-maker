import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useApp } from '../context/AppContext';
import { STUDIO_INFO } from '../data/studioData';

export default function LightboxModal() {
  const {
    lightboxData,
    closeLightbox,
    nextLightboxImage,
    prevLightboxImage,
    selectLightboxImage,
    openBookingModal,
    showToast
  } = useApp();

  const [zoomLevel, setZoomLevel] = useState(1); // 1 to 3.5
  const [panPosition, setPanPosition] = useState({ x: 0, y: 0 });
  const [showDetails, setShowDetails] = useState(true); // Open details panel on desktop by default
  const [showMobileControls, setShowMobileControls] = useState(true);
  const [showFilmstrip, setShowFilmstrip] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [swipeOffset, setSwipeOffset] = useState(0);

  // Touch tracking refs for glitch-free gestures
  const touchStartRef = useRef({ x: 0, y: 0, time: 0 });
  const touchEndRef = useRef({ x: 0, y: 0 });
  const initialPinchDistRef = useRef(0);
  const initialZoomRef = useRef(1);
  const lastTapRef = useRef(0);
  const tapTimeoutRef = useRef(null);

  const thumbnailsRef = useRef(null);
  const canvasRef = useRef(null);

  // Lock body scroll
  useEffect(() => {
    if (lightboxData) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [lightboxData]);

  // Default details panel closed on mobile on initial open
  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      setShowDetails(false);
    }
  }, [lightboxData?.image]);

  // Auto-scroll active thumbnail into view on desktop
  useEffect(() => {
    if (thumbnailsRef.current && lightboxData?.currentIndex != null) {
      const activeThumb = thumbnailsRef.current.children[lightboxData.currentIndex];
      if (activeThumb) {
        activeThumb.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      }
    }
  }, [lightboxData?.currentIndex]);

  // Preload adjacent images
  useEffect(() => {
    if (!lightboxData?.allItems || lightboxData.allItems.length <= 1) return;

    const total = lightboxData.allItems.length;
    const nextIdx = (lightboxData.currentIndex + 1) % total;
    const prevIdx = (lightboxData.currentIndex - 1 + total) % total;

    const nextImg = new Image();
    nextImg.src = lightboxData.allItems[nextIdx]?.image;

    const prevImg = new Image();
    prevImg.src = lightboxData.allItems[prevIdx]?.image;
  }, [lightboxData]);

  // Reset zoom & pan when image changes
  useEffect(() => {
    setIsImageLoaded(false);
    setZoomLevel(1);
    setPanPosition({ x: 0, y: 0 });
    setSwipeOffset(0);
  }, [lightboxData?.image]);

  // Pan boundary clamping function
  const clampPan = useCallback((x, y, zoom) => {
    if (zoom <= 1) return { x: 0, y: 0 };
    const maxPanX = (zoom - 1) * (window.innerWidth * 0.45);
    const maxPanY = (zoom - 1) * (window.innerHeight * 0.45);
    return {
      x: Math.max(Math.min(x, maxPanX), -maxPanX),
      y: Math.max(Math.min(y, maxPanY), -maxPanY)
    };
  }, []);

  // Global mouse up / move for desktop drag panning
  useEffect(() => {
    const handleGlobalMouseMove = (e) => {
      if (!isDragging || zoomLevel <= 1) return;
      const rawX = e.clientX - dragStart.x;
      const rawY = e.clientY - dragStart.y;
      setPanPosition(clampPan(rawX, rawY, zoomLevel));
    };

    const handleGlobalMouseUp = () => {
      if (isDragging) {
        setIsDragging(false);
      }
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleGlobalMouseMove);
      window.addEventListener('mouseup', handleGlobalMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleGlobalMouseMove);
      window.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, [isDragging, dragStart, zoomLevel, clampPan]);

  // Keyboard navigation & Fullscreen sync
  useEffect(() => {
    if (!lightboxData) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (zoomLevel > 1) {
          setZoomLevel(1);
          setPanPosition({ x: 0, y: 0 });
        } else {
          closeLightbox();
        }
      }
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        resetZoomAndNext();
      }
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        resetZoomAndPrev();
      }
      if (e.key === 'i' || e.key === 'I') {
        setShowDetails(prev => !prev);
      }
      if (e.key === 'f' || e.key === 'F') {
        toggleFullscreen();
      }
      if (e.key === '+' || e.key === '=') {
        zoomIn();
      }
      if (e.key === '-' || e.key === '_') {
        zoomOut();
      }
      if (e.key === '0') {
        setZoomLevel(1);
        setPanPosition({ x: 0, y: 0 });
      }
    };

    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, [lightboxData, zoomLevel]);

  if (!lightboxData) return null;

  const resetZoomAndNext = () => {
    setZoomLevel(1);
    setPanPosition({ x: 0, y: 0 });
    setSwipeOffset(0);
    nextLightboxImage();
  };

  const resetZoomAndPrev = () => {
    setZoomLevel(1);
    setPanPosition({ x: 0, y: 0 });
    setSwipeOffset(0);
    prevLightboxImage();
  };

  const jumpToImage = (index) => {
    if (index === lightboxData.currentIndex) return;
    setZoomLevel(1);
    setPanPosition({ x: 0, y: 0 });
    setSwipeOffset(0);
    selectLightboxImage(index);
  };

  const zoomIn = () => {
    setZoomLevel(prev => {
      const next = Math.min(prev + 0.5, 3.5);
      return next;
    });
  };

  const zoomOut = () => {
    setZoomLevel(prev => {
      const next = Math.max(prev - 0.5, 1);
      if (next === 1) setPanPosition({ x: 0, y: 0 });
      return next;
    });
  };

  const toggleZoom = () => {
    if (zoomLevel > 1) {
      setZoomLevel(1);
      setPanPosition({ x: 0, y: 0 });
    } else {
      setZoomLevel(2.2);
    }
  };

  // Mouse wheel zoom on PC & Laptop
  const handleWheel = (e) => {
    e.preventDefault();
    if (e.deltaY < 0) {
      setZoomLevel(prev => Math.min(prev + 0.25, 3.5));
    } else {
      setZoomLevel(prev => {
        const next = Math.max(prev - 0.25, 1);
        if (next === 1) setPanPosition({ x: 0, y: 0 });
        return next;
      });
    }
  };

  // Mouse drag panning on PC
  const handleMouseDown = (e) => {
    if (zoomLevel <= 1 || e.button !== 0) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - panPosition.x, y: e.clientY - panPosition.y });
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
    }
  };

  // Multi-touch gestures (Pinch-to-zoom, Pan, and Swipe)
  const handleTouchStart = (e) => {
    if (e.touches.length === 2) {
      // 2-finger pinch initiation
      const t1 = e.touches[0];
      const t2 = e.touches[1];
      const dist = Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY);
      initialPinchDistRef.current = dist;
      initialZoomRef.current = zoomLevel;
      setIsDragging(false);
      return;
    }

    if (e.touches.length === 1) {
      const touch = e.touches[0];
      touchStartRef.current = { x: touch.clientX, y: touch.clientY, time: Date.now() };
      touchEndRef.current = { x: touch.clientX, y: touch.clientY };

      if (zoomLevel > 1) {
        setIsDragging(true);
        setDragStart({ x: touch.clientX - panPosition.x, y: touch.clientY - panPosition.y });
      }
    }
  };

  const handleTouchMove = (e) => {
    if (e.touches.length === 2 && initialPinchDistRef.current > 0) {
      // Pinch to Zoom in progress
      const t1 = e.touches[0];
      const t2 = e.touches[1];
      const currentDist = Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY);
      const scale = (currentDist / initialPinchDistRef.current) * initialZoomRef.current;
      const clampedScale = Math.min(Math.max(scale, 1), 3.5);
      setZoomLevel(clampedScale);
      if (clampedScale === 1) setPanPosition({ x: 0, y: 0 });
      return;
    }

    if (e.touches.length === 1) {
      const touch = e.touches[0];
      touchEndRef.current = { x: touch.clientX, y: touch.clientY };

      if (zoomLevel > 1 && isDragging) {
        const rawX = touch.clientX - dragStart.x;
        const rawY = touch.clientY - dragStart.y;
        setPanPosition(clampPan(rawX, rawY, zoomLevel));
      } else if (zoomLevel <= 1) {
        const dx = touch.clientX - touchStartRef.current.x;
        if (Math.abs(dx) < 150) {
          setSwipeOffset(dx * 0.45);
        }
      }
    }
  };

  const handleTouchEnd = (e) => {
    if (e.touches.length > 0) {
      // 1 finger still remains
      if (e.touches.length === 1 && zoomLevel > 1) {
        const touch = e.touches[0];
        setIsDragging(true);
        setDragStart({ x: touch.clientX - panPosition.x, y: touch.clientY - panPosition.y });
      }
      return;
    }

    // All fingers lifted
    setIsDragging(false);
    setSwipeOffset(0);
    initialPinchDistRef.current = 0;

    const deltaX = touchEndRef.current.x - touchStartRef.current.x;
    const deltaY = touchEndRef.current.y - touchStartRef.current.y;
    const duration = Date.now() - touchStartRef.current.time;

    // Tap detection (minimal movement)
    if (Math.abs(deltaX) < 10 && Math.abs(deltaY) < 10 && duration < 250) {
      const now = Date.now();
      const DOUBLE_TAP_DELAY = 280;

      if (now - lastTapRef.current < DOUBLE_TAP_DELAY) {
        // Double tap -> Toggle Zoom
        if (tapTimeoutRef.current) clearTimeout(tapTimeoutRef.current);
        toggleZoom();
        lastTapRef.current = 0;
      } else {
        // Single tap -> Schedule UI toggle
        lastTapRef.current = now;
        if (tapTimeoutRef.current) clearTimeout(tapTimeoutRef.current);
        tapTimeoutRef.current = setTimeout(() => {
          setShowMobileControls(prev => !prev);
        }, 220);
      }
      return;
    }

    if (zoomLevel > 1) return;

    // Horizontal Swipe (Next / Prev photo)
    const isHorizontalSwipe = Math.abs(deltaX) > 40 && Math.abs(deltaX) > Math.abs(deltaY) * 1.2;
    if (isHorizontalSwipe) {
      if (deltaX < 0) {
        resetZoomAndNext();
      } else {
        resetZoomAndPrev();
      }
      return;
    }

    // Vertical swipe down to close on mobile
    if (deltaY > 80 && Math.abs(deltaX) < 60 && duration < 400) {
      closeLightbox();
    }
  };

  const handleShare = async () => {
    const shareData = {
      title: `${lightboxData.title} | IMAGE MAKER STUDIO`,
      text: `Check out "${lightboxData.title}" captured by Image Maker Studio!`,
      url: window.location.href
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {}
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('Photo link copied to clipboard!', 'success');
    }
  };

  const whatsappInquiryUrl = `https://wa.me/919638076661?text=${encodeURIComponent(
    `*Hello Image Maker Studio!*\n\nI am inquiring about the shoot *"${lightboxData.title}"* (${(lightboxData.category || 'Photography').toUpperCase()}).\n\nI want to book a similar photography/cinematography package.\n\nLink: ${window.location.href}`
  )}`;

  const currentCount = (lightboxData.currentIndex || 0) + 1;
  const totalCount = lightboxData.allItems?.length || 1;
  const progressPercent = Math.round((currentCount / totalCount) * 100);

  return (
    <div className="fixed inset-0 z-[100] bg-[#050505] text-white flex flex-col select-none overflow-hidden font-sans animate-fade-in">
      {/* Background Ambient Aura */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-[#0a0a0a] to-black pointer-events-none" />
      <div
        className="absolute inset-0 opacity-20 filter blur-3xl scale-125 bg-cover bg-center pointer-events-none transition-all duration-700"
        style={{ backgroundImage: `url(${lightboxData.image})` }}
      />

      {/* Top Gold Progress Indicator */}
      <div className="absolute top-0 inset-x-0 z-50 pointer-events-none">
        <div
          className="h-[2px] bg-gradient-to-r from-primary via-[#FFD700] to-primary shadow-[0_0_12px_#F5B800] transition-all duration-300 ease-out"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* ========================================================================= */}
      {/* 1A. DESKTOP & LAPTOP PRO HEADER (Hidden on Mobile < lg)                   */}
      {/* ========================================================================= */}
      <header className="hidden lg:flex relative z-40 h-16 px-6 items-center justify-between border-b border-white/10 bg-black/85 backdrop-blur-xl shrink-0">
        {/* Left: Studio Monogram, Category & Album Counter */}
        <div className="flex items-center gap-3.5 min-w-0">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse shadow-[0_0_8px_#F5B800] shrink-0" />
            <span className="font-headline text-xl text-white tracking-wider truncate">
              IMAGE MAKER STUDIO
            </span>
          </div>

          <span className="text-white/20">|</span>

          <span className="bg-primary/15 text-primary border border-primary/30 text-xs font-bold uppercase tracking-widest px-2.5 py-0.5 rounded shrink-0">
            {lightboxData.category}
          </span>

          <span className="text-stone-400 font-mono text-xs shrink-0">
            ({currentCount} of {totalCount})
          </span>
        </div>

        {/* Center: Current Shot Name (Desktop / Laptop) */}
        <div className="flex items-center justify-center flex-1 mx-4 min-w-0">
          <h2 className="font-headline text-xl text-white uppercase tracking-wide truncate max-w-lg">
            {lightboxData.title}
          </h2>
        </div>

        {/* Right: Studio Utility Controls */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Zoom Controls */}
          <div className="flex items-center bg-white/5 border border-white/10 rounded-lg p-0.5">
            <button
              onClick={zoomOut}
              disabled={zoomLevel <= 1}
              className="w-7 h-7 flex items-center justify-center text-stone-300 hover:text-white disabled:opacity-30 transition-colors"
              title="Zoom Out (-)"
              aria-label="Zoom Out"
            >
              <span className="material-symbols-outlined text-lg">zoom_out</span>
            </button>
            <span
              onClick={toggleZoom}
              className="text-[11px] font-mono px-2 text-primary font-bold cursor-pointer hover:underline min-w-[42px] text-center"
              title="Click to reset 1:1"
            >
              {Math.round(zoomLevel * 100)}%
            </span>
            <button
              onClick={zoomIn}
              disabled={zoomLevel >= 3.5}
              className="w-7 h-7 flex items-center justify-center text-stone-300 hover:text-white disabled:opacity-30 transition-colors"
              title="Zoom In (+)"
              aria-label="Zoom In"
            >
              <span className="material-symbols-outlined text-lg">zoom_in</span>
            </button>
          </div>

          {/* Filmstrip Toggle */}
          {totalCount > 1 && (
            <button
              onClick={() => setShowFilmstrip(prev => !prev)}
              className={`w-9 h-9 rounded-lg border flex items-center justify-center transition-all ${
                showFilmstrip
                  ? 'border-primary/50 text-primary bg-primary/10'
                  : 'border-white/10 text-stone-300 hover:text-white bg-white/5'
              }`}
              title="Toggle Thumbnails Strip"
              aria-label="Toggle Thumbnails"
            >
              <span className="material-symbols-outlined text-[19px]">view_carousel</span>
            </button>
          )}

          {/* Shoot Info Panel Toggle */}
          <button
            onClick={() => setShowDetails(prev => !prev)}
            className={`h-9 px-3 rounded-lg border flex items-center gap-1.5 transition-all ${
              showDetails
                ? 'border-primary text-black bg-primary font-bold shadow-[0_0_15px_rgba(245,184,0,0.5)]'
                : 'border-white/10 text-stone-300 hover:text-white bg-white/5'
            }`}
            title="Toggle Shoot Story & Details (I)"
            aria-label="Toggle Shoot Story"
          >
            <span className="material-symbols-outlined text-[19px]">info</span>
            <span className="text-xs uppercase font-bold tracking-wider">
              Details
            </span>
          </button>

          {/* Fullscreen Button */}
          <button
            onClick={toggleFullscreen}
            className="w-9 h-9 rounded-lg border border-white/10 text-stone-300 hover:text-primary bg-white/5 flex items-center justify-center transition-colors"
            title={isFullscreen ? "Exit Fullscreen (F)" : "Fullscreen (F)"}
            aria-label="Fullscreen"
          >
            <span className="material-symbols-outlined text-[19px]">
              {isFullscreen ? 'fullscreen_exit' : 'fullscreen'}
            </span>
          </button>

          {/* Native Share */}
          <button
            onClick={handleShare}
            className="w-9 h-9 rounded-lg border border-white/10 text-stone-300 hover:text-primary bg-white/5 flex items-center justify-center transition-colors"
            title="Share Photo"
            aria-label="Share"
          >
            <span className="material-symbols-outlined text-[18px]">share</span>
          </button>

          {/* Direct Book Shoot CTA */}
          <button
            onClick={() => {
              closeLightbox();
              openBookingModal(lightboxData.title);
            }}
            className="gold-btn h-9 px-4 text-xs rounded-lg flex items-center gap-1.5 shadow-[0_2px_12px_rgba(245,184,0,0.35)]"
          >
            <span className="material-symbols-outlined text-[16px]">calendar_month</span>
            <span>BOOK SHOOT</span>
          </button>

          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="w-9 h-9 rounded-lg border border-white/10 text-stone-300 hover:text-white hover:border-red-500/50 hover:bg-red-500/10 flex items-center justify-center transition-all ml-1"
            title="Close (Esc)"
            aria-label="Close"
          >
            <span className="material-symbols-outlined text-2xl">close</span>
          </button>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* 1B. MOBILE CLEAN FLOATING HEADER (Only on Mobile/Tablet < lg)             */}
      {/* ========================================================================= */}
      <div
        className={`lg:hidden absolute top-0 inset-x-0 z-40 transition-all duration-300 pointer-events-none ${
          showMobileControls ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
        }`}
      >
        <div className="absolute inset-0 h-28 bg-gradient-to-b from-black/95 via-black/50 to-transparent pointer-events-none" />

        <div className="relative px-3.5 pt-3.5 flex items-center justify-between pointer-events-auto">
          {/* Left Brand Badge */}
          <div className="flex items-center gap-1.5">
            <div className="liquid-glass-pill px-3 py-1.5 rounded-full flex items-center gap-2 border border-white/15 shadow-lg">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse shrink-0" />
              <span className="text-white text-xs font-bold uppercase tracking-wider">
                {lightboxData.category}
              </span>
              <span className="text-primary font-mono text-[11px] font-bold">
                {currentCount}/{totalCount}
              </span>
            </div>
          </div>

          {/* Right Mobile Actions */}
          <div className="flex items-center gap-2">
            {/* Share */}
            <button
              onClick={handleShare}
              className="w-9 h-9 rounded-full liquid-glass flex items-center justify-center text-stone-200 active:scale-95 transition-transform"
              title="Share"
              aria-label="Share"
            >
              <span className="material-symbols-outlined text-[19px]">share</span>
            </button>

            {/* Info Toggle */}
            <button
              onClick={() => setShowDetails(true)}
              className="w-9 h-9 rounded-full liquid-glass flex items-center justify-center text-stone-200 active:scale-95 transition-transform"
              title="Details"
              aria-label="Details"
            >
              <span className="material-symbols-outlined text-[19px]">info</span>
            </button>

            {/* Close */}
            <button
              onClick={closeLightbox}
              className="w-9 h-9 rounded-full liquid-glass flex items-center justify-center text-stone-100 active:scale-95 transition-transform"
              title="Close"
              aria-label="Close"
            >
              <span className="material-symbols-outlined text-2xl">close</span>
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. MAIN WORKSPACE (PC/LAPTOP SPLIT VIEW + MOBILE FULLSCREEN)               */}
      {/* ========================================================================= */}
      <div className="relative flex-1 w-full flex overflow-hidden min-h-0">
        {/* ======================================================================= */}
        {/* 2A. LEFT/CENTER: IMMERSIVE PHOTO CANVAS                                 */}
        {/* ======================================================================= */}
        <div className="relative flex-1 h-full flex flex-col justify-between overflow-hidden min-w-0">
          {/* Main Photo Canvas */}
          <div
            ref={canvasRef}
            className="relative flex-1 w-full h-full flex items-center justify-center p-1 sm:p-4 md:p-6 overflow-hidden select-none touch-none"
            onWheel={handleWheel}
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            style={{
              cursor: zoomLevel > 1 ? (isDragging ? 'grabbing' : 'grab') : 'zoom-in'
            }}
          >
            {/* Loading Spinner */}
            {!isImageLoaded && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-primary z-10 pointer-events-none">
                <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                <span className="text-[11px] uppercase tracking-widest font-sans font-semibold text-stone-400">
                  Loading Master Photo...
                </span>
              </div>
            )}

            {/* The Scaled Photo */}
            <div
              className="w-full h-full flex items-center justify-center transition-transform duration-100 ease-out"
              style={{
                transform: `translate(${panPosition.x + swipeOffset}px, ${panPosition.y}px) scale(${zoomLevel})`
              }}
            >
              <img
                key={lightboxData.image}
                src={lightboxData.image}
                alt={lightboxData.title || 'Image Maker Studio Work'}
                onLoad={() => setIsImageLoaded(true)}
                onDoubleClick={toggleZoom}
                className={`max-h-full max-w-full object-contain rounded-[4px] shadow-[0_0_70px_rgba(0,0,0,0.95)] border border-white/10 transition-opacity duration-300 ${
                  isImageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                draggable={false}
              />
            </div>

            {/* Desktop Left Nav Chevron Button */}
            {totalCount > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  resetZoomAndPrev();
                }}
                className="hidden md:flex absolute left-3 lg:left-6 top-1/2 -translate-y-1/2 w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-black/60 hover:bg-black/90 border border-white/20 hover:border-primary items-center justify-center text-white hover:text-primary transition-all duration-200 z-30 hover:scale-110 shadow-2xl backdrop-blur-md group"
                title="Previous Photo (Left Arrow)"
                aria-label="Previous Photo"
              >
                <span className="material-symbols-outlined text-3xl group-hover:-translate-x-0.5 transition-transform">
                  chevron_left
                </span>
              </button>
            )}

            {/* Desktop Right Nav Chevron Button */}
            {totalCount > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  resetZoomAndNext();
                }}
                className="hidden md:flex absolute right-3 lg:right-6 top-1/2 -translate-y-1/2 w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-black/60 hover:bg-black/90 border border-white/20 hover:border-primary items-center justify-center text-white hover:text-primary transition-all duration-200 z-30 hover:scale-110 shadow-2xl backdrop-blur-md group"
                title="Next Photo (Right Arrow)"
                aria-label="Next Photo"
              >
                <span className="material-symbols-outlined text-3xl group-hover:translate-x-0.5 transition-transform">
                  chevron_right
                </span>
              </button>
            )}
          </div>

          {/* ===================================================================== */}
          {/* 2B. DESKTOP THUMBNAIL FILMSTRIP CAROUSEL (PC & Laptop only)           */}
          {/* ===================================================================== */}
          {showFilmstrip && totalCount > 1 && (
            <div className="hidden lg:flex relative z-30 h-24 border-t border-white/10 bg-black/90 backdrop-blur-xl px-4 items-center justify-center shrink-0">
              <div
                ref={thumbnailsRef}
                className="flex items-center gap-3 overflow-x-auto no-scrollbar py-2 px-1 scroll-smooth justify-center"
              >
                {lightboxData.allItems.map((item, idx) => {
                  const isActive = idx === lightboxData.currentIndex;
                  return (
                    <button
                      key={idx}
                      onClick={() => jumpToImage(idx)}
                      className={`relative shrink-0 w-20 h-14 rounded-[4px] overflow-hidden border transition-all duration-200 group ${
                        isActive
                          ? 'border-primary ring-2 ring-primary ring-offset-2 ring-offset-black scale-105 shadow-[0_0_12px_#F5B800]'
                          : 'border-white/20 opacity-40 hover:opacity-100 hover:border-white/60'
                      }`}
                      title={item.title || `Photo ${idx + 1}`}
                    >
                      <img
                        src={item.image}
                        alt={item.title || `Thumbnail ${idx + 1}`}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        loading="lazy"
                      />
                      <span className="absolute bottom-0.5 right-1 text-[9px] font-mono font-bold text-white bg-black/70 px-1 rounded">
                        {idx + 1}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* ===================================================================== */}
          {/* 2C. MOBILE BOTTOM FLOATING ACTION BAR (Only on Mobile < lg)            */}
          {/* ===================================================================== */}
          <div
            className={`lg:hidden absolute bottom-0 inset-x-0 z-30 transition-all duration-300 pointer-events-none ${
              showMobileControls ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <div className="absolute inset-0 h-32 bg-gradient-to-t from-black/98 via-black/70 to-transparent pointer-events-none" />

            <div className="relative px-3 pb-3.5 flex flex-col gap-2 pointer-events-auto">
              {/* Bottom Floating Glass Capsule */}
              <div className="liquid-glass p-3 rounded-[14px] border border-white/15 shadow-2xl flex items-center justify-between gap-2.5">
                {/* Title & Shoot Opener */}
                <div
                  className="flex-1 min-w-0 cursor-pointer"
                  onClick={() => setShowDetails(true)}
                >
                  <div className="flex items-center gap-1.5">
                    <h4 className="font-headline text-base text-white uppercase tracking-wide truncate">
                      {lightboxData.title}
                    </h4>
                    <span className="material-symbols-outlined text-primary text-sm shrink-0">
                      info
                    </span>
                  </div>
                  <p className="text-stone-400 text-[10.5px] truncate flex items-center gap-1 mt-0.5">
                    <span className="text-primary font-bold">📍 {lightboxData.location || 'Sidhpur'}</span>
                    <span>•</span>
                    <span className="text-stone-300">Tap for details</span>
                  </p>
                </div>

                {/* Direct Action Buttons */}
                <div className="flex items-center gap-1.5 shrink-0">
                  <a
                    href={whatsappInquiryUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="w-9 h-9 rounded-full bg-emerald-600/80 hover:bg-emerald-500 text-white flex items-center justify-center shadow-md active:scale-95 transition-transform"
                    title="WhatsApp"
                    aria-label="WhatsApp Inquiry"
                  >
                    <span className="material-symbols-outlined text-[19px]">chat</span>
                  </a>

                  <button
                    onClick={() => {
                      closeLightbox();
                      openBookingModal(lightboxData.title);
                    }}
                    className="gold-btn h-9 px-3.5 text-xs rounded-full flex items-center gap-1 shadow-md font-bold active:scale-95 transition-transform"
                  >
                    <span className="material-symbols-outlined text-[15px]">calendar_month</span>
                    <span>BOOK</span>
                  </button>
                </div>
              </div>

              {/* Mobile Quick Thumb Navigation Arrows */}
              {totalCount > 1 && (
                <div className="flex items-center justify-between px-1 text-[11px] text-stone-400 font-medium">
                  <button
                    onClick={resetZoomAndPrev}
                    className="flex items-center gap-1 text-stone-300 hover:text-primary active:scale-95 transition-all"
                  >
                    <span className="material-symbols-outlined text-base">arrow_back</span>
                    <span>PREV</span>
                  </button>

                  <span className="font-mono text-stone-400 text-[10.5px]">
                    Swipe or double-tap to zoom
                  </span>

                  <button
                    onClick={resetZoomAndNext}
                    className="flex items-center gap-1 text-stone-300 hover:text-primary active:scale-95 transition-all"
                  >
                    <span>NEXT</span>
                    <span className="material-symbols-outlined text-base">arrow_forward</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ======================================================================= */}
        {/* 2D. RIGHT: DEDICATED EDITORIAL SIDEBAR (PC & LAPTOP ONLY)               */}
        {/* ======================================================================= */}
        {showDetails && (
          <aside className="hidden lg:flex w-[380px] xl:w-[430px] h-full bg-[#0d0d0d]/98 backdrop-blur-2xl border-l border-white/12 flex-col justify-between p-6 shrink-0 z-40 overflow-y-auto animate-slide-left">
            <div>
              {/* Sidebar Header */}
              <div className="flex items-start justify-between gap-3 mb-4 pb-3 border-b border-white/10">
                <div>
                  <span className="text-primary font-sans font-bold text-[10px] uppercase tracking-widest block">
                    EDITORIAL SHOOT DETAILS
                  </span>
                  <h3 className="font-headline text-2xl xl:text-3xl text-white uppercase tracking-wide mt-1 leading-tight">
                    {lightboxData.title}
                  </h3>
                </div>

                <button
                  onClick={() => setShowDetails(false)}
                  className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/15 text-stone-400 hover:text-white flex items-center justify-center transition-colors shrink-0"
                  title="Collapse Details Panel (I)"
                  aria-label="Collapse Details"
                >
                  <span className="material-symbols-outlined text-lg">chevron_right</span>
                </button>
              </div>

              {/* Story Narrative */}
              <div className="mb-5">
                <span className="text-stone-400 text-[11px] font-bold uppercase tracking-wider block mb-1.5">
                  About This Shot
                </span>
                <p className="text-stone-300 text-xs sm:text-sm leading-relaxed font-medium">
                  {lightboxData.desc || 'Masterpiece portraiture & cinematography captured and color-graded by Image Maker Studio.'}
                </p>
              </div>

              {/* Technical Specifications Matrix */}
              <div className="bg-black/60 border border-white/10 rounded-[8px] p-3.5 mb-5 space-y-2.5 text-xs text-stone-300">
                <div className="flex items-center justify-between gap-2 border-b border-white/5 pb-2">
                  <div className="flex items-center gap-2 text-stone-400">
                    <span className="material-symbols-outlined text-primary text-base">category</span>
                    <span>Category</span>
                  </div>
                  <span className="font-bold text-white uppercase tracking-wider text-[11px]">
                    {lightboxData.categoryDisplay || (lightboxData.category === 'our-location' ? 'OUR LOCATION' : lightboxData.category)}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-2 border-b border-white/5 pb-2">
                  <div className="flex items-center gap-2 text-stone-400">
                    <span className="material-symbols-outlined text-primary text-base">location_on</span>
                    <span>Location</span>
                  </div>
                  <span className="font-semibold text-white truncate max-w-[180px]">
                    {lightboxData.location || 'Sidhpur, Gujarat'}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-2 border-b border-white/5 pb-2">
                  <div className="flex items-center gap-2 text-stone-400">
                    <span className="material-symbols-outlined text-primary text-base">photo_camera</span>
                    <span>Equipment</span>
                  </div>
                  <span className="font-semibold text-white truncate max-w-[180px]">
                    {lightboxData.camera || '4K Sony Alpha Cinema Rig'}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-stone-400">
                    <span className="material-symbols-outlined text-primary text-base">verified</span>
                    <span>Quality</span>
                  </div>
                  <span className="font-bold text-primary uppercase text-[11px]">
                    Ultra HD Master RAW
                  </span>
                </div>
              </div>

              {/* Studio Assurance Card */}
              <div className="p-3 bg-primary/10 border border-primary/30 rounded-[8px] flex items-center gap-3 mb-5">
                <span className="material-symbols-outlined text-primary text-2xl shrink-0">military_tech</span>
                <div>
                  <h4 className="text-white text-xs font-bold uppercase tracking-wider">
                    Official Studio Production
                  </h4>
                  <p className="text-stone-300 text-[11px] mt-0.5">
                    100% Authentic Image Maker Studio Photography.
                  </p>
                </div>
              </div>
            </div>

            {/* Sidebar Bottom Action CTAs */}
            <div className="space-y-2.5 pt-4 border-t border-white/10">
              <a
                href={whatsappInquiryUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full gold-btn py-3 text-xs flex items-center justify-center gap-2 rounded-[6px] shadow-lg font-bold"
              >
                <span className="material-symbols-outlined text-base">chat</span>
                <span>INQUIRE ON WHATSAPP</span>
              </a>

              <button
                onClick={() => {
                  closeLightbox();
                  openBookingModal(lightboxData.title);
                }}
                className="w-full outline-btn py-2.5 text-xs flex items-center justify-center gap-2 rounded-[6px] font-bold"
              >
                <span className="material-symbols-outlined text-base">calendar_month</span>
                <span>BOOK THIS SHOOT STYLE</span>
              </button>
            </div>
          </aside>
        )}
      </div>

      {/* ========================================================================= */}
      {/* 3. MOBILE EDITORIAL BOTTOM DRAWER SHEET (Only on screens < lg)            */}
      {/* ========================================================================= */}
      {showDetails && (
        <div
          className="lg:hidden fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex flex-col justify-end animate-fade-in"
          onClick={() => setShowDetails(false)}
        >
          <div
            className="w-full bg-[#121212] border-t border-primary/50 p-5 rounded-t-[24px] shadow-[0_-15px_60px_rgba(0,0,0,0.98)] animate-slide-up max-h-[82vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drag Handle */}
            <div className="w-12 h-1.5 bg-white/20 rounded-full mx-auto mb-3.5" />

            {/* Sheet Header */}
            <div className="flex items-start justify-between gap-3 mb-3 pb-2.5 border-b border-white/10">
              <div>
                <span className="text-primary font-sans font-bold text-[10px] uppercase tracking-widest block">
                  EDITORIAL SHOOT DETAILS
                </span>
                <h3 className="font-headline text-2xl text-white uppercase tracking-wide mt-0.5 leading-tight">
                  {lightboxData.title}
                </h3>
              </div>
              <button
                onClick={() => setShowDetails(false)}
                className="w-8 h-8 rounded-full bg-white/10 text-stone-300 hover:text-white flex items-center justify-center shrink-0"
                aria-label="Close sheet"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>

            {/* Narrative */}
            <p className="text-stone-200 text-xs leading-relaxed mb-4 font-medium">
              {lightboxData.desc || 'Signature portraiture & cinematography captured and color-graded by Image Maker Studio.'}
            </p>

            {/* Technical Specs */}
            <div className="grid grid-cols-2 gap-2 bg-black/60 p-3 rounded-[10px] border border-white/10 mb-4 text-xs text-stone-300">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-base shrink-0">location_on</span>
                <span className="truncate">{lightboxData.location || 'Sidhpur, Gujarat'}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-base shrink-0">photo_camera</span>
                <span className="truncate">{lightboxData.camera || '4K Sony Alpha Cinema Rig'}</span>
              </div>
              <div className="flex items-center gap-2 col-span-2 pt-1 border-t border-white/5">
                <span className="material-symbols-outlined text-primary text-base shrink-0">verified</span>
                <span className="text-stone-300">Ultra HD Master RAW Production</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-2.5">
              <a
                href={whatsappInquiryUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full gold-btn py-3 text-xs flex items-center justify-center gap-2 rounded-[8px] font-bold"
              >
                <span className="material-symbols-outlined text-base">chat</span>
                <span>INQUIRE ON WHATSAPP</span>
              </a>

              <button
                onClick={() => {
                  setShowDetails(false);
                  closeLightbox();
                  openBookingModal(lightboxData.title);
                }}
                className="w-full outline-btn py-2.5 text-xs flex items-center justify-center gap-2 rounded-[8px] font-bold"
              >
                <span className="material-symbols-outlined text-base">calendar_month</span>
                <span>BOOK THIS SHOOT</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
