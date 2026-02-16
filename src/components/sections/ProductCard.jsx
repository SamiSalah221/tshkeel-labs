import { useState, useRef, useCallback, useMemo } from "react";
import { siteConfig } from "../../config/siteConfig";
import ProductIllustration from "./ProductIllustration";

export default function ProductCard({ product, onViewIn3D }) {
  const isTouchDevice = useMemo(() => typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches, []);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0, glareX: 50, glareY: 50 });
  const [isHovered, setIsHovered] = useState(false);
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

  const handleOrderNow = () => {
    const message = `Assalamu Alaikum! I'm interested in ordering: ${product.name} (${product.currency}${product.price})`;
    const url = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <article
      ref={cardRef}
      onMouseMove={isTouchDevice ? undefined : handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { handleMouseLeave(); setIsHovered(false); }}
      className="bg-bg-card/85 backdrop-blur-md border border-accent/25 rounded-2xl shadow-lg shadow-black/10 product-card-hover"
      style={{
        display: "flex",
        flexDirection: "column",
        transform: `perspective(800px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) translateY(${isHovered ? -6 : 0}px)`,
        transition: tilt.rotateX === 0 && tilt.rotateY === 0 ? "transform 0.5s ease, box-shadow 0.3s ease" : "box-shadow 0.3s ease",
        willChange: "transform",
        transformStyle: "preserve-3d",
        position: "relative",
        overflow: "hidden",
        borderTop: `${product.featured ? 4 : 3}px solid ${product.color}`,
        boxShadow: isHovered
          ? `0 20px 40px rgba(0,0,0,0.15), 0 0 20px ${product.color}20`
          : product.featured
          ? `0 4px 16px rgba(0,0,0,0.1), 0 0 16px ${product.color}15`
          : undefined,
      }}
    >
      {/* Glare overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(circle at ${tilt.glareX}% ${tilt.glareY}%, rgba(255,255,255,0.15) 0%, transparent 60%)`,
          pointerEvents: "none",
          borderRadius: "inherit",
        }}
      />

      {/* Featured badge */}
      {product.featured && (
        <div
          style={{
            position: "absolute",
            top: 12,
            right: 12,
            background: "linear-gradient(135deg, var(--color-accent) 0%, var(--color-accent-light) 100%)",
            color: "var(--color-primary-dark)",
            padding: "5px 12px",
            borderRadius: 20,
            fontSize: "0.7rem",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
            zIndex: 10,
          }}
        >
          Featured
        </div>
      )}

      {/* Product image or illustration fallback */}
      <div
        className="flex items-center justify-center"
        style={{
          aspectRatio: "3 / 2",
          background: `linear-gradient(135deg, color-mix(in srgb, var(--color-primary) 6%, transparent) 0%, color-mix(in srgb, var(--color-accent) 6%, transparent) 100%)`,
          borderBottom: "1px solid color-mix(in srgb, var(--color-accent) 20%, transparent)",
          overflow: "hidden",
        }}
      >
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        ) : (
          <div style={{ width: "70%", height: "80%" }}>
            <ProductIllustration productId={product.id} />
          </div>
        )}
      </div>

      <div className="p-5" style={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
        {/* Category badge + Customizable tag */}
        <div className="flex items-center gap-2 mb-2 flex-wrap">
          {product.category && (
            <span
              className="inline-block text-xs uppercase tracking-wider font-semibold rounded-full px-2.5 py-0.5"
              style={{
                color: product.color,
                background: `${product.color}15`,
                border: `1px solid ${product.color}30`,
              }}
            >
              {product.category}
            </span>
          )}
          {product.colorOptions && product.colorOptions.length > 0 && (
            <span
              className="inline-block text-xs uppercase tracking-wider font-semibold rounded-full px-2.5 py-0.5"
              style={{
                color: "var(--color-accent)",
                background: "rgba(201, 168, 76, 0.1)",
                border: "1px solid rgba(201, 168, 76, 0.25)",
              }}
            >
              Customizable
            </span>
          )}
        </div>

        <h3 className="text-xl md:text-2xl font-bold text-accent mb-2">
          {product.name}
        </h3>

        <div className="w-full h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent my-2"></div>

        <p className="text-text-muted text-sm leading-relaxed mb-4" style={{ flexGrow: 1 }}>
          {product.description}
        </p>

        <div className="flex items-center justify-between gap-3" style={{ flexWrap: "wrap" }}>
          <span className="text-2xl font-bold text-accent-dark">
            {product.currency}
            {product.price}
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onViewIn3D(product)}
              className="btn btn-sm btn-secondary"
            >
              View in 3D
            </button>
            <button
              type="button"
              onClick={handleOrderNow}
              className="btn btn-sm btn-primary"
            >
              Order Now
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
