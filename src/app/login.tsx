import { View, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { StyledView, StyledText } from '@/components/StyledComponents'
import { login } from '@/api/auth'

const Login = () => {
    const [step, setStep] = useState(1)
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    })
    const [errors, setErrors] = useState({
        username: '',
        password: ''
    })

    const handleInput = (key, value) => {
        setFormData(prevState => ({
            ...prevState,
            [key]: value
        }))
    }

    const handleValidation = () => {
        setErrors({
            username: '',
            password: ''
        })

        if (!formData.username) setErrors(prevState => ({ ...prevState, name: 'Username is missing' }))

        if (formData.password.length < 8) setErrors(prevState => ({ ...prevState, password: 'Password must be at least 8 characters' }))


        return !(errors.username && errors.password)
    }

    return (
        <StyledView className="px-5 pt-60 gap-4 justify-center">

            <View>
                <StyledText className='mb-1'>Username:</StyledText>
                <TextInput onChangeText={(text) => {
                    handleInput("username", text)
                }} value={formData.username} placeholder='Enter your name' className='border border-zinc-400 pl-3' />
                <StyledText className='text-red-700 text-sm'>{errors.username}</StyledText>
            </View>

            <View>
                <StyledText className='mb-1'>Password:</StyledText>
                <TextInput value={formData.password} onChangeText={(text) => {
                    handleInput("password", text)
                }} placeholder='Enter your password' className='border border-zinc-400 pl-3' />
                <StyledText className='text-red-700 text-sm'>{errors.password}</StyledText>
            </View>

            <TouchableOpacity onPress={() => {
                if(handleValidation()){
                 login(formData)
                }
            }} className='bg-green-800 py-5'>
                <StyledText className='text-white text-center font-medium text-lg'>Submit</StyledText>
            </TouchableOpacity>
        </StyledView>
    )
}

export default Login