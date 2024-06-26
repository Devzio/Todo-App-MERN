// client/screens/LoginScreen.js

import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, TextInput, StyleSheet, Image } from 'react-native';
import { GestureHandlerRootView, TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // code to handle login data in async storage - no longer needed as passwords are now encrypted in db
  // useEffect(() => {
  //   const fetchUsers = async () => {
  //     try {
  //       const users = JSON.parse(await AsyncStorage.getItem('users')) || [];
  //       console.log('Users:', users);
  //     } catch (error) {
  //       console.error('Failed to fetch users', error);
  //     }
  //   };

  //   fetchUsers();
  // }, []);

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Invalid email address");
      return false;
    }
    setEmailError("");
    return true;
  };

  const validatePassword = () => {
    if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters long");
      return false;
    }
    setPasswordError("");
    return true;
  };

  const handleEmailChange = (text) => {
    setEmailError("");
    setEmail(text);
  };

  const handlePasswordChange = (text) => {
    setPasswordError("");
    setPassword(text);
  };

  const loginUser = async () => {
    try {
      const response = await fetch('http://172.24.40.17:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // console.log('User logged in successfully', data);
        await AsyncStorage.setItem('token', data.token);
        await AsyncStorage.setItem('userId', data.userId.toString()); // Store the userId
        navigation.navigate('TabLayout'); // Navigate to Home screen of the App
      } else {
        console.error('Invalid credentials', data.message);
      }
    } catch (error) {
      console.error('Failed to log in', error);
    }
  };

  const handleLogin = () => {
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();
    if (isEmailValid && isPasswordValid) {
      loginUser();
      setEmail("");
      setPassword("");
    }
  };

  // Login for development purposes - bypasses authentication
  const handleLoginDev = () => {
    navigation.navigate('TabLayout');
  };

  const goToSignUp = () => {
    navigation.navigate('SignUp', { screen: 'SignupScreen' });
  };

  return (
    <GestureHandlerRootView>
      <View className="bg-slate-200 h-full w-full">
        <StatusBar style="light" />
        <Image className="h-full w-full absolute" source={require('../assets/images/image.png')} />

        <View className="w-full h-full flex flex-column items-center">
          <View className="flex-column justify-center items-center pt-16">
            {/* Lightbulb image */}
            <Image
              style={styles.LogoImage}
              source={require('../assets/images/lightbulb.png')}>
            </Image>
            {/* title */}
            <Image
              style={styles.LogoText}
              source={require('../assets/images/logo.png')}>
            </Image>
          </View>
          {/* form */}
          <View className="w-full flex justify-around pt-5 pb-10 mt-auto bg-slate-200">
            <View className="flex items-center mx-4 space-y-4 ">
              <Text className="text-3xl text-slate-500 font-semibold mb-3">Login</Text>
              {/* Email Input*/}
              <View className="bg-black/5 p-5 rounded-2xl w-full">
                <TextInput
                  placeholder='Email'
                  placeholderTextColor={'gray'}
                  value={email}
                  onChangeText={handleEmailChange}
                  autoCapitalize="none"
                  className="w-full"
                />
              </View>
              {emailError ? <Text style={styles.error}>{emailError}</Text> : null}

              {/* Password Input */}
              <View className="bg-black/5 p-5 rounded-2xl w-full mb-3 flex-row justify-between">
                <TextInput
                  placeholder='Password'
                  placeholderTextColor={'gray'}
                  onChangeText={handlePasswordChange}
                  value={password}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                  className="w-11/12"

                />
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Icon name={showPassword ? "eye" : "eye-slash"} size={20} color="gray" />
                </TouchableOpacity>
              </View>
              {passwordError ? (
                <Text style={styles.error}>{passwordError}</Text>
              ) : null}

              {/* Login Button */}
              <View className='w-full'>
                <TouchableOpacity
                  onPress={handleLogin}
                  className="w-full bg-[#12747c] p-3 rounded-2xl mb-3">
                  <Text className="text-xl font-bold text-white text-center">
                    Login
                  </Text>
                </TouchableOpacity>
                {/* SignUp Button */}
                <View className="flex-row justify-center">
                  <Text>Don't have an account? </Text>
                  <TouchableOpacity onPress={goToSignUp}>
                    <Text Text className="text-[#12747c] font-bold">
                      Sign Up Here
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
  },
  LogoImage: {
    height: 150,
    objectFit: 'contain',
    resizeMode: 'contain'
  },
  LogoText: {
    height: 50,
    objectFit: 'contain',
    resizeMode: 'contain',
    marginTop: 15
  },
  error: {
    color: 'gray',
    fontSize: 14,
  },
});
