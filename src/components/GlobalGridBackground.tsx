import React from 'react';
import { ROOM } from '@/components/ui/mascot-portfolio-hero';

export const GlobalGridBackground: React.FC = () => {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
      aria-hidden="true"
    >
      <svg
        className="w-full h-full block text-[#111111]"
        viewBox="0 0 1000 1000"
        preserveAspectRatio="none"
      >
        <g stroke="currentColor" strokeWidth="0.8" fill="none" opacity="0.13">
          {ROOM.back.map((s, i) => (
            <line
              key={'b' + i}
              x1={s[0]}
              y1={s[1]}
              x2={s[2]}
              y2={s[3]}
              vectorEffect="non-scaling-stroke"
            />
          ))}
          {ROOM.rays.map((s, i) => (
            <line
              key={'r' + i}
              x1={s[0]}
              y1={s[1]}
              x2={s[2]}
              y2={s[3]}
              vectorEffect="non-scaling-stroke"
            />
          ))}
          {ROOM.depth.map((d, i) => (
            <path
              key={'d' + i}
              d={d}
              vectorEffect="non-scaling-stroke"
            />
          ))}
        </g>
      </svg>
    </div>
  );
};
