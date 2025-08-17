// ThemeContext.js (or directly in your root component)
import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check localStorage or system preference
    const savedMode = localStorage.getItem("darkMode");
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setIsDarkMode(savedMode ? JSON.parse(savedMode) : systemPrefersDark);
  }, []);

  useEffect(() => {
    // Apply dark mode class
    document.documentElement.classList.toggle("dark", isDarkMode);
    localStorage.setItem("darkMode", JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  return (
    <ThemeContext.Provider value={{ isDarkMode, setIsDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);