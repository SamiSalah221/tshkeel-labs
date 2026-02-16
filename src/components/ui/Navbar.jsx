import { useContext, useState, useEffect } from "react";
import { ScrollContext } from "../../contexts/ScrollContext";
import { siteConfig } from "../../config/siteConfig";
import PrayerTimesWidget from "./PrayerTimesWidget";

const NAV_LINKS = [
  { label: "Home", section: "hero" },
  { label: "About", section: "about" },
  { label: "Products", section: "products" },
  { label: "Contact", section: "contact" },
];

export default function Navbar() {
  const { scrollToSection, activeSection, isMobile, mobileView, setMobileView } = useContext(ScrollContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNavClick = (section) => {
    if (isMobile) {
      if (section === "products") {
        setMobileView("products");
      } else {
        // Switch to home view first, then scroll after a tick so sections are rendered
        if (mobileView !== "home") {
          setMobileView("home");
          setTimeout(() => scrollToSection(section), 100);
        } else {
          scrollToSection(section);
        }
      }
    } else {
      scrollToSection(section);
    }
  };

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <header className="fixed top-0 inset-x-0 z-40">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:bg-accent focus:text-primary-dark focus:px-4 focus:py-2 focus:rounded-lg focus:font-semibold">
        Skip to content
      </a>
      <nav aria-label="Main navigation" className={`${menuOpen ? 'bg-primary-dark' : 'bg-primary-dark/70'} backdrop-blur-md border-b border-accent/20`}>
        <div className="max-w-7xl mx-auto px-5 md:px-12 flex items-center justify-between h-16">
          {/* Brand */}
          <button
            type="button"
            onClick={() => handleNavClick("hero")}
            className="text-accent font-bold text-xl tracking-wide cursor-pointer"
            style={{ fontFamily: "'Saltza', 'Inter', system-ui, sans-serif", letterSpacing: "0.05em" }}
          >
            {siteConfig.businessName}
          </button>

          {/* Prayer Times - center, desktop only */}
          <div className="hidden lg:flex">
            <PrayerTimesWidget />
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <button
                type="button"
                key={link.section}
                onClick={() => handleNavClick(link.section)}
                className={`text-sm uppercase tracking-widest cursor-pointer transition-colors pb-1 ${
                  activeSection === link.section
                    ? "text-accent border-b-2 border-accent"
                    : "text-text-on-dark/80 hover:text-accent border-b-2 border-transparent"
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Mobile Hamburger */}
          <button
            type="button"
            className="md:hidden text-accent cursor-pointer p-2 min-h-[44px] min-w-[44px] flex items-center justify-center"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu — backdrop + slide-in drawer */}
        {menuOpen && (
          <div
            className="md:hidden fixed inset-0 top-16 z-50"
            onClick={() => setMenuOpen(false)}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/40" />
            {/* Drawer */}
            <div
              role="dialog"
              aria-label="Navigation menu"
              className="absolute top-0 right-0 w-64 h-full bg-primary-dark/95 backdrop-blur-md border-l border-accent/10 px-6 py-6 space-y-4"
              onClick={(e) => e.stopPropagation()}
              style={{
                animation: "slideInRight 0.25s ease forwards",
              }}
            >
              {/* Prayer Times on mobile */}
              <div className="pb-4 border-b border-accent/10">
                <PrayerTimesWidget />
              </div>
              {NAV_LINKS.map((link) => (
                <button
                  type="button"
                  key={link.section}
                  onClick={() => {
                    handleNavClick(link.section);
                    setMenuOpen(false);
                  }}
                  className={`block w-full text-left text-sm uppercase tracking-widest py-3 min-h-[44px] cursor-pointer transition-colors ${
                    (link.section === "products" ? mobileView === "products" : activeSection === link.section)
                      ? "text-accent border-l-2 border-accent pl-3"
                      : "text-text-on-dark/80 hover:text-accent"
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
