import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import { UserInactivityProvider } from "@/context/UserInactivity";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <UserInactivityProvider>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack>
          {/* <Stack.Screen name="(tabs)" options={{ headerShown: false }} /> */}
          {/* <Stack.Screen name="+not-found" /> */}
          <Stack.Screen
            name="(modals)/white"
            options={{ headerShown: false, animation: "none" }}
          />
          <Stack.Screen
            name="(modals)/lock"
            options={{ headerShown: false, animation: "none" }}
          />
        </Stack>
      </ThemeProvider>
    </UserInactivityProvider>
  );
}
