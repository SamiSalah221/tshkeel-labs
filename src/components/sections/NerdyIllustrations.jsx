const ORANGE = "#F5824A";
const GREEN = "#254F22";

// ID 9: Dragon Dice Tower
export const DragonDiceTower = () => (
  <svg viewBox="0 0 120 80" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
    {/* Dragon body - coiled serpentine path */}
    <path
      d="M 20 60 Q 30 50, 40 55 T 60 50 T 80 55 Q 85 50, 90 45 Q 95 35, 90 25"
      fill="none"
      stroke={GREEN}
      strokeWidth="2"
    />
    {/* Dragon head */}
    <circle cx="90" cy="25" r="6" fill={GREEN} fillOpacity="0.2" stroke={GREEN} strokeWidth="1.5" />
    <path d="M 95 22 L 100 18 L 98 24 Z" fill={ORANGE} stroke={ORANGE} strokeWidth="1.5" />

    {/* Dragon tail */}
    <path d="M 20 60 L 15 65 L 18 58 Z" fill={GREEN} fillOpacity="0.3" />

    {/* D20 die near dragon's mouth - hexagonal approximation */}
    <path
      d="M 100 30 L 108 35 L 108 45 L 100 50 L 92 45 L 92 35 Z"
      fill={ORANGE}
      fillOpacity="0.15"
      stroke={ORANGE}
      strokeWidth="2"
    />
    {/* Die face lines */}
    <line x1="100" y1="30" x2="100" y2="50" stroke={ORANGE} strokeWidth="1.5" />
    <line x1="92" y1="35" x2="108" y2="45" stroke={ORANGE} strokeWidth="1.5" />
    <line x1="92" y1="45" x2="108" y2="35" stroke={ORANGE} strokeWidth="1.5" />

    {/* Dragon spine ridges */}
    <line x1="35" y1="52" x2="35" y2="48" stroke={GREEN} strokeWidth="1.5" />
    <line x1="50" y1="50" x2="50" y2="46" stroke={GREEN} strokeWidth="1.5" />
    <line x1="65" y1="52" x2="65" y2="48" stroke={GREEN} strokeWidth="1.5" />
    <line x1="80" y1="53" x2="80" y2="49" stroke={GREEN} strokeWidth="1.5" />
  </svg>
);

// ID 10: Rocket Ship Phone Stand
export const RocketShipPhoneStand = () => (
  <svg viewBox="0 0 120 80" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
    {/* Rocket body */}
    <rect x="35" y="35" width="15" height="35" fill={GREEN} fillOpacity="0.2" stroke={GREEN} strokeWidth="2" rx="2" />

    {/* Rocket nose cone */}
    <path d="M 35 35 L 42.5 20 L 50 35 Z" fill={ORANGE} fillOpacity="0.25" stroke={ORANGE} strokeWidth="2" />

    {/* Rocket fins */}
    <path d="M 35 55 L 28 62 L 35 62 Z" fill={GREEN} fillOpacity="0.3" stroke={GREEN} strokeWidth="1.5" />
    <path d="M 50 55 L 57 62 L 50 62 Z" fill={GREEN} fillOpacity="0.3" stroke={GREEN} strokeWidth="1.5" />

    {/* Window */}
    <circle cx="42.5" cy="45" r="4" fill={ORANGE} fillOpacity="0.2" stroke={ORANGE} strokeWidth="1.5" />

    {/* Flame trail */}
    <path
      d="M 38 70 Q 35 73, 37 76 M 42.5 70 Q 42.5 75, 42.5 78 M 47 70 Q 50 73, 48 76"
      fill="none"
      stroke={ORANGE}
      strokeWidth="2"
      strokeLinecap="round"
    />

    {/* Phone rectangle leaning against rocket */}
    <rect
      x="55"
      y="40"
      width="25"
      height="35"
      fill="none"
      stroke={GREEN}
      strokeWidth="2"
      rx="2"
      transform="rotate(10 67.5 57.5)"
    />
    <rect
      x="58"
      y="43"
      width="19"
      height="22"
      fill={ORANGE}
      fillOpacity="0.1"
      transform="rotate(10 67.5 57.5)"
    />

    {/* Phone support line */}
    <line x1="50" y1="60" x2="62" y2="68" stroke={GREEN} strokeWidth="1.5" strokeDasharray="2 2" />
  </svg>
);

