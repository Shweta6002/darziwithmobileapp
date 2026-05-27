import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { View, ActivityIndicator } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  // Safe area structure and simple loading guard simulator
  const [appIsReady, setAppIsReady] = React.useState(true);

  if (!appIsReady) {
    return (
      <View style={{ flex: 1, backgroundColor: "#faf9f6", justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="small" color="#c5a880" />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: "#faf9f6" },
          animation: "fade_from_bottom",
        }}
      >
        {/* Main tabs routing */}
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        {/* Core detailed profile pages */}
        <Stack.Screen name="product/[id]" options={{ presentation: "card" }} />
        {/* Onboarding modules */}
        <Stack.Screen name="measure/index" options={{ presentation: "modal" }} />
        {/* Secure checkout page */}
        <Stack.Screen name="checkout/index" options={{ presentation: "modal" }} />
      </Stack>
    </SafeAreaProvider>
  );
}
