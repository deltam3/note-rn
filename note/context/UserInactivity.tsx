import { MMKV } from "react-native-mmkv";
import { useEffect, useRef } from "react";
import { AppState } from "react-native";
import { useRouter } from "expo-router";

const storage = new MMKV({
  id: "UserInactivity",
});

const LOCK_TIME = 3000;

export const UserInactivityProvider = ({ children }: any) => {
  const appState = useRef(AppState.currentState);
  const router = useRouter();

  useEffect(() => {
    const subscription = AppState.addEventListener(
      "change",
      handleAppStateChange
    );
  }, []);

  const handleAppStateChange = (nextAppState: any) => {
    console.log("appState", appState.current, nextAppState);
  };

  return children;
};
