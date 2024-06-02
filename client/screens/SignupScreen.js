import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, TextInput, Button, StyleSheet, Image, Alert } from 'react-native';
import { GestureHandlerRootView, TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function SignupScreen({ navigation }) {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

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
      if (!validateEmail()) {
        console.error("Invalid email address");
        return;
      }
      if (!validatePassword()) {
        // console.warn("Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character");
        // console.log("User registered successfully");
        Alert.alert(
          "Password too weak",
          "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character",
          [{ text: "OK" }]
        );
        return;

      }
      // if (user.password !== confirmPassword) {
      //   console.error("Passwords do not match");
      //   return;
      // }

      const response = await fetch('http://172.24.40.17:3000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: user.email, password: user.password }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("User registered successfully");
        Alert.alert(
          "Registration Successful",
          "Your account has been created successfully!",
          [{ text: "OK", onPress: () => navigation.navigate('Login') }]
        );
      } else {
        console.error(data.message || "Failed to register user");
      }
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
            <Image style={styles.LogoImage} source={require('../assets/images/lightbulb.png')} />
            <Image style={styles.LogoText} source={require('../assets/images/logo.png')} />
          </View>
          <View className="w-full flex justify-around pt-5 pb-10 mt-auto bg-slate-200">
            <View className="flex items-center mx-4 space-y-4 ">
              <Text className="text-3xl text-slate-500 font-semibold mb-3">Sign Up</Text>
              <View className="bg-black/5 p-5 rounded-2xl w-full">
                <TextInput
                  placeholder='Email'
                  placeholderTextColor={'gray'}
                  onChangeText={(text) => setUser({ ...user, email: text })}
                  value={user.email}
                  autoCapitalize="none"
                  className="w-full"
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
                  className="w-11/12"
                />
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Icon name={showPassword ? "eye" : "eye-slash"} size={20} color="gray" />
                </TouchableOpacity>
              </View>
              {/* <View className="bg-black/5 p-5 rounded-2xl w-full mb-3 flex-row justify-between">
                <TextInput
                  placeholder='Confirm Password'
                  placeholderTextColor={'gray'}
                  onChangeText={setConfirmPassword}
                  value={confirmPassword}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                />
              </View> */}

              <View className='w-full'>
                <TouchableOpacity
                  onPress={handleSignUp}
                  className="w-full bg-[#12747c] p-3 rounded-2xl mb-3">
                  <Text className="text-xl font-bold text-white text-center">Sign Up</Text>
                </TouchableOpacity>

                <View className="flex-row justify-center">
                  <Text>Already Registered? </Text>
                  <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text Text className="text-[#12747c] font-bold">Login Here</Text>
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
