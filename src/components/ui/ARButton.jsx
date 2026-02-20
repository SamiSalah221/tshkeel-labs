import { useState, useCallback } from "react";
import { getARSupport, getAbsoluteModelURL } from "../../utils/arHelpers";

// 3D cube icon (AR symbol)
function ARIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
    </svg>
  );
}

/**
 * Launch AR on Android via Scene Viewer intent URL.
 * No model-viewer dependency — opens directly in Google's AR viewer.
 */
function launchAndroidAR(modelUrl, productName) {
  const params = new URLSearchParams({
    file: modelUrl,
    mode: "ar_preferred",
    title: productName,
  });
  const intentUrl =
    `intent://arvr.google.com/scene-viewer/1.0?${params.toString()}` +
    `#Intent;scheme=https;package=com.google.android.googlequicksearchbox;` +
    `action=android.intent.action.VIEW;` +
    `S.browser_fallback_url=${encodeURIComponent(modelUrl)};end;`;
  window.location.href = intentUrl;
}

/**
 * Launch AR on iOS via model-viewer Quick Look (auto-generates USDZ from GLB).
 * Lazily loads model-viewer, creates a temporary element, and activates AR.
 */
async function launchIOSAR(modelUrl) {
  await import("@google/model-viewer");
  const mv = document.createElement("model-viewer");
  mv.setAttribute("src", modelUrl);
  mv.setAttribute("ar", "");
  mv.setAttribute("ar-modes", "quick-look");
  mv.setAttribute("ar-scale", "auto");
  mv.style.cssText = "position:fixed;top:0;left:0;width:1px;height:1px;opacity:0;pointer-events:none;";
  document.body.appendChild(mv);
  // Wait for model-viewer to initialise and check AR support
  await new Promise((r) => setTimeout(r, 500));
  if (mv.canActivateAR) mv.activateAR();
  // Clean up after user returns from AR
  setTimeout(() => mv.remove(), 10000);
}

export default function ARButton({ product }) {
  const [launching, setLaunching] = useState(false);
  const arSupport = getARSupport(product);

  const handleLaunch = useCallback(() => {
    if (launching) return;
    const modelUrl = getAbsoluteModelURL(product.modelPath);

    if (arSupport.platform === "android") {
      launchAndroidAR(modelUrl, product.name);
    } else if (arSupport.platform === "ios") {
      setLaunching(true);
      launchIOSAR(modelUrl)
        .catch(() => {})
        .finally(() => setLaunching(false));
    }
    // Desktop: no-op (button shows but AR not available)
  }, [launching, arSupport.platform, product]);

  // No GLB model or STL — don't render
  if (!arSupport.supported) return null;

  const isDesktop = arSupport.platform === "desktop";

  return (
    <button
      type="button"
      onClick={handleLaunch}
      disabled={launching || isDesktop}
      className="hover:text-accent transition-colors p-2 cursor-pointer"
      style={{ color: launching ? "var(--color-accent)" : isDesktop ? "#aaa" : "#333", cursor: isDesktop ? "default" : "pointer" }}
      title={isDesktop ? "AR — available on mobile devices" : "View in your room (AR)"}
    >
      {launching ? (
        <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <circle cx="12" cy="12" r="10" strokeDasharray="32" strokeDashoffset="8" />
        </svg>
      ) : (
        <ARIcon className="w-5 h-5" />
      )}
    </button>
  );
}
