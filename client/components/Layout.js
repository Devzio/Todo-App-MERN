import { StatusBar } from "expo-status-bar"
import { SafeAreaView } from "react-native-safe-area-context"
import { View, StyleSheet } from "react-native"

export function GlobalLayout({ children }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>{children}</View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: -100,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    width: "100%",
    alignSelf: "start",
  }
})