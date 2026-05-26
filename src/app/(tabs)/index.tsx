import { StatusBar } from 'expo-status-bar';
import { Pressable, Text, View } from 'react-native';

export default function HomeScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-slate-100 dark:bg-slate-900">
      <View className="mx-6 rounded-2xl bg-white p-8 shadow-lg dark:bg-slate-800">
        <Text className="mb-2 text-center text-3xl font-bold text-red-600 dark:text-white">
          NativeWind
        </Text>
        <Text className="mb-6 text-center text-base text-slate-600 dark:text-slate-300">
          Expo SDK 56 + Tailwind CSS
        </Text>
        <Pressable className="rounded-xl bg-blue-500 px-6 py-3 active:bg-blue-600">
          <Text className="text-center text-base font-semibold text-white">
            It works!
          </Text>
        </Pressable>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}
