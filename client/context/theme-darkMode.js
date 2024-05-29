import { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ThemeDarkModeContext = createContext();

export const useTheme_darkMode = () => useContext(ThemeDarkModeContext);

export function ThemeDarkModeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const getDarkMode = async () => {
      try {
        const storedDarkMode = await AsyncStorage.getItem("isDarkMode");
        const parsedDarkMode = storedDarkMode ? JSON.parse(storedDarkMode) : false;
        setIsDarkMode(parsedDarkMode);
      } catch (error) {
        console.error("Error loading dark mode:", error);
      }
    };
    getDarkMode();
  }, []);

  return (
    <ThemeDarkModeContext.Provider value={{ isDarkMode, setIsDarkMode }}>
      {children}
    </ThemeDarkModeContext.Provider>
  );
}
