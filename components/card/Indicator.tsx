import { Animated, Dimensions, View } from "react-native";
import styles from "./card.style";
import React from "react";

interface indicatorProps {
  data: any;
  scrollX: Animated.Value;
}

const { width } = Dimensions.get("window");

const Indicator: React.FC<indicatorProps> = ({ data, scrollX }) => {
  return (
    <View style={styles.indicator}>
      {data.map((_: any, i: number) => {
        const inputRange = [(i - 1) * width, i * width, (i + 1) * width];

        const dotWidht = scrollX.interpolate({
          inputRange,
          outputRange: [10, 20, 10],
          extrapolate: "clamp",
        });

        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.3, 1, 0.3],
          extrapolate: "clamp",
        });
        return (
          <Animated.View
            key={i}
            style={[
              styles.circle,
              {
                opacity,
                width: dotWidht,
              },
            ]}
          />
        );
      })}
    </View>
  );
};

export default Indicator;
