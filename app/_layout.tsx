import { Stack } from "expo-router";
import "./global.css";
export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="login/index" />
      <Stack.Screen name="register/index" />
      <Stack.Screen name="home/index" />
      <Stack.Screen name="profile/index" />
    </Stack>
  );
}
