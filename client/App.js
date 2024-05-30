// App.js

import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./screens/LoginScreen";
import TabLayout from "./screens/TabLayout";
import SignupScreen from './screens/SignupScreen';
const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
        />
        <Stack.Screen
          name="SignUp"
          component={SignupScreen}
        />
        <Stack.Screen
          name="TabLayout"
          component={TabLayout}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
