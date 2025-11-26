import React, { useState } from 'react';

export const Logo = ({ className = "w-12 h-12" }: { className?: string }) => {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div className={`flex items-center justify-center bg-[#094E2E] border border-[#EFBF04] ${className}`}>
        <span className="text-[#EFBF04] font-bold text-xs">VS</span>
      </div>
    );
  }

  return (
    <img 
      src="/components/l.png" 
      alt="VentureSwords Logo" 
      className={`object-contain ${className}`}
      onError={() => setError(true)}
    />
  );
};