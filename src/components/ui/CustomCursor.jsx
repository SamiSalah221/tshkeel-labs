import { useEffect, useRef, useState, useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";

export default function CustomCursor() {
  const { theme } = useContext(ThemeContext);
  const cursorRef = useRef(null);
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);
  const pos = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Don't render on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    setVisible(true);

    const onMouseMove = (e) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
    };

    const onMouseOver = (e) => {
      if (e.target.closest("button, a, [role='button'], input, textarea, select")) {
        setHovering(true);
      }
    };

    const onMouseOut = (e) => {
      if (e.target.closest("button, a, [role='button'], input, textarea, select")) {
        setHovering(false);
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseover", onMouseOver);
    document.addEventListener("mouseout", onMouseOut);

    let rafId;
    const animate = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.15;
      pos.current.y += (target.current.y - pos.current.y) * 0.15;
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px) translate(-50%, -50%)`;
      }
      rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseout", onMouseOut);
      cancelAnimationFrame(rafId);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      ref={cursorRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: hovering ? 50 : 20,
        height: hovering ? 50 : 20,
        borderRadius: "50%",
        background: hovering
          ? "transparent"
          : `radial-gradient(circle, rgba(${theme.cursorAccent},0.8) 0%, rgba(${theme.cursorAccent},0) 70%)`,
        border: hovering ? `2px solid rgba(${theme.cursorAccent},0.6)` : "none",
        pointerEvents: "none",
        zIndex: 45,
        mixBlendMode: "screen",
        transition: "width 0.2s ease, height 0.2s ease, background 0.2s ease, border 0.2s ease",
        willChange: "transform",
      }}
    />
  );
}
