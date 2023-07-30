import { Button } from "react-native";
import { Text, View } from "../components/Themed";
import { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { FIREBASE_DB } from "../config/FirebaseConfig";
import { FlatList } from "react-native-gesture-handler";

function Notification() {
  const [notification, setNotification] = useState<any>();

  useEffect(() => {
    const notifRef = collection(FIREBASE_DB, "notification");
    const q = query(notifRef, orderBy("timestamp", "desc"));

    const subs = onSnapshot(q, (snapshot) => {
      const data: any[] = [];
      snapshot.docs.forEach((doc) => {
        data.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setNotification(data);
    });

    return () => subs();
  }, []);

  return (
    <View>
      <Text>Notification</Text>
      <FlatList
        data={notification}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Text>{item.title}</Text>}
      />
    </View>
  );
}

export default Notification;
