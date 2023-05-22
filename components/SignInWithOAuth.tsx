import { useOAuth } from "@clerk/clerk-expo";
import React from "react";
import { Button, TouchableOpacity, View, useColorScheme } from "react-native";
import { useWarmUpBrowser } from "../hooks/useWarmUpBrowser";
import { Platform } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Text } from "./Themed";
const SignInWithOAuth = () => {
  const colorScheme = useColorScheme();

  if (Platform.OS !== "web") {
    useWarmUpBrowser();
  }

  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const handleSignInWithGooglePress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow({});
      if (createdSessionId) {
        if (setActive) {
          setActive({ session: createdSessionId });
        }
      } else {
        // Modify this code to use signIn or signUp to set this missing requirements you set in your dashboard.
        throw new Error(
          "There are unmet requirements, modifiy this else to handle them"
        );
      }
    } catch (err) {
      console.log(JSON.stringify(err, null, 2));
      console.log("error signing in", err);
    }
  }, []);

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <TouchableOpacity
        onPress={handleSignInWithGooglePress}
        style={{
          width: "60%",
          height: 80,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-evenly",
          backgroundColor: "#FF7235",
          padding: 10,
          borderRadius: 10,
          gap: 10,
        }}
      >
        <FontAwesome
          name="google"
          size={40}
          color={colorScheme === "dark" ? "black" : "#fff"}
        />
        <Text lightColor="#fff" darkColor="black">
          Sign in with Google
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignInWithOAuth;
