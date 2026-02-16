import { createContext } from "react";

export const ScrollContext = createContext({
  scrollToSection: () => {},
  activeSection: "hero",
});
