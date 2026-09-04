import React from 'react';
import { Link } from 'react-router-dom';
import siteLogo from '../assets/logo.png';

export default function Logo({ className = '', isFooter = false }) {
  return (
    <Link to="/" className={`inline-flex items-center group select-none ${className}`}>
      <img
        src={siteLogo}
        alt="IMAGE MAKER STUDIO Logo"
        className={`object-contain transition-transform duration-200 group-hover:scale-105 ${
          isFooter
            ? 'h-10 sm:h-12 w-auto'
            : 'h-8 sm:h-9 lg:h-12 w-auto'
        }`}
      />
    </Link>
  );
}
