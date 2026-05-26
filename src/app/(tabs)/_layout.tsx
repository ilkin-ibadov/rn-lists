import { Tabs } from "expo-router";
import Ionicons from '@expo/vector-icons/Ionicons';

export default function TabsLayout() {
  return <Tabs screenOptions={{tabBarActiveTintColor: 'red'}}>
    <Tabs.Screen name="index" options={{title: "Home", tabBarIcon: ({size, color, focused}) => <Ionicons color={color} size={size} name={focused ? 'home': 'home-outline'}/>}}/>
    <Tabs.Screen name="about" options={{title: "About", tabBarIcon: ({size, color, focused}) => <Ionicons color={color} size={size} name={focused ? 'information' : 'information-circle-outline'}/>}}/>
    <Tabs.Screen name="profile" options={{title: "Profile", tabBarIcon: ({size, color, focused}) => <Ionicons color={color} size={size} name='person-outline'/>}}/>
  </Tabs>;
}
