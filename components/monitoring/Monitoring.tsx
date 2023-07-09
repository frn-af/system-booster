import { Switch, TouchableOpacity, useColorScheme } from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import styles from "./monitoring.style";
import { Text, View } from "../Themed";
import Colors from "../../constants/Colors";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
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
  const [fermentasi, setFermentasi] = useState("--");
  const [time, setTime] = useState();
  const [points, setPoints] = useState<number>(0);
  const colorScheme = useColorScheme();

  const modalRef = useRef<BottomSheetRefProps>(null);

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
    const q = doc(timeRef, "monitoring");
    const data = {
      kontrol: !isEnabled,
      setpoint: points,
    };
    await updateDoc(q, data);
  };

  const createHistory = async () => {
    const historyRef = collection(FIREBASE_DB, "history");
    const data = {
      set_point: points,
      lama_fermentasi: fermentasi,
      timestamp: time,
    };
    await addDoc(historyRef, data);
  };

  const { data } = useDoc("tools", "monitoring");
  const { data: timeinfo } = useDoc("tools", "time");

  useEffect(() => {
    if (timeinfo) {
      setFermentasi(timeinfo?.fermentasi);
      setTime(timeinfo?.timestamp);
    }

    if (data?.kontrol == true) {
      setIsEnabled(true);
    } else {
      setIsEnabled(false);
    }
  }, []);

  const toggleSwitch = () => {
    openModal();
  };

  const onPress = () => {
    setIsEnabled((previousState) => !previousState);
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
            value={isEnabled}
            thumbColor={isEnabled ? "#f5f5f5" : "#f5f5f5"}
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
          <Text style={styles.timeinfo}>{time}</Text>
        </View>
        <View style={styles.timelabel}>
          <Text style={styles.textlabel}>lama {`\n`}fermantasi</Text>
          <Text style={styles.timeinfo}>
            {isEnabled === true && fermentasi}
            {isEnabled === false && "--"}
          </Text>
        </View>
      </View>
      <Card />
      <BottomSheet ref={modalRef}>
        <View style={{ flex: 1, alignItems: "center" }}>
          {isEnabled === true && (
            <Text style={styles.modallabel}>Matikan Sistem</Text>
          )}
          {isEnabled === false && (
            <Text style={styles.modallabel}>Masukan Nilai Set Point</Text>
          )}
          {isEnabled === false && (
            <TextInput
              placeholder="Number"
              keyboardType="numeric"
              style={styles.input}
              onChangeText={(text) => {
                if (isNaN(Number(text))) {
                  setPoints(0);
                } else {
                  setPoints(Number(text));
                }
              }}
              value={points?.toString()}
              placeholderTextColor="#FF7235"
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
