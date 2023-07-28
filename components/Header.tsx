import React from "react";
import { StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Text, View } from "./Themed";
import { Link } from "expo-router";

type headerProps = {
  title: string;
};

export default function Header({ title }: headerProps) {
  return (
    <View style={styles.header}>
      <Link href="/chart">
        <MaterialIcons color="#FF7235" name="notifications" size={28} />
      </Link>

      <View>
        <Text style={styles.headerText}>{title}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 80,
    marginTop: 20,
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
