import { StyleSheet } from "react-native";
import { useTheme_darkMode } from "../context/theme-darkMode";

export function GlobalStyles_darkMode() {
  const { isDarkMode } = useTheme_darkMode();

  const styles = StyleSheet.create({
    text: {
      backgroundColor: isDarkMode ? '#000' : '#fff',
      color: isDarkMode ? '#fff' : '#000', // Assuming you want text to be visible on background
    },
  });

  return styles;
}
