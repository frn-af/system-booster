import { Text, View } from "../Themed";
import React from "react";
import SignInWithOAuth from "../SignInWithOAuth";
import { transform } from "@babel/core";

const SignIn = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text
        lightColor="#FF7235"
        darkColor="#FF7235"
        style={{
          fontFamily: "PoppinsSemiBold",
          fontSize: 30,
          letterSpacing: 1,
          marginTop: 150,
          paddingHorizontal: 20,
        }}
      >
        Hello There 👋
      </Text>
      <Text
        lightColor="#FF7235"
        darkColor="#FF7235"
        style={{
          paddingHorizontal: 20,
          fontFamily: "PoppinsSemiBold",
          fontSize: 20,
          textTransform: "capitalize",
        }}
      >
        please sign in to continue
      </Text>
      <SignInWithOAuth />
    </View>
  );
};

export default SignIn;
