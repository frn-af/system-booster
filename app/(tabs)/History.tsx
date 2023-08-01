import { StyleSheet } from "react-native";
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
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  card: {
    height: 150,
    backgroundColor: "#171717",
    borderRadius: 10,
    padding: 20,
    marginVertical: 5,
    marginHorizontal: 20,
  },
  cardLabel: {
    flexGrow: 1,
    color: "#FF7235",
    fontSize: 20,
    fontFamily: "PoppinsSemiBold",
  },
  details: {
    fontSize: 15,
    fontFamily: "Poppins",
    textDecorationLine: "underline",
    textDecorationColor: "#FF7235",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
