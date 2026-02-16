const GOLD = "#C9A84C";
const NAVY = "#1a3a5c";

function CrescentMoonLamp() {
  return (
    <svg viewBox="0 0 120 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <circle cx="52" cy="40" r="22" stroke={GOLD} strokeWidth="2" fill="none" />
      <circle cx="62" cy="40" r="18" fill="#f0f4f8" />
      <path d="M52 18c-12.2 0-22 9.8-22 22s9.8 22 22 22c6.1 0 11.6-2.5 15.6-6.4A18 18 0 0144 40c0-7.2 4.2-13.4 10.3-16.3A22 22 0 0052 18z" fill={GOLD} opacity="0.25" />
      <path d="M52 18c-12.2 0-22 9.8-22 22s9.8 22 22 22c6.1 0 11.6-2.5 15.6-6.4A18 18 0 0144 40c0-7.2 4.2-13.4 10.3-16.3A22 22 0 0052 18z" stroke={GOLD} strokeWidth="2" fill="none" />
      {[30, 50, 70, 90, 110, 130, 150].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        const x1 = 52 + Math.cos(rad) * 26;
        const y1 = 40 + Math.sin(rad) * 26;
        const x2 = 52 + Math.cos(rad) * 32;
        const y2 = 40 + Math.sin(rad) * 32;
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={GOLD} strokeWidth="1.5" opacity="0.5" />;
      })}
    </svg>
  );
}

function MosqueMiniature() {
  return (
    <svg viewBox="0 0 120 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect x="30" y="45" width="60" height="25" fill={NAVY} opacity="0.12" stroke={NAVY} strokeWidth="1.5" rx="1" />
      <path d="M40 45 Q60 15 80 45" fill={GOLD} opacity="0.15" stroke={GOLD} strokeWidth="1.5" />
      <circle cx="60" cy="28" r="3" fill={GOLD} opacity="0.4" />
      <line x1="60" y1="25" x2="60" y2="18" stroke={GOLD} strokeWidth="1.5" />
      <circle cx="60" cy="17" r="2" fill={GOLD} />
      <rect x="28" y="30" width="6" height="40" fill={NAVY} opacity="0.08" stroke={NAVY} strokeWidth="1.2" rx="1" />
      <rect x="86" y="30" width="6" height="40" fill={NAVY} opacity="0.08" stroke={NAVY} strokeWidth="1.2" rx="1" />
      <circle cx="31" cy="29" r="2.5" fill={GOLD} opacity="0.3" stroke={GOLD} strokeWidth="1" />
      <circle cx="89" cy="29" r="2.5" fill={GOLD} opacity="0.3" stroke={GOLD} strokeWidth="1" />
      <rect x="55" y="55" width="10" height="15" rx="5" fill="none" stroke={NAVY} strokeWidth="1.2" />
    </svg>
  );
}

function PrayerBeadStand() {
  return (
    <svg viewBox="0 0 120 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <ellipse cx="60" cy="35" rx="18" ry="18" fill="none" stroke={GOLD} strokeWidth="1.5" />
      {Array.from({ length: 16 }).map((_, i) => {
        const angle = (i * 360) / 16;
        const rad = (angle * Math.PI) / 180;
        const cx = 60 + Math.cos(rad) * 18;
        const cy = 35 + Math.sin(rad) * 18;
        return <circle key={i} cx={cx} cy={cy} r="2.5" fill={GOLD} opacity="0.35" stroke={GOLD} strokeWidth="0.8" />;
      })}
      <circle cx="60" cy="17" r="3.5" fill={GOLD} opacity="0.5" stroke={GOLD} strokeWidth="1" />
      <line x1="60" y1="53" x2="60" y2="68" stroke={NAVY} strokeWidth="2" />
      <line x1="50" y1="68" x2="70" y2="68" stroke={NAVY} strokeWidth="2" />
    </svg>
  );
}

function AyatulKursiFrame() {
  return (
    <svg viewBox="0 0 120 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect x="22" y="8" width="76" height="64" rx="4" fill="none" stroke={GOLD} strokeWidth="2" />
      <rect x="27" y="13" width="66" height="54" rx="3" fill="none" stroke={GOLD} strokeWidth="1" opacity="0.5" />
      <rect x="32" y="18" width="56" height="44" rx="2" fill={GOLD} opacity="0.06" />
      <line x1="40" y1="32" x2="80" y2="32" stroke={NAVY} strokeWidth="0.8" opacity="0.3" />
      <line x1="40" y1="38" x2="80" y2="38" stroke={NAVY} strokeWidth="0.8" opacity="0.3" />
      <line x1="40" y1="44" x2="75" y2="44" stroke={NAVY} strokeWidth="0.8" opacity="0.3" />
      <text x="60" y="28" textAnchor="middle" fontFamily="serif" fontSize="8" fill={GOLD} opacity="0.6">
        &#x2726; Ayatul Kursi &#x2726;
      </text>
      <circle cx="22" cy="8" r="2" fill={GOLD} opacity="0.4" />
      <circle cx="98" cy="8" r="2" fill={GOLD} opacity="0.4" />
      <circle cx="22" cy="72" r="2" fill={GOLD} opacity="0.4" />
      <circle cx="98" cy="72" r="2" fill={GOLD} opacity="0.4" />
    </svg>
  );
}