// ID 11: Mini Millennium Falcon
export const MiniMillenniumFalcon = () => (
  <svg viewBox="0 0 120 80" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
    {/* Main circular body */}
    <ellipse cx="60" cy="40" rx="35" ry="25" fill={GREEN} fillOpacity="0.15" stroke={GREEN} strokeWidth="2" />

    {/* Offset cockpit */}
    <circle cx="70" cy="32" r="8" fill={ORANGE} fillOpacity="0.2" stroke={ORANGE} strokeWidth="2" />
    <circle cx="70" cy="32" r="5" fill={ORANGE} fillOpacity="0.3" stroke={ORANGE} strokeWidth="1.5" />

    {/* Mandibles/front prongs */}
    <path
      d="M 45 25 Q 35 22, 30 20"
      fill="none"
      stroke={GREEN}
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    <path
      d="M 45 35 Q 35 38, 30 40"
      fill="none"
      stroke={GREEN}
      strokeWidth="2.5"
      strokeLinecap="round"
    />

    {/* Central corridor */}
    <line x1="45" y1="30" x2="45" y2="40" stroke={GREEN} strokeWidth="2" />

    {/* Engine details */}
    <rect x="82" y="35" width="8" height="10" fill={ORANGE} fillOpacity="0.25" stroke={ORANGE} strokeWidth="1.5" rx="1" />

    {/* Hull details - geometric lines */}
    <line x1="55" y1="25" x2="65" y2="25" stroke={GREEN} strokeWidth="1.5" />
    <line x1="55" y1="55" x2="65" y2="55" stroke={GREEN} strokeWidth="1.5" />
    <path d="M 50 40 L 70 40" stroke={GREEN} strokeWidth="1.5" />

    {/* Sensor dish */}
    <circle cx="58" cy="48" r="4" fill="none" stroke={ORANGE} strokeWidth="1.5" />
    <circle cx="58" cy="48" r="2" fill={ORANGE} fillOpacity="0.3" />
  </svg>
);

// ID 12: Periodic Table Bookends
export const PeriodicTableBookends = () => (
  <svg viewBox="0 0 120 80" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
    {/* Left bookend - L shape */}
    <path d="M 15 25 L 15 65 L 25 65 L 25 60 L 20 60 L 20 25 Z" fill={GREEN} fillOpacity="0.2" stroke={GREEN} strokeWidth="2" />

    {/* Right bookend - L shape */}
    <path d="M 105 25 L 105 65 L 95 65 L 95 60 L 100 60 L 100 25 Z" fill={GREEN} fillOpacity="0.2" stroke={GREEN} strokeWidth="2" />

    {/* Books between bookends */}
    <rect x="40" y="45" width="8" height="20" fill={ORANGE} fillOpacity="0.15" stroke={ORANGE} strokeWidth="1.5" />
    <rect x="49" y="40" width="9" height="25" fill={GREEN} fillOpacity="0.15" stroke={GREEN} strokeWidth="1.5" />
    <rect x="59" y="43" width="7" height="22" fill={ORANGE} fillOpacity="0.15" stroke={ORANGE} strokeWidth="1.5" />
    <rect x="67" y="38" width="10" height="27" fill={GREEN} fillOpacity="0.15" stroke={GREEN} strokeWidth="1.5" />

    {/* Molecular structure on left bookend */}
    <circle cx="17.5" cy="35" r="2" fill={ORANGE} stroke={ORANGE} strokeWidth="1.5" />
    <circle cx="17.5" cy="45" r="2" fill={ORANGE} stroke={ORANGE} strokeWidth="1.5" />
    <circle cx="22" cy="40" r="2" fill={ORANGE} stroke={ORANGE} strokeWidth="1.5" />
    <line x1="17.5" y1="37" x2="17.5" y2="43" stroke={ORANGE} strokeWidth="1.5" />
    <line x1="17.5" y1="35" x2="20.5" y2="38.5" stroke={ORANGE} strokeWidth="1.5" />
    <line x1="17.5" y1="45" x2="20.5" y2="41.5" stroke={ORANGE} strokeWidth="1.5" />

    {/* Molecular structure on right bookend */}
    <circle cx="102.5" cy="35" r="2" fill={ORANGE} stroke={ORANGE} strokeWidth="1.5" />
    <circle cx="102.5" cy="45" r="2" fill={ORANGE} stroke={ORANGE} strokeWidth="1.5" />
    <circle cx="98" cy="40" r="2" fill={ORANGE} stroke={ORANGE} strokeWidth="1.5" />
    <line x1="102.5" y1="37" x2="102.5" y2="43" stroke={ORANGE} strokeWidth="1.5" />
    <line x1="102.5" y1="35" x2="99.5" y2="38.5" stroke={ORANGE} strokeWidth="1.5" />
    <line x1="102.5" y1="45" x2="99.5" y2="41.5" stroke={ORANGE} strokeWidth="1.5" />
  </svg>
);

