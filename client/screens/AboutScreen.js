import { Text, View, StyleSheet } from "react-native";
import { GlobalLayout } from "../components/Layout";
import { useTheme } from "../context/theme";
import { GlobalStyles } from "../styles/global";
import { useTheme_darkMode } from "../context/theme-darkMode";
import { GlobalStyles_darkMode } from "../styles/global-darkMode";
import React from 'react'

export default function AboutScreen() {
  const globalStyles = GlobalStyles();
  const globalStyles_darkMode = GlobalStyles_darkMode();
  const { isDarkMode } = useTheme_darkMode();
  return (
    <GlobalLayout>
      <View style={[styles.container, isDarkMode && styles.containerDarkMode]}>
        <View style={styles.view}>
          <Text style={[globalStyles.text, globalStyles_darkMode.text, styles.text]}>
            This Task Manager App is a simple tool to record your tasks and when they are due. You can check, uncheck and delete each task.</Text>
          <Text style={[globalStyles.text, globalStyles_darkMode.text, styles.text]}>License: MIT</Text>
        </View>
      </View>
    </GlobalLayout>
  )
}

const styles = StyleSheet.create({
  view: {
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "start",
    flexDirection: "column"
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
    paddingTop: 20
  }
});