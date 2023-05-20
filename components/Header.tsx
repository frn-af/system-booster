import React from "react";
import { StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Text, View } from "./Themed";

export default function Header() {
  return (
    <View style={styles.header}>
      <MaterialIcons color="#FF7235" name="notifications" size={28} />
      <View>
        <Text style={styles.headerText}>Dashboard</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 80,
    marginTop: 40,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerText: {
    fontFamily: "PoppinsSemiBold",
    fontSize: 20,
    letterSpacing: 1,
  },
  icon: {
    position: "absolute",
    left: 16,
  },
});
