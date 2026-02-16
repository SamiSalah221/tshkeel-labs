import { Suspense, useState, useEffect, useContext, useCallback } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import { ThemeContext } from "../../contexts/ThemeContext";
import ModelLoader from "../three/ModelLoader";

export default function ProductViewerModal({ product, onClose }) {
  const { theme } = useContext(ThemeContext);
  // Zone-based color state (for GLB models)
  const [zones, setZones] = useState([]);
  const [activeZone, setActiveZone] = useState(null);
  const [zoneColors, setZoneColors] = useState({});
  // Single-color state (for STL/placeholder models)
  const [selectedColor, setSelectedColor] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);

  const isGLB = product?.modelType === "glb" || product?.modelType === "gltf";

  // Reset all color state when product changes
  useEffect(() => {
    setZones([]);
    setActiveZone(null);
    setZoneColors({});
    setSelectedColor(null);
    setActiveCategory(null);
  }, [product]);

  // Callback for GLBModel to report detected zones
  const handleZonesDetected = useCallback((detectedZones) => {
    setZones(detectedZones);
  }, []);

  // Escape key to close
  useEffect(() => {
    if (!product) return;
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [product, onClose]);

  if (!product) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center"
      onClick={onClose}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

      {/* Modal content */}
      <div
        className="relative w-[90vw] h-[80vh] max-w-4xl border border-accent/30 rounded-2xl overflow-hidden"
        style={{ background: "#e8e4df" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="absolute top-0 inset-x-0 z-10 flex items-center justify-between px-6 py-4" style={{ background: "linear-gradient(to bottom, rgba(232,228,223,0.95), transparent)" }}>
          <div>
            <h3 className="font-bold text-xl" style={{ color: "#1a1a1a" }}>{product.name}</h3>
            <p className="text-sm" style={{ color: "#555" }}>
              {product.currency}{product.price}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="hover:text-accent transition-colors p-2 cursor-pointer"
            style={{ color: "#333" }}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* 3D Viewer - separate Canvas */}
        <Canvas
          camera={{ position: [0, 0, 4], fov: 50 }}
          dpr={[1, 2]}
        >
          <ambientLight intensity={0.5} color={theme.scene.lightColors.ambient} />
          <directionalLight position={[5, 8, 5]} intensity={1.4} color={theme.scene.lightColors.warm} />
          <directionalLight position={[-3, 4, -5]} intensity={0.4} color={theme.scene.lightColors.cool} />
          <directionalLight position={[0, -3, 3]} intensity={0.2} color={theme.scene.lightColors.accent} />
          <color attach="background" args={["#e8e4df"]} />
          <Environment preset="apartment" />
          <Suspense fallback={
            <mesh>
              <sphereGeometry args={[1, 16, 16]} />
              <meshBasicMaterial color="#C9A84C" wireframe />
            </mesh>
          }>
            <group scale={product.scale}>
              <ModelLoader
                product={product}
                colorOverride={isGLB ? undefined : selectedColor}
                zoneColors={isGLB ? zoneColors : undefined}
                onZonesDetected={isGLB ? handleZonesDetected : undefined}
              />
            </group>
          </Suspense>
          <OrbitControls
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            minDistance={1}
            maxDistance={10}
            autoRotate
            autoRotateSpeed={2}
          />
        </Canvas>

        {/* Color picker — zone-based for GLB, single-color for STL */}
        {product.colorOptions && product.colorOptions.length > 0 && (
          <div className="absolute bottom-12 inset-x-0 z-10 px-4" style={{ pointerEvents: "none" }}>
            {isGLB && zones.length > 1 ? (
              /* Zone-based picker for multi-color GLB models */
              <div style={{ pointerEvents: "auto" }} className="flex flex-col items-center gap-2">
                {/* Row 1: Zone swatches */}
                <div className="flex justify-center items-center gap-2 flex-wrap">
                  <span className="text-xs mr-1" style={{ color: "#333" }}>Zones:</span>
                  {zones.map((zone) => (
                    <button
                      type="button"
                      key={zone.hex}
                      onClick={() => { setActiveZone(activeZone === zone.hex ? null : zone.hex); setActiveCategory(null); }}
                      title={`Zone: ${zone.hex} (${zone.count} parts)`}
                      className="cursor-pointer transition-transform"
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: "50%",
                        background: zoneColors[zone.hex] || zone.hex,
                        border: activeZone === zone.hex
                          ? "3px solid var(--color-accent)"
                          : "2px solid rgba(0,0,0,0.25)",
                        boxShadow: activeZone === zone.hex ? "0 0 10px var(--color-accent)" : "none",
                        transform: activeZone === zone.hex ? "scale(1.2)" : "scale(1)",
                        flexShrink: 0,
                      }}
                    />
                  ))}
                  <button
                    type="button"
                    onClick={() => { setZoneColors({}); setActiveZone(null); setActiveCategory(null); }}
                    title="Reset All Colors"
                    className="cursor-pointer text-xs px-2 py-1 rounded hover:border-accent/60 transition-colors ml-1"
                    style={{ color: "#333", border: "1px solid rgba(0,0,0,0.25)" }}
                  >
                    Reset
                  </button>
                </div>
                {/* Row 2: Category chips — only when a zone is active */}
                {activeZone && (
                  <div className="flex justify-center items-center gap-1.5 flex-wrap">
                    <button
                      type="button"
                      onClick={() => {
                        setZoneColors((prev) => {
                          const next = { ...prev };
                          delete next[activeZone];
                          return next;
                        });
                        setActiveCategory(null);
                      }}
                      title="Original Color"
                      className="cursor-pointer"
                      style={{
                        width: 26,
                        height: 26,
                        borderRadius: "50%",
                        border: !zoneColors[activeZone] ? "3px solid var(--color-accent)" : "2px solid rgba(0,0,0,0.2)",
                        background: "conic-gradient(red, yellow, lime, aqua, blue, magenta, red)",
                        flexShrink: 0,
                      }}
                    />
                    {product.colorOptions.map((cat) => (
                      <button
                        type="button"
                        key={cat.category}
                        onClick={() => setActiveCategory(activeCategory === cat.category ? null : cat.category)}
                        className="cursor-pointer text-xs px-2 py-1 rounded-full transition-colors"
                        style={{
                          background: activeCategory === cat.category ? "var(--color-accent)" : "rgba(0,0,0,0.08)",
                          color: activeCategory === cat.category ? "#fff" : "#333",
                          border: "1px solid " + (activeCategory === cat.category ? "var(--color-accent)" : "rgba(0,0,0,0.15)"),
                        }}
                      >
                        {cat.category}
                      </button>
                    ))}
                  </div>
                )}
                {/* Row 3: Specific colors in selected category */}
                {activeZone && activeCategory && (
                  <div className="flex justify-center items-center gap-2 flex-wrap">
                    {product.colorOptions
                      .find((cat) => cat.category === activeCategory)
                      ?.colors.map((opt) => (
                        <button
                          type="button"
                          key={opt.hex}
                          onClick={() => setZoneColors((prev) => ({ ...prev, [activeZone]: opt.hex }))}
                          title={opt.name}
                          className="cursor-pointer"
                          style={{
                            width: 28,
                            height: 28,
                            borderRadius: "50%",
                            background: opt.transparent
                              ? "repeating-conic-gradient(#ccc 0% 25%, #fff 0% 50%) 50%/12px 12px"
                              : opt.hex,
                            border: zoneColors[activeZone] === opt.hex
                              ? "3px solid var(--color-accent)"
                              : "2px solid rgba(0,0,0,0.2)",
                            boxShadow: zoneColors[activeZone] === opt.hex ? "0 0 8px var(--color-accent)" : "none",
                            flexShrink: 0,
                          }}
                        />
                      ))}
                  </div>
                )}
              </div>
            ) : (
              /* Single-color picker for STL models or single-zone GLBs */
              <div style={{ pointerEvents: "auto" }} className="flex flex-col items-center gap-2">
                {/* Category chips + Original button */}
                <div className="flex justify-center items-center gap-1.5 flex-wrap">
                  <button
                    type="button"
                    onClick={() => {
                      if (isGLB && zones.length === 1) {
                        setZoneColors({});
                      } else {
                        setSelectedColor(null);
                      }
                      setActiveCategory(null);
                    }}
                    title="Original"
                    className="cursor-pointer"
                    style={{
                      width: 26,
                      height: 26,
                      borderRadius: "50%",
                      border: (isGLB && zones.length === 1 ? !zoneColors[zones[0]?.hex] : selectedColor === null) ? "3px solid var(--color-accent)" : "2px solid rgba(0,0,0,0.2)",
                      background: "conic-gradient(red, yellow, lime, aqua, blue, magenta, red)",
                      flexShrink: 0,
                    }}
                  />
                  {product.colorOptions.map((cat) => (
                    <button
                      type="button"
                      key={cat.category}
                      onClick={() => setActiveCategory(activeCategory === cat.category ? null : cat.category)}
                      className="cursor-pointer text-xs px-2 py-1 rounded-full transition-colors"
                      style={{
                        background: activeCategory === cat.category ? "var(--color-accent)" : "rgba(0,0,0,0.08)",
                        color: activeCategory === cat.category ? "#fff" : "#333",
                        border: "1px solid " + (activeCategory === cat.category ? "var(--color-accent)" : "rgba(0,0,0,0.15)"),
                      }}
                    >
                      {cat.category}
                    </button>
                  ))}
                </div>
                {/* Specific colors in selected category */}
                {activeCategory && (
                  <div className="flex justify-center items-center gap-2 flex-wrap">
                    {product.colorOptions
                      .find((cat) => cat.category === activeCategory)
                      ?.colors.map((opt) => (
                        <button
                          type="button"
                          key={opt.hex}
                          onClick={() => {
                            if (isGLB && zones.length === 1) {
                              setZoneColors({ [zones[0].hex]: opt.hex });
                            } else {
                              setSelectedColor(opt.hex);
                            }
                          }}
                          title={opt.name}
                          className="cursor-pointer"
                          style={{
                            width: 28,
                            height: 28,
                            borderRadius: "50%",
                            background: opt.transparent
                              ? "repeating-conic-gradient(#ccc 0% 25%, #fff 0% 50%) 50%/12px 12px"
                              : opt.hex,
                            border: (isGLB && zones.length === 1 ? zoneColors[zones[0]?.hex] === opt.hex : selectedColor === opt.hex)
                              ? "3px solid var(--color-accent)"
                              : "2px solid rgba(0,0,0,0.2)",
                            boxShadow: (isGLB && zones.length === 1 ? zoneColors[zones[0]?.hex] === opt.hex : selectedColor === opt.hex) ? "0 0 8px var(--color-accent)" : "none",
                            flexShrink: 0,
                          }}
                        />
                      ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Footer instructions */}
        <div className="absolute bottom-0 inset-x-0 z-10 text-center py-3" style={{ background: "linear-gradient(to top, rgba(232,228,223,0.95), transparent)" }}>
          <p className="text-xs" style={{ color: "#555" }}>
            Drag to rotate &middot; Scroll to zoom &middot; Right-click to pan
          </p>
        </div>
      </div>
    </div>
  );
}
