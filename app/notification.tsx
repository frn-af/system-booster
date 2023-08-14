import React, { useCallback, useEffect, useState } from "react";
import { View } from "../components/Themed";
import { getNotificationInbox } from "native-notify";
import { FlatList, StyleSheet } from "react-native";
import ListNotification from "../components/screen/ListNotification";
import { RefreshControl } from "react-native-gesture-handler";

const notification = () => {
  const [data, setData] = useState<any>([]);
  const [refreshing, setRefreshing] = useState(true);

  const onRefresh = useCallback(() => {
    setData([]);
    fetchNotification();
  }, []);

  const fetchNotification = async () => {
    const res = await getNotificationInbox(9849, "MLENeeUtxrJE0rYHESEHYO");
    setRefreshing(false);
    setData(res);
  };

  useEffect(() => {
    fetchNotification();
  }, []);
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={({ item }) => <ListNotification item={item} />}
        keyExtractor={(item) => item.notification_id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
};

export default notification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});
