const GREEN = "#254F22";
const ORANGE = "#F5824A";

export const CountryFlagStand = () => (
  <svg viewBox="0 0 120 80" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Base */}
    <rect x="35" y="60" width="50" height="8" fill={GREEN} fillOpacity="0.3" stroke={GREEN} strokeWidth="1.5" />
    <rect x="40" y="55" width="40" height="5" fill={GREEN} fillOpacity="0.2" stroke={GREEN} strokeWidth="1.5" />

    {/* Pole */}
    <rect x="58" y="20" width="4" height="40" fill={GREEN} fillOpacity="0.4" stroke={GREEN} strokeWidth="1.5" />

    {/* Flag */}
    <path d="M62 20 L62 35 L90 32 L90 23 Z" fill={ORANGE} fillOpacity="0.3" stroke={ORANGE} strokeWidth="1.5" />
    <line x1="62" y1="27.5" x2="90" y2="27.5" stroke={ORANGE} strokeWidth="1" opacity="0.5" />

    {/* Flag detail stripe */}
    <rect x="62" y="20" width="28" height="5" fill={ORANGE} fillOpacity="0.5" stroke="none" />
  </svg>
);

export const PalestineFlagPlaque = () => (
  <svg viewBox="0 0 120 80" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Frame */}
    <rect x="15" y="15" width="90" height="50" fill={GREEN} fillOpacity="0.2" stroke={GREEN} strokeWidth="2" />
    <rect x="20" y="20" width="80" height="40" fill="white" fillOpacity="0.1" stroke={GREEN} strokeWidth="1.5" />

    {/* Flag stripes */}
    <rect x="25" y="25" width="70" height="10" fill={GREEN} fillOpacity="0.4" stroke="none" />
    <rect x="25" y="35" width="70" height="10" fill="white" fillOpacity="0.3" stroke="none" />
    <rect x="25" y="45" width="70" height="10" fill={GREEN} fillOpacity="0.3" stroke="none" />

    {/* Triangle */}
    <path d="M25 25 L25 55 L50 40 Z" fill={ORANGE} fillOpacity="0.4" stroke={ORANGE} strokeWidth="1.5" />

    {/* Inner frame detail */}
    <rect x="20" y="20" width="80" height="40" fill="none" stroke={GREEN} strokeWidth="1.5" />
  </svg>
);

export const MiniFlagRack = () => (
  <svg viewBox="0 0 120 80" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Base structure */}
    <rect x="30" y="65" width="60" height="6" fill={GREEN} fillOpacity="0.3" stroke={GREEN} strokeWidth="1.5" />

    {/* Vertical supports */}
    <rect x="33" y="25" width="3" height="40" fill={GREEN} fillOpacity="0.4" stroke={GREEN} strokeWidth="1" />
    <rect x="84" y="25" width="3" height="40" fill={GREEN} fillOpacity="0.4" stroke={GREEN} strokeWidth="1" />

    {/* Shelves/tiers */}
    <rect x="30" y="25" width="60" height="3" fill={GREEN} fillOpacity="0.3" stroke={GREEN} strokeWidth="1.5" />
    <rect x="30" y="40" width="60" height="3" fill={GREEN} fillOpacity="0.3" stroke={GREEN} strokeWidth="1.5" />
    <rect x="30" y="55" width="60" height="3" fill={GREEN} fillOpacity="0.3" stroke={GREEN} strokeWidth="1.5" />

    {/* Flags on top tier */}
    <rect x="40" y="12" width="2" height="13" fill={GREEN} fillOpacity="0.6" />
    <path d="M42 12 L42 20 L52 18 L52 14 Z" fill={ORANGE} fillOpacity="0.4" stroke={ORANGE} strokeWidth="1" />

    {/* Flags on middle tier */}
    <rect x="55" y="28" width="2" height="12" fill={GREEN} fillOpacity="0.6" />
    <path d="M57 28 L57 35 L67 33 L67 30 Z" fill={ORANGE} fillOpacity="0.5" stroke={ORANGE} strokeWidth="1" />

    {/* Flags on bottom tier */}
    <rect x="70" y="43" width="2" height="12" fill={GREEN} fillOpacity="0.6" />
    <path d="M72 43 L72 50 L82 48 L82 45 Z" fill={ORANGE} fillOpacity="0.4" stroke={ORANGE} strokeWidth="1" />
  </svg>
);

