import { StyleSheet } from "react-native";

import { View } from "../../components/Themed";
import Header from "../../components/Header";
import Monitoring from "../../components/monitoring/Monitoring";
import Card from "../../components/card/Card";

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <Header />
      <Monitoring />
      <Card />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
