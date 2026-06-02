import { Stack } from "expo-router";

const Layout = () => {
    return (
        <Stack>
            <Stack.Screen name="index" options={{ title: 'Login' }} />
            <Stack.Screen name="register" options={{ title: 'Register' }} />
        </Stack>
    )
}

export default Layout