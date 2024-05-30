// screens/TabLayout.js

import React from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome5 } from "@expo/vector-icons";
import TasksScreen from "./TasksScreen";
import SettingsScreen from "./SettingsScreen";
import AboutScreen from "./AboutScreen";
import { ThemeProvider } from "../context/theme";
import { ThemeDarkModeProvider } from "../context/theme-darkMode";

const Tab = createBottomTabNavigator();

const TabLayout = () => {
  return (
    <ThemeProvider>
      <ThemeDarkModeProvider>
        <Tab.Navigator
          screenOptions={({ route }) => ({
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
              return <FontAwesome5 name={iconName} size={size} color='#09c1bd' />;
            },
          })}
        >
          <Tab.Screen name="Tasks" component={TasksScreen} />
          <Tab.Screen name="Settings" component={SettingsScreen} />
          <Tab.Screen name="About" component={AboutScreen} />
        </Tab.Navigator>
      </ThemeDarkModeProvider>
    </ThemeProvider>
  );
};

export default TabLayout;
