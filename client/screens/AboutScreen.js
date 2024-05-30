import { Text, View, StyleSheet, ScrollView } from "react-native";
import { GlobalLayout } from "../components/Layout";
import { useTheme } from "../context/theme";
import { GlobalStyles } from "../styles/global";
import { useTheme_darkMode } from "../context/theme-darkMode";
import { GlobalStyles_darkMode } from "../styles/global-darkMode";
import React from 'react';

export default function AboutScreen() {
  const globalStyles = GlobalStyles();
  const globalStyles_darkMode = GlobalStyles_darkMode();
  const { isDarkMode } = useTheme_darkMode();
  return (
    <GlobalLayout>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={[styles.container, isDarkMode && styles.containerDarkMode]}>
          <View style={styles.view}>
            <Text style={[globalStyles.text, globalStyles_darkMode.text, styles.text]}>
              This Task Manager App is a simple tool to record your tasks and when they are due. You can check, uncheck and delete each task.
            </Text>
            <Text style={[globalStyles.text, globalStyles_darkMode.text, styles.text]}>License Info:</Text>
            <Text style={[globalStyles_darkMode.text, styles.text]}>
              MIT License{"\n"}
              {"\n"}
              Copyright (c) 2024 Jasdev{"\n"}
              {"\n"}
              Permission is hereby granted, free of charge, to any person obtaining a copy
              of this software and associated documentation files (the "Software"), to deal
              in the Software without restriction, including without limitation the rights
              to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
              copies of the Software, and to permit persons to whom the Software is
              furnished to do so, subject to the following conditions:
              {"\n"}
              {"\n"}
              The above copyright notice and this permission notice shall be included in all
              copies or substantial portions of the Software.
              {"\n"}
              {"\n"}
              THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
              IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
              FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
              AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
              LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
              OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
              SOFTWARE.
            </Text>
          </View>
        </View>
      </ScrollView>
    </GlobalLayout>
  );
}

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
  },
  view: {
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
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
});
