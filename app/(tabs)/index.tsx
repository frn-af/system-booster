import { SafeAreaView, StyleSheet } from "react-native";

import { View } from "../../components/Themed";
import Header from "../../components/Header";
import Monitoring from "../../components/monitoring/Monitoring";
import { FlatList, ScrollView } from "react-native-gesture-handler";

const DATA = [
  {
    id: "1",
    title: "Monitoring 1",
  },
];

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <Header title="Dashboard" />
      <FlatList data={DATA} renderItem={({ item }) => <Monitoring />} />
      {/* <Monitoring /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
