// ThemeProvider/ThemeProvider.jsx
import { useState, useEffect } from "react";
import ThemeContext from "./ThemeContext";


const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedMode = localStorage.getItem("darkMode");
      if (savedMode !== null) {
        return JSON.parse(savedMode);
      }
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return false;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add("dark");
      root.style.setProperty('--color-primary', '#60a5fa');
      root.style.setProperty('--color-secondary', '#fbbf24');
      root.style.setProperty('--color-background', '#1a1a1a');
      root.style.setProperty('--color-foreground', '#ffffff');
    } else {
      root.classList.remove("dark");
      root.style.setProperty('--color-primary', '#3b82f6');
      root.style.setProperty('--color-secondary', '#f59e0b');
      root.style.setProperty('--color-background', '#ffffff');
      root.style.setProperty('--color-foreground', '#1a1a1a');
    }
    localStorage.setItem("darkMode", JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  return (
    <ThemeContext.Provider value={{ isDarkMode, setIsDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;