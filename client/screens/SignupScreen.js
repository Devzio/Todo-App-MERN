import React, { useState } from 'react';
// import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { View, Text, TextInput, Button, StyleSheet, Image } from 'react-native';
import { GestureHandlerRootView, TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SignupScreen({ navigation }) {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false); // state variable to show/hide password input

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(user.email);
  };

  const validatePassword = () => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(user.password);
  };

  const handleSignUp = async () => {
    try {
      // Validate email and password
      if (!validateEmail()) {
        console.error("Invalid email address");
        return;
      }
      if (!validatePassword()) {
        console.warn(
          "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character"
        );
        return;
      }

      // if (user.password !== confirmPassword) {
      //   console.error("Passwords do not match");
      //   return;
      // }

      // Get the current array of users
      const currentUsers =
        JSON.parse(await AsyncStorage.getItem("users")) || [];

      // Check if the email is already registered
      if (
        currentUsers.some((currentUser) => currentUser.email === user.email)
      ) {
        console.error("Email is already registered");
        return;
      }

      // Add the new user to the array
      currentUsers.push(user);

      // Save the updated array of users
      await AsyncStorage.setItem("users", JSON.stringify(currentUsers));

      console.log("User registered successfully");
    } catch (error) {
      console.error("Failed to register user", error);
    }
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
            {/* <Text className="text-[#09c1bd] font-bold tracking-wider text-5xl mb-16">
                ToDo App
              </Text> */}
          </View>
          {/* form */}
          <View className="w-full flex justify-around pt-5 pb-10 mt-auto bg-slate-200">
            {/* form */}
            <View className="flex items-center mx-4 space-y-4 ">
              <Text className="text-3xl text-slate-500 font-semibold mb-3">Sign Up</Text>
              <View className="bg-black/5 p-5 rounded-2xl w-full">
                <TextInput
                  placeholder='Email'
                  placeholderTextColor={'gray'}
                  onChangeText={(text) => setUser({ ...user, email: text })}
                  value={user.email}
                  autoCapitalize="none"
                />
              </View>
              <View className="bg-black/5 p-5 rounded-2xl w-full mb-3 flex-row justify-between">
                <TextInput
                  placeholder='Password'
                  placeholderTextColor={'gray'}
                  onChangeText={(text) => setUser({ ...user, password: text })}
                  value={user.password}
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

              <View className='w-full'>
                <TouchableOpacity
                  // onPress={handleSignUp}
                  onPress={handleSignUp}
                  className="w-full bg-[#12747c] p-3 rounded-2xl mb-3">
                  <Text className="text-xl font-bold text-white text-center">Sign Up</Text>
                </TouchableOpacity>

                <View className="flex-row justify-center">
                  <Text>Already Registered? </Text>
                  <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text Text className="text-[#12747c] font-bold">
                      Login Here
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

            </View>

          </View>
        </View>
      </View>
    </GestureHandlerRootView>
  )
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
  }
});
