import React, { useCallback, useEffect, useState } from "react";
import { View } from "../components/Themed";
import { getNotificationInbox } from "native-notify";
import { FlatList, StyleSheet } from "react-native";
import ListNotification from "../components/screen/ListNotification";
import { RefreshControl } from "react-native-gesture-handler";

const notification = () => {
  const [data, setData] = useState<any>([]);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  useEffect(() => {
    const fetchNotification = async () => {
      const res = await getNotificationInbox(9849, "MLENeeUtxrJE0rYHESEHYO");
      setData(res);
    };

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
