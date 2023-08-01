import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { Text, View } from "./Themed";
import { Link } from "expo-router";
import { getUnreadNotificationInboxCount } from "native-notify";
import { MaterialCommunityIcons } from "@expo/vector-icons";

type headerProps = {
  title: string;
};

export default function Header({ title }: headerProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchNotification = async () => {
      const res = await getUnreadNotificationInboxCount(
        9849,
        "MLENeeUtxrJE0rYHESEHYO"
      );
      setCount(res);
    };

    fetchNotification();
  }, []);

  return (
    <View style={styles.header}>
      <Link href="/notification">
        {count ? (
          <MaterialCommunityIcons name="bell-badge" size={24} color="#FF7235" />
        ) : (
          <MaterialCommunityIcons name="bell" size={24} color="#FF7235" />
        )}
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
});