// ID 13: Articulated Flexi Dragon
export const ArticulatedFlexiDragon = () => (
  <svg viewBox="0 0 120 80" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
    {/* Dragon head segment */}
    <ellipse cx="20" cy="40" rx="10" ry="8" fill={GREEN} fillOpacity="0.2" stroke={GREEN} strokeWidth="2" />
    <circle cx="18" cy="38" r="1.5" fill={ORANGE} />
    {/* Horn */}
    <path d="M 15 35 L 12 30 L 17 34" fill={ORANGE} stroke={ORANGE} strokeWidth="1.5" />

    {/* Body segments with visible joints */}
    <ellipse cx="35" cy="40" rx="8" ry="7" fill={GREEN} fillOpacity="0.2" stroke={GREEN} strokeWidth="2" />
    <ellipse cx="48" cy="42" rx="8" ry="7" fill={GREEN} fillOpacity="0.2" stroke={GREEN} strokeWidth="2" />
    <ellipse cx="61" cy="44" rx="8" ry="7" fill={GREEN} fillOpacity="0.2" stroke={GREEN} strokeWidth="2" />
    <ellipse cx="74" cy="46" rx="8" ry="7" fill={GREEN} fillOpacity="0.2" stroke={GREEN} strokeWidth="2" />
    <ellipse cx="87" cy="48" rx="7" ry="6" fill={GREEN} fillOpacity="0.2" stroke={GREEN} strokeWidth="2" />
    <ellipse cx="98" cy="50" rx="6" ry="5" fill={GREEN} fillOpacity="0.2" stroke={GREEN} strokeWidth="2" />

    {/* Joint gaps - dashed lines showing articulation */}
    <line x1="28" y1="40" x2="30" y2="40" stroke={ORANGE} strokeWidth="1.5" strokeDasharray="1 2" />
    <line x1="41" y1="41" x2="43" y2="41.5" stroke={ORANGE} strokeWidth="1.5" strokeDasharray="1 2" />
    <line x1="54" y1="43" x2="56" y2="43.5" stroke={ORANGE} strokeWidth="1.5" strokeDasharray="1 2" />
    <line x1="67" y1="45" x2="69" y2="45.5" stroke={ORANGE} strokeWidth="1.5" strokeDasharray="1 2" />
    <line x1="80" y1="47" x2="82" y2="47.5" stroke={ORANGE} strokeWidth="1.5" strokeDasharray="1 2" />
    <line x1="92" y1="49" x2="94" y2="49.5" stroke={ORANGE} strokeWidth="1.5" strokeDasharray="1 2" />

    {/* Legs on middle segments */}
    <line x1="35" y1="47" x2="33" y2="55" stroke={GREEN} strokeWidth="2" strokeLinecap="round" />
    <line x1="48" y1="49" x2="46" y2="57" stroke={GREEN} strokeWidth="2" strokeLinecap="round" />
    <line x1="61" y1="51" x2="59" y2="59" stroke={GREEN} strokeWidth="2" strokeLinecap="round" />
    <line x1="74" y1="53" x2="72" y2="61" stroke={GREEN} strokeWidth="2" strokeLinecap="round" />

    {/* Tail tip */}
    <path d="M 104 50 L 108 52 L 106 48 Z" fill={ORANGE} fillOpacity="0.3" stroke={ORANGE} strokeWidth="1.5" />

    {/* Wings on back segments */}
    <path d="M 48 37 Q 50 28, 55 30" fill="none" stroke={ORANGE} strokeWidth="1.5" />
    <path d="M 61 39 Q 63 30, 68 32" fill="none" stroke={ORANGE} strokeWidth="1.5" />
  </svg>
);

