import { Suspense, useState, useEffect, useRef, useContext, useCallback, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import { ThemeContext } from "../../contexts/ThemeContext";
import ModelLoader from "../three/ModelLoader";
import ARButton from "./ARButton";

export default function ProductViewerModal({ product, onClose }) {
  const { theme } = useContext(ThemeContext);
  // Zone-based color state (for GLB models)
  const [zones, setZones] = useState([]);
  const [activeZone, setActiveZone] = useState(null);
  const [zoneColors, setZoneColors] = useState({});
  // Single-color state (for STL/placeholder models)
  const [selectedColor, setSelectedColor] = useState(null);
  // Rotation toggle
  const [autoRotate, setAutoRotate] = useState(true);
  // Dimensions view toggle
  const [showDimensions, setShowDimensions] = useState(false);
  const controlsRef = useRef();

  // Reset camera to front-on when entering dimensions mode
  useEffect(() => {
    if (showDimensions && controlsRef.current) {
      controlsRef.current.reset();
    }
  }, [showDimensions]);

  const isGLB = product?.modelType === "glb" || product?.modelType === "gltf";

  // Flatten all color options into a single array (no categories)
  const allColors = useMemo(() => {
    if (!product?.colorOptions) return [];
    return product.colorOptions.flatMap((cat) => cat.colors);
  }, [product]);

  // Reset all color state when product changes
  useEffect(() => {
    setZones([]);
    setActiveZone(null);
    setZoneColors({});
    setSelectedColor(null);
    setAutoRotate(true);
    setShowDimensions(false);
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
            {product.viewerNote && (
              <p className="text-xs mt-1" style={{ color: "#888", fontStyle: "italic" }}>
                {product.viewerNote}
              </p>
            )}
          </div>
          <div className="flex items-center gap-1">
            {/* Rotation toggle */}
            <button
              type="button"
              onClick={() => setAutoRotate((prev) => !prev)}
              className="hover:text-accent transition-colors p-2 cursor-pointer"
              style={{ color: "#333" }}
              title={autoRotate ? "Pause rotation" : "Resume rotation"}
            >
              {autoRotate ? (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <rect x="6" y="4" width="4" height="16" rx="1" />
                  <rect x="14" y="4" width="4" height="16" rx="1" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>
            {/* Dimensions toggle */}
            {product.dimensions && (
              <button
                type="button"
                onClick={() => setShowDimensions((prev) => !prev)}
                className="hover:text-accent transition-colors p-2 cursor-pointer"
                style={{ color: showDimensions ? "var(--color-accent)" : "#333" }}
                title={showDimensions ? "Hide dimensions" : "View dimensions"}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 21h18M3 21V3m0 18l4-4m-4-3l4-4m-4-3l4-4M21 3H3m18 0v18m0-18l-4 4m4 3l-4 4m4 3l-4 4" />
                </svg>
              </button>
            )}
            {/* AR button */}
            <ARButton product={product} />
            {/* Close button */}
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
            <ModelLoader
              product={product}
              colorOverride={isGLB ? undefined : selectedColor}
              zoneColors={isGLB ? zoneColors : undefined}
              onZonesDetected={isGLB ? handleZonesDetected : undefined}
              activeZone={isGLB ? activeZone : undefined}
              showDimensions={showDimensions}
            />
          </Suspense>
          <OrbitControls
            ref={controlsRef}
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            minDistance={1}
            maxDistance={10}
            autoRotate={autoRotate && !showDimensions}
            autoRotateSpeed={2}
          />
        </Canvas>

        {/* Color picker — zone-based for GLB, single-color for STL */}
        {allColors.length > 0 && (
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
                      onClick={() => setActiveZone(activeZone === zone.hex ? null : zone.hex)}
                      title={zone.name ? `${zone.name} (${zone.count} parts)` : `Zone: ${zone.hex} (${zone.count} parts)`}
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
                    onClick={() => { setZoneColors({}); setActiveZone(null); }}
                    title="Reset All Colors"
                    className="cursor-pointer text-xs px-2 py-1 rounded hover:border-accent/60 transition-colors ml-1"
                    style={{ color: "#333", border: "1px solid rgba(0,0,0,0.25)" }}
                  >
                    Reset
                  </button>
                </div>
                {/* Row 2: All color swatches — shown when a zone is active */}
                {activeZone && (
                  <div className="flex justify-center items-center gap-2 flex-wrap">
                    {allColors.map((opt) => (
                      <button
                        type="button"
                        key={opt.hex}
                        onClick={() => {
                          setZoneColors((prev) => ({ ...prev, [activeZone]: opt.hex }));
                          setActiveZone(null);
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
                {/* All color swatches in a flat grid */}
                <div className="flex justify-center items-center gap-2 flex-wrap">
                  {allColors.map((opt) => (
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
                {/* Reset button */}
                <button
                  type="button"
                  onClick={() => {
                    if (isGLB && zones.length === 1) {
                      setZoneColors({});
                    } else {
                      setSelectedColor(null);
                    }
                  }}
                  title="Reset to original color"
                  className="cursor-pointer text-xs px-2 py-1 rounded hover:border-accent/60 transition-colors"
                  style={{ color: "#333", border: "1px solid rgba(0,0,0,0.25)" }}
                >
                  Reset
                </button>
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
