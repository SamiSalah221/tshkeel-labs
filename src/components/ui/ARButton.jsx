import { useRef, useState, useEffect, useCallback } from "react";
import { getARSupport, getAbsoluteModelURL } from "../../utils/arHelpers";

// Lazy-load model-viewer web component (only on first AR button mount)
let mvLoaded = false;
function ensureModelViewer() {
  if (mvLoaded) return Promise.resolve();
  mvLoaded = true;
  return import("@google/model-viewer");
}

// 3D cube icon (AR symbol)
function ARIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
    </svg>
  );
}

export default function ARButton({ product }) {
  const [status, setStatus] = useState("checking"); // checking | available | unavailable | launching
  const mvRef = useRef(null);
  const arSupport = getARSupport(product);

  useEffect(() => {
    if (!arSupport.supported) {
      setStatus("unavailable");
      return;
    }
    ensureModelViewer()
      .then(() => setStatus("available"))
      .catch(() => setStatus("unavailable"));
  }, [arSupport.supported]);

  const handleLaunch = useCallback(() => {
    if (status !== "available") return;
    setStatus("launching");

    const mv = mvRef.current;
    if (mv && mv.canActivateAR) {
      mv.activateAR();
    }
    // Reset after a delay (user returns from AR)
    setTimeout(() => setStatus("available"), 3000);
  }, [status]);

  // Desktop or STL product — don't render
  if (!arSupport.supported) return null;

  // Mobile with GLB — functional AR button (Android: Scene Viewer, iOS: Quick Look)
  return (
    <>
      <button
        type="button"
        onClick={handleLaunch}
        disabled={status === "launching" || status === "checking"}
        className="hover:text-accent transition-colors p-2 cursor-pointer"
        style={{ color: status === "launching" ? "var(--color-accent)" : "#333" }}
        title="View in your room (AR)"
      >
        {status === "launching" ? (
          <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <circle cx="12" cy="12" r="10" strokeDasharray="32" strokeDashoffset="8" />
          </svg>
        ) : (
          <ARIcon className="w-5 h-5" />
        )}
      </button>

      {/* Hidden model-viewer for AR activation only */}
      <div style={{ position: "absolute", width: 0, height: 0, overflow: "hidden", pointerEvents: "none" }}>
        <model-viewer
          ref={mvRef}
          src={getAbsoluteModelURL(product.modelPath)}
          ios-src={product.usdzPath || undefined}
          ar
          ar-modes="scene-viewer webxr quick-look"
          ar-scale="auto"
          style={{ width: "1px", height: "1px" }}
        />
      </div>
    </>
  );
}
