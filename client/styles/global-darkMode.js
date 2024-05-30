import { StyleSheet } from "react-native";
import { useTheme_darkMode } from "../context/theme-darkMode";

export function GlobalStyles_darkMode() {
  const { isDarkMode } = useTheme_darkMode();

  const styles = StyleSheet.create({
    text: {
      color: isDarkMode ? "#ffffff" : "#000000",
    },
    background: {
      backgroundColor: isDarkMode ? "#000000" : "#ffffff",
    },
    background_settings: {
      backgroundColor: isDarkMode ? "#333" : "#fff",
    },
    button: {
      backgroundColor: isDarkMode ? "#09c1bd" : "#12747c",
    },
    buttonText: {
      color: isDarkMode ? "#000000" : "#ffffff",
    },
    inputText: {
      color: isDarkMode ? "#ffffff" : "#000000",
      borderColor: isDarkMode ? "#ccc" : "#A7A7A7",
    },
    dateTimePicker: {
      backgroundColor: isDarkMode ? "#333" : "#fff",
      color: isDarkMode ? "#ccc" : "#A7A7A7",
    },
  });

  return styles;
}