// ID 14: Portal Bookend Set
export const PortalBookendSet = () => (
  <svg viewBox="0 0 120 80" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
    {/* Left portal - concentric circles with spiral */}
    <circle cx="25" cy="45" r="18" fill={ORANGE} fillOpacity="0.1" stroke={ORANGE} strokeWidth="2" />
    <circle cx="25" cy="45" r="13" fill="none" stroke={ORANGE} strokeWidth="1.5" />
    <circle cx="25" cy="45" r="8" fill="none" stroke={GREEN} strokeWidth="1.5" />
    <circle cx="25" cy="45" r="3" fill={GREEN} fillOpacity="0.3" />

    {/* Left portal spiral lines */}
    <path
      d="M 25 45 Q 30 40, 35 45 Q 30 50, 25 45"
      fill="none"
      stroke={ORANGE}
      strokeWidth="1"
      opacity="0.6"
    />
    <path
      d="M 25 45 Q 20 50, 15 45 Q 20 40, 25 45"
      fill="none"
      stroke={GREEN}
      strokeWidth="1"
      opacity="0.6"
    />

    {/* Right portal - concentric circles with spiral */}
    <circle cx="95" cy="45" r="18" fill={ORANGE} fillOpacity="0.1" stroke={ORANGE} strokeWidth="2" />
    <circle cx="95" cy="45" r="13" fill="none" stroke={ORANGE} strokeWidth="1.5" />
    <circle cx="95" cy="45" r="8" fill="none" stroke={GREEN} strokeWidth="1.5" />
    <circle cx="95" cy="45" r="3" fill={GREEN} fillOpacity="0.3" />

    {/* Right portal spiral lines */}
    <path
      d="M 95 45 Q 100 40, 105 45 Q 100 50, 95 45"
      fill="none"
      stroke={ORANGE}
      strokeWidth="1"
      opacity="0.6"
    />
    <path
      d="M 95 45 Q 90 50, 85 45 Q 90 40, 95 45"
      fill="none"
      stroke={GREEN}
      strokeWidth="1"
      opacity="0.6"
    />

    {/* Books between portals */}
    <rect x="45" y="35" width="7" height="25" fill={GREEN} fillOpacity="0.2" stroke={GREEN} strokeWidth="1.5" />
    <rect x="53" y="32" width="6" height="28" fill={ORANGE} fillOpacity="0.15" stroke={ORANGE} strokeWidth="1.5" />
    <rect x="60" y="34" width="8" height="26" fill={GREEN} fillOpacity="0.2" stroke={GREEN} strokeWidth="1.5" />
    <rect x="69" y="33" width="6" height="27" fill={ORANGE} fillOpacity="0.15" stroke={ORANGE} strokeWidth="1.5" />

    {/* Portal energy connecting lines */}
    <line x1="43" y1="45" x2="47" y2="45" stroke={ORANGE} strokeWidth="1" strokeDasharray="2 3" opacity="0.5" />
    <line x1="73" y1="45" x2="77" y2="45" stroke={ORANGE} strokeWidth="1" strokeDasharray="2 3" opacity="0.5" />
  </svg>
);

