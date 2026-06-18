import { Text, TextInput, View, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useMMKVObject } from 'react-native-mmkv'

const OnboardingRegister = ({ setStep }) => {
    const [userInfo, setUserInfo] = useMMKVObject('userInfo')
    const [formData, setFormData] = useState({
        name: '',
        surname: ''
    })
    const [errors, setErrors] = useState({
        name: '',
        surname: ''
    })

    const handleInput = (key, value) => {
        setFormData(prevState => ({
            ...prevState,
            [key]: value
        }))
    }

    const handleValidation = () => {
        setErrors({
            name: '',
            surname: ''
        })

        if (!formData.name) setErrors(prevState => ({ ...prevState, name: 'Name is missing' }))
        if (!formData.surname) setErrors(prevState => ({ ...prevState, surname: 'Surname is missing' }))

        return Boolean(!(errors.name.length && errors.surname.length))
    }

    return (
        <View className='flex-1 bg-white px-8 justify-center'>
            <Text className='text-4xl font-medium mb-4'>Add your info</Text>
            <View>
                <Text className='mb-1'>Name:</Text>
                <TextInput onChangeText={(text) => {
                    handleInput("name", text)
                }} value={formData.name} placeholder='Enter your name' className='border rounded-lg border-zinc-400 pl-3' />
                <Text className='text-red-700 text-sm'>{errors.name}</Text>
            </View>
            <View>
                <Text className='mb-1'>Surname:</Text>
                <TextInput onChangeText={(text) => {
                    handleInput("surname", text)
                }} value={formData.surname} placeholder='Enter your surname' className='border rounded-lg border-zinc-400 pl-3' />
                <Text className='text-red-700 text-sm'>{errors.surname}</Text>
            </View>

            <TouchableOpacity onPress={() => {
                console.log(handleValidation())
                if (handleValidation()) {
                    console.log("Click")
                    setUserInfo(formData)
                    setStep(4)
                }
            }} className='bg-[#191b4b] py-5 rounded-2xl'>
                <Text className='text-white text-center font-medium text-lg'>Save</Text>
            </TouchableOpacity>
        </View>
    )
}

export default OnboardingRegister