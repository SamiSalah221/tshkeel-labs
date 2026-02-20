import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { productsByCategory } from "../../config/products";
import ProductCard from "./ProductCard";
// import CategoryTabs from "./CategoryTabs";
import RevealOnScroll from "../ui/RevealOnScroll";

const SORT_OPTIONS = [
  { value: "default", label: "Default" },
  { value: "low-high", label: "Price: Low to High" },
  { value: "high-low", label: "Price: High to Low" },
];

export default function ProductShowcase({
  onViewIn3D,
  // activeCategory,
  // setActiveCategory,
  // themeLabel,
}) {
  const [sortBy, setSortBy] = useState("default");

  const products = useMemo(() => {
    const items = productsByCategory["islamic"] || [];
    const sorted = [...items].sort((a, b) => {
      const ap = a.badge ? 2 : a.featured ? 1 : 0;
      const bp = b.badge ? 2 : b.featured ? 1 : 0;
      return bp - ap;
    });
    if (sortBy === "low-high") return sorted.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    if (sortBy === "high-low") return sorted.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
    return sorted;
  }, [sortBy]);

  return (
    <section
      data-section="products"
      aria-label="Our Products"
      className="px-5 md:px-12 py-4 md:py-6"
      style={{ pointerEvents: "none" }}
    >
      <div style={{ pointerEvents: "auto" }}>
        <RevealOnScroll>
          <h2 className="text-4xl md:text-5xl font-bold text-accent text-center mb-4">
            Our Products
          </h2>
          <div className="verse-band mb-8">&#x2726; &#x066D; &#x2726;</div>
        </RevealOnScroll>

        {/* Sort control */}
        <div style={{ maxWidth: "var(--max-w-content)", margin: "0 auto 1rem", display: "flex", justifyContent: "flex-end" }}>
          <label style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span style={{ color: "#94A3B8", fontSize: "0.875rem", fontWeight: 500 }}>Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{
                background: "rgba(255,255,255,0.9)",
                border: "1px solid rgba(201,168,76,0.3)",
                borderRadius: "0.5rem",
                padding: "0.375rem 0.75rem",
                fontSize: "0.875rem",
                color: "#1E293B",
                cursor: "pointer",
                outline: "none",
              }}
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </label>
        </div>

        {/* <div data-section="producttabs">
          <CategoryTabs
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            themeLabel={themeLabel}
          />
        </div> */}

        <div
          // role="tabpanel"
          // id="product-tabpanel"
          // aria-labelledby={`tab-${activeCategory}`}
          style={{
            maxWidth: "var(--max-w-content)",
            margin: "0 auto",
          }}
        >
          {products.length === 0 ? (
            <p className="text-text-muted text-center py-12">
              No products found.
            </p>
          ) : (
            <AnimatePresence mode="popLayout">
              <motion.div
                key="islamic"
                style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1.25rem" }}
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
                  exit: { opacity: 0, transition: { duration: 0.15 } },
                }}
              >
                {products.map((product) => (
                  <motion.div
                    key={product.id}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0 },
                      exit: { opacity: 0, transition: { duration: 0 } },
                    }}
                    transition={{
                      duration: 0.3,
                      ease: [0.25, 0.1, 0.25, 1],
                    }}
                  >
                    <ProductCard product={product} onViewIn3D={onViewIn3D} />
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </div>
    </section>
  );
}
