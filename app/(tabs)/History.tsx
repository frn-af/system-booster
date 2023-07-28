import { Button, StyleSheet } from "react-native";
import { View } from "../../components/Themed";
import Header from "../../components/Header";
import ListHistory from "../../components/screen/ListHistory";

export default function History() {
  return (
    <View style={styles.container}>
      <Header title="History" />
      <ListHistory />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
