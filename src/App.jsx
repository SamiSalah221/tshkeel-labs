import { Suspense, useState, useEffect, useCallback, useRef, useContext, useMemo, lazy } from "react";
import { Canvas } from "@react-three/fiber";
import { ScrollControls, Scroll } from "@react-three/drei";
import { siteConfig } from "./config/siteConfig";
import { ScrollContext } from "./contexts/ScrollContext";
import { ThemeProvider, ThemeContext } from "./contexts/ThemeContext";
import { IS_IOS } from "./utils/platform";
import Scene from "./components/three/Scene";
import ScrollBridge from "./components/three/ScrollBridge";
import Navbar from "./components/ui/Navbar";
const ProductViewerModal = lazy(() => import("./components/ui/ProductViewerModal"));
import CustomCursor from "./components/ui/CustomCursor";
import SeasonalBanner from "./components/ui/SeasonalBanner";
import FloatingWhatsApp from "./components/ui/FloatingWhatsApp";
import BackToTop from "./components/ui/BackToTop";
import HeroSection from "./components/sections/HeroSection";
import AboutSection from "./components/sections/AboutSection";
import HowItWorks from "./components/sections/HowItWorks";
import ProductShowcase from "./components/sections/ProductShowcase";
import TestimonialsSection from "./components/sections/TestimonialsSection";
import CustomOrderCTA from "./components/sections/CustomOrderCTA";
import FAQSection from "./components/sections/FAQSection";
import ContactSection from "./components/sections/ContactSection";
import Footer from "./components/sections/Footer";

function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-bg">
      <h1 className="text-4xl font-bold text-accent mb-4">Tshkeel Labs</h1>
      <div className="w-16 h-1 bg-accent animate-pulse"></div>
      <p className="text-white/60 mt-4 text-sm tracking-widest uppercase">Loading</p>
    </div>
  );
}

