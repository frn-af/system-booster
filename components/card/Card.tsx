import { Animated } from "react-native";
import React, { useEffect } from "react";
import styles from "./card.style";
import Indicator from "./Indicator";
import { Text, View } from "../Themed";
import { FontAwesome5 } from "@expo/vector-icons";
import ProgresBarTemperature from "./ProgresBarTemperature";
import ProgresBarHumidity from "./ProgresBarHumidity";

import { useColorScheme } from "react-native";

import Colors from "../../constants/Colors";

//get current time add 0 if less than 10
const date = new Date();
const hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
const minutes =
  date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();

const time = hours + ":" + minutes + " WIB";

interface Data {
  key: string;
  title: string;
  label: string;
  unit: string;
}

const DATA: Data[] = [
  {
    key: "3571572",
    title: "Monitoring",
    unit: "°C",
    label: "Temperatur",
  },
  {
    key: "3571747",
    title: "Monitoring",
    label: "Kelembaban",
    unit: "%",
  },
];

// const renderItem = ({ item }: { item: Data }) => {
//   return (

//   );
// };

export default function Card() {
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const colorScheme = useColorScheme();

  return (
    <View>
      <View style={styles.label}>
        <Text>Monitoring</Text>
        <Indicator data={DATA} scrollX={scrollX} />
      </View>

      <Animated.FlatList
        data={DATA}
        keyExtractor={(item) => item.key}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.container}>
            <View style={styles.card} lightColor="#FF7235" darkColor="#171717">
              {item.label === "Temperatur" && <ProgresBarTemperature />}
              {item.label === "Kelembaban" && <ProgresBarHumidity />}
              {item.label === "Temperatur" && (
                <FontAwesome5
                  name="temperature-low"
                  size={40}
                  color={Colors[colorScheme ?? "light"].icon}
                />
              )}
              {item.label === "Kelembaban" && (
                <FontAwesome5
                  name="wind"
                  size={40}
                  color={Colors[colorScheme ?? "light"].icon}
                />
              )}
              <Text
                lightColor="#fff"
                darkColor="#ccc"
                style={styles.currentTime}
              >
                {time}
              </Text>
              <Text
                lightColor="#fff"
                darkColor="#FF7235"
                style={styles.cardLabel}
              >
                {item.label}
              </Text>
              <Text
                lightColor="#fff"
                darkColor="#FF7235"
                style={styles.cardUnit}
              >
                {" "}
                in {item.unit}
              </Text>
            </View>
          </View>
        )}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
      />
    </View>
  );
}
