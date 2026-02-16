import { motion, AnimatePresence } from "framer-motion";

const TAB_CONFIG = [
  { id: "islamic", label: "Islamic" },
  { id: "nerdy", label: "Nerdy" },
  { id: "flags", label: "Flags" },
];

export default function CategoryTabs({ activeCategory, setActiveCategory, themeLabel }) {

  return (
    <div className="flex flex-col items-center mb-6">
      <div
        role="tablist"
        aria-label="Product categories"
        className="inline-flex gap-2 bg-primary-dark/30 backdrop-blur-sm rounded-full p-1.5 border border-accent/20"
      >
        {TAB_CONFIG.map((tab) => {
          const isActive = activeCategory === tab.id;
          return (
            <button
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls="product-tabpanel"
              id={`tab-${tab.id}`}
              key={tab.id}
              onClick={() => setActiveCategory(tab.id)}
              className={`
                relative px-3 py-2.5 min-h-[44px] rounded-full text-sm font-semibold cursor-pointer
                transition-colors duration-300
                ${isActive
                  ? "bg-accent text-primary-dark"
                  : "text-text-on-dark/80 hover:text-accent"
                }
              `}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.p
          key={activeCategory}
          className="text-accent/70 text-sm mt-3 tracking-wider uppercase"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
        >
          {themeLabel}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}
