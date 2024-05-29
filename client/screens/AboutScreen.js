import { Text, View, StyleSheet } from "react-native";
import { GlobalLayout } from "../components/Layout";
import { useTheme } from "../context/theme";
import { GlobalStyles } from "../styles/global";
import React from 'react'

export default function AboutScreen() {
  const globalStyles = GlobalStyles();

  return (
    <GlobalLayout>
      <View style={styles.view}>
        <Text style={globalStyles.text}>This Task Manager App is a simple tool to record your tasks and when their due.</Text>
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
    alignItems: "center",
  },
});