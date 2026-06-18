import { Image, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'expo-router'
import OnboardingRegister from '@/components/OnboardingRegister'
import { useMMKVObject } from "react-native-mmkv";

const Onboarding = () => {
  const [userInfo, setUserInfo] = useMMKVObject('userInfo')
  const [step, setStep] = useState(1)
  const router = useRouter()

  useEffect(() => {
    if (step === 4 || userInfo?.name) {
      router.push('/(tabs)')
    }
  }, [step])

  return (
    <View className='flex-1 bg-[#191b4b] justify-center relative'>
      {step === 1 ? <View className='px-16'>
        <Image source={require('../../assets/onboarding1.png')} className='size-[300px]' />
        <Text className='text-white text-[30px] font-semibold text-center leading-6'>Track your expenses, save money</Text>
        <Text className='text-[20px] text-zinc-200 font-light text-center mt-3'>Remember to keep track of your daily expenses</Text>
      </View> : step === 2 ? <View className='px-16'>
        <Image source={require('../../assets/onboarding1.png')} className='size-[300px]' />
        <Text className='text-white text-[30px] font-semibold text-center leading-6'>Stay organized</Text>
        <Text className='text-[20px] text-zinc-200 font-light text-center mt-3'>Take control of your spending</Text>
      </View> : <OnboardingRegister setStep={setStep} />}

      <View className='w-full px-16 flex-row justify-between items-center absolute bottom-12'>
        {step < 3 && <>
          <TouchableOpacity onPress={() => {
            setStep(4)
          }} className=''>
            <Text className='text-white font-bold text-2xl'>SKIP</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => {
            setStep(prevState => prevState + 1)
          }} className={`px-10 w-fit py-5 bg-black rounded-full`}>
            <Text className='text-white font-bold text-2xl text-center'>{step === 3 ? "START" : "NEXT"}</Text>
          </TouchableOpacity>
        </>}

      </View>
    </View>
  )
}

export default Onboarding