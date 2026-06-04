import "../../global.css"
import { Stack, useRouter } from "expo-router";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { StatusBar } from "expo-status-bar";
import { useMMKVBoolean } from 'react-native-mmkv'
import { useEffect } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "@/hooks/useAuth";

export default function RootLayout() {
  const { isAuthenticated } = useAuth()
  const [darkmode, setDarkmode] = useMMKVBoolean('darkmode')

  const router = useRouter()

  useEffect(() => {
    router.replace(isAuthenticated ? '/(tabs)' : '/(auth)')
  }, [isAuthenticated])

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardProvider>
          <Stack screenOptions={{ headerStyle: { backgroundColor: 'black' } }}>
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="user" options={{ headerShown: false }} />
          </Stack>
          <StatusBar style={darkmode ? "light" : "dark"} />
        </KeyboardProvider>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
