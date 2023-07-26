import { View, useColorScheme } from "react-native";
import { Circle, Svg } from "react-native-svg";
import { Text } from "../Themed";
import useDoc from "../../hooks/useDoc";

export function ProgresBarTemperature() {
  const Circle_len = 2 * Math.PI * 80;
  const Circle_radius = Circle_len / (2 * Math.PI);

  const colorScheme = useColorScheme();

  const { data: suhu } = useDoc("tools", "monitoring");

  const DashOffset = Circle_len * (1 - suhu?.suhu / 100);

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
          fontFamily: "PoppinsSemiBold",
        }}
        lightColor="#fff"
        darkColor="#FF7235"
      >
        {suhu?.kontrol == false ? "--" : suhu?.suhu}
      </Text>
      <Svg>
        <Circle
          cx="100"
          cy="100"
          r={Circle_radius}
          stroke={colorScheme === "dark" ? "#8B4426" : "#fff"}
          strokeWidth="30"
        />
        <Circle
          cx="100"
          cy="100"
          r={Circle_radius}
          stroke={colorScheme === "dark" ? "#FF7235" : "#FFB89A"}
          strokeWidth="25"
          strokeDasharray={Circle_len}
          strokeDashoffset={suhu?.kontrol == false ? 0 : DashOffset}
          strokeLinecap={"round"}
        />
      </Svg>
    </View>
  );
}

export default ProgresBarTemperature;
