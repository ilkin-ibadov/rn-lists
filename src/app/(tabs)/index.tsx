import { TouchableOpacity, View, StyleSheet, Text, TextInput } from 'react-native'
import React, { useState } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons'
import { useRouter } from 'expo-router'
import { useMMKVObject } from "react-native-mmkv"
import { StyledText, StyledView } from '@/components/StyledComponents'
import CategoryCard from '@/components/CategoryCard'
import ModalComponent from '@/components/ModalComponent'

const HomePage = () => {
  const [expense, setExpense] = useState(0)
  const [topup, setTopup] = useState(0)
  const [isExpModalVisible, setExpModalVisible] = useState(false);
  const [isTopModalVisible, setTopModalVisible] = useState(false);
  const [userInfo, setUserInfo] = useMMKVObject('userInfo')
  const [cardInfo, setCardInfo] = useMMKVObject('cardInfo')
  const router = useRouter()

  const toggleExpModal = () => {
    setExpModalVisible(prevState => !prevState);
  };

  const toggleTopModal = () => {
    setTopModalVisible(prevState => !prevState);
  };

  return (
    <StyledView>
      <ModalComponent isModalVisible={isExpModalVisible} setModalVisible={setExpModalVisible}>
        <View className='h-[300px] bg-white rounded-t-3xl p-5'>
          <View>
            <Text className='mb-1'>Expense amount</Text>
            <TextInput inputMode='numeric' onChangeText={(text) => {
              setExpense(Number(text))
            }} placeholder='Enter amount' className='border rounded-lg border-zinc-400 pl-3' />
          </View>

          <TouchableOpacity onPress={() => {
            setCardInfo(prevState => ({ ...prevState, balance: Number(prevState.balance) - expense }))
          }} className='bg-[#191b4b] py-5 rounded-2xl mt-20'>
            <Text className='text-white text-center font-medium text-lg'>Add</Text>
          </TouchableOpacity>
        </View>
      </ModalComponent>

      <ModalComponent isModalVisible={isTopModalVisible} setModalVisible={setTopModalVisible}>
        <View className='h-[300px] bg-white rounded-t-3xl p-5'>
          <View>
            <Text className='mb-1'>Topup amount</Text>
            <TextInput inputMode='numeric' onChangeText={(text) => {
              setTopup(Number(text))
            }} placeholder='Enter amount' className='border rounded-lg border-zinc-400 pl-3' />
          </View>

          <TouchableOpacity onPress={() => {
            setCardInfo(prevState => ({ ...prevState, balance: Number(prevState.balance) + topup }))
          }} className='bg-[#191b4b] py-5 rounded-2xl mt-20'>
            <Text className='text-white text-center font-medium text-lg'>Add</Text>
          </TouchableOpacity>
        </View>
      </ModalComponent>


      <View className='h-[250px] bg-[#191b4b] px-10 py-7 rounded-b-[50px] flex-row justify-between'>
        <StyledText className='text-white text-xl font-medium'>Welcome Back!</StyledText>

        <View className='self-end gap-2'>
          <StyledText className='text-white text-xl'>{userInfo.name ? `${userInfo?.name} ${userInfo?.surname}` : "Guest"}</StyledText>
          <StyledText className='text-4xl text-white font-semibold'>${cardInfo?.balance}</StyledText>
          <StyledText className='text-white font-light'>Available Balance</StyledText>
        </View>
      </View>

      <View className='p-5'>
        <View className='flex-row items-center justify-between mt-4'>
          <StyledText className='text-3xl font-bold'>Activities</StyledText>
          <StyledText className='font-medium'>Monthly report</StyledText>
        </View>

        <View className='flex-row items-center justify-between mt-5'>
          <TouchableOpacity onPress={toggleExpModal} className='items-center p-5 bg-[#ef7c35] rounded-xl w-[48%]'>
            <Ionicons color={'white'} size={54} name='cash-outline' />
            <StyledText className='text-white font-bold'>Add expense</StyledText>
          </TouchableOpacity>

          <TouchableOpacity onPress={toggleTopModal} className='items-center p-5 bg-[#191b4b] rounded-xl w-[48%]'>
            <Ionicons color={'white'} size={54} name='add-circle-outline' />
            <StyledText className='text-white font-bold'>Topup</StyledText>
          </TouchableOpacity>
        </View>

        <View className='gap-4 mt-5'>
          <View className='w-full flex-row justify-between'>
            <CategoryCard title="Shopping" lastDate="20 June 2020" hour="2:20 PM" iconName="cart-outline" />
            <CategoryCard title="Grocery" lastDate="20 June 2020" hour="2:20 PM" iconName="cube-outline" />
          </View>

          <View className='w-full flex-row justify-between'>
            <CategoryCard title="Pharmacy" lastDate="20 June 2020" hour="2:20 PM" iconName="medkit-outline" />
            <CategoryCard title="Bills" lastDate="20 June 2020" hour="2:20 PM" iconName="wallet-outline" />
          </View>
        </View>
      </View>
    </StyledView>
  )
}

export default HomePage