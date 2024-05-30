// screens/LoginScreen.js

import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image } from 'react-native';
import { GestureHandlerRootView, TouchableOpacity } from 'react-native-gesture-handler';

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // authentication logic here
    navigation.navigate('TabLayout');
  };

  const handleSignUp = () => {
    navigation.navigate('SignUp', { screen: 'SignupScreen' });
  };

  return (
    <GestureHandlerRootView>
      <View className="bg-slate-200 h-full w-full">
        <StatusBar style="light" />
        <Image className="h-full w-full absolute" source={require('../assets/images/image.png')} />

        <View className="w-full h-full flex flex-column items-center">
          <View className="flex-column justify-center pt-16">
            {/* Lightbulb */}
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
            {/* form */}
            <View className="flex items-center mx-4 space-y-4 ">
              <View className="bg-black/5 p-5 rounded-2xl w-full">
                <TextInput placeholder='Email' placeholderTextColor={'gray'} />
              </View>
              <View className="bg-black/5 p-5 rounded-2xl w-full mb-3">
                <TextInput placeholder='Password' placeholderTextColor={'gray'} secureTextEntry />
              </View>
              <View className='w-full'>
                <TouchableOpacity
                  onPress={handleLogin}
                  className="w-full bg-[#12747c] p-3 rounded-2xl mb-3">
                  <Text className="text-xl font-bold text-white text-center">Login</Text>
                </TouchableOpacity>
              </View>
              <View className="flex-row justify-center">
                <Text>Don't hanve an account? </Text>
                <TouchableOpacity onPress={handleSignUp}>
                  <Text Text className="text-[#12747c] font-bold">Sign Up Here</Text>
                </TouchableOpacity>
              </View>
            </View>

          </View>

        </View>




      </View>
      {/* <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      /> */}

      {/* <Button title="Login" onPress={handleLogin} /> */}
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
