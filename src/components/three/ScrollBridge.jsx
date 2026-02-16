import { useEffect, useCallback, useRef } from "react";
import { useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import gsap from "gsap";

const NAV_SECTIONS = ["hero", "about", "howitworks", "products", "testimonials", "customquote", "faq", "contact"];

// Map all detected sections to the 4 nav items in Navbar
const NAV_MAP = {
  hero: "hero",
  about: "about",
  howitworks: "about",
  products: "products",
  testimonials: "products",
  customquote: "products",
  faq: "contact",
  contact: "contact",
};

export default function ScrollBridge({ setScrollToSection, setActiveSection }) {
  const scroll = useScroll();
  const cachedOffsets = useRef(null);
  const frameCount = useRef(0);

  const scrollToSection = useCallback(
    (section) => {
      if (!scroll.el) return;
      const scrollContainer = scroll.el;

      // Special case: "hero" always scrolls to the very top
      if (section === "hero") {
        gsap.to(scrollContainer, { scrollTop: 0, duration: 1.2, ease: "power2.inOut" });
        return;
      }

      const sectionEl = scrollContainer.querySelector(
        `[data-section="${section}"]`
      );
      if (!sectionEl) return;

      const maxScroll = scrollContainer.scrollHeight - scrollContainer.clientHeight;
      const clientHeight = scrollContainer.clientHeight;

      // drei's <Scroll html> translates content by scrollTop * ratio, where
      // ratio = (maxScroll - clientHeight) / maxScroll.
      // To position a section at the top of viewport:
      //   targetScrollTop = sectionOffsetTop / ratio
      // No navbar subtraction needed — sections have their own top padding.
      const ratio = (maxScroll - clientHeight) / maxScroll;
      let targetScrollTop;
      if (ratio <= 0 || !isFinite(ratio)) {
        targetScrollTop = Math.min(maxScroll, Math.max(0, sectionEl.offsetTop));
      } else {
        targetScrollTop = Math.min(maxScroll, Math.max(0, sectionEl.offsetTop / ratio));
      }
      if (!isFinite(targetScrollTop)) return;

      gsap.to(scrollContainer, {
        scrollTop: targetScrollTop,
        duration: 1.2,
        ease: "power2.inOut",
      });
    },
    [scroll]
  );

  useEffect(() => {
    setScrollToSection(() => scrollToSection);
  }, [scrollToSection, setScrollToSection]);

  // Detect active section based on scroll offset — runs every frame
  useFrame(() => {
    if (!setActiveSection) return;
    // Throttle to every 6 frames (~10hz at 60fps) for performance
    frameCount.current++;
    if (frameCount.current % 6 !== 0) return;

    if (!scroll.el) return;
    const container = scroll.el;
    const offset = scroll.offset; // 0 to 1
    const maxScroll = container.scrollHeight - container.clientHeight;
    if (maxScroll <= 0) return;

    // Recalculate section offsets every ~60 frames (1s at 60fps) or on first run
    if (!cachedOffsets.current || frameCount.current % 60 === 0) {
      const clientHeight = container.clientHeight;
      const ratio = (maxScroll - clientHeight) / maxScroll;
      const offsets = [];
      for (const name of NAV_SECTIONS) {
        const el = container.querySelector(`[data-section="${name}"]`);
        if (!el) continue;
        // Normalized scroll position (0-1) where this section starts
        const normalizedOffset = (ratio <= 0 || !isFinite(ratio))
          ? el.offsetTop / maxScroll
          : (el.offsetTop / ratio) / maxScroll;
        if (!isFinite(normalizedOffset)) continue;
        offsets.push({ name, offset: normalizedOffset });
      }
      cachedOffsets.current = offsets;
    }

    // Find the section whose offset we've scrolled past
    let active = "hero";
    for (const { name, offset: sectionOffset } of cachedOffsets.current) {
      if (offset >= sectionOffset - 0.03) {
        active = name;
      }
    }
    setActiveSection(NAV_MAP[active] || "hero");
  });

  return null;
}
