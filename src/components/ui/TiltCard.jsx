import { useState, useRef, useCallback } from "react";
import { IS_TOUCH } from "../../utils/platform";

export default function TiltCard({ children, className, style }) {
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0, glareX: 50, glareY: 50 });
  const cardRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setTilt({
      rotateX: (0.5 - y) * 16,
      rotateY: (x - 0.5) * 16,
      glareX: x * 100,
      glareY: y * 100,
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTilt({ rotateX: 0, rotateY: 0, glareX: 50, glareY: 50 });
  }, []);

  // On touch devices, skip tilt transforms — just render a plain wrapper
  if (IS_TOUCH) {
    return (
      <div className={className} style={{ ...style, position: "relative", overflow: "hidden" }}>
        {children}
      </div>
    );
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
      style={{
        ...style,
        transform: `perspective(800px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
        transition: tilt.rotateX === 0 && tilt.rotateY === 0 ? "transform 0.5s ease" : "none",
        willChange: "transform",
        transformStyle: "preserve-3d",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(circle at ${tilt.glareX}% ${tilt.glareY}%, rgba(255,255,255,0.15) 0%, transparent 60%)`,
          pointerEvents: "none",
          borderRadius: "inherit",
        }}
      />
      {children}
    </div>
  );
}
