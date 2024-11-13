import { Stack, Link } from "expo-router";
import { Text, View } from "react-native";

export default function Home() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 16, textAlign: "center" }}>INDEX</Text>
      <Link href="/lock">Go to Lock</Link>
    </View>
  );
}
