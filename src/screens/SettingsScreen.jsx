import { StyleSheet, Text, View } from "react-native";
import React from "react";

export default function SettingsScreen() {
  return (
    <View style={styles.container}>
      <Text style={{ alignSelf: "center" }}>SettingsScreen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignContent: "center",
    width: "100%",
    height: "100%",
  },
});
