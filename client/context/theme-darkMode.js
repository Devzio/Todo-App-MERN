import { createContext, useState, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useEffect } from "react";

const ThemeContext = createContext();

export const useTheme_darkMode = () => useContext(ThemeContext);

export function ThemeProvider_darkMode({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const getTheme_dark = async () => {
      try {
        const storedTheme_dark = await AsyncStorage.getItem("isDarkMode");
        const parsedTheme = storedTheme_dark ? JSON.parse(storedTheme_dark) : false;
        setIsDarkMode(parsedTheme);
      } catch (error) {
        console.error("Error loading theme:", error);
      }
    };
    getTheme_dark();
  }, []);

  return (
    <ThemeContext.Provider value={{ isDarkMode, setIsDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
}