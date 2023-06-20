import { Button, StyleSheet } from "react-native";
import { Text, View } from "../../components/Themed";
import Header from "../../components/Header";
import { useAuth } from "@clerk/clerk-expo";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const SignOut = () => {
  const { signOut } = useAuth();
  return (
    <View>
      <Button
        title="Sign Out"
        onPress={() => {
          signOut();
        }}
      />
    </View>
  );
};

export default function History() {
  return (
    <View style={styles.container}>
      <Header title="History" />
      <View style={styles.card}>
        <Text style={styles.cardLabel}>27 Juni,{`\n`}2023</Text>
        <Text style={styles.details}>lihat detail</Text>
        <MaterialCommunityIcons
          name="tag-arrow-right-outline"
          size={40}
          color="#FF7235"
          style={{ position: "absolute", right: 20, top: 20 }}
        />
      </View>
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
