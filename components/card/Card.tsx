import { Animated, Dimensions } from "react-native";
import React from "react";
import styles from "./card.style";
import Indicator from "./Indicator";
import { Text, View } from "../Themed";

interface Data {
  key: string;
  title: string;
  type: string;
}

const DATA: Data[] = [
  {
    key: "3571572",
    title: "Monitoring",
    type: "Monitoring",
  },
  {
    key: "3571747",
    title: "Monitoring",
    type: "Monitoring",
  },
];

const renderItem = ({ item }: { item: Data }) => {
  return (
    <View style={styles.container}>
      <View style={styles.card} lightColor="#FF7235" darkColor="#171717"></View>
    </View>
  );
};

export default function Card() {
  const scrollX = React.useRef(new Animated.Value(0)).current;
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
        renderItem={renderItem}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
      />
    </View>
  );
}
