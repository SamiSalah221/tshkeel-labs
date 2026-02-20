// Shared platform detection — cached at module level (evaluated once)

const ua = typeof navigator !== "undefined" ? navigator.userAgent : "";

export const IS_IOS =
  /iPad|iPhone|iPod/.test(ua) ||
  (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);

export const IS_TOUCH =
  typeof window !== "undefined" &&
  window.matchMedia("(pointer: coarse)").matches;

export const IS_MOBILE =
  typeof window !== "undefined" &&
  window.matchMedia("(max-width: 768px)").matches;

export const IS_ANDROID = /Android/i.test(ua);