// ID 15: Math Dodecahedron Lamp
export const MathDodecahedronLamp = () => (
  <svg viewBox="0 0 120 80" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
    {/* Dodecahedron - simplified as pentagonal shape */}
    <path
      d="M 60 20 L 75 28 L 72 45 L 60 55 L 48 45 L 45 28 Z"
      fill={ORANGE}
      fillOpacity="0.1"
      stroke={GREEN}
      strokeWidth="2"
    />

    {/* Inner structure lines */}
    <line x1="60" y1="20" x2="60" y2="55" stroke={GREEN} strokeWidth="1.5" />
    <line x1="45" y1="28" x2="72" y2="45" stroke={GREEN} strokeWidth="1.5" />
    <line x1="75" y1="28" x2="48" y2="45" stroke={GREEN} strokeWidth="1.5" />
    <line x1="45" y1="28" x2="75" y2="28" stroke={GREEN} strokeWidth="1.5" />
    <line x1="48" y1="45" x2="72" y2="45" stroke={GREEN} strokeWidth="1.5" />

    {/* Additional pentagonal faces */}
    <path d="M 60 20 L 75 28 L 80 35" fill="none" stroke={GREEN} strokeWidth="1.5" />
    <path d="M 60 20 L 45 28 L 40 35" fill="none" stroke={GREEN} strokeWidth="1.5" />

    {/* Radiating light lines */}
    <line x1="60" y1="37" x2="35" y2="37" stroke={ORANGE} strokeWidth="1.5" opacity="0.7" />
    <line x1="60" y1="37" x2="85" y2="37" stroke={ORANGE} strokeWidth="1.5" opacity="0.7" />
    <line x1="60" y1="37" x2="50" y2="18" stroke={ORANGE} strokeWidth="1.5" opacity="0.7" />
    <line x1="60" y1="37" x2="70" y2="18" stroke={ORANGE} strokeWidth="1.5" opacity="0.7" />
    <line x1="60" y1="37" x2="45" y2="52" stroke={ORANGE} strokeWidth="1.5" opacity="0.7" />
    <line x1="60" y1="37" x2="75" y2="52" stroke={ORANGE} strokeWidth="1.5" opacity="0.7" />

    {/* Mathematical symbols/formulas */}
    <text x="52" y="32" fontSize="8" fill={GREEN} fontFamily="serif">π</text>
    <text x="63" y="40" fontSize="8" fill={GREEN} fontFamily="serif">∑</text>
    <text x="54" y="48" fontSize="8" fill={GREEN} fontFamily="serif">∞</text>

    {/* Small formula hints */}
    <text x="38" y="25" fontSize="6" fill={ORANGE} fontFamily="monospace">x²</text>
    <text x="78" y="25" fontSize="6" fill={ORANGE} fontFamily="monospace">θ</text>
    <text x="35" y="50" fontSize="6" fill={ORANGE} fontFamily="monospace">∫</text>
    <text x="80" y="50" fontSize="6" fill={ORANGE} fontFamily="monospace">√</text>

    {/* Base/stand */}
    <rect x="50" y="58" width="20" height="4" fill={GREEN} fillOpacity="0.3" stroke={GREEN} strokeWidth="1.5" rx="1" />
    <rect x="54" y="55" width="12" height="3" fill={GREEN} fillOpacity="0.2" stroke={GREEN} strokeWidth="1.5" />
  </svg>
);

