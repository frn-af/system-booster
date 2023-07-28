import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import Collapsible from "react-native-collapsible";
import { Text, View } from "../Themed";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet, useColorScheme } from "react-native";
import Colors from "../../constants/Colors";

interface Item {
  id: string;
  set_point: string;
  lama_fermentasi: string;
  timestamp: string;
  suhu: number[];
  kelembaban: number[];
}

interface AccordionProps {
  item: Item;
}

const mean = (arr: number[]) => {
  return arr.reduce((a, b) => a + b, 0) / arr.length;
};

const Accordion: React.FC<AccordionProps> = ({ item }) => {
  const [collapsed, setCollapsed] = useState(true);
  const [meanSuhu, setMeanSuhu] = useState(0);
  const [meanKelembaban, setMeanKelembaban] = useState(0);

  const colorScheme = useColorScheme();
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  useEffect(() => {
    setMeanSuhu(mean(item.suhu));
    setMeanKelembaban(mean(item.kelembaban));
  }, [item.suhu, item.kelembaban]);

  return (
    <View style={styles.card} darkColor="#171717" lightColor="#FF7235">
      <Text style={styles.cardLabel} darkColor="#FF7235" lightColor="#fff">
        {item.id}
      </Text>

      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <Collapsible collapsed={collapsed}>
        <View style={styles.collaps} lightColor="#FF7235" darkColor="#171717">
          <Text
            style={styles.detailLables}
            lightColor="white"
            darkColor="#FF7235"
          >
            Tanggal
          </Text>
          <Text
            lightColor="white"
            darkColor="#FF7235"
            style={styles.detailLables}
          >
            {item.timestamp}
          </Text>
        </View>
        <View style={styles.collaps} lightColor="#FF7235" darkColor="#171717">
          <Text
            style={styles.detailLables}
            lightColor="white"
            darkColor="#FF7235"
          >
            Set Point
          </Text>
          <Text
            lightColor="white"
            darkColor="#FF7235"
            style={styles.detailLables}
          >
            {item.set_point}
          </Text>
        </View>
        <View style={styles.collaps} lightColor="#FF7235" darkColor="#171717">
          <Text
            lightColor="white"
            darkColor="#FF7235"
            style={styles.detailLables}
          >
            Lama Fermentasi
          </Text>
          <Text
            lightColor="white"
            darkColor="#FF7235"
            style={styles.detailLables}
          >
            {item.lama_fermentasi}
          </Text>
        </View>
        <View style={styles.collaps} lightColor="#FF7235" darkColor="#171717">
          <Text
            lightColor="white"
            darkColor="#FF7235"
            style={styles.detailLables}
          >
            Rata-rata {"\n"}Suhu
          </Text>
          <Text
            lightColor="white"
            darkColor="#FF7235"
            style={styles.detailLables}
          >
            {meanSuhu} °C/jam
          </Text>
        </View>
        <View style={styles.collaps} lightColor="#FF7235" darkColor="#171717">
          <Text
            lightColor="white"
            darkColor="#FF7235"
            style={styles.detailLables}
          >
            Rata-rata {"\n"}Kelembaban
          </Text>
          <Text
            lightColor="white"
            darkColor="#FF7235"
            style={styles.detailLables}
          >
            {meanKelembaban} %/jam
          </Text>
        </View>
      </Collapsible>
      <TouchableOpacity onPress={toggleCollapsed}>
        <Text
          style={[
            styles.details,
            { textDecorationColor: Colors[colorScheme ?? "light"].textDecor },
          ]}
        >
          {collapsed ? "lihat detail" : "sembunyikan detail"}
        </Text>
      </TouchableOpacity>
      <MaterialCommunityIcons
        name="tag-arrow-right-outline"
        size={30}
        color="#FF7235"
        style={{ position: "absolute", right: 20, top: 20 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    padding: 30,
    marginVertical: 5,
    marginHorizontal: 20,
  },
  cardLabel: {
    flexGrow: 1,
    fontSize: 20,
    fontFamily: "PoppinsSemiBold",
  },
  details: {
    fontSize: 12,
    color: "#fff",
    fontFamily: "Poppins",
    textDecorationLine: "underline",
  },
  separator: {
    marginTop: 10,
    marginBottom: 30,
    height: 1,
  },
  collaps: {
    height: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  detailLables: {
    fontSize: 16,
    fontFamily: "PoppinsSemiBold",
  },
});

export default Accordion;
