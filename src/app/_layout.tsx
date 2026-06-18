import "../../global.css"
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import { Stack } from "expo-router";
import { useMMKVBoolean } from "react-native-mmkv"

export default function RootLayout() {
  const [darkmode, setDarkmode] = useMMKVBoolean('darkmode')

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <Stack screenOptions={{ headerStyle: { backgroundColor: darkmode ? "black" : "white" }, headerTitleStyle: { color: darkmode ? "white" : "black" } }}>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="details" options={{ title: "Details" }} />
          <Stack.Screen name="register" options={{ title: "Register" }} />
          <Stack.Screen name="editinfo" options={{ title: "Edit User" }} />
          <Stack.Screen name="addcart" options={{ title: "Add Cart" }} />
        </Stack>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
