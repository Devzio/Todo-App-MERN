// screens/SettingsScreen.js
import { Text, Switch, View, StyleSheet } from "react-native";
import { GlobalLayout } from "../components/Layout";
import { useTheme } from "../context/theme";
import { GlobalStyles } from "../styles/global";

// import { useTheme_darkMode } from "../context/theme-darkMode";
// import { GlobalStyles_darkMode } from "../styles/global-darkMode";

import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SettingsScreen() {
  const { isLargeText, setIsLargeText } = useTheme();
  const globalStyles = GlobalStyles();

  // const { isDarkMode, setIsDarkMode } = useTheme_darkMode();
  // const globalStyles_darkMode = GlobalStyles_darkMode();

  return (
    <GlobalLayout>
      <View style={styles.view}>
        <Text style={globalStyles.text}>Large Text</Text>
        <Switch
          value={isLargeText}
          onValueChange={async () => {
            await AsyncStorage.setItem(
              "isLargeText",
              JSON.stringify(!isLargeText)
            );
            setIsLargeText(!isLargeText);
          }}
          trackColor={{ false: "#767577", true: "#81b0ff" }}
        />
      </View>
      {/* <View style={styles.view}>
        <Text style={globalStyles_darkMode.text}>Dark Mode</Text>
        <Switch
          value={isDarkMode}
          onValueChange={async () => {
            await AsyncStorage.setItem(
              "isDarkMode",
              JSON.stringify(!isDarkMode)
            );
            setIsDarkMode(!isDarkMode);
          }}
          trackColor={{ false: "#767577", true: "#81b0ff" }}
        />
      </View> */}
    </GlobalLayout>
  );
}

const styles = StyleSheet.create({
  view: {
    paddingLeft: 20,
    paddingRight: 20,
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
});
