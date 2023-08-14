import React, { useEffect, useState } from "react";
import { Text, View } from "../Themed";
import { StyleSheet } from "react-native";
import { formatDistanceToNow, parse } from "date-fns";
import { enUS, id } from "date-fns/locale";

interface notificationData {
  date: string;
  message: string;
  title: string;
  notification_id: number;
}

interface ListNotificationProps {
  item: notificationData;
}

const ListNotification: React.FC<ListNotificationProps> = ({ item }) => {
  const [time, setTime] = useState<string>();

  const getTimefromTimestamp = (timestamp: string) => {
    const currentDate = new Date();
    const parsedTimestamp = parse(timestamp, "M-d-yyyy h:mma", currentDate);
    return formatDistanceToNow(parsedTimestamp, {
      addSuffix: true,
      includeSeconds: true,
      locale: id,
    });
  };

  useEffect(() => {
    const timestap = item.date;
    const timedifference = getTimefromTimestamp(timestap);
    setTime(timedifference);
  }, []);

  return (
    <View style={styles.wrapper}>
      <View style={{ flexGrow: 1, width: "70%" }}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.message}>{item.message}</Text>
      </View>
      <Text style={styles.date}>{time}</Text>
    </View>
  );
};

export default ListNotification;

const styles = StyleSheet.create({
  wrapper: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#FF7235",
    flexDirection: "row",
    gap: 20,
  },
  date: {
    width: 70,
    fontSize: 12,
    color: "#FF7235",
    fontFamily: "Poppins",
  },
  title: {
    fontSize: 12,
    fontFamily: "Poppins",
  },
  message: {
    fontSize: 16,
    fontFamily: "PoppinsSemiBold",
  },
});
