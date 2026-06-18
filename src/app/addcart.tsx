import { Text, TextInput, View, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useMMKVObject } from 'react-native-mmkv'
import { useRouter } from 'expo-router'

const Addcart = () => {
    const [userInfo, setUserInfo] = useMMKVObject('userInfo')
    const [cardInfo, setCardInfo] = useMMKVObject('cardInfo')
    const [formData, setFormData] = useState({
        number: '',
        cvv: '',
        expdate: '',
        balance: ''
    })
    const [errors, setErrors] = useState({})

    const router = useRouter()

    const handleInput = (key, value) => {
        setFormData(prevState => ({
            ...prevState,
            [key]: value
        }))
    }

    const handleValidation = () => {
        setErrors({
            number: '',
            cvv: '',
            expdate: '',
        })

        let newErrors = {}

        if (formData.number.length !== 16) newErrors = { ...newErrors, number: 'Invalid card number' }
        if (formData.expdate.length !== 4) newErrors = { ...newErrors, expdate: 'Invalid expiration date' }
        if (formData.cvv.length !== 3) newErrors = { ...newErrors, cvv: 'Invalid CVV code' }

        setErrors(newErrors)

        return Object.values(newErrors).every(item => item === "")
    }

    useEffect(() => {
       if(cardInfo) setFormData(cardInfo)
    }, [cardInfo])

    return (
        <View className='flex-1 p-5'>
            <Text className='text-3xl font-medium mb-5'>Add Card Details</Text>
            <View className='relative w-full p-5 h-[210px] bg-linear-to-r from-blue-300 to-blue-700 rounded-2xl'>
                <Text className='text-white font-bold text-3xl'>{`${formData.number.slice(0, 4)}${formData.number.length >= 4 ? '-' : ''}${formData.number.slice(4, 8)}${formData.number.length >= 8 ? '-' : ''}${formData.number.slice(8, 12)}${formData.number.length >= 12 ? '-' : ''}${formData.number.slice(12, 16)}`}</Text>

                <Text className='absolute bottom-5 left-5 text-white font-medium'>{userInfo?.name.toUpperCase()} {userInfo?.surname.toUpperCase()}</Text>

                <View className='absolute bottom-5 right-5 flex-row gap-6'>
                    <Text className='text-white font-medium'>{formData.expdate.slice(0, 2)}{formData.expdate.length >= 2 ? '/' : ''}{formData.expdate.slice(2, 4)}</Text>
                    <Text className='text-white font-medium'>{formData.cvv}</Text>
                </View>
            </View>

            <View className='mt-5'>
                <View>
                    <Text className='mb-1'>Card number:</Text>
                    <TextInput maxLength={16} inputMode='numeric' onChangeText={(text) => {
                        handleInput("number", text)
                    }} value={formData.number} placeholder='Enter your card number' className='border rounded-lg border-zinc-400 pl-3' />
                    <Text className='text-red-700 text-sm'>{errors?.number}</Text>
                </View>
                <View>
                    <Text className='mb-1'>Expiration date:</Text>
                    <TextInput maxLength={4} inputMode='numeric' onChangeText={(text) => {
                        handleInput("expdate", text)
                    }} value={formData.expdate} placeholder='Enter the date' className='border rounded-lg border-zinc-400 pl-3' />
                    <Text className='text-red-700 text-sm'>{errors?.expdate}</Text>
                </View>
                <View>
                    <Text className='mb-1'>CVV:</Text>
                    <TextInput maxLength={3} inputMode='numeric' onChangeText={(text) => {
                        handleInput("cvv", text)
                    }} value={formData.cvv} placeholder='Enter your CVV' className='border rounded-lg border-zinc-400 pl-3' />
                    <Text className='text-red-700 text-sm'>{errors?.cvv}</Text>
                </View>
                <View>
                    <Text className='mb-1'>Initial Balance (optional):</Text>
                    <TextInput inputMode='numeric' onChangeText={(text) => {
                        handleInput("balance", text)
                    }} value={formData.balance} placeholder='Enter initial balance' className='border rounded-lg border-zinc-400 pl-3' />
                </View>

                <TouchableOpacity onPress={() => {
                    if (handleValidation()) {
                        Alert.prompt("Card successfully saved")
                        setCardInfo(formData)
                        router.back()
                    }
                }} className='bg-[#191b4b] py-5 rounded-2xl mt-3'>
                    <Text className='text-white text-center font-medium text-lg'>Save</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Addcart