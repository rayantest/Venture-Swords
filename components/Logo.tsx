
import React, { useState } from 'react';

interface LogoProps {
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ className }) => {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div className={`flex items-center justify-center border-2 border-[#EFBF04] bg-[#094E2E]/20 text-[#EFBF04] font-mono font-black text-xl tracking-widest ${className}`}>
        VS
      </div>
    );
  }

  return (
    <div className={className}>
      <img 
        src="components/l.png" 
        alt="VentureSwords" 
        className="w-full h-full object-contain"
        onError={() => setError(true)}
      />
    </div>
  );
};
