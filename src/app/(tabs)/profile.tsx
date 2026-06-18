import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons'
import { FlashList } from "@shopify/flash-list"
import { useRouter } from 'expo-router'
import { useMMKVBoolean } from 'react-native-mmkv'
import { StyledView, StyledText } from '@/components/StyledComponents'

const Profile = () => {
  const [darkmode, setDarkmode] = useMMKVBoolean('darkmode')
  const router = useRouter()

  const menu_items = [
    {
      title: "Edit Personal Info",
      icon: () => <Ionicons size={24} name='person-outline' />,
      route: '/editinfo'
    },
    {
      title: "Add Card",
      icon: () => <Ionicons size={24} name='card-outline' />,
      route: '/addcart'
    },

  ]

  return (
    <StyledView className='p-5'>
      <FlashList data={menu_items} renderItem={({ item }) => <TouchableOpacity
        className='bg-white p-5 mb-4 rounded-lg flex-row items-center justify-between border border-zinc-300'
        onPress={() => {
          router.push(item.route as any)
        }}>
        <View className='flex-row items-center gap-4'>
          {item.icon()}
          <Text className='font-medium text-lg'>{item.title}</Text>
        </View>
        <Ionicons size={20} name='chevron-forward-outline' />
      </TouchableOpacity>} />

      <TouchableOpacity onPress={() => {
        setDarkmode(prevState => !prevState)
      }} className='bg-black py-4 rounded-xl'>
        <Text className='text-white text-center'>{darkmode ? "Disable" : "Enable"} Darkmode</Text>
      </TouchableOpacity>
    </StyledView>
  )
}

export default Profile