import { Button, StyleSheet } from "react-native";

import { Text, View } from "../../components/Themed";
import Header from "../../components/Header";
import { useAuth } from "@clerk/clerk-expo";

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

export default function TabTwoScreen() {
  return (
    <View style={styles.container}>
      <Header title="History" />
      <SignOut />
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
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
