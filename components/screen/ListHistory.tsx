import { FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { collection, doc, onSnapshot } from "@firebase/firestore";
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
    const subs = onSnapshot(historyRef, (snapshot) => {
      const data: any[] = [];
      snapshot.docs.forEach((doc) => {
        data.push({
          id: doc.id,
          set_point: doc.data().set_point,
          lama_fermentasi: doc.data().lama_fermentasi,
          timestamp: doc.data().timestamp,
        });
      });
      setData(data);
      console.log(data);
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
