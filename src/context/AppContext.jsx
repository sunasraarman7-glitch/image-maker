import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export function AppProvider({ children }) {
  // Booking Modal state
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('');

  // Lightbox Modal state
  const [lightboxData, setLightboxData] = useState(null); // { image, title, category, allImages: [], currentIndex: 0 }

  // Toast notification state
  const [toast, setToast] = useState(null); // { message, type: 'success' | 'info' | 'error' }

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  const closeToast = () => setToast(null);

  const openBookingModal = (serviceName = '') => {
    setSelectedService(serviceName);
    setIsBookingOpen(true);
  };

  const closeBookingModal = () => {
    setIsBookingOpen(false);
    setSelectedService('');
  };

  const openLightbox = (item, allItems = []) => {
    const index = allItems.findIndex(i => i.image === item.image || i.id === item.id);
    setLightboxData({
      ...item,
      image: item.image,
      title: item.title || 'Image Preview',
      category: item.category || 'Photography',
      location: item.location || 'Sidhpur, Gujarat',
      camera: item.camera || '4K Sony Alpha Cinema & Master Lens',
      desc: item.desc || 'Captured with precision and color-graded by Image Maker Studio.',
      allItems: allItems.length > 0 ? allItems : [item],
      currentIndex: index >= 0 ? index : 0
    });
  };

  const closeLightbox = () => {
    setLightboxData(null);
  };

  const nextLightboxImage = () => {
    if (!lightboxData || !lightboxData.allItems.length) return;
    const nextIndex = (lightboxData.currentIndex + 1) % lightboxData.allItems.length;
    const nextItem = lightboxData.allItems[nextIndex];
    setLightboxData({
      ...nextItem,
      image: nextItem.image,
      title: nextItem.title || 'Image Preview',
      category: nextItem.category || 'Photography',
      location: nextItem.location || 'Sidhpur, Gujarat',
      camera: nextItem.camera || '4K Sony Alpha Cinema & Master Lens',
      desc: nextItem.desc || 'Captured with precision and color-graded by Image Maker Studio.',
      allItems: lightboxData.allItems,
      currentIndex: nextIndex
    });
  };

  const prevLightboxImage = () => {
    if (!lightboxData || !lightboxData.allItems.length) return;
    const prevIndex = (lightboxData.currentIndex - 1 + lightboxData.allItems.length) % lightboxData.allItems.length;
    const prevItem = lightboxData.allItems[prevIndex];
    setLightboxData({
      ...prevItem,
      image: prevItem.image,
      title: prevItem.title || 'Image Preview',
      category: prevItem.category || 'Photography',
      location: prevItem.location || 'Sidhpur, Gujarat',
      camera: prevItem.camera || '4K Sony Alpha Cinema & Master Lens',
      desc: prevItem.desc || 'Captured with precision and color-graded by Image Maker Studio.',
      allItems: lightboxData.allItems,
      currentIndex: prevIndex
    });
  };

  const selectLightboxImage = (index) => {
    if (!lightboxData || !lightboxData.allItems.length) return;
    const total = lightboxData.allItems.length;
    const safeIndex = ((index % total) + total) % total;
    const item = lightboxData.allItems[safeIndex];
    if (!item) return;
    setLightboxData({
      ...item,
      image: item.image,
      title: item.title || 'Image Preview',
      category: item.category || 'Photography',
      location: item.location || 'Sidhpur, Gujarat',
      camera: item.camera || '4K Sony Alpha Cinema & Master Lens',
      desc: item.desc || 'Captured with precision and color-graded by Image Maker Studio.',
      allItems: lightboxData.allItems,
      currentIndex: safeIndex
    });
  };

  return (
    <AppContext.Provider
      value={{
        isBookingOpen,
        selectedService,
        openBookingModal,
        closeBookingModal,
        lightboxData,
        openLightbox,
        closeLightbox,
        nextLightboxImage,
        prevLightboxImage,
        selectLightboxImage,
        toast,
        showToast,
        closeToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
