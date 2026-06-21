import Ionicons from "@expo/vector-icons/Ionicons"
import { Tabs, Stack } from "expo-router"
import React from "react"
import { useMMKVBoolean } from "react-native-mmkv"

const Layout = () => {
    const [darkmode, setDarkmode] = useMMKVBoolean('darkmode')

    return (
        <Tabs screenOptions={{ tabBarInactiveTintColor: '#ccc', tabBarActiveTintColor: darkmode ? "white" : 'black', tabBarStyle: { backgroundColor: darkmode ? 'black' : 'white' } }}>
            <Tabs.Screen name="index" options={{ title: 'Home', headerShown: false, tabBarIcon: ({ size, color, focused }) => <Ionicons color={color} size={size} name={focused ? "home" : "home-outline"} /> }} />
            <Tabs.Screen name="expenses" options={{ title: 'Expenses', headerShown: false, tabBarIcon: ({ size, color, focused }) => <Ionicons color={color} size={size} name={focused ? "cash" : "cash-outline"} /> }} />
            <Tabs.Screen name="scan" options={{ title: "Scan QR", tabBarIcon: ({ size, color, focused }) => <Ionicons color={color} size={size} name={focused ? 'qr-code' : 'qr-code-outline'} /> }} />
            <Tabs.Screen name="profile" options={{ headerStyle: { backgroundColor: darkmode ? "black" : "white" }, headerTitleStyle: { color: darkmode ? "white" : "black" }, title: 'Profile', tabBarIcon: ({ size, color, focused }) => <Ionicons color={color} size={size} name={focused ? "person" : "person-outline"} /> }} />
        </Tabs>
    )
}

export default Layout