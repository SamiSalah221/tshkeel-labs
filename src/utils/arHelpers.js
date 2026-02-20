import { IS_IOS, IS_ANDROID } from "./platform";

/**
 * Check if the current device + product combination supports AR.
 * - Android Chrome: Scene Viewer (GLB only)
 * - iOS Safari: Quick Look (model-viewer auto-generates USDZ from GLB)
 * - Desktop / STL: not supported
 */
export function getARSupport(product) {
  if (!product.modelPath || product.modelType === "stl") {
    return { supported: false, reason: "no-glb" };
  }
  if (IS_ANDROID) {
    return { supported: true, platform: "android" };
  }
  if (IS_IOS) {
    return { supported: true, platform: "ios" };
  }
  // Desktop: button renders but AR launch is unavailable
  return { supported: true, platform: "desktop" };
}

/**
 * Convert a relative model path to an absolute URL
 * (Scene Viewer needs a fully-qualified HTTPS URL).
 */
export function getAbsoluteModelURL(modelPath) {
  if (modelPath.startsWith("http")) return modelPath;
  return `${window.location.origin}${modelPath}`;
}
