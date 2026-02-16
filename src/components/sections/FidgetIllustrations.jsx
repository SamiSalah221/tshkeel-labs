const ORANGE = "#DC5F00";
const RED = "#CF0A0A";

// ID 17 - Infinity Cube
export const InfinityCube = () => (
  <svg viewBox="0 0 120 80" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
    {/* Front face */}
    <path
      d="M 40 25 L 60 15 L 80 25 L 60 35 Z"
      fill={RED}
      fillOpacity="0.2"
      stroke={RED}
      strokeWidth="2"
    />
    {/* Left face */}
    <path
      d="M 40 25 L 40 45 L 60 55 L 60 35 Z"
      fill={ORANGE}
      fillOpacity="0.1"
      stroke={ORANGE}
      strokeWidth="2"
    />
    {/* Right face */}
    <path
      d="M 60 35 L 60 55 L 80 45 L 80 25 Z"
      fill={ORANGE}
      fillOpacity="0.15"
      stroke={ORANGE}
      strokeWidth="2"
    />
    {/* Back top face */}
    <path
      d="M 60 55 L 80 45 L 100 55 L 80 65 Z"
      fill={RED}
      fillOpacity="0.15"
      stroke={RED}
      strokeWidth="1.5"
    />
    {/* Back left face */}
    <path
      d="M 40 45 L 40 65 L 60 75 L 60 55 Z"
      fill={ORANGE}
      fillOpacity="0.2"
      stroke={ORANGE}
      strokeWidth="1.5"
    />
    {/* Connecting edges for infinity effect */}
    <path
      d="M 60 15 L 40 25 M 80 65 L 100 55"
      stroke={RED}
      strokeWidth="1.5"
      strokeDasharray="2,2"
      fill="none"
    />
  </svg>
);

// ID 18 - Gear Spinner
export const GearSpinner = () => {
  const createGear = (cx, cy, r, rotation) => {
    const teeth = 8;
    let path = '';
    for (let i = 0; i < teeth * 2; i++) {
      const angle = (i * Math.PI) / teeth + (rotation * Math.PI) / 180;
      const radius = i % 2 === 0 ? r : r * 0.8;
      const x = cx + radius * Math.cos(angle);
      const y = cy + radius * Math.sin(angle);
      path += `${i === 0 ? 'M' : 'L'} ${x} ${y} `;
    }
    path += 'Z';
    return path;
  };

  return (
    <svg viewBox="0 0 120 80" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      {/* Top row gears */}
      <path d={createGear(30, 25, 10, 0)} fill={RED} fillOpacity="0.2" stroke={RED} strokeWidth="1.5" />
      <circle cx="30" cy="25" r="3" fill={ORANGE} fillOpacity="0.3" />

      <path d={createGear(60, 25, 10, 22.5)} fill={ORANGE} fillOpacity="0.15" stroke={ORANGE} strokeWidth="1.5" />
      <circle cx="60" cy="25" r="3" fill={RED} fillOpacity="0.3" />

      <path d={createGear(90, 25, 10, 0)} fill={RED} fillOpacity="0.2" stroke={RED} strokeWidth="1.5" />
      <circle cx="90" cy="25" r="3" fill={ORANGE} fillOpacity="0.3" />

      {/* Bottom row gears */}
      <path d={createGear(45, 55, 10, 22.5)} fill={ORANGE} fillOpacity="0.15" stroke={ORANGE} strokeWidth="1.5" />
      <circle cx="45" cy="55" r="3" fill={RED} fillOpacity="0.3" />

      <path d={createGear(75, 55, 10, 0)} fill={RED} fillOpacity="0.2" stroke={RED} strokeWidth="1.5" />
      <circle cx="75" cy="55" r="3" fill={ORANGE} fillOpacity="0.3" />

      {/* Center gear */}
      <path d={createGear(60, 40, 8, 11.25)} fill={RED} fillOpacity="0.25" stroke={RED} strokeWidth="2" />
      <circle cx="60" cy="40" r="3" fill={ORANGE} fillOpacity="0.4" />
    </svg>
  );
};

