// ThemeToggle.jsx
import { useTheme } from "./ThemeContext";

export const ThemeToggle = () => {
  const { isDarkMode, setIsDarkMode } = useTheme();

  return (
    <button
      onClick={() => setIsDarkMode(!isDarkMode)}
      className="p-2 rounded-full bg-gray-200 dark:bg-gray-700"
    >
      {isDarkMode ? "☀️ Light" : "🌙 Dark"}
    </button>
  );
};