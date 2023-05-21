import { View, useColorScheme } from "react-native";
import React, { useEffect, useState } from "react";
import { Circle, Svg } from "react-native-svg";
import { Text } from "../Themed";
import { collection, doc, onSnapshot } from "firebase/firestore";
import { FIREBASE_DB } from "../../config/FirebaseConfig";

export function ProgresBarTemperature() {
  const [data, setData] = useState<any>();
  const Circle_len = 2 * Math.PI * 80;
  const Circle_radius = Circle_len / (2 * Math.PI);

  const colorScheme = useColorScheme();

  useEffect(() => {
    const Ref = collection(FIREBASE_DB, "tools");
    const q2 = doc(Ref, "monitoring");
    const unsubscribe2 = onSnapshot(q2, (snapshot) => {
      const data: any = snapshot.data();
      if (data.kontrol == false) {
        setData("--");
      } else {
        setData(data.kelembaban);
      }
    });
  }, []);

  const DashOffset = Circle_len * (1 - data / 100);
  return (
    <View
      style={{
        height: 200,
        width: 200,
        position: "absolute",
        top: 20,
        right: 20,
      }}
    >
      <Text
        style={{
          position: "absolute",
          top: 60,
          left: 65,
          fontSize: 60,
          color: "#FF7235",
          fontFamily: "PoppinsSemiBold",
        }}
        lightColor="#fff"
        darkColor="#FF7235"
      >
        {data}
      </Text>
      <Svg>
        <Circle
          cx="100"
          cy="100"
          r={Circle_radius}
          stroke={colorScheme === "dark" ? "#8B4426" : "#fff"}
          strokeWidth="30"
          strokeOpacity={0.5}
        />
        <Circle
          cx="100"
          cy="100"
          r={Circle_radius}
          stroke={colorScheme === "dark" ? "#FF7235" : "#FFB89A"}
          strokeWidth="25"
          strokeDasharray={Circle_len}
          strokeDashoffset={DashOffset}
          strokeLinecap={"round"}
        />
      </Svg>
    </View>
  );
}

export default ProgresBarTemperature;
