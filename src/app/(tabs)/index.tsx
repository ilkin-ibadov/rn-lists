import { TouchableOpacity, View, StyleSheet, Text, TextInput, ScrollView, Alert } from 'react-native'
import React, { useState } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons'
import { useRouter } from 'expo-router'
import { useMMKVObject } from "react-native-mmkv"
import { StyledText, StyledView } from '@/components/StyledComponents'
import CategoryCard from '@/components/CategoryCard'
import ModalComponent from '@/components/ModalComponent'

const HomePage = () => {
  const [expense, setExpense] = useState({
    name: '',
    category: 'any',
    amount: 0,
  })
  const [topup, setTopup] = useState(0)
  const [isExpModalVisible, setExpModalVisible] = useState(false);
  const [isTopModalVisible, setTopModalVisible] = useState(false);
  const [userInfo, setUserInfo] = useMMKVObject('userInfo')
  const [cardInfo, setCardInfo] = useMMKVObject('cardInfo')
  const router = useRouter()

  const topupOptions = [50, 100, 250, 500]

  const selectOptions = [
    {
      title: 'Shopping',
      value: 'shopping',
      icon: 'cart-outline'
    },
    {
      title: 'Grocery',
      value: 'grocery',
      icon: 'cube-outline'
    },
    {
      title: 'Pharmacy',
      value: 'pharmacy',
      icon: 'medkit-outline'
    },
    {
      title: 'Bills',
      value: 'bills',
      icon: 'wallet-outline'
    },
  ]

  const toggleExpModal = () => {
    setExpModalVisible(prevState => !prevState);
  };

  const toggleTopModal = () => {
    setTopModalVisible(prevState => !prevState);
  };

  return (
    <StyledView>
      <ModalComponent isModalVisible={isExpModalVisible} setModalVisible={setExpModalVisible}>
        <View className='h-[460px] bg-white rounded-t-3xl p-5'>
          <View className='mb-5'>
            <Text className='mb-1'>Expense name</Text>
            <TextInput onChangeText={(text) => {
              setExpense(prevState => ({ ...prevState, name: text }))
            }} placeholder='Enter expense name' className='border rounded-lg border-zinc-400 pl-3' />
          </View>

          <View>
            <Text className='mb-1'>Expense amount</Text>
            <TextInput inputMode='numeric' onChangeText={(text) => {
              setExpense(prevState => ({ ...prevState, amount: Number(text) }))
            }} placeholder='Enter amount' className='border rounded-lg border-zinc-400 pl-3' />
          </View>

          <View className='mt-5'>
            <Text>Select Category</Text>
            <View className='flex-row flex-wrap gap-4 mt-2'>
              {
                selectOptions.map(item => <TouchableOpacity
                  className={`flex-row p-5 border ${item.value === expense.category ? "bg-amber-600" : "border-amber-600"} w-[48%] justify-center items-center gap-2 rounded-xl`}
                  onPress={() => {
                    setExpense(prevState => ({ ...prevState, category: item.value }))
                  }}>
                  <Ionicons color={item.value === expense.category ? "white" : 'black'} size={24} name={item.icon} />
                  <Text className={`${item.value === expense.category ? "text-white font-bold" : "text-black"}`}>{item.title}</Text>
                </TouchableOpacity>)
              }
            </View>
          </View>

          <TouchableOpacity onPress={() => {
            Alert.alert('Expense added')
            setCardInfo(prevState => ({ ...prevState, balance: Number(prevState.balance) - expense.amount, expenses: [...(prevState.expenses || []), expense] }))
          }} className='bg-[#191b4b] py-5 rounded-2xl mt-6'>
            <Text className='text-white text-center font-medium text-lg'>Add</Text>
          </TouchableOpacity>
        </View>
      </ModalComponent>

      <ModalComponent isModalVisible={isTopModalVisible} setModalVisible={setTopModalVisible}>
        <View className='h-[350px] bg-white rounded-t-3xl p-5'>
          <View>
            <Text className='mb-1'>Topup amount</Text>
            <TextInput inputMode='numeric' onChangeText={(text) => {
              setTopup(Number(text))
            }} value={topup.toString()} placeholder='Enter amount' className='border rounded-lg border-zinc-400 pl-3' />
          </View>

          <View className='flex-row flex-wrap justify-between gap-4 mt-6'>
            {topupOptions.map(item => <TouchableOpacity onPress={() => {
              setTopup(item)
            }} className='w-[48%] rounded-xl border border-amber-600 p-5'><Text className='text-center'>{item}</Text></TouchableOpacity>)}
          </View>

          <TouchableOpacity onPress={() => {
            setCardInfo(prevState => ({ ...prevState, balance: Number(prevState.balance) + topup }))
          }} className='bg-[#191b4b] py-5 rounded-2xl mt-8'>
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