import { Switch, useColorScheme } from "react-native";
import React, { useEffect, useState } from "react";
import styles from "./monitoring.style";
import { Text, View } from "../Themed";
import Colors from "../../constants/Colors";
import { collection, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { FIREBASE_DB } from "../../config/FirebaseConfig";

export default function Monitoring() {
  const [isEnabled, setIsEnabled] = useState(false);
  const [text, setText] = useState("Offline");
  const [fermentasi, setFermentasi] = useState<any>();
  const [time, setTime] = useState();
  const [status, setStatus] = useState("Sistem Offline");
  const colorScheme = useColorScheme();

  //make a function for update data
  const updateData = async () => {
    const timeRef = collection(FIREBASE_DB, "tools");
    const q = doc(timeRef, "monitoring");
    const data = {
      kontrol: !isEnabled,
    };
    await updateDoc(q, data);
  };

  useEffect(() => {
    const Ref = collection(FIREBASE_DB, "tools");

    const q = doc(Ref, "time");
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data: any = snapshot.data();

      setFermentasi(data.fermentasi);

      setTime(data.timestamp);
    });

    const q2 = doc(Ref, "monitoring");
    const unsubscribe2 = onSnapshot(q2, (snapshot) => {
      const data: any = snapshot.data();
      setIsEnabled(data.kontrol);
      setText(data.kontrol ? "Online" : "Offline");
      if (data.kontrol == false) {
        setStatus("Sistem Offline");
      } else if (data.kontrol == true && data.ph <= 4) {
        setStatus("Tapai Sudah Matang");
      } else {
        setStatus("Tapai Belum Matang");
      }
    });

    return () => {
      unsubscribe();
      unsubscribe2();
    };
  }, []);

  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState);
    updateData();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.status}>status</Text>
      <Text style={styles.tapestatus}>{status}</Text>
      <View style={styles.sisteminfo}>
        <Text style={styles.textlabel}>Aktivasi {`\n`}Sistem</Text>
        <Text style={styles.textlabel}>
          Sistem {`\n`}
          {text}
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
  );
}