export const HeritageFlagKeychain = () => (
  <svg viewBox="0 0 120 80" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Keyring */}
    <circle cx="60" cy="20" r="8" fill="none" stroke={GREEN} strokeWidth="2" />
    <circle cx="60" cy="20" r="5" fill="none" stroke={GREEN} strokeWidth="1.5" />

    {/* Chain/connector */}
    <line x1="60" y1="28" x2="60" y2="35" stroke={GREEN} strokeWidth="1.5" />

    {/* Keychain base */}
    <rect x="45" y="35" width="30" height="35" rx="3" fill={GREEN} fillOpacity="0.2" stroke={GREEN} strokeWidth="2" />

    {/* Mini flag inside */}
    <rect x="50" y="40" width="20" height="3" fill={ORANGE} fillOpacity="0.5" />
    <rect x="50" y="43" width="20" height="3" fill="white" fillOpacity="0.3" />
    <rect x="50" y="46" width="20" height="3" fill={GREEN} fillOpacity="0.4" />

    {/* Triangle accent */}
    <path d="M50 40 L50 49 L58 44.5 Z" fill={ORANGE} fillOpacity="0.4" stroke={ORANGE} strokeWidth="1" />

    {/* Decorative bottom section */}
    <circle cx="60" cy="58" r="6" fill={ORANGE} fillOpacity="0.2" stroke={ORANGE} strokeWidth="1.5" />
    <circle cx="60" cy="58" r="3" fill={ORANGE} fillOpacity="0.3" />
  </svg>
);

export const DualFlagStand = () => (
  <svg viewBox="0 0 120 80" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Shared base */}
    <ellipse cx="60" cy="67" rx="35" ry="8" fill={GREEN} fillOpacity="0.3" stroke={GREEN} strokeWidth="1.5" />
    <rect x="40" y="60" width="40" height="7" fill={GREEN} fillOpacity="0.4" stroke={GREEN} strokeWidth="1.5" />

    {/* Left pole */}
    <rect x="48" y="20" width="3" height="45" fill={GREEN} fillOpacity="0.5" stroke={GREEN} strokeWidth="1.5" />

    {/* Right pole */}
    <rect x="69" y="20" width="3" height="45" fill={GREEN} fillOpacity="0.5" stroke={GREEN} strokeWidth="1.5" />

    {/* Left flag */}
    <path d="M51 20 L51 38 L35 35 L35 23 Z" fill={ORANGE} fillOpacity="0.4" stroke={ORANGE} strokeWidth="1.5" />
    <rect x="35" y="23" width="16" height="5" fill={ORANGE} fillOpacity="0.6" />

    {/* Right flag */}
    <path d="M72 20 L72 38 L88 35 L88 23 Z" fill={ORANGE} fillOpacity="0.3" stroke={ORANGE} strokeWidth="1.5" />
    <path d="M72 20 L77 29 L72 29 Z" fill={GREEN} fillOpacity="0.5" stroke={GREEN} strokeWidth="1" />

    {/* Connection detail */}
    <line x1="51" y1="60" x2="69" y2="60" stroke={GREEN} strokeWidth="2" opacity="0.4" />
  </svg>
);

export const FlagBookendSet = () => (
  <svg viewBox="0 0 120 80" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Left bookend */}
    <rect x="10" y="35" width="15" height="35" fill={GREEN} fillOpacity="0.3" stroke={GREEN} strokeWidth="2" />
    <rect x="10" y="65" width="25" height="5" fill={GREEN} fillOpacity="0.4" stroke={GREEN} strokeWidth="1.5" />

    {/* Left waving flag */}
    <path d="M15 35 Q18 30 20 28 Q22 30 25 32 Q22 35 20 38 Q18 36 15 35 Z"
          fill={ORANGE} fillOpacity="0.4" stroke={ORANGE} strokeWidth="1.5" />

    {/* Right bookend */}
    <rect x="95" y="35" width="15" height="35" fill={GREEN} fillOpacity="0.3" stroke={GREEN} strokeWidth="2" />
    <rect x="85" y="65" width="25" height="5" fill={GREEN} fillOpacity="0.4" stroke={GREEN} strokeWidth="1.5" />

    {/* Right waving flag */}
    <path d="M105 35 Q102 30 100 28 Q98 30 95 32 Q98 35 100 38 Q102 36 105 35 Z"
          fill={ORANGE} fillOpacity="0.4" stroke={ORANGE} strokeWidth="1.5" />

    {/* Books in between */}
    <rect x="40" y="45" width="8" height="25" fill={ORANGE} fillOpacity="0.2" stroke={ORANGE} strokeWidth="1.5" />
    <rect x="50" y="45" width="8" height="25" fill={GREEN} fillOpacity="0.2" stroke={GREEN} strokeWidth="1.5" />
    <rect x="60" y="45" width="8" height="25" fill={ORANGE} fillOpacity="0.2" stroke={ORANGE} strokeWidth="1.5" />
    <rect x="70" y="45" width="8" height="25" fill={GREEN} fillOpacity="0.2" stroke={GREEN} strokeWidth="1.5" />

    {/* Book spines detail */}
    <line x1="44" y1="45" x2="44" y2="70" stroke={ORANGE} strokeWidth="0.5" opacity="0.5" />
    <line x1="54" y1="45" x2="54" y2="70" stroke={GREEN} strokeWidth="0.5" opacity="0.5" />
    <line x1="64" y1="45" x2="64" y2="70" stroke={ORANGE} strokeWidth="0.5" opacity="0.5" />
    <line x1="74" y1="45" x2="74" y2="70" stroke={GREEN} strokeWidth="0.5" opacity="0.5" />
  </svg>
);