// ID 16: DNA Helix Stand
export const DNAHelixStand = () => (
  <svg viewBox="0 0 120 80" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
    {/* First helix strand - sine wave */}
    <path
      d="M 40 15 Q 50 20, 60 25 T 80 35 Q 85 40, 80 45 T 60 55 Q 50 60, 40 65"
      fill="none"
      stroke={GREEN}
      strokeWidth="2"
    />

    {/* Second helix strand - opposite sine wave */}
    <path
      d="M 80 15 Q 70 20, 60 25 T 40 35 Q 35 40, 40 45 T 60 55 Q 70 60, 80 65"
      fill="none"
      stroke={ORANGE}
      strokeWidth="2"
    />

    {/* Base pair rungs connecting the helixes */}
    <line x1="45" y1="17" x2="75" y2="17" stroke={GREEN} strokeWidth="1.5" opacity="0.6" />
    <circle cx="45" cy="17" r="2" fill={GREEN} fillOpacity="0.5" />
    <circle cx="75" cy="17" r="2" fill={ORANGE} fillOpacity="0.5" />

    <line x1="52" y1="22" x2="68" y2="22" stroke={ORANGE} strokeWidth="1.5" opacity="0.6" />
    <circle cx="52" cy="22" r="2" fill={GREEN} fillOpacity="0.5" />
    <circle cx="68" cy="22" r="2" fill={ORANGE} fillOpacity="0.5" />

    <line x1="60" y1="25" x2="60" y2="25" stroke={GREEN} strokeWidth="1.5" opacity="0.6" />

    <line x1="50" y1="30" x2="70" y2="30" stroke={GREEN} strokeWidth="1.5" opacity="0.6" />
    <circle cx="50" cy="30" r="2" fill={ORANGE} fillOpacity="0.5" />
    <circle cx="70" cy="30" r="2" fill={GREEN} fillOpacity="0.5" />

    <line x1="43" y1="37" x2="77" y2="37" stroke={ORANGE} strokeWidth="1.5" opacity="0.6" />
    <circle cx="43" cy="37" r="2" fill={GREEN} fillOpacity="0.5" />
    <circle cx="77" cy="37" r="2" fill={ORANGE} fillOpacity="0.5" />

    <line x1="40" y1="45" x2="80" y2="45" stroke={GREEN} strokeWidth="1.5" opacity="0.6" />
    <circle cx="40" cy="45" r="2" fill={ORANGE} fillOpacity="0.5" />
    <circle cx="80" cy="45" r="2" fill={GREEN} fillOpacity="0.5" />

    <line x1="43" y1="53" x2="77" y2="53" stroke={ORANGE} strokeWidth="1.5" opacity="0.6" />
    <circle cx="43" cy="53" r="2" fill={GREEN} fillOpacity="0.5" />
    <circle cx="77" cy="53" r="2" fill={ORANGE} fillOpacity="0.5" />

    <line x1="50" y1="60" x2="70" y2="60" stroke={GREEN} strokeWidth="1.5" opacity="0.6" />
    <circle cx="50" cy="60" r="2" fill={ORANGE} fillOpacity="0.5" />
    <circle cx="70" cy="60" r="2" fill={GREEN} fillOpacity="0.5" />

    <line x1="45" y1="65" x2="75" y2="65" stroke={ORANGE} strokeWidth="1.5" opacity="0.6" />
    <circle cx="45" cy="65" r="2" fill={GREEN} fillOpacity="0.5" />
    <circle cx="75" cy="65" r="2" fill={ORANGE} fillOpacity="0.5" />

    {/* Stand/base */}
    <rect x="50" y="68" width="20" height="3" fill={GREEN} fillOpacity="0.3" stroke={GREEN} strokeWidth="1.5" rx="1" />
    <path d="M 55 68 L 60 15 M 65 68 L 60 15" stroke={GREEN} strokeWidth="1" opacity="0.3" />
  </svg>
);

// Default export with all illustrations
const illustrations = {
  DragonDiceTower,
  RocketShipPhoneStand,
  MiniMillenniumFalcon,
  PeriodicTableBookends,
  ArticulatedFlexiDragon,
  PortalBookendSet,
  MathDodecahedronLamp,
  DNAHelixStand,
};

export default illustrations;