function FanoosRamadanLamp() {
  return (
    <svg viewBox="0 0 120 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Hook at top */}
      <path d="M60 8 Q60 4 56 4 Q52 4 52 8" stroke={GOLD} strokeWidth="1.5" fill="none" />
      {/* Chain links */}
      <line x1="60" y1="8" x2="60" y2="14" stroke={GOLD} strokeWidth="1.5" />
      {/* Top cap */}
      <path d="M50 14 L70 14 L68 18 L52 18 Z" fill={GOLD} opacity="0.3" stroke={GOLD} strokeWidth="1" />
      {/* Main lantern body - octagonal shape */}
      <path d="M52 18 L48 24 L48 52 L52 58 L68 58 L72 52 L72 24 L68 18 Z" fill={GOLD} opacity="0.12" stroke={GOLD} strokeWidth="1.5" />
      {/* Decorative panels */}
      <path d="M52 22 L52 54" stroke={GOLD} strokeWidth="0.8" opacity="0.5" />
      <path d="M68 22 L68 54" stroke={GOLD} strokeWidth="0.8" opacity="0.5" />
      <path d="M48 30 L72 30" stroke={GOLD} strokeWidth="0.8" opacity="0.4" />
      <path d="M48 42 L72 42" stroke={GOLD} strokeWidth="0.8" opacity="0.4" />
      {/* Star pattern in center */}
      <polygon points="60,32 62,37 67,37 63,40 64.5,45 60,42 55.5,45 57,40 53,37 58,37" fill={GOLD} opacity="0.35" />
      {/* Arched windows */}
      <path d="M54 46 Q57 43 60 46" stroke={GOLD} strokeWidth="1" fill="none" opacity="0.5" />
      <path d="M60 46 Q63 43 66 46" stroke={GOLD} strokeWidth="1" fill="none" opacity="0.5" />
      {/* Candle glow */}
      <circle cx="60" cy="50" r="3" fill={GOLD} opacity="0.2" />
      <circle cx="60" cy="50" r="6" fill={GOLD} opacity="0.08" />
      {/* Bottom cap */}
      <path d="M52 58 L56 62 L64 62 L68 58" fill={GOLD} opacity="0.3" stroke={GOLD} strokeWidth="1" />
      {/* Bottom finial */}
      <line x1="60" y1="62" x2="60" y2="66" stroke={GOLD} strokeWidth="1.5" />
      <circle cx="60" cy="67" r="1.5" fill={GOLD} opacity="0.4" />
      {/* Light rays */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        const x1 = 60 + Math.cos(rad) * 8;
        const y1 = 38 + Math.sin(rad) * 8;
        const x2 = 60 + Math.cos(rad) * 12;
        const y2 = 38 + Math.sin(rad) * 12;
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={GOLD} strokeWidth="0.6" opacity="0.2" />;
      })}
    </svg>
  );
}

function BismillahCrescent() {
  return (
    <svg viewBox="0 0 120 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Main crescent body */}
      <path d="M55 10c-18 0-32 14-32 32s14 32 32 32c9 0 17-3.6 23-9.5A26 26 0 0142 42c0-10.4 6.1-19.4 15-23.6A32 32 0 0055 10z" fill={GOLD} opacity="0.2" stroke={GOLD} strokeWidth="1.5" />
      {/* Inner crescent edge */}
      <path d="M55 16c-14.3 0-26 11.7-26 26s11.7 26 26 26c7.2 0 13.7-2.9 18.4-7.6A22 22 0 0146 42c0-8.8 5.2-16.4 12.7-19.8A26 26 0 0055 16z" stroke={GOLD} strokeWidth="0.8" fill="none" opacity="0.4" />
      {/* Bismillah calligraphy (stylized) */}
      <text x="48" y="46" textAnchor="middle" fontFamily="'Amiri', serif" fontSize="11" fill={GOLD} opacity="0.75" direction="rtl">
        ﷽
      </text>
      {/* Decorative dots along crescent curve */}
      {[20, 40, 60, 80, 100, 120, 140].map((angle, i) => {
        const rad = ((angle + 180) * Math.PI) / 180;
        const cx = 55 + Math.cos(rad) * 28;
        const cy = 42 + Math.sin(rad) * 28;
        return <circle key={i} cx={cx} cy={cy} r="1" fill={GOLD} opacity="0.3" />;
      })}
      {/* Star accent */}
      <polygon points="82,18 83.5,22 88,22 84.5,24.5 85.5,28.5 82,26 78.5,28.5 79.5,24.5 76,22 80.5,22" fill={GOLD} opacity="0.45" />
    </svg>
  );
}

function CrescentRamadanCenterpiece() {
  return (
    <svg viewBox="0 0 120 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Crescent body */}
      <path d="M58 12c-15 0-27 12-27 27s12 27 27 27c7.5 0 14.3-3 19.2-7.9A22 22 0 0146 39c0-8.8 5.2-16.4 12.7-19.8A27 27 0 0058 12z" fill={GOLD} opacity="0.2" stroke={GOLD} strokeWidth="1.5" />
      {/* Ramadan star */}
      <polygon points="78,20 80,25 85,25 81,28 82.5,33 78,30 73.5,33 75,28 71,25 76,25" fill={GOLD} opacity="0.5" />
      {/* Decorative crescents */}
      <path d="M72 45 Q76 40 80 45" stroke={GOLD} strokeWidth="1" fill="none" opacity="0.4" />
      <path d="M72 50 Q76 45 80 50" stroke={GOLD} strokeWidth="1" fill="none" opacity="0.3" />
      {/* Base */}
      <rect x="38" y="66" width="40" height="4" rx="2" fill={GOLD} opacity="0.3" stroke={GOLD} strokeWidth="0.8" />
      <line x1="58" y1="62" x2="58" y2="66" stroke={GOLD} strokeWidth="1.5" />
    </svg>
  );
}

function RamadanFanoosLantern() {
  return (
    <svg viewBox="0 0 120 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Hook */}
      <path d="M60 6 Q60 2 56 2 Q52 2 52 6" stroke={GOLD} strokeWidth="1.5" fill="none" />
      <line x1="60" y1="6" x2="60" y2="12" stroke={GOLD} strokeWidth="1.5" />
      {/* Top dome */}
      <path d="M48 12 Q60 6 72 12" fill={GOLD} opacity="0.2" stroke={GOLD} strokeWidth="1" />
      {/* Main body - rounded lantern */}
      <path d="M48 12 L46 22 L46 48 L48 56 L72 56 L74 48 L74 22 L72 12 Z" fill={GOLD} opacity="0.1" stroke={GOLD} strokeWidth="1.5" />
      {/* Geometric pattern bands */}
      <line x1="46" y1="22" x2="74" y2="22" stroke={GOLD} strokeWidth="0.8" opacity="0.5" />
      <line x1="46" y1="34" x2="74" y2="34" stroke={GOLD} strokeWidth="0.8" opacity="0.5" />
      <line x1="46" y1="48" x2="74" y2="48" stroke={GOLD} strokeWidth="0.8" opacity="0.5" />
      {/* Diamond patterns */}
      <polygon points="60,24 64,29 60,34 56,29" fill="none" stroke={GOLD} strokeWidth="0.8" opacity="0.4" />
      <polygon points="60,36 64,41 60,46 56,41" fill="none" stroke={GOLD} strokeWidth="0.8" opacity="0.4" />
      {/* Glow */}
      <circle cx="60" cy="38" r="5" fill={GOLD} opacity="0.15" />
      {/* Bottom cap */}
      <path d="M48 56 L52 62 L68 62 L72 56" fill={GOLD} opacity="0.25" stroke={GOLD} strokeWidth="1" />
      <circle cx="60" cy="65" r="1.5" fill={GOLD} opacity="0.4" />
    </svg>
  );
}

function CrescentDatesPot() {
  return (
    <svg viewBox="0 0 120 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Crescent frame */}
      <path d="M35 18c-12 0-22 12-22 26s10 26 22 26c6 0 11.5-2.5 15.5-6.5A20 20 0 0128 44c0-8 4.5-15 11-19A22 22 0 0035 18z" fill={GOLD} opacity="0.2" stroke={GOLD} strokeWidth="1.5" />
      {/* Pot/bowl */}
      <ellipse cx="72" cy="42" rx="20" ry="8" fill={GOLD} opacity="0.1" stroke={GOLD} strokeWidth="1.2" />
      <path d="M52 42 Q52 62 72 62 Q92 62 92 42" fill={GOLD} opacity="0.08" stroke={GOLD} strokeWidth="1.2" />
      {/* Dates inside */}
      <ellipse cx="65" cy="40" rx="4" ry="2.5" fill={NAVY} opacity="0.25" />
      <ellipse cx="72" cy="39" rx="4" ry="2.5" fill={NAVY} opacity="0.2" />
      <ellipse cx="79" cy="40" rx="4" ry="2.5" fill={NAVY} opacity="0.25" />
      <ellipse cx="68" cy="37" rx="3.5" ry="2" fill={NAVY} opacity="0.15" />
      <ellipse cx="76" cy="37" rx="3.5" ry="2" fill={NAVY} opacity="0.15" />
      {/* Base */}
      <ellipse cx="72" cy="62" rx="12" ry="3" fill={GOLD} opacity="0.15" stroke={GOLD} strokeWidth="0.8" />
    </svg>
  );
}

function DatesServingBowl() {
  return (
    <svg viewBox="0 0 120 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Bowl rim */}
      <ellipse cx="60" cy="32" rx="28" ry="10" fill={GOLD} opacity="0.08" stroke={GOLD} strokeWidth="1.5" />
      {/* Bowl body */}
      <path d="M32 32 Q32 60 60 60 Q88 60 88 32" fill={GOLD} opacity="0.06" stroke={GOLD} strokeWidth="1.5" />
      {/* Decorative band */}
      <path d="M36 38 Q60 48 84 38" stroke={GOLD} strokeWidth="0.8" fill="none" opacity="0.4" />
      {/* Geometric pattern on band */}
      <path d="M44 36 L48 40 L52 36" stroke={GOLD} strokeWidth="0.6" fill="none" opacity="0.3" />
      <path d="M56 37 L60 41 L64 37" stroke={GOLD} strokeWidth="0.6" fill="none" opacity="0.3" />
      <path d="M68 36 L72 40 L76 36" stroke={GOLD} strokeWidth="0.6" fill="none" opacity="0.3" />
      {/* Dates inside */}
      <ellipse cx="50" cy="31" rx="5" ry="2.5" fill={NAVY} opacity="0.2" />
      <ellipse cx="60" cy="30" rx="5" ry="2.5" fill={NAVY} opacity="0.25" />
      <ellipse cx="70" cy="31" rx="5" ry="2.5" fill={NAVY} opacity="0.2" />
      <ellipse cx="55" cy="28" rx="4" ry="2" fill={NAVY} opacity="0.15" />
      <ellipse cx="65" cy="28" rx="4" ry="2" fill={NAVY} opacity="0.15" />
      {/* Base */}
      <ellipse cx="60" cy="60" rx="14" ry="4" fill={GOLD} opacity="0.15" stroke={GOLD} strokeWidth="0.8" />
      {/* Star accent */}
      <polygon points="60,64 61,66 63,66 61.5,67.5 62,69.5 60,68 58,69.5 58.5,67.5 57,66 59,66" fill={GOLD} opacity="0.35" />
    </svg>
  );
}

function RamadanStand() {
  return (
    <svg viewBox="0 0 120 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Pedestal base */}
      <rect x="40" y="62" width="40" height="5" rx="2" fill={GOLD} opacity="0.25" stroke={GOLD} strokeWidth="1.2" />
      {/* Pedestal column */}
      <rect x="52" y="38" width="16" height="24" rx="1" fill={GOLD} opacity="0.12" stroke={GOLD} strokeWidth="1.2" />
      {/* Top platform */}
      <rect x="35" y="34" width="50" height="5" rx="2" fill={GOLD} opacity="0.2" stroke={GOLD} strokeWidth="1.2" />
      {/* Decorative tier */}
      <rect x="42" y="28" width="36" height="6" rx="1.5" fill={GOLD} opacity="0.15" stroke={GOLD} strokeWidth="1" />
      {/* Star accent */}
      <polygon points="60,12 62,18 68,18 63,22 65,28 60,24 55,28 57,22 52,18 58,18" fill={GOLD} opacity="0.4" />
      {/* Side decorative lines */}
      <line x1="44" y1="40" x2="44" y2="60" stroke={GOLD} strokeWidth="0.8" opacity="0.3" />
      <line x1="76" y1="40" x2="76" y2="60" stroke={GOLD} strokeWidth="0.8" opacity="0.3" />
    </svg>
  );
}

function RamadanCrescentFloats() {
  return (
    <svg viewBox="0 0 120 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Main crescent - mirrored orientation */}
      <path d="M70 14c14.5 0 26 11.5 26 26s-11.5 26-26 26c-7.2 0-13.7-2.9-18.4-7.6A21 21 0 0080 40c0-8.4-4.9-15.6-12-19A26 26 0 0170 14z" fill={GOLD} opacity="0.2" stroke={GOLD} strokeWidth="1.5" />
      {/* Suspended dots with thin lines */}
      <line x1="35" y1="10" x2="35" y2="22" stroke={GOLD} strokeWidth="0.6" opacity="0.3" />
      <circle cx="35" cy="24" r="3" fill={GOLD} opacity="0.25" stroke={GOLD} strokeWidth="0.8" />
      <line x1="25" y1="18" x2="25" y2="32" stroke={GOLD} strokeWidth="0.6" opacity="0.3" />
      <circle cx="25" cy="34" r="2.5" fill={GOLD} opacity="0.2" stroke={GOLD} strokeWidth="0.8" />
      <line x1="42" y1="5" x2="42" y2="15" stroke={GOLD} strokeWidth="0.6" opacity="0.3" />
      <circle cx="42" cy="17" r="2" fill={GOLD} opacity="0.18" stroke={GOLD} strokeWidth="0.8" />
      <line x1="30" y1="42" x2="30" y2="52" stroke={GOLD} strokeWidth="0.6" opacity="0.3" />
      <circle cx="30" cy="54" r="3.5" fill={GOLD} opacity="0.22" stroke={GOLD} strokeWidth="0.8" />
      {/* Star accent */}
      <polygon points="38,60 39.5,64 44,64 40.5,66.5 41.5,70.5 38,68 34.5,70.5 35.5,66.5 32,64 36.5,64" fill={GOLD} opacity="0.4" />
    </svg>
  );
}

