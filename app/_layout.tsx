import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import { useColorScheme } from "react-native";
import notifee, { AndroidImportance, EventType } from "@notifee/react-native";
import messaging from "@react-native-firebase/messaging";
import { addDoc, collection } from "firebase/firestore";
import { FIREBASE_DB } from "../config/FirebaseConfig";
// Import the ErrorBoundary and unstable_settings from Expo Router.
// The ErrorBoundary is used to catch errors in the navigation tree.
// The unstable_settings are used to ensure that reloading on `/modal` keeps a back button present.
// See:
// - https://reactnavigation.org/docs/error-boundaries/
// - https://reactnavigation.org/docs/stack-navigator/#unstable_disabledefaultui
export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

export default function RootLayout() {
  const [loaded, error] = useFonts({
    Poppins: require("../assets/fonts/Poppins-Regular.ttf"),
    PoppinsSemiBold: require("../assets/fonts/Poppins-SemiBold.ttf"),

    ...FontAwesome.font,
  });

  function displayNotification(title: string, body: string, id: string) {
    // Display a notification
    notifee.displayNotification({
      title: title,
      body: body,
      android: {
        channelId: "default",
        importance: AndroidImportance.HIGH,
      },
      id: id,
    });
  }

  let notificationID: string | null = null;
  const createNotification = async (title: string, body: string) => {
    const notificationRef = collection(FIREBASE_DB, "notification");
    const payload = {
      title: title,
      body: body,
      timestamp: new Date().getTime(),
    };
    await addDoc(notificationRef, payload);
  };

  messaging().onMessage((remoteMessage) => {
    if (notificationID != null) {
      notifee.cancelNotification(notificationID);
    }

    console.log("A new FCM message arrived!", JSON.stringify(remoteMessage));

    const title = remoteMessage.notification?.title;
    const body = remoteMessage.notification?.body;

    displayNotification(
      title ? title : "No Title",
      body ? body : "No Body",
      notificationID ? notificationID : "No ID"
    );
  });

  messaging().setBackgroundMessageHandler(async (remoteMessage) => {
    console.log(
      "Message handled in the background!",
      JSON.stringify(remoteMessage)
    );
    const title = remoteMessage.notification?.title;
    const body = remoteMessage.notification?.body;

    createNotification(title ? title : "No Title", body ? body : "No Body");
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  return (
    <>
      {/* Keep the splash screen open until the assets have loaded. In the future, we should just support async font loading with a native version of font-display. */}
      {!loaded && <SplashScreen />}
      {loaded && <RootLayoutNav />}
    </>
  );
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </ThemeProvider>
    </>
  );
}
