import { useContext } from "react";
import { motion } from "framer-motion";
import { ScrollContext } from "../../contexts/ScrollContext";

export default function HeroSection({ config }) {
  const { scrollToSection, isMobile, setMobileView } = useContext(ScrollContext);

  const handleBrowseProducts = () => {
    if (isMobile) {
      setMobileView("products");
    } else {
      scrollToSection("products");
    }
  };

  return (
    <section
      data-section="hero"
      aria-label="Hero"
      className="flex flex-col items-center justify-center text-center pt-16 px-5 md:px-12"
      style={{ height: `${config.heroPages * 100}vh`, pointerEvents: 'none' }}
    >
      <motion.div
        className="relative z-10 px-6 sm:px-8 md:px-16 bg-bg-card/80 backdrop-blur-md rounded-2xl py-8 max-w-lg md:max-w-none border border-accent/20"
        style={{ pointerEvents: 'auto' }}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      >
        {/* Bismillah verse band */}
        <div className="verse-band-bismillah mb-6">
          بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
        </div>

        <h1
          className="text-4xl sm:text-6xl md:text-8xl font-bold text-accent tracking-tight mb-4"
          style={{ textShadow: '0 0 40px color-mix(in srgb, var(--color-accent) 30%, transparent)' }}
        >
          {config.businessName}
        </h1>
        <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-accent to-transparent mx-auto mb-6"></div>
        <p className="text-lg sm:text-xl md:text-2xl text-text-muted max-w-xl mx-auto">
          {config.tagline}
        </p>

        <div className="flex flex-col items-center gap-3 mt-6">
          <button
            type="button"
            onClick={handleBrowseProducts}
            className="btn btn-md btn-primary"
          >
            Browse Products
          </button>
          <button
            type="button"
            onClick={() => scrollToSection("customquote")}
            className="btn btn-ghost"
            style={{ color: 'var(--color-text-muted)' }}
          >
            or request a custom piece &rarr;
          </button>
        </div>

        {/* Decorative geometric verse band */}
        <div className="verse-band mt-6">
          &#x2726; &#x066D; &#x2726;
        </div>
      </motion.div>

      <div className="absolute bottom-[10vh] animate-bounce" style={{ pointerEvents: 'auto' }}>
        <svg
          className="w-8 h-8 text-accent"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </section>
  );
}
