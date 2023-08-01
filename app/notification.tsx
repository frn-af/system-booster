import React, { useEffect, useState } from "react";
import { Text, View } from "../components/Themed";
import { getNotificationInbox } from "native-notify";
import { FlatList, StyleSheet } from "react-native";
import ListNotification from "../components/screen/ListNotification";

const notification = () => {
  const [data, setData] = useState<any>([]);

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