function LaIlahaWallArt() {
  return (
    <svg viewBox="0 0 120 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Outer frame */}
      <rect x="20" y="10" width="80" height="60" rx="3" fill={GOLD} opacity="0.08" stroke={GOLD} strokeWidth="1.5" />
      {/* Inner frame */}
      <rect x="26" y="16" width="68" height="48" rx="2" fill="none" stroke={GOLD} strokeWidth="0.8" opacity="0.4" />
      {/* Arabic text */}
      <text x="60" y="48" textAnchor="middle" fontFamily="serif" fontSize="16" fill={GOLD} opacity="0.7" direction="rtl">
        لا إله إلا الله
      </text>
      {/* Decorative corner accents */}
      <path d="M26 16 L32 16 L26 22" stroke={GOLD} strokeWidth="1" opacity="0.3" fill="none" />
      <path d="M94 16 L88 16 L94 22" stroke={GOLD} strokeWidth="1" opacity="0.3" fill="none" />
      <path d="M26 64 L32 64 L26 58" stroke={GOLD} strokeWidth="1" opacity="0.3" fill="none" />
      <path d="M94 64 L88 64 L94 58" stroke={GOLD} strokeWidth="1" opacity="0.3" fill="none" />
      {/* Top ornament */}
      <circle cx="60" cy="22" r="1.5" fill={GOLD} opacity="0.4" />
      <line x1="50" y1="22" x2="55" y2="22" stroke={GOLD} strokeWidth="0.8" opacity="0.3" />
      <line x1="65" y1="22" x2="70" y2="22" stroke={GOLD} strokeWidth="0.8" opacity="0.3" />
    </svg>
  );
}

function AlhamdulillahWallArt() {
  return (
    <svg viewBox="0 0 120 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Outer frame */}
      <rect x="20" y="10" width="80" height="60" rx="3" fill={GOLD} opacity="0.08" stroke={GOLD} strokeWidth="1.5" />
      {/* Inner frame */}
      <rect x="26" y="16" width="68" height="48" rx="2" fill="none" stroke={GOLD} strokeWidth="0.8" opacity="0.4" />
      {/* Arabic text */}
      <text x="60" y="48" textAnchor="middle" fontFamily="serif" fontSize="18" fill={GOLD} opacity="0.7" direction="rtl">
        الحمد لله
      </text>
      {/* Decorative arch at top */}
      <path d="M38 16 Q60 6 82 16" stroke={GOLD} strokeWidth="1" fill="none" opacity="0.3" />
      {/* Bottom ornament line */}
      <line x1="38" y1="58" x2="82" y2="58" stroke={GOLD} strokeWidth="0.8" opacity="0.3" />
      <circle cx="60" cy="58" r="1.5" fill={GOLD} opacity="0.4" />
      {/* Corner dots */}
      <circle cx="26" cy="16" r="2" fill={GOLD} opacity="0.3" />
      <circle cx="94" cy="16" r="2" fill={GOLD} opacity="0.3" />
      <circle cx="26" cy="64" r="2" fill={GOLD} opacity="0.3" />
      <circle cx="94" cy="64" r="2" fill={GOLD} opacity="0.3" />
    </svg>
  );
}

function HijriCalendar() {
  return (
    <svg viewBox="0 0 120 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Calendar body */}
      <rect x="28" y="18" width="64" height="52" rx="3" fill={GOLD} opacity="0.08" stroke={GOLD} strokeWidth="1.5" />
      {/* Calendar header */}
      <rect x="28" y="18" width="64" height="14" rx="3" fill={GOLD} opacity="0.2" stroke={GOLD} strokeWidth="1" />
      {/* Crescent accent in header */}
      <path d="M56 22c-3 0-5 2-5 5s2 5 5 5c1.5 0 2.8-0.6 3.8-1.5A4 4 0 0154 25c0-1.6 0.9-3 2.2-3.7A5 5 0 0056 22z" fill={GOLD} opacity="0.5" />
      {/* Grid lines */}
      {[0, 1, 2, 3].map((row) => (
        <line key={`h${row}`} x1="30" y1={36 + row * 8} x2="90" y2={36 + row * 8} stroke={GOLD} strokeWidth="0.5" opacity="0.3" />
      ))}
      {[0, 1, 2, 3, 4, 5, 6].map((col) => (
        <line key={`v${col}`} x1={32 + col * 8.5} y1="32" x2={32 + col * 8.5} y2="68" stroke={GOLD} strokeWidth="0.5" opacity="0.2" />
      ))}
      {/* Binding rings */}
      <circle cx="40" cy="18" r="2" fill="none" stroke={GOLD} strokeWidth="1" opacity="0.4" />
      <circle cx="60" cy="18" r="2" fill="none" stroke={GOLD} strokeWidth="1" opacity="0.4" />
      <circle cx="80" cy="18" r="2" fill="none" stroke={GOLD} strokeWidth="1" opacity="0.4" />
    </svg>
  );
}

function EidCashGiftTube() {
  return (
    <svg viewBox="0 0 120 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Tube body */}
      <rect x="42" y="12" width="36" height="56" rx="18" fill={GOLD} opacity="0.1" stroke={GOLD} strokeWidth="1.5" />
      {/* Top cap */}
      <ellipse cx="60" cy="14" rx="18" ry="5" fill={GOLD} opacity="0.2" stroke={GOLD} strokeWidth="1.2" />
      {/* Bottom cap */}
      <ellipse cx="60" cy="66" rx="18" ry="5" fill={GOLD} opacity="0.15" stroke={GOLD} strokeWidth="1" />
      {/* Decorative band - top */}
      <line x1="42" y1="24" x2="78" y2="24" stroke={GOLD} strokeWidth="0.8" opacity="0.4" />
      <line x1="42" y1="28" x2="78" y2="28" stroke={GOLD} strokeWidth="0.8" opacity="0.4" />
      {/* Decorative band - bottom */}
      <line x1="42" y1="52" x2="78" y2="52" stroke={GOLD} strokeWidth="0.8" opacity="0.4" />
      <line x1="42" y1="56" x2="78" y2="56" stroke={GOLD} strokeWidth="0.8" opacity="0.4" />
      {/* Diamond pattern */}
      <polygon points="60,32 66,38 60,44 54,38" fill="none" stroke={GOLD} strokeWidth="0.8" opacity="0.35" />
      {/* Star accent */}
      <polygon points="60,36 61,38 63,38 61.5,39.5 62,41.5 60,40 58,41.5 58.5,39.5 57,38 59,38" fill={GOLD} opacity="0.4" />
    </svg>
  );
}

