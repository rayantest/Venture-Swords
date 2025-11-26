import React from 'react';

export const Logo = ({ className = "w-12 h-12" }: { className?: string }) => {
  return (
    <img 
      src="/components/l.png" 
      alt="VentureSwords Logo" 
      className={`object-contain ${className}`}
    />
  );
};