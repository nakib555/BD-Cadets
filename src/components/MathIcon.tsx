import React from 'react';

interface MathIconProps {
  className?: string;
}

export default function MathIcon({ className = "w-full h-full" }: MathIconProps) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 512 512"
      className={className}
    >
      {/* Background Cross Base */}
      <rect 
        x="96" 
        y="96" 
        width="320" 
        height="320" 
        rx="24" 
        fill="#8896b5" 
        stroke="#000000" 
        strokeWidth="24" 
        strokeLinejoin="round" 
      />

      {/* Top Right Green */}
      <rect 
        x="286" 
        y="46" 
        width="180" 
        height="180" 
        rx="40" 
        fill="#c6e355" 
        stroke="#000000" 
        strokeWidth="24" 
        strokeLinejoin="round" 
      />
      
      {/* Bottom Right Blue */}
      <rect 
        x="286" 
        y="286" 
        width="180" 
        height="180" 
        rx="40" 
        fill="#6ae0ff" 
        stroke="#000000" 
        strokeWidth="24" 
        strokeLinejoin="round" 
      />
      
      {/* Top Left Pink */}
      <rect 
        x="46" 
        y="46" 
        width="180" 
        height="180" 
        rx="40" 
        fill="#ff5877" 
        stroke="#000000" 
        strokeWidth="24" 
        strokeLinejoin="round" 
      />

      {/* Bottom Left Yellow (with Stylized Broken Border) */}
      <rect x="46" y="286" width="180" height="180" rx="40" fill="#ffea57" />
      <path 
        d="M 154,286 H 186 A 40,40 0 0 1 226,326 V 426 A 40,40 0 0 1 186,466 H 86 A 40,40 0 0 1 46,426 V 326 A 40,40 0 0 1 86,286" 
        fill="none" 
        stroke="#000000" 
        strokeWidth="24" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <circle cx="122" cy="286" r="12" fill="#000000" />

      {/* Symbols Outer Black Highlights */}
      {/* Plus (TL) */}
      <path 
        d="M 102,136 H 170 M 136,102 V 170" 
        fill="none" 
        stroke="#000000" 
        strokeWidth="62" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      {/* Division/Slash (TR) */}
      <path 
        d="M 352,160 L 400,112" 
        fill="none" 
        stroke="#000000" 
        strokeWidth="62" 
        strokeLinecap="round" 
      />
      {/* Minus (BL) */}
      <path 
        d="M 102,376 H 170" 
        fill="none" 
        stroke="#000000" 
        strokeWidth="62" 
        strokeLinecap="round" 
      />
      {/* Multiply (BR) */}
      <path 
        d="M 352,352 L 400,400 M 352,400 L 400,352" 
        fill="none" 
        stroke="#000000" 
        strokeWidth="62" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />

      {/* Symbols Inner White Core */}
      {/* Plus (TL) */}
      <path 
        d="M 102,136 H 170 M 136,102 V 170" 
        fill="none" 
        stroke="#ffffff" 
        strokeWidth="22" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      {/* Division/Slash (TR) */}
      <path 
        d="M 352,160 L 400,112" 
        fill="none" 
        stroke="#ffffff" 
        strokeWidth="22" 
        strokeLinecap="round" 
      />
      {/* Minus (BL) */}
      <path 
        d="M 102,376 H 170" 
        fill="none" 
        stroke="#ffffff" 
        strokeWidth="22" 
        strokeLinecap="round" 
      />
      {/* Multiply (BR) */}
      <path 
        d="M 352,352 L 400,400 M 352,400 L 400,352" 
        fill="none" 
        stroke="#ffffff" 
        strokeWidth="22" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </svg>
  );
}