function HasbunallahWallArt() {
  return (
    <svg viewBox="0 0 120 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Outer frame */}
      <rect x="18" y="10" width="84" height="60" rx="3" fill={GOLD} opacity="0.08" stroke={GOLD} strokeWidth="1.5" />
      {/* Inner frame */}
      <rect x="24" y="16" width="72" height="48" rx="2" fill="none" stroke={GOLD} strokeWidth="0.8" opacity="0.4" />
      {/* Arabic text */}
      <text x="60" y="46" textAnchor="middle" fontFamily="serif" fontSize="14" fill={GOLD} opacity="0.7" direction="rtl">
        حسبنا الله
      </text>
      {/* Decorative top arch */}
      <path d="M34 16 Q60 4 86 16" stroke={GOLD} strokeWidth="1" fill="none" opacity="0.3" />
      {/* Corner ornaments */}
      <path d="M24 16 L30 22" stroke={GOLD} strokeWidth="0.8" opacity="0.3" />
      <path d="M96 16 L90 22" stroke={GOLD} strokeWidth="0.8" opacity="0.3" />
      <path d="M24 64 L30 58" stroke={GOLD} strokeWidth="0.8" opacity="0.3" />
      <path d="M96 64 L90 58" stroke={GOLD} strokeWidth="0.8" opacity="0.3" />
      {/* Bottom decorative dots */}
      <circle cx="50" cy="58" r="1" fill={GOLD} opacity="0.3" />
      <circle cx="60" cy="58" r="1.5" fill={GOLD} opacity="0.4" />
      <circle cx="70" cy="58" r="1" fill={GOLD} opacity="0.3" />
    </svg>
  );
}

function MiniatureHangingLamp() {
  return (
    <svg viewBox="0 0 120 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Hanging strings */}
      <line x1="50" y1="4" x2="55" y2="22" stroke={GOLD} strokeWidth="0.8" opacity="0.4" />
      <line x1="70" y1="4" x2="65" y2="22" stroke={GOLD} strokeWidth="0.8" opacity="0.4" />
      <line x1="60" y1="2" x2="60" y2="20" stroke={GOLD} strokeWidth="1" opacity="0.5" />
      {/* Top ring */}
      <circle cx="60" cy="20" r="3" fill="none" stroke={GOLD} strokeWidth="1.2" opacity="0.5" />
      {/* Lamp top dome */}
      <path d="M48 26 Q60 18 72 26" fill={GOLD} opacity="0.15" stroke={GOLD} strokeWidth="1.2" />
      {/* Lamp body */}
      <path d="M48 26 L46 38 L50 52 L70 52 L74 38 L72 26" fill={GOLD} opacity="0.1" stroke={GOLD} strokeWidth="1.5" />
      {/* Decorative bands */}
      <line x1="47" y1="32" x2="73" y2="32" stroke={GOLD} strokeWidth="0.8" opacity="0.4" />
      <line x1="48" y1="42" x2="72" y2="42" stroke={GOLD} strokeWidth="0.8" opacity="0.4" />
      {/* Star in center */}
      <polygon points="60,34 62,38 66,38 63,41 64,45 60,42 56,45 57,41 54,38 58,38" fill={GOLD} opacity="0.3" />
      {/* Glow */}
      <circle cx="60" cy="44" r="4" fill={GOLD} opacity="0.12" />
      {/* Bottom finial */}
      <path d="M50 52 L55 56 L65 56 L70 52" fill={GOLD} opacity="0.2" stroke={GOLD} strokeWidth="0.8" />
      <line x1="60" y1="56" x2="60" y2="62" stroke={GOLD} strokeWidth="1.2" />
      <circle cx="60" cy="63" r="1.5" fill={GOLD} opacity="0.35" />
    </svg>
  );
}