// ID 19 - Flexi Worm
export const FlexiWorm = () => (
  <svg viewBox="0 0 120 80" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
    {/* Curved worm body segments */}
    <ellipse cx="25" cy="45" rx="8" ry="6" fill={RED} fillOpacity="0.2" stroke={RED} strokeWidth="1.5" transform="rotate(-20 25 45)" />
    <ellipse cx="35" cy="38" rx="8" ry="6" fill={ORANGE} fillOpacity="0.15" stroke={ORANGE} strokeWidth="1.5" transform="rotate(-10 35 38)" />
    <ellipse cx="45" cy="33" rx="8" ry="6" fill={RED} fillOpacity="0.2" stroke={RED} strokeWidth="1.5" transform="rotate(0 45 33)" />
    <ellipse cx="55" cy="31" rx="8" ry="6" fill={ORANGE} fillOpacity="0.15" stroke={ORANGE} strokeWidth="1.5" transform="rotate(10 55 31)" />
    <ellipse cx="65" cy="32" rx="8" ry="6" fill={RED} fillOpacity="0.2" stroke={RED} strokeWidth="1.5" transform="rotate(20 65 32)" />
    <ellipse cx="75" cy="36" rx="8" ry="6" fill={ORANGE} fillOpacity="0.15" stroke={ORANGE} strokeWidth="1.5" transform="rotate(30 75 36)" />
    <ellipse cx="85" cy="42" rx="8" ry="6" fill={RED} fillOpacity="0.2" stroke={RED} strokeWidth="1.5" transform="rotate(40 85 42)" />
    <ellipse cx="93" cy="50" rx="8" ry="6" fill={ORANGE} fillOpacity="0.15" stroke={ORANGE} strokeWidth="1.5" transform="rotate(50 93 50)" />

    {/* Joint indicators */}
    <circle cx="30" cy="41" r="1.5" fill={ORANGE} />
    <circle cx="40" cy="35" r="1.5" fill={RED} />
    <circle cx="50" cy="32" r="1.5" fill={ORANGE} />
    <circle cx="60" cy="31" r="1.5" fill={RED} />
    <circle cx="70" cy="34" r="1.5" fill={ORANGE} />
    <circle cx="80" cy="39" r="1.5" fill={RED} />
    <circle cx="89" cy="46" r="1.5" fill={ORANGE} />
  </svg>
);

