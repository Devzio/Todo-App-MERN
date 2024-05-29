import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome5 } from "@expo/vector-icons";
import TasksScreen from "./screens/TasksScreen";
import SettingsScreen from "./screens/SettingsScreen";
import AboutScreen from "./screens/AboutScreen";
import { ThemeProvider } from "./context/theme";
import { ThemeDarkModeProvider } from "./context/theme-darkMode";

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <ThemeProvider>
        <ThemeDarkModeProvider>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              // headerShown: false,
              headerStyle: {
                backgroundColor: '#333',
                height: 70,
              },
              headerTitleStyle: {
                color: '#fff',
              },
              tabBarStyle: {
                backgroundColor: '#333',
                height: 70,
                paddingTop: 10,
                paddingBottom: 10,
              },
              tabBarLabelStyle: {
                fontSize: 14,
              },
              tabBarIcon: ({ color, size }) => {
                let iconName;
                if (route.name === "Tasks") {
                  iconName = "list";
                } else if (route.name === "Settings") {
                  iconName = "cog";
                } else if (route.name === "About") {
                  iconName = "info";
                }
                return <FontAwesome5 name={iconName} size={size} color={color} />;
              },
            })}
          >
            <Tab.Screen name="Tasks" component={TasksScreen} />
            <Tab.Screen name="Settings" component={SettingsScreen} />
            <Tab.Screen name="About" component={AboutScreen} />
          </Tab.Navigator>
        </ThemeDarkModeProvider>
      </ThemeProvider>
    </NavigationContainer >
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
    backgroundColor: '#faf0e6',
  },
  containerDarkMode: {
    backgroundColor: '#121212',
  },

});
