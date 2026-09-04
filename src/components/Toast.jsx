import React from 'react';
import { useApp } from '../context/AppContext';

export default function Toast() {
  const { toast, closeToast } = useApp();

  if (!toast) return null;

  const isSuccess = toast.type === 'success';
  const isError = toast.type === 'error';

  return (
    <div className="fixed bottom-6 right-6 z-[100] max-w-md animate-slide-up flex items-center gap-3 p-4 bg-[#181818] border border-primary text-on-surface shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
      <span className={`material-symbols-outlined text-2xl ${isSuccess ? 'text-primary' : isError ? 'text-error' : 'text-primary'}`}>
        {isSuccess ? 'check_circle' : isError ? 'error' : 'info'}
      </span>
      <div className="flex-1 font-body-md text-sm leading-snug">
        {toast.message}
      </div>
      <button 
        onClick={closeToast}
        className="text-on-surface-variant hover:text-primary transition-colors p-1"
        aria-label="Close notification"
      >
        <span className="material-symbols-outlined text-lg">close</span>
      </button>
    </div>
  );
}