// ID 20 - Clicky Slider
export const ClickySlider = () => (
  <svg viewBox="0 0 120 80" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
    {/* Track/rail */}
    <rect x="20" y="35" width="80" height="10" rx="5" fill={ORANGE} fillOpacity="0.1" stroke={ORANGE} strokeWidth="1.5" />

    {/* Click position indicators */}
    <circle cx="25" cy="40" r="2" fill={RED} fillOpacity="0.3" />
    <circle cx="40" cy="40" r="2" fill={ORANGE} fillOpacity="0.2" />
    <circle cx="60" cy="40" r="2" fill={ORANGE} fillOpacity="0.2" />
    <circle cx="80" cy="40" r="2" fill={ORANGE} fillOpacity="0.2" />
    <circle cx="95" cy="40" r="2" fill={RED} fillOpacity="0.3" />

    {/* Slider button */}
    <rect x="50" y="28" width="20" height="24" rx="3" fill={RED} fillOpacity="0.25" stroke={RED} strokeWidth="2" />
    <line x1="55" y1="35" x2="55" y2="45" stroke={RED} strokeWidth="1.5" />
    <line x1="60" y1="35" x2="60" y2="45" stroke={RED} strokeWidth="1.5" />
    <line x1="65" y1="35" x2="65" y2="45" stroke={RED} strokeWidth="1.5" />

    {/* End caps */}
    <circle cx="20" cy="40" r="6" fill="none" stroke={ORANGE} strokeWidth="1.5" />
    <circle cx="100" cy="40" r="6" fill="none" stroke={ORANGE} strokeWidth="1.5" />

    {/* Click indicators at ends */}
    <path d="M 15 25 L 20 30 L 25 25" fill="none" stroke={RED} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M 95 55 L 100 50 L 105 55" fill="none" stroke={RED} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// ID 21 - Gyroscope Ball
export const GyroscopeBall = () => (
  <svg viewBox="0 0 120 80" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
    {/* Outer ring */}
    <ellipse cx="60" cy="40" rx="35" ry="30" fill="none" stroke={ORANGE} strokeWidth="2" />
    <ellipse cx="60" cy="40" rx="35" ry="8" fill={ORANGE} fillOpacity="0.1" stroke={ORANGE} strokeWidth="1.5" />

    {/* Middle ring - rotated */}
    <ellipse cx="60" cy="40" rx="25" ry="22" fill="none" stroke={RED} strokeWidth="2" transform="rotate(60 60 40)" />
    <ellipse cx="60" cy="40" rx="25" ry="6" fill={RED} fillOpacity="0.15" stroke={RED} strokeWidth="1.5" transform="rotate(60 60 40)" />

    {/* Inner ring - rotated differently */}
    <ellipse cx="60" cy="40" rx="15" ry="14" fill="none" stroke={ORANGE} strokeWidth="1.5" transform="rotate(-30 60 40)" />
    <ellipse cx="60" cy="40" rx="15" ry="4" fill={ORANGE} fillOpacity="0.1" stroke={ORANGE} strokeWidth="1.5" transform="rotate(-30 60 40)" />

    {/* Center ball */}
    <circle cx="60" cy="40" r="6" fill={RED} fillOpacity="0.3" stroke={RED} strokeWidth="2" />
    <circle cx="60" cy="40" r="3" fill={RED} fillOpacity="0.5" />
  </svg>
);

// ID 22 - Hex Grid Twist
export const HexGridTwist = () => {
  const createHexagon = (cx, cy, size, rotation = 0) => {
    const points = [];
    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI / 3) * i + (rotation * Math.PI) / 180;
      const x = cx + size * Math.cos(angle);
      const y = cy + size * Math.sin(angle);
      points.push(`${x},${y}`);
    }
    return points.join(' ');
  };

  return (
    <svg viewBox="0 0 120 80" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      {/* Top row */}
      <polygon points={createHexagon(35, 25, 10, 0)} fill={RED} fillOpacity="0.2" stroke={RED} strokeWidth="1.5" />
      <polygon points={createHexagon(60, 25, 10, 5)} fill={ORANGE} fillOpacity="0.15" stroke={ORANGE} strokeWidth="1.5" />
      <polygon points={createHexagon(85, 25, 10, 10)} fill={RED} fillOpacity="0.2" stroke={RED} strokeWidth="1.5" />

      {/* Middle row */}
      <polygon points={createHexagon(47.5, 42, 10, 15)} fill={ORANGE} fillOpacity="0.15" stroke={ORANGE} strokeWidth="1.5" />
      <polygon points={createHexagon(72.5, 42, 10, 20)} fill={RED} fillOpacity="0.25" stroke={RED} strokeWidth="2" />

      {/* Bottom row */}
      <polygon points={createHexagon(35, 59, 10, 25)} fill={RED} fillOpacity="0.2" stroke={RED} strokeWidth="1.5" />
      <polygon points={createHexagon(60, 59, 10, 30)} fill={ORANGE} fillOpacity="0.15" stroke={ORANGE} strokeWidth="1.5" />
      <polygon points={createHexagon(85, 59, 10, 35)} fill={RED} fillOpacity="0.2" stroke={RED} strokeWidth="1.5" />

      {/* Center connection lines */}
      <line x1="60" y1="35" x2="60" y2="49" stroke={RED} strokeWidth="1" opacity="0.3" strokeDasharray="2,2" />
      <line x1="48" y1="32" x2="52" y2="42" stroke={ORANGE} strokeWidth="1" opacity="0.3" strokeDasharray="2,2" />
      <line x1="72" y1="32" x2="68" y2="42" stroke={ORANGE} strokeWidth="1" opacity="0.3" strokeDasharray="2,2" />
    </svg>
  );
};

