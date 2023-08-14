import { FlatList, RefreshControl } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "@firebase/firestore";
import { FIREBASE_DB } from "../../config/FirebaseConfig";
import { View } from "../Themed";
import Accordion from "../accordion/Accordion";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

interface Item {
  id: string;
  set_point: string;
  lama_fermentasi: string;
  timestamp: string;
  suhu: number[];
  kelembaban: number[];
}

const ListHistory = () => {
  const [data, setData] = useState<Item[]>();
  const [refreshing, setRefreshing] = useState(true);

  const onRefresh = useCallback(() => {
    setData([]);
    getdata();
  }, []);

  const getdata = async () => {
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
      setRefreshing(false);
      setData(data);
    });
  };

  useEffect(() => {
    getdata();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Accordion item={item} />}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
};

export default ListHistory;
