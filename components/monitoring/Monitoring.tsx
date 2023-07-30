import { Switch, TouchableOpacity, useColorScheme } from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import styles from "./monitoring.style";
import { Text, View } from "../Themed";
import Colors from "../../constants/Colors";
import { collection, doc, setDoc, updateDoc } from "firebase/firestore";
import { FIREBASE_DB } from "../../config/FirebaseConfig";
import {
  GestureHandlerRootView,
  TextInput,
} from "react-native-gesture-handler";
import BottomSheet, { BottomSheetRefProps } from "../modal/Modal";
import Card from "../card/Card";
import useDoc from "../../hooks/useDoc";

export default function Monitoring() {
  const [isEnabled, setIsEnabled] = useState(false);
  const [points, setPoints] = useState<number>();
  const [date, setDate] = useState("");
  const [history, setHistory] = useState<any>("");
  const colorScheme = useColorScheme();

  const modalRef = useRef<BottomSheetRefProps>(null);
  const { data } = useDoc("tools", "monitoring");
  const { data: timeinfo } = useDoc("tools", "time");

  const openModal = useCallback(() => {
    const isActive = modalRef.current?.isActive();
    if (isActive) {
      modalRef.current?.scrollTo(0);
    } else {
      modalRef.current?.scrollTo(-700);
    }
  }, []);

  // close modal
  const closeModal = useCallback(() => {
    modalRef.current?.scrollTo(0);
  }, []);

  //make a function for update data
  const updateData = async () => {
    const timeRef = collection(FIREBASE_DB, "tools");
    const docRef = doc(timeRef, "monitoring");
    const payload = {
      kontrol: !data.kontrol,
      setpoint: points,
      history: history,
    };
    await updateDoc(docRef, payload);
  };

  const createHistory = async () => {
    const historyRef = collection(FIREBASE_DB, "history");
    const docRef = doc(historyRef, history);
    const payload = {
      set_point: points,
      lama_fermentasi: timeinfo?.time,
      timestamp: date,
      suhu: [],
      kelembaban: [],
    };
    await setDoc(docRef, payload);
  };

  useEffect(() => {
    const date = new Date();
    const time = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;

    setDate(time);
  }, []);

  const toggleSwitch = () => {
    openModal();
  };

  const onPress = () => {
    setIsEnabled(!data?.kontrol);
    updateData();
    closeModal();
    if (isEnabled === false) {
      createHistory();
    }
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.status}>status</Text>
        <Text style={styles.tapestatus}>
          {data?.kontrol == true && data?.ph <= 4 && "Tapai Sudah Matang"}
          {data?.kontrol == true && data?.ph > 4 && "Tapai Belum Matang"}
          {data?.kontrol == false && "Sistem Offline"}
        </Text>
        <View style={styles.sisteminfo}>
          <Text style={styles.textlabel}>Aktivasi {`\n`}Sistem</Text>
          <Text style={styles.textlabel}>
            Sistem {`\n`}
            {data?.kontrol == true && "Online"}
            {data?.kontrol == false && "Offline"}
          </Text>
          <Switch
            onValueChange={toggleSwitch}
            value={data?.kontrol}
            thumbColor={data?.kontrol ? "#f5f5f5" : "#f5f5f5"}
            trackColor={{ false: "#767577", true: "#FF7235" }}
            ios_backgroundColor={Colors[colorScheme ?? "light"].background}
            style={{
              transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }],
              marginRight: 10,
            }}
          />
        </View>
        <View style={styles.timelabel}>
          <Text style={styles.textlabel}>tanggal</Text>
          <Text style={styles.timeinfo}>{date}</Text>
        </View>
        <View style={styles.timelabel}>
          <Text style={styles.textlabel}>lama {`\n`}fermantasi</Text>
          <Text style={styles.timeinfo}>
            {data?.kontrol == true && timeinfo?.time}
            {data?.kontrol == false && "--"}
          </Text>
        </View>
      </View>
      <Card />
      <BottomSheet ref={modalRef}>
        <View style={{ flex: 1, alignItems: "center" }}>
          {data?.kontrol === true && (
            <Text style={styles.modallabel}>Matikan Sistem</Text>
          )}
          {data?.kontrol === false && (
            <Text style={styles.modallabel}>Masukan Nilai Set Point</Text>
          )}
          {data?.kontrol === false && (
            <TextInput
              placeholder="Please input history title"
              style={[
                styles.historyTitle,
                {
                  backgroundColor:
                    colorScheme === "dark" ? "#171717" : "#f1f1f1",
                  color: colorScheme === "dark" ? "#FF7235" : "#000",
                },
              ]}
              onChangeText={(text) => {
                setHistory(text);
              }}
              value={history}
              placeholderTextColor={
                colorScheme === "dark" ? "#825d4e" : "#808080"
              }
            />
          )}
          {data?.kontrol === false && (
            <TextInput
              placeholder="Number"
              keyboardType="numeric"
              style={[
                styles.input,
                {
                  backgroundColor:
                    colorScheme === "dark" ? "#171717" : "#f1f1f1",
                  color: colorScheme === "dark" ? "#FF7235" : "#000",
                },
              ]}
              onChangeText={(text) => {
                if (isNaN(Number(text))) {
                  setPoints(0);
                } else {
                  setPoints(Number(text));
                }
              }}
              value={points?.toString()}
              placeholderTextColor={
                colorScheme === "dark" ? "#825d4e" : "#808080"
              }
            />
          )}

          <TouchableOpacity onPress={onPress} style={styles.button}>
            <Text style={styles.buttontext}>Submit</Text>
          </TouchableOpacity>
        </View>
      </BottomSheet>
    </GestureHandlerRootView>
  );
}