// ID 23 - Chain Link Fidget
export const ChainLinkFidget = () => (
  <svg viewBox="0 0 120 80" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
    {/* Link 1 */}
    <ellipse cx="25" cy="40" rx="10" ry="15" fill={RED} fillOpacity="0.2" stroke={RED} strokeWidth="2" />
    <ellipse cx="25" cy="40" rx="6" ry="11" fill="none" stroke={RED} strokeWidth="1.5" />

    {/* Link 2 - interlocked */}
    <ellipse cx="40" cy="40" rx="15" ry="10" fill={ORANGE} fillOpacity="0.15" stroke={ORANGE} strokeWidth="2" />
    <ellipse cx="40" cy="40" rx="11" ry="6" fill="none" stroke={ORANGE} strokeWidth="1.5" />

    {/* Link 3 */}
    <ellipse cx="60" cy="40" rx="10" ry="15" fill={RED} fillOpacity="0.2" stroke={RED} strokeWidth="2" />
    <ellipse cx="60" cy="40" rx="6" ry="11" fill="none" stroke={RED} strokeWidth="1.5" />

    {/* Link 4 - interlocked */}
    <ellipse cx="75" cy="40" rx="15" ry="10" fill={ORANGE} fillOpacity="0.15" stroke={ORANGE} strokeWidth="2" />
    <ellipse cx="75" cy="40" rx="11" ry="6" fill="none" stroke={ORANGE} strokeWidth="1.5" />

    {/* Link 5 */}
    <ellipse cx="95" cy="40" rx="10" ry="15" fill={RED} fillOpacity="0.2" stroke={RED} strokeWidth="2" />
    <ellipse cx="95" cy="40" rx="6" ry="11" fill="none" stroke={RED} strokeWidth="1.5" />
  </svg>
);

// ID 24 - Spring Snake
export const SpringSnake = () => {
  const coils = 8;
  const coilPath = [];

  for (let i = 0; i <= coils; i++) {
    const x = 20 + (i * 80) / coils;
    const baseY = 40 + Math.sin(i * 0.8) * 8;
    const topY = baseY - 12;
    const bottomY = baseY + 12;

    if (i === 0) {
      coilPath.push(`M ${x} ${baseY}`);
    } else {
      const prevX = 20 + ((i - 1) * 80) / coils;
      const prevBaseY = 40 + Math.sin((i - 1) * 0.8) * 8;
      const prevTopY = prevBaseY - 12;
      const prevBottomY = prevBaseY + 12;

      if (i % 2 === 1) {
        coilPath.push(`Q ${(prevX + x) / 2} ${prevTopY - 5} ${x} ${topY}`);
      } else {
        coilPath.push(`Q ${(prevX + x) / 2} ${prevBottomY + 5} ${x} ${bottomY}`);
      }
    }
  }

  return (
    <svg viewBox="0 0 120 80" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      {/* Spring coil path */}
      <path
        d={coilPath.join(' ')}
        fill="none"
        stroke={RED}
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Coil rings for depth */}
      <ellipse cx="30" cy="35" rx="5" ry="8" fill={ORANGE} fillOpacity="0.1" stroke={ORANGE} strokeWidth="1.5" />
      <ellipse cx="45" cy="45" rx="5" ry="8" fill={RED} fillOpacity="0.2" stroke={RED} strokeWidth="1.5" />
      <ellipse cx="60" cy="38" rx="5" ry="8" fill={ORANGE} fillOpacity="0.1" stroke={ORANGE} strokeWidth="1.5" />
      <ellipse cx="75" cy="47" rx="5" ry="8" fill={RED} fillOpacity="0.2" stroke={RED} strokeWidth="1.5" />
      <ellipse cx="90" cy="41" rx="5" ry="8" fill={ORANGE} fillOpacity="0.1" stroke={ORANGE} strokeWidth="1.5" />

      {/* Center line for spring compression indication */}
      <path
        d="M 20 40 Q 35 32, 50 40 T 80 40 T 100 42"
        fill="none"
        stroke={ORANGE}
        strokeWidth="1"
        opacity="0.3"
        strokeDasharray="3,3"
      />
    </svg>
  );
};

// Default export as object mapping
const FidgetIllustrations = {
  InfinityCube,
  GearSpinner,
  FlexiWorm,
  ClickySlider,
  GyroscopeBall,
  HexGridTwist,
  ChainLinkFidget,
  SpringSnake,
};

export default FidgetIllustrations;
