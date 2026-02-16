import { createContext, useState, useCallback } from "react";
import { THEMES, DEFAULT_THEME } from "../config/themes";

const islamicTheme = THEMES.islamic;

export const ThemeContext = createContext({
  activeCategory: DEFAULT_THEME,
  setActiveCategory: () => {},
  theme: THEMES[DEFAULT_THEME],
  islamicTheme,
});

export function ThemeProvider({ children }) {
  const [activeCategory, setActiveCategoryState] = useState(DEFAULT_THEME);

  const theme = THEMES[activeCategory];

  const setActiveCategory = useCallback((category) => {
    if (!THEMES[category]) return;
    setActiveCategoryState(category);
  }, []);

  return (
    <ThemeContext.Provider value={{ activeCategory, setActiveCategory, theme, islamicTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