function QuranPrayerHolder() {
  return (
    <svg viewBox="0 0 120 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Back panel (angled) */}
      <path d="M35 20 L85 20 L80 55 L40 55 Z" fill={GOLD} opacity="0.1" stroke={GOLD} strokeWidth="1.5" />
      {/* Front ledge */}
      <path d="M40 55 L80 55 L85 62 L35 62 Z" fill={GOLD} opacity="0.15" stroke={GOLD} strokeWidth="1.2" />
      {/* Base */}
      <rect x="32" y="62" width="56" height="5" rx="1" fill={NAVY} opacity="0.12" stroke={NAVY} strokeWidth="1.2" />
      {/* Book silhouette on stand */}
      <rect x="42" y="24" width="32" height="26" rx="1" fill={GOLD} opacity="0.08" stroke={GOLD} strokeWidth="0.8" />
      {/* Book lines (text) */}
      <line x1="48" y1="32" x2="70" y2="32" stroke={NAVY} strokeWidth="0.6" opacity="0.25" />
      <line x1="48" y1="36" x2="70" y2="36" stroke={NAVY} strokeWidth="0.6" opacity="0.25" />
      <line x1="48" y1="40" x2="65" y2="40" stroke={NAVY} strokeWidth="0.6" opacity="0.25" />
      <line x1="48" y1="44" x2="68" y2="44" stroke={NAVY} strokeWidth="0.6" opacity="0.25" />
      {/* Book spine */}
      <line x1="58" y1="24" x2="58" y2="50" stroke={GOLD} strokeWidth="0.6" opacity="0.3" />
      {/* Hinge indicators */}
      <circle cx="38" cy="58" r="1.5" fill={NAVY} opacity="0.2" />
      <circle cx="82" cy="58" r="1.5" fill={NAVY} opacity="0.2" />
    </svg>
  );
}

function MadinaKeychain() {
  return (
    <svg viewBox="0 0 120 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Keychain ring */}
      <circle cx="60" cy="14" r="8" fill="none" stroke={GOLD} strokeWidth="2" />
      <circle cx="60" cy="14" r="5" fill="none" stroke={GOLD} strokeWidth="1" opacity="0.4" />
      {/* Connector link */}
      <rect x="57" y="21" width="6" height="6" rx="1" fill="none" stroke={GOLD} strokeWidth="1.2" opacity="0.5" />
      {/* Pendant body */}
      <rect x="42" y="27" width="36" height="44" rx="4" fill={GOLD} opacity="0.1" stroke={GOLD} strokeWidth="1.5" />
      {/* Inner border */}
      <rect x="46" y="31" width="28" height="36" rx="2" fill="none" stroke={GOLD} strokeWidth="0.8" opacity="0.35" />
      {/* Dome silhouette */}
      <path d="M52 55 Q60 38 68 55" fill={GOLD} opacity="0.2" stroke={GOLD} strokeWidth="1.2" />
      {/* Minaret left */}
      <rect x="48" y="42" width="3" height="16" fill={NAVY} opacity="0.1" stroke={NAVY} strokeWidth="0.8" />
      <circle cx="49.5" cy="41" r="2" fill={GOLD} opacity="0.3" />
      {/* Minaret right */}
      <rect x="69" y="42" width="3" height="16" fill={NAVY} opacity="0.1" stroke={NAVY} strokeWidth="0.8" />
      <circle cx="70.5" cy="41" r="2" fill={GOLD} opacity="0.3" />
      {/* Central finial on dome */}
      <line x1="60" y1="43" x2="60" y2="36" stroke={GOLD} strokeWidth="1.2" />
      <circle cx="60" cy="35" r="1.5" fill={GOLD} opacity="0.5" />
      {/* Star accent on pendant */}
      <polygon points="60,46 61,48 63,48 61.5,49.5 62,51.5 60,50 58,51.5 58.5,49.5 57,48 59,48" fill={GOLD} opacity="0.4" />
    </svg>
  );
}

function AlAqsaKeychain() {
  return (
    <svg viewBox="0 0 120 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Keychain ring */}
      <circle cx="60" cy="14" r="8" fill="none" stroke={GOLD} strokeWidth="2" />
      <circle cx="60" cy="14" r="5" fill="none" stroke={GOLD} strokeWidth="1" opacity="0.4" />
      {/* Connector link */}
      <rect x="57" y="21" width="6" height="6" rx="1" fill="none" stroke={GOLD} strokeWidth="1.2" opacity="0.5" />
      {/* Pendant body - octagonal shape for Dome of the Rock */}
      <polygon points="50,30 42,42 42,56 50,68 70,68 78,56 78,42 70,30" fill={GOLD} opacity="0.1" stroke={GOLD} strokeWidth="1.5" />
      {/* Inner octagonal border */}
      <polygon points="52,33 46,43 46,54 52,64 68,64 74,54 74,43 68,33" fill="none" stroke={GOLD} strokeWidth="0.8" opacity="0.35" />
      {/* Golden dome */}
      <path d="M50 52 Q60 34 70 52" fill={GOLD} opacity="0.25" stroke={GOLD} strokeWidth="1.2" />
      {/* Dome base */}
      <rect x="48" y="52" width="24" height="4" fill={NAVY} opacity="0.1" stroke={NAVY} strokeWidth="0.8" rx="0.5" />
      {/* Central finial on dome */}
      <line x1="60" y1="39" x2="60" y2="33" stroke={GOLD} strokeWidth="1.2" />
      <circle cx="60" cy="32" r="1.5" fill={GOLD} opacity="0.5" />
      {/* Arched windows */}
      <path d="M54 56 Q56 53 58 56" stroke={NAVY} strokeWidth="0.8" fill="none" opacity="0.3" />
      <path d="M62 56 Q64 53 66 56" stroke={NAVY} strokeWidth="0.8" fill="none" opacity="0.3" />
      {/* Star accent */}
      <polygon points="60,44 61,46 63,46 61.5,47.5 62,49.5 60,48 58,49.5 58.5,47.5 57,46 59,46" fill={GOLD} opacity="0.4" />
    </svg>
  );
}

