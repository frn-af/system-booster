import { FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "@firebase/firestore";
import { FIREBASE_DB } from "../../config/FirebaseConfig";
import { Text, View } from "../Themed";
import Accordion from "../accordion/Accordion";

interface Item {
  id: string;
  set_point: string;
  lama_fermentasi: string;
  timestamp: string;
}

const ListHistory = () => {
  const [data, setData] = useState<Item[]>();

  useEffect(() => {
    const historyRef = collection(FIREBASE_DB, "history");

    //order by timestamp
    const q = query(historyRef, orderBy("timestamp", "desc"));

    const subs = onSnapshot(q, (snapshot) => {
      const data: any[] = [];
      snapshot.docs.forEach((doc) => {
        data.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setData(data);
    });

    return () => subs();
  }, []);

  return (
    <View>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Accordion item={item} />}
      />
    </View>
  );
};

export default ListHistory;
