import { useContext } from "react";
import { ScrollContext } from "../../contexts/ScrollContext";

export default function BackToTop() {
  const { scrollToSection, activeSection } = useContext(ScrollContext);
  const visible = activeSection !== "hero";

  return (
    <button
      type="button"
      onClick={() => scrollToSection("hero")}
      aria-label="Back to top"
      style={{
        position: "fixed",
        bottom: 96,
        right: 24,
        zIndex: 40,
        width: 44,
        height: 44,
        borderRadius: "50%",
        background: "var(--color-accent)",
        color: "var(--color-primary-dark)",
        border: "none",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: "opacity 0.3s ease, transform 0.3s ease, box-shadow 0.2s ease",
        pointerEvents: visible ? "auto" : "none",
        boxShadow: "0 2px 10px rgba(201, 168, 76, 0.3)",
      }}
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 15l-6-6-6 6" />
      </svg>
    </button>
  );
}
