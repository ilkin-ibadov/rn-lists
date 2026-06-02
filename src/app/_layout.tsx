import "../../global.css"
import { Stack, useRouter } from "expo-router";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { StatusBar } from "expo-status-bar";
import { useMMKVBoolean, useMMKVString } from 'react-native-mmkv'
import { useEffect } from "react";

export default function RootLayout() {
  const [darkmode, setDarkmode] = useMMKVBoolean('darkmode')
  const [accessToken, setAccessToken] = useMMKVString('accessToken')

  const router = useRouter()

  useEffect(() => {
    router.replace(accessToken ? '/(tabs)' : '/(auth)')
  }, [accessToken])

  return (
    <KeyboardProvider>
      <Stack screenOptions={{ headerStyle: { backgroundColor: 'black' } }}>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style={darkmode ? "light" : "dark"} />
    </KeyboardProvider>
  );
}
