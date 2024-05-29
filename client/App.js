// App.js

import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome5 } from "@expo/vector-icons";
import TasksScreen from "./screens/TasksScreen";
import SettingsScreen from "./screens/SettingsScreen";
import AboutScreen from "./screens/AboutScreen";
import { ThemeProvider } from "./context/theme";
import { StyleSheet } from "react-native"

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer >
      <ThemeProvider>
        <Tab.Navigator
          screenOptions={({ route }) => {
            return {
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
            };
          }}
        >
          <Tab.Screen name="Tasks" component={TasksScreen} />
          <Tab.Screen name="Settings" component={SettingsScreen} />
          <Tab.Screen name="About" component={AboutScreen} />

        </Tab.Navigator>
      </ThemeProvider>
    </NavigationContainer>
  );
};

export default App;
