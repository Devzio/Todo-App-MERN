import { Text, Switch, View, StyleSheet, Button } from "react-native";
import { GlobalLayout } from "../components/Layout";
import { useTheme } from "../context/theme";
import { GlobalStyles } from "../styles/global";
import { useTheme_darkMode } from "../context/theme-darkMode";
import { GlobalStyles_darkMode } from "../styles/global-darkMode";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Swipeable, GestureHandlerRootView } from 'react-native-gesture-handler';

export default function SettingsScreen({ navigation }) {
  const { isLargeText, setIsLargeText } = useTheme();
  const globalStyles = GlobalStyles();
  const globalStyles_darkMode = GlobalStyles_darkMode();
  const { isDarkMode, setIsDarkMode } = useTheme_darkMode();

  const handleLogout = () => {
    // You can add authentication logic here
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
              trackColor={{ false: "#767577", true: "#81b0ff" }}
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
              trackColor={{ false: "#767577", true: "#81b0ff" }}
            />
          </View>
          {/* <View style={styles.logoutButtonWrapper}>
            <TouchableOpacity
              style={styles.logoutButton}
              onPress={handleLogout}
            >
              <Text style={styles.centeredText}>Logout</Text>
            </TouchableOpacity>
          </View> */}
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
    paddingLeft: 20,
    paddingRight: 20,
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
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
  logoutButtonWrapper: {
    marginTop: 'auto',
    paddingLeft: 20,
    paddingRight: 20,
    marginBottom: 40,
  },
  logoutButton: {
    backgroundColor: '#ccc',
    textAlign: 'center',
    color: '#000',
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 20
  },
  centeredText: {
    textAlign: 'center',
    fontSize: 20
  }
});
