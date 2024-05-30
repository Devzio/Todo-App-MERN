import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { View, Text, TextInput, Button, StyleSheet, Image } from 'react-native';
import { GestureHandlerRootView, TouchableOpacity } from 'react-native-gesture-handler';

export default function SignupScreen() {
  const handleSignUp = () => {
    navigation.navigate('SignUp', { screen: 'SignupScreen' });
  };
  return (
    <GestureHandlerRootView>
      <View className="bg-slate-200 h-full w-full">
        <StatusBar style="light" />
        <Image className="h-full w-full absolute" source={require('../assets/images/background.png')} />

        <View className="w-full h-full flex flex-column items-center">
          <View className="flex-column justify-center pt-16">
            {/* Lightbulb */}
            <Image
              style={styles.image}
              source={require('../assets/images/lightbulb.png')}>
            </Image>
            {/* title */}
            <View className="flex items-center pt-3">
              <Text className="text-white font-bold tracking-wider text-5xl mb-16">
                ToDo App
              </Text>
            </View>
          </View>
          {/* form */}
          <View className="w-full flex justify-around pt-5 pb-10 mt-auto">
            {/* form */}
            <View className="flex items-center mx-4 space-y-4 ">
              <Text className="text-3xl text-slate-500 font-semibold mb-5">Sign Up</Text>
              <View className="bg-black/5 p-5 rounded-2xl w-full">
                <TextInput placeholder='Email' placeholderTextColor={'gray'} />
              </View>
              <View className="bg-black/5 p-5 rounded-2xl w-full mb-3">
                <TextInput placeholder='Password' placeholderTextColor={'gray'} secureTextEntry />
              </View>
              <View className='w-full'>
                <TouchableOpacity
                  onPress={handleSignUp}
                  className="w-full bg-sky-400 p-3 rounded-2xl mb-3">
                  <Text className="text-xl font-bold text-white text-center">Sign Up</Text>
                </TouchableOpacity>
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
  image: {
    height: 150,
    objectFit: 'contain',
    resizeMode: 'contain'
  }
});
