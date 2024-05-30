// screens/LoginScreen.js
import React, { useState, useEffect } from 'react';
// import { useNavigation } from '@react-navigation/native';
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
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const users = JSON.parse(await AsyncStorage.getItem('users')) || [];
        console.log('Users:', users);
      } catch (error) {
        console.error('Failed to fetch users', error);
      }
    };

    fetchUsers();
  }, []);

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

  // New loginUser function
  const loginUser = async () => {
    try {
      // Get the array of users
      const users = JSON.parse(await AsyncStorage.getItem('users')) || [];

      // Check if a user with the entered email and password exists
      const userExists = users.some(user => user.email === email && user.password === password);

      if (userExists) {
        console.log('User logged in successfully');
        navigation.navigate('TabLayout'); //  Navigate to Home screen of the App
      } else {
        console.error('Invalid credentials');
      }
    } catch (error) {
      console.error('Failed to log in', error);
    }
  };

  const handleLogin = () => {
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();
    if (isEmailValid && isPasswordValid) {
      loginUser(); // Call loginUser instead of logging to console
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
          <View className="flex-column justify-center pt-16">
            {/* Lightbulb image */}
            <Image
              style={styles.image}
              source={require('../assets/images/lightbulb.png')}>
            </Image>
            {/* title */}
            <View className="flex items-center pt-3">
              <Text className="text-[#09c1bd] font-bold tracking-wider text-5xl mb-16">
                ToDo App
              </Text>
            </View>
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
                  onPress={handleLoginDev}
                  className="w-full bg-[#12747c] p-3 rounded-2xl mb-3">
                  <Text className="text-xl font-bold text-white text-center">
                    Login
                  </Text>
                </TouchableOpacity>
                {/* SignUp Button */}
                <View className="flex-row justify-center">
                  <Text>Don't hane an account? </Text>
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
  image: {
    height: 150,
    objectFit: 'contain',
    resizeMode: 'contain'
  }
});
