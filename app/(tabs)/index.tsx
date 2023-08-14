import { StyleSheet } from "react-native";

import { View } from "../../components/Themed";
import Header from "../../components/Header";
import Monitoring from "../../components/monitoring/Monitoring";
import { useCallback, useState } from "react";
import { FlatList, RefreshControl } from "react-native-gesture-handler";
import { set } from "date-fns";

const data = [
  {
    id: "1",
  },
];

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <Header title="Dashboard" />
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Monitoring />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
