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
    if (nextAppState === "inactive") {
      router.push("/(modals)/white");
    } else {
      if (router.canGoBack()) {
        router.back();
      }
    }

    if (nextAppState === "background") {
      recordStartTime();
    } else if (
      nextAppState === "active" &&
      appState.current.match(/background/)
    ) {
      const elapsed = Date.now() - (storage.getNumber("startTime") || 0);

      if (elapsed >= LOCK_TIME) {
        router.push("/(modals)/lock");
      }
    }
    appState.current = nextAppState;
  };

  const recordStartTime = () => {
    storage.set("startTime", Date.now());
  };

  return children;
};