function KaabaKeychain() {
  return (
    <svg viewBox="0 0 120 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Keychain ring */}
      <circle cx="60" cy="12" r="8" fill="none" stroke={GOLD} strokeWidth="2" />
      <circle cx="60" cy="12" r="5" fill="none" stroke={GOLD} strokeWidth="1" opacity="0.4" />
      {/* Connector link */}
      <rect x="57" y="19" width="6" height="6" rx="1" fill="none" stroke={GOLD} strokeWidth="1.2" opacity="0.5" />
      {/* Kaaba body - black cube */}
      <rect x="42" y="28" width="36" height="36" rx="2" fill={NAVY} opacity="0.85" stroke={NAVY} strokeWidth="1.5" />
      {/* Kiswa gold band (hizam) across upper third */}
      <rect x="42" y="40" width="36" height="6" fill={GOLD} opacity="0.45" />
      <line x1="42" y1="40" x2="78" y2="40" stroke={GOLD} strokeWidth="1.2" />
      <line x1="42" y1="46" x2="78" y2="46" stroke={GOLD} strokeWidth="1.2" />
      {/* Arabic calligraphy suggestion on the band */}
      <path d="M50 43 Q54 41 58 43 Q62 45 66 43 Q70 41 74 43" stroke={GOLD} strokeWidth="0.8" opacity="0.7" fill="none" />
      {/* Door of the Kaaba (gold) */}
      <rect x="54" y="50" width="12" height="14" rx="1" fill={GOLD} opacity="0.5" stroke={GOLD} strokeWidth="1" />
      {/* Door arch */}
      <path d="M54 54 Q60 48 66 54" fill={GOLD} opacity="0.3" stroke={GOLD} strokeWidth="0.8" />
      {/* Door handle */}
      <circle cx="63" cy="58" r="1" fill={GOLD} opacity="0.7" />
      {/* Corner edges for 3D cube effect */}
      <line x1="42" y1="28" x2="38" y2="24" stroke={NAVY} strokeWidth="1" opacity="0.3" />
      <line x1="78" y1="28" x2="82" y2="24" stroke={NAVY} strokeWidth="1" opacity="0.3" />
      <line x1="38" y1="24" x2="82" y2="24" stroke={NAVY} strokeWidth="0.8" opacity="0.2" />
      {/* Maqam Ibrahim accent dot */}
      <circle cx="48" cy="68" r="1.5" fill={GOLD} opacity="0.35" />
    </svg>
  );
}

// Nerdy illustrations (IDs 9-16)
import {
  DragonDiceTower,
  RocketShipPhoneStand,
  MiniMillenniumFalcon,
  PeriodicTableBookends,
  ArticulatedFlexiDragon,
  PortalBookendSet,
  MathDodecahedronLamp,
  DNAHelixStand,
} from "./NerdyIllustrations";

// Fidget illustrations (IDs 17-24)
import {
  InfinityCube,
  GearSpinner,
  FlexiWorm,
  ClickySlider,
  GyroscopeBall,
  HexGridTwist,
  ChainLinkFidget,
  SpringSnake,
} from "./FidgetIllustrations";

// Flags illustrations (IDs 25-32)
import {
  CountryFlagStand,
  PalestineFlagPlaque,
  MiniFlagRack,
  HeritageFlagKeychain,
  DualFlagStand,
  FlagBookendSet,
  ReliefMapFlag,
  CustomTextFlagStand,
} from "./FlagsIllustrations";

const ILLUSTRATIONS = {
  1: CrescentMoonLamp,
  3: MosqueMiniature,
  5: PrayerBeadStand,
  7: AyatulKursiFrame,
  9: DragonDiceTower,
  10: RocketShipPhoneStand,
  11: MiniMillenniumFalcon,
  12: PeriodicTableBookends,
  13: ArticulatedFlexiDragon,
  14: PortalBookendSet,
  15: MathDodecahedronLamp,
  16: DNAHelixStand,
  17: InfinityCube,
  18: GearSpinner,
  19: FlexiWorm,
  20: ClickySlider,
  21: GyroscopeBall,
  22: HexGridTwist,
  23: ChainLinkFidget,
  24: SpringSnake,
  25: CountryFlagStand,
  26: PalestineFlagPlaque,
  27: MiniFlagRack,
  28: HeritageFlagKeychain,
  29: DualFlagStand,
  30: FlagBookendSet,
  31: ReliefMapFlag,
  32: CustomTextFlagStand,
  33: FanoosRamadanLamp,
  35: BismillahCrescent,
  36: CrescentRamadanCenterpiece,
  38: RamadanFanoosLantern,
  39: CrescentDatesPot,
  40: DatesServingBowl,
  41: RamadanStand,
  43: RamadanCrescentFloats,
  44: LaIlahaWallArt,
  45: AlhamdulillahWallArt,
  46: HijriCalendar,
  47: EidCashGiftTube,
  48: HasbunallahWallArt,
  49: MiniatureHangingLamp,
  50: QuranPrayerHolder,
  51: MadinaKeychain,
  52: AlAqsaKeychain,
  53: KaabaKeychain,
};

export default function ProductIllustration({ productId }) {
  const Illustration = ILLUSTRATIONS[productId];
  if (!Illustration) return null;
  return <Illustration />;
}
