import React, { useState } from 'react';
import { Text, View, StyleSheet, ScrollView, Image } from "react-native";
import { GlobalLayout } from "../components/Layout";
import { useTheme } from "../context/theme";
import { GlobalStyles } from "../styles/global";
import { useTheme_darkMode } from "../context/theme-darkMode";
import { GlobalStyles_darkMode } from "../styles/global-darkMode";
import { GestureHandlerRootView, TouchableOpacity } from "react-native-gesture-handler";
import CustomAlert from '../components/LongAlert';

export default function AboutScreen() {
  const globalStyles = GlobalStyles();
  const globalStyles_darkMode = GlobalStyles_darkMode();
  const { isDarkMode } = useTheme_darkMode();
  const [alertMessage, setAlertMessage] = useState('');
  const [alertVisible, setAlertVisible] = useState(false);


  const showLicenseInfo = () => {
    setAlertMessage(
      `Licenses:\nMIT License\nISC License\nApache-2.0\nMPL-2.0\nBSD-3-Clause\nUnlicense\n\nCopyright (c) 2024 Jasdev\n\nPermission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:\n\nThe above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.`
    );
    setAlertVisible(true);
  };


  return (
    <GlobalLayout>
      <GestureHandlerRootView>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <View style={[styles.container, isDarkMode && styles.containerDarkMode]}>
            <View style={styles.view} className="h-full w-full flex flex-column justify-center items-center px-5">

              <Image
                style={styles.LogoImage}
                source={require('../assets/images/lightbulb.png')}>
              </Image>
              <Image
                style={styles.LogoText}
                source={require('../assets/images/logo.png')}>
              </Image>

              <Text style={[globalStyles.text, globalStyles_darkMode.text, styles.text]}>
                Welcome to the Task Manager App! This simple yet powerful tool helps you keep track of your tasks and their due dates effortlessly. With an intuitive swipe functionality, you can check or uncheck tasks by swiping right and delete tasks by swiping left. {"\n"}{"\n"}Stay organized and manage your to-dos with ease using the Task Manager App.
              </Text>

              <View className="pb-3 mt-auto">
                <TouchableOpacity
                  onPress={showLicenseInfo}
                  className="w-full bg-[#12747c] p-3 rounded-2xl">
                  <Text className="text-xl font-bold text-white text-center">
                    License Info
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </GestureHandlerRootView>
      <CustomAlert
        visible={alertVisible}
        message={alertMessage}
        onClose={() => setAlertVisible(false)}
        isDarkMode={isDarkMode}
      />
    </GlobalLayout>
  );
}

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
  },
  view: {
    paddingTop: 20,
    paddingBottom: 20,
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "start",
    flexDirection: "column",
  },
  container: {
    flex: 1,
    padding: 0,
    backgroundColor: '#f5f5f7',
  },
  containerDarkMode: {
    backgroundColor: '#121212',
  },
  text: {
    paddingTop: 20,
  },
  LogoImage: {
    height: 90,
    objectFit: 'contain',
    resizeMode: 'contain',
  },
  LogoText: {
    height: 40,
    objectFit: 'contain',
    resizeMode: 'contain',
    marginTop: 10,
    marginRight: 'auto',
    marginLeft: 'auto',
    width: 200
  }
});