export const ReliefMapFlag = () => (
  <svg viewBox="0 0 120 80" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Map outline (simplified country/region shape) */}
    <path d="M30 25 L45 20 L60 22 L75 18 L88 25 L92 40 L88 55 L78 62 L60 65 L45 62 L32 58 L28 45 Z"
          fill={GREEN} fillOpacity="0.2" stroke={GREEN} strokeWidth="2" />

    {/* Inner map detail */}
    <path d="M35 30 L48 26 L60 28 L72 25 L82 30 L85 42 L82 52 L72 58 L60 60 L48 58 L37 54 L34 44 Z"
          fill="white" fillOpacity="0.1" stroke={GREEN} strokeWidth="1" />

    {/* Flag pattern overlay - horizontal stripes */}
    <path d="M35 30 L48 26 L60 28 L72 25 L82 30 L82 36 L72 33 L60 35 L48 33 L35 35 Z"
          fill={GREEN} fillOpacity="0.4" />

    <path d="M35 35 L48 33 L60 35 L72 33 L82 36 L82 42 L72 40 L60 42 L48 40 L35 41 Z"
          fill="white" fillOpacity="0.3" />

    <path d="M35 41 L48 40 L60 42 L72 40 L82 42 L82 48 L72 46 L60 48 L48 46 L35 47 Z"
          fill={GREEN} fillOpacity="0.3" />

    {/* Triangle overlay */}
    <path d="M35 30 L35 47 L52 38.5 Z" fill={ORANGE} fillOpacity="0.5" stroke={ORANGE} strokeWidth="1.5" />

    {/* Border emphasis */}
    <path d="M30 25 L45 20 L60 22 L75 18 L88 25 L92 40 L88 55 L78 62 L60 65 L45 62 L32 58 L28 45 Z"
          fill="none" stroke={GREEN} strokeWidth="2" />
  </svg>
);

export const CustomTextFlagStand = () => (
  <svg viewBox="0 0 120 80" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Base */}
    <rect x="35" y="65" width="50" height="8" fill={GREEN} fillOpacity="0.3" stroke={GREEN} strokeWidth="1.5" />
    <rect x="40" y="60" width="40" height="5" fill={GREEN} fillOpacity="0.2" stroke={GREEN} strokeWidth="1.5" />

    {/* Pole */}
    <rect x="58" y="18" width="4" height="47" fill={GREEN} fillOpacity="0.4" stroke={GREEN} strokeWidth="1.5" />

    {/* Flag */}
    <path d="M62 18 L62 38 L92 35 L92 21 Z" fill={ORANGE} fillOpacity="0.3" stroke={ORANGE} strokeWidth="1.5" />

    {/* Flag stripes */}
    <rect x="62" y="18" width="30" height="6" fill={GREEN} fillOpacity="0.4" />
    <rect x="62" y="24" width="30" height="6" fill="white" fillOpacity="0.3" />
    <rect x="62" y="30" width="30" height="5" fill={ORANGE} fillOpacity="0.5" />

    {/* Triangle on flag */}
    <path d="M62 18 L62 35 L72 26.5 Z" fill={ORANGE} fillOpacity="0.6" stroke={ORANGE} strokeWidth="1" />

    {/* Name plate */}
    <rect x="42" y="48" width="36" height="10" rx="1" fill={GREEN} fillOpacity="0.2" stroke={GREEN} strokeWidth="1.5" />

    {/* Text placeholder lines */}
    <line x1="46" y1="51" x2="74" y2="51" stroke={ORANGE} strokeWidth="1.5" opacity="0.5" />
    <line x1="46" y1="55" x2="74" y2="55" stroke={ORANGE} strokeWidth="1.5" opacity="0.5" />

    {/* Decorative dots on nameplate */}
    <circle cx="48" cy="53" r="1" fill={ORANGE} fillOpacity="0.6" />
    <circle cx="72" cy="53" r="1" fill={ORANGE} fillOpacity="0.6" />
  </svg>
);
