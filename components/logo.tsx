import React from 'react';

interface LogoProps {
  size?: number;
  className?: string;
  showText?: boolean;
}

export function CommitCemeteryLogo({ size = 48, className = '', showText = false }: LogoProps) {
  return (
    <div className={`inline-flex items-center space-x-3 ${className}`}>
      <div
        style={{ width: size, height: size }}
        className="relative flex-shrink-0 group"
      >
        {/* Ambient Glow */}
        <div className="absolute inset-0 bg-purple-600/30 rounded-full blur-md group-hover:bg-purple-500/50 transition-all" />
        
        {/* SVG Graphic */}
        <svg
          viewBox="0 0 200 200"
          className="w-full h-full relative z-10 drop-shadow-[0_0_12px_rgba(168,85,247,0.4)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="tombGradComp" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1e1b4b" />
              <stop offset="50%" stopColor="#0f172a" />
              <stop offset="100%" stopColor="#05070f" />
            </linearGradient>
            <linearGradient id="neonGlowComp" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#c084fc" />
              <stop offset="50%" stopColor="#a855f7" />
              <stop offset="100%" stopColor="#10b981" />
            </linearGradient>
          </defs>

          {/* Mound */}
          <path d="M 25 170 Q 100 155 175 170 L 180 185 Q 100 190 20 185 Z" fill="#090d16" stroke="#334155" strokeWidth="2" />
          
          {/* Tombstone Body */}
          <path d="M 45 165 L 45 70 C 45 35 155 35 155 70 L 155 165 Z" fill="url(#tombGradComp)" stroke="url(#neonGlowComp)" strokeWidth="3.5" strokeLinejoin="round" />

          {/* Cracks */}
          <path d="M 60 48 L 72 60 L 68 70 L 80 82" stroke="#6b21a8" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
          <path d="M 140 120 L 132 130 L 136 142" stroke="#475569" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />

          {/* R.I.P */}
          <text x="100" y="70" fontFamily="monospace" fontSize="12" fontWeight="900" fill="#e2e8f0" textAnchor="middle" letterSpacing="3" opacity="0.9">R.I.P.</text>

          {/* Git Commit Tree */}
          <g>
            <path d="M 100 83 L 100 145" stroke="#a855f7" strokeWidth="3" strokeLinecap="round" />
            <path d="M 100 105 Q 125 108 125 125 L 125 135" stroke="#34d399" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            
            <circle cx="100" cy="86" r="6" fill="#0f172a" stroke="#c084fc" strokeWidth="3" />
            <circle cx="100" cy="86" r="2.5" fill="#f3e8ff" />

            <circle cx="125" cy="125" r="5" fill="#0f172a" stroke="#34d399" strokeWidth="2.5" />
            <circle cx="125" cy="125" r="2" fill="#ecfdf5" />

            <circle cx="100" cy="115" r="5" fill="#0f172a" stroke="#c084fc" strokeWidth="2.5" />
            <circle cx="100" cy="115" r="2" fill="#f3e8ff" />

            <circle cx="100" cy="142" r="6" fill="#0f172a" stroke="#a855f7" strokeWidth="3" />
            <circle cx="100" cy="142" r="2.5" fill="#c084fc" />
          </g>

          {/* Ghost Eyes */}
          <circle cx="88" cy="98" r="1.5" fill="#34d399" />
          <circle cx="112" cy="98" r="1.5" fill="#34d399" />
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col">
          <span className="font-serif font-extrabold tracking-tight text-lg bg-gradient-to-r from-purple-200 via-slate-100 to-emerald-200 bg-clip-text text-transparent">
            COMMIT CEMETERY
          </span>
          <span className="font-mono text-[10px] tracking-widest text-slate-500 uppercase -mt-0.5">
            Git Forensics & Archaeology
          </span>
        </div>
      )}
    </div>
  );
}
