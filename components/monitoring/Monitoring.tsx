import { Switch, useColorScheme } from "react-native";
import React, { useRef, useState } from "react";
import styles from "./monitoring.style";
import { Text, View } from "../Themed";
import Colors from "../../constants/Colors";

const currentDate = new Date();
const date = currentDate.getDate();
const month = currentDate.toLocaleString("en-US", { month: "long" });
const year = currentDate.getFullYear();

export default function Monitoring() {
  const [isEnabled, setIsEnabled] = useState(false);
  const [text, setText] = useState("Offline");
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const colorScheme = useColorScheme();

  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState);
    if (isEnabled) {
      setText("Offline");
    } else {
      setText("Online");
    }
    setIsRunning(!isRunning);
    if (isRunning) {
      clearInterval(intervalRef.current!);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
      setTime({ hours: 0, minutes: 0, seconds: 0 });
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => {
          const newTime = { ...prevTime };
          newTime.seconds++;
          if (newTime.seconds === 60) {
            newTime.seconds = 0;
            newTime.minutes++;
            if (newTime.minutes === 60) {
              newTime.minutes = 0;
              newTime.hours++;
            }
          }
          return newTime;
        });
      }, 1000);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.status}>status</Text>
      <Text style={styles.tapestatus}>Tapai Belum Matang</Text>
      <View style={styles.sisteminfo}>
        <Text style={styles.textlabel}>Aktivasi {`\n`}Sistem</Text>
        <Text style={styles.textlabel}>
          Sistem {`\n`}
          {text}
        </Text>
        <Switch
          onValueChange={toggleSwitch}
          value={isEnabled && isRunning}
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
        <Text style={styles.timeinfo}>
          {month} {date}, {year}
        </Text>
      </View>
      <View style={styles.timelabel}>
        <Text style={styles.textlabel}>lama {`\n`}fermantasi</Text>
        <Text style={styles.timeinfo}>
          {`${time.hours.toString().padStart(2, "0")}:${time.minutes
            .toString()
            .padStart(2, "0")}:${time.seconds.toString().padStart(2, "0")}`}
        </Text>
      </View>
    </View>
  );
}
