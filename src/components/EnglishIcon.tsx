import React from 'react';

interface EnglishIconProps {
  className?: string;
}

export default function EnglishIcon({ className = "w-full h-full" }: EnglishIconProps) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 512 512"
      className={className}
    >
      {/* Background Badge with Rounded Corners */}
      <rect 
        x="46" 
        y="46" 
        width="420" 
        height="420" 
        rx="40" 
        fill="#312e81" 
        stroke="#000000" 
        strokeWidth="24" 
        strokeLinejoin="round" 
      />

      {/* Flag Field / Union Jack Base (inside the badge) */}
      <g clipPath="url(#badge-clip)">
        {/* We can define a clip path to keep everything neat and within the rounded rect */}
        <clipPath id="badge-clip">
          <rect x="46" y="46" width="420" height="420" rx="40" />
        </clipPath>

        {/* Diagonal White Cross (Saltire) */}
        <path 
          d="M 46,46 L 466,466 M 466,46 M 46,466" 
          stroke="#ffffff" 
          strokeWidth="48" 
          strokeLinecap="round" 
        />

        {/* Diagonal Red Cross (St Patrick's) */}
        <path 
          d="M 46,46 L 466,466" 
          stroke="#ef4444" 
          strokeWidth="16" 
          strokeLinecap="round" 
        />
        <path 
          d="M 466,46 L 46,466" 
          stroke="#ef4444" 
          strokeWidth="16" 
          strokeLinecap="round" 
        />

        {/* Wide White Cross (St George's border) */}
        <path 
          d="M 256,46 V 466 M 46,256 H 466" 
          stroke="#ffffff" 
          strokeWidth="80" 
          strokeLinecap="square" 
        />

        {/* Red Cross (St George's) */}
        <path 
          d="M 256,46 V 466 M 46,256 H 466" 
          stroke="#ef4444" 
          strokeWidth="48" 
          strokeLinecap="square" 
        />
      </g>

      {/* Styled Book/Page Layer on top for "English Literature/Grammar" academic theme */}
      {/* Semi-transparent Overlay to blend with flag */}
      <rect 
        x="46" 
        y="46" 
        width="420" 
        height="420" 
        rx="40" 
        fill="url(#overlay-grad)" 
        stroke="#000000" 
        strokeWidth="24" 
        strokeLinejoin="round" 
      />

      {/* Academic Open Book emblem in the center */}
      <g transform="translate(136, 156) scale(0.45)">
        {/* Book shadow/backing */}
        <path 
          d="M 30,180 Q 240,240 240,60 Q 240,240 450,180 L 450,380 Q 240,440 240,260 Q 240,440 30,380 Z" 
          fill="#1e1b4b" 
          stroke="#000000" 
          strokeWidth="48" 
          strokeLinejoin="round" 
        />
        {/* Book Pages */}
        <path 
          d="M 30,180 Q 240,240 240,60 Q 240,240 450,180 L 450,360 Q 240,420 240,240 Q 240,420 30,360 Z" 
          fill="#ffffff" 
          stroke="#000000" 
          strokeWidth="24" 
          strokeLinejoin="round" 
        />
        {/* Book Center Line */}
        <path 
          d="M 240,60 V 240" 
          stroke="#000000" 
          strokeWidth="24" 
          strokeLinecap="round" 
        />
        {/* Stylized Text lines in the book */}
        <path 
          d="M 70,210 Q 150,230 210,210 M 70,250 Q 150,270 210,250 M 70,290 Q 150,310 210,290" 
          stroke="#475569" 
          strokeWidth="16" 
          strokeLinecap="round" 
          fill="none" 
        />
        <path 
          d="M 270,210 Q 350,230 410,210 M 270,250 Q 350,270 410,250 M 270,290 Q 350,310 410,290" 
          stroke="#475569" 
          strokeWidth="16" 
          strokeLinecap="round" 
          fill="none" 
        />
      </g>

      {/* Ribbon Bookmark dangling at the bottom right */}
      <path 
        d="M 380,380 V 470 L 405,445 L 430,470 V 380 Z" 
        fill="#f59e0b" 
        stroke="#000000" 
        strokeWidth="18" 
        strokeLinejoin="round" 
      />

      {/* Decorative Star Badge in center bottom */}
      <circle 
        cx="256" 
        cy="400" 
        r="32" 
        fill="#eab308" 
        stroke="#000000" 
        strokeWidth="16" 
      />
      {/* Tiny inner star/emblem details */}
      <circle 
        cx="256" 
        cy="400" 
        r="12" 
        fill="#ffffff" 
      />

      {/* Gradients */}
      <defs>
        <radialGradient id="overlay-grad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.45" />
        </radialGradient>
      </defs>
    </svg>
  );
}
