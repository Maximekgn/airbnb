import useAuthStore from "@/stores/authStore";
import { Stack, useRouter, useSegments } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import "./global.css";

const PUBLIC_ROUTES = ["index", "login", "register"];

export default function RootLayout() {
  const router = useRouter();
  const segments = useSegments();
  const isAuthenticated = useAuthStore((state: any) => state.isAuthenticated);
  const hasHydrated = useAuthStore((state: any) => state.hasHydrated);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!hasHydrated) return;

    // Give the Stack time to mount before attempting navigation
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 0);

    return () => clearTimeout(timer);
  }, [hasHydrated]);

  useEffect(() => {
    if (!isReady) return;

    const current = segments[0] || "index";
    const isPublic = PUBLIC_ROUTES.includes(current);
    const isProtected =
      current === "home" ||
      current === "profile" ||
      (current === "houses" && segments[1] === "add");

    if (!isAuthenticated && isProtected) {
      router.replace("/login");
      return;
    }

    if (isAuthenticated && isPublic) {
      router.replace("/home");
    }
  }, [segments, isAuthenticated, isReady, router]);

  if (!hasHydrated) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="login/index" />
      <Stack.Screen name="register/index" />
      <Stack.Screen name="home/index" />
      <Stack.Screen name="profile/index" />
      <Stack.Screen name="houses/index" />
      <Stack.Screen name="houses/[id]" />
      <Stack.Screen name="houses/add/index" />
    </Stack>
  );
}