function AppContent() {
  const { theme, /* activeCategory, setActiveCategory, */ islamicTheme } = useContext(ThemeContext);
  const [vh, setVh] = useState(window.innerHeight);
  const [scrollToSection, setScrollToSection] = useState(() => () => {});
  const scrollToSectionRef = useRef(scrollToSection);
  const [viewerProduct, setViewerProduct] = useState(null);
  const [pages, setPages] = useState(6);
  const [activeSection, setActiveSection] = useState("hero");
  const activeSectionRef = useRef("hero");
  const [contentEl, setContentEl] = useState(null);
  const suppressMeasureRef = useRef(false);
  const transitionTimerRef = useRef(null);

  // Mobile two-view toggle
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined" && window.matchMedia("(max-width: 768px)").matches
  );
  const [mobileView, setMobileView] = useState("home"); // "home" | "products"

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const handler = (e) => {
      setIsMobile(e.matches);
      if (!e.matches) setMobileView("home"); // reset to home when switching to desktop
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => { scrollToSectionRef.current = scrollToSection; }, [scrollToSection]);

  // Apply active theme colors to document root so entire site updates
  useEffect(() => {
    const root = document.documentElement;
    if (theme.colors) {
      root.classList.add("theme-transition");
      clearTimeout(transitionTimerRef.current);
      Object.entries(theme.colors).forEach(([key, value]) => {
        root.style.setProperty(key, value);
      });
      transitionTimerRef.current = setTimeout(() => {
        root.classList.remove("theme-transition");
      }, 500);
    }
    return () => clearTimeout(transitionTimerRef.current);
  }, [theme]);

  const handleActiveSection = useCallback((section) => {
    if (activeSectionRef.current !== section) {
      activeSectionRef.current = section;
      setActiveSection(section);
    }
  }, []);

  useEffect(() => {
    const handleResize = () => setVh(window.innerHeight);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const measureContent = useCallback(() => {
    if (!contentEl || !vh) return;
    if (suppressMeasureRef.current) return;
    requestAnimationFrame(() => {
      if (suppressMeasureRef.current) return;
      let contentHeight = 0;
      for (let i = 0; i < contentEl.children.length; i++) {
        const child = contentEl.children[i];
        // Skip absolutely-positioned background pattern elements
        const cls = child.className || "";
        if (cls.includes("-bg") && child.style.position === "absolute") continue;
        const bottom = child.offsetTop + child.offsetHeight;
        if (bottom > contentHeight) contentHeight = bottom;
      }
      if (!contentHeight) return;
      const newPages = contentHeight / vh;
      setPages((prev) => (Math.abs(prev - newPages) > 0.2 ? newPages : prev));
    });
  }, [contentEl, vh]);

  useEffect(() => {
    if (!contentEl) return;
    measureContent();
    const ro = new ResizeObserver(measureContent);
    ro.observe(contentEl);
    const mo = new MutationObserver(measureContent);
    mo.observe(contentEl, { childList: true });
    const t1 = setTimeout(measureContent, 300);
    const t2 = setTimeout(measureContent, 1000);
    return () => {
      ro.disconnect();
      mo.disconnect();
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [contentEl, measureContent]);

  // const handleCategoryChange = useCallback((category) => {
  //   setActiveCategory(category);
  // }, [setActiveCategory]);

  return (
    <ScrollContext.Provider value={{ scrollToSection, activeSection, isMobile, mobileView, setMobileView }}>
      <div className="w-full h-full bg-bg">
        <Navbar />

        <Suspense fallback={<LoadingScreen />}>
          <Canvas
            camera={{ position: [0, 0, 6], fov: 50 }}
            dpr={IS_IOS ? [1, 1] : isMobile ? [1, 1.5] : [1, 2]}
            gl={{ antialias: !isMobile, powerPreference: "high-performance" }}
          >
            <color attach="background" args={[theme.scene.canvasBackground]} />
            <ScrollControls pages={pages} damping={0.25}>
              <ScrollBridge setScrollToSection={setScrollToSection} setActiveSection={handleActiveSection} />
              <Scroll>
                <Scene themeScene={theme.scene} showScene={!isMobile || mobileView !== "products"} />
              </Scroll>
              <Scroll html style={{ width: "100%" }}>
                <main ref={setContentEl} id="main-content" style={{ position: 'relative' }}>
                  {(!isMobile || mobileView !== "products") && (
                    <div
                      className={theme.bgPatternClass}
                      style={{ height: '100%', position: 'absolute' }}
                    />
                  )}
                  {/* Desktop: render all sections. Mobile: conditional on mobileView */}
                  {(!isMobile || mobileView === "home") && (
                    <>
                      {theme.showSeasonalBanner && <SeasonalBanner />}
                      <HeroSection
                        config={siteConfig}
                        onBrowseProducts={() => {
                          if (isMobile) {
                            setMobileView("products");
                          } else {
                            scrollToSectionRef.current("products");
                          }
                        }}
                        onCustomOrder={() => scrollToSectionRef.current("customquote")}
                      />
                      <AboutSection config={siteConfig} />
                      <HowItWorks />
                    </>
                  )}
                  {(!isMobile || mobileView === "products") && (
                    <>
                      {isMobile && (
                        <div
                          data-section="products"
                          className="flex items-center gap-3 px-5 pt-20 pb-4"
                          style={{ pointerEvents: "auto" }}
                        >
                          <button
                            type="button"
                            onClick={() => setMobileView("home")}
                            className="text-accent font-semibold text-sm flex items-center gap-1 cursor-pointer min-h-[44px]"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            Back
                          </button>
                          <h2 className="text-2xl font-bold text-accent">Our Products</h2>
                        </div>
                      )}
                      <ProductShowcase
                        onViewIn3D={setViewerProduct}
                      />
                    </>
                  )}
                  {(!isMobile || mobileView === "home") && (
                    <>
                      <TestimonialsSection />
                      <CustomOrderCTA />
                      <FAQSection />
                      <ContactSection config={siteConfig} />
                      <Footer />
                    </>
                  )}
                </main>
              </Scroll>
            </ScrollControls>
          </Canvas>
        </Suspense>

        <Suspense fallback={
          viewerProduct ? (
            <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80">
              <div className="text-center">
                <div className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-text-on-dark text-sm">Loading 3D Viewer...</p>
              </div>
            </div>
          ) : null
        }>
          <ProductViewerModal
            product={viewerProduct}
            onClose={() => setViewerProduct(null)}
          />
        </Suspense>
        <CustomCursor />
        <FloatingWhatsApp />
        <BackToTop />
      </div>
    </ScrollContext.Provider>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
