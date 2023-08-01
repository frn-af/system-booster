import { StyleSheet } from "react-native";

import { View } from "../../components/Themed";
import Header from "../../components/Header";
import Monitoring from "../../components/monitoring/Monitoring";
import { useCallback, useState } from "react";
import { FlatList, RefreshControl } from "react-native-gesture-handler";

const data = [
  {
    id: "1",
  },
];

export default function TabOneScreen() {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <View style={styles.container}>
      <Header title="Dashboard" />
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Monitoring />}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
