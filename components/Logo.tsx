import React from 'react';

export const Logo = ({ className = "w-12 h-12" }: { className?: string }) => {
  // Brand Colors
  const handleColor = "#094E2E"; // Deep Green
  const bladeColor = "#FFFFFF";  // White
  const strokeColor = "#000000"; // Black outline for contrast

  return (
    <svg 
      viewBox="0 0 200 200" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={className}
    >
      <defs>
        {/* Definition of a single scimitar sword */}
        <g id="scimitar">
          {/* Handle/Hilt */}
          <path 
            d="M94 160 L106 160 L104 185 Q100 195 96 185 L94 160 Z" 
            fill={handleColor} 
            stroke={strokeColor} 
            strokeWidth="3"
          />
          {/* Crossguard */}
          <path 
            d="M85 160 L115 160 Q118 155 110 152 L90 152 Q82 155 85 160 Z" 
            fill={handleColor} 
            stroke={strokeColor} 
            strokeWidth="3"
          />
          {/* Blade (Curved Scimitar) */}
          <path 
            d="M92 152 L92 120 Q92 60 145 20 Q115 50 108 152 Z" 
            fill={bladeColor} 
            stroke={strokeColor} 
            strokeWidth="3"
          />
        </g>
      </defs>

      {/* Sword 1: Rotated -45 degrees (Leaning Left) */}
      <use href="#scimitar" transform="rotate(-45 100 100)" />

      {/* Sword 2: Rotated 45 degrees (Leaning Right) and Mirrored to curve outwards */}
      {/* To mirror across the sword's vertical axis before rotation, we scale(-1, 1) relative to its center */}
      {/* Easier way: Scale X -1 around center, then rotate */}
      <g transform="translate(200, 0) scale(-1, 1)">
        <use href="#scimitar" transform="rotate(-45 100 100)" />
      </g>
    </svg>
  );
};