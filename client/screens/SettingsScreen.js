import AsyncStorage from "@react-native-async-storage/async-storage";
import { Text, Switch, View, StyleSheet, Button } from "react-native";
import { GlobalLayout } from "../components/Layout";
import { useTheme } from "../context/theme";
import { GlobalStyles } from "../styles/global";
import { useTheme_darkMode } from "../context/theme-darkMode";
import { GlobalStyles_darkMode } from "../styles/global-darkMode";
import { TouchableOpacity } from "react-native-gesture-handler";
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function SettingsScreen({ navigation }) {
  const { isLargeText, setIsLargeText } = useTheme();
  const globalStyles = GlobalStyles();
  const globalStyles_darkMode = GlobalStyles_darkMode();
  const { isDarkMode, setIsDarkMode } = useTheme_darkMode();

  const handleLogout = () => {
    navigation.navigate('Login', { screen: 'LoginScreen' });
  };

  return (
    <GlobalLayout>
      <GestureHandlerRootView>
        <View style={[styles.container, isDarkMode && styles.containerDarkMode]}>
          <View style={styles.view}>
            <Text style={[globalStyles.text, globalStyles_darkMode.text]}>Large Text</Text>
            <Switch
              value={isLargeText}
              onValueChange={async () => {
                await AsyncStorage.setItem("isLargeText", JSON.stringify(!isLargeText));
                setIsLargeText(!isLargeText);
              }}
              trackColor={styles.switchTrackColor}
              thumbColor={isLargeText ? "#12747c" : "#f4f3f4"}
            />
          </View>
          <View style={styles.view}>
            <Text style={[globalStyles.text, globalStyles_darkMode.text]}>Dark Mode</Text>
            <Switch
              value={isDarkMode}
              onValueChange={async () => {
                await AsyncStorage.setItem("isDarkMode", JSON.stringify(!isDarkMode));
                setIsDarkMode(!isDarkMode);
              }}
              trackColor={styles.switchTrackColor}
              thumbColor={isDarkMode ? "#12747c" : "#f4f3f4"}
            />
          </View>

          <View className="px-5 pb-5 mt-auto">
            <TouchableOpacity
              onPress={handleLogout}
              className="w-full bg-[#12747c] p-3 rounded-2xl mb-3">
              <Text className="text-xl font-bold text-white text-center">
                Logout
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </GestureHandlerRootView>
    </GlobalLayout>
  );
}

const styles = StyleSheet.create({
  view: {
    marginLeft: 20,
    marginRight: 20,
    paddingLeft: 20,
    paddingRight: 20,
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    marginBottom: 20,

  },
  container: {
    flex: 1,
    padding: 0,
    backgroundColor: '#f5f5f7',
    flexDirection: "column",
    display: 'flex',
    paddingTop: 20
  },
  containerDarkMode: {
    backgroundColor: '#121212',
  },
  switchThumbColor: {
    backgroundColor: '#fff',
  },
  switchTrackColor: {
    true: '#12747c',
    false: '#767577',
  },
  switchContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
});

