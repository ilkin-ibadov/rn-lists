import { View, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { StyledView, StyledText } from '@/components/StyledComponents'

const Register = () => {
    const [step, setStep] = useState(1)
    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        phone: '',
        email: '',
        password: ''
    })
    const [errors, setErrors] = useState({
        name: '',
        surname: '',
        phone: '',
        email: '',
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
            name: '',
            surname: '',
            phone: '',
            email: '',
            password: ''
        })

        if (!formData.name) setErrors(prevState => ({ ...prevState, name: 'Name is missing' }))
        if (!formData.surname) setErrors(prevState => ({ ...prevState, surname: 'Surname is missing' }))
        if (!formData.phone) setErrors(prevState => ({ ...prevState, phone: 'Number is missing' }))

        if (step === 2) {
            if (!formData.email.includes('@')) setErrors(prevState => ({ ...prevState, email: 'Email is invalid' }))
            if (formData.password.length < 8) setErrors(prevState => ({ ...prevState, password: 'Password must be at least 8 characters' }))
        }

        return !(errors.email && errors.name && errors.password && errors.phone && errors.surname)
    }

    return (
        <StyledView className="px-5 pt-60 gap-4 justify-center">
            {
                step === 1 ? <>
                    <View>
                        <StyledText className='mb-1'>Name:</StyledText>
                        <TextInput onChangeText={(text) => {
                            handleInput("name", text)
                        }} value={formData.name} placeholder='Enter your name' className='border border-zinc-400 pl-3' />
                        <StyledText className='text-red-700 text-sm'>{errors.name}</StyledText>
                    </View>
                    <View>
                        <StyledText className='mb-1'>Surname:</StyledText>
                        <TextInput onChangeText={(text) => {
                            handleInput("surname", text)
                        }} value={formData.surname} placeholder='Enter your surname' className='border border-zinc-400 pl-3' />
                        <StyledText className='text-red-700 text-sm'>{errors.surname}</StyledText>
                    </View>
                    <View>
                        <StyledText className='mb-1'>Phone:</StyledText>
                        <TextInput value={formData.phone} onChangeText={(text) => {
                            handleInput("phone", text)
                        }} inputMode='tel' placeholder='Enter your number' className='border border-zinc-400 pl-3' />
                        <StyledText className='text-red-700 text-sm'>{errors.phone}</StyledText>
                    </View>
                </> :
                    <>
                        <View>
                            <StyledText className='mb-1'>Email:</StyledText>
                            <TextInput value={formData.email} onChangeText={(text) => {
                                handleInput("email", text)
                            }} inputMode='email' placeholder='Enter your email' className='border border-zinc-400 pl-3' />
                            <StyledText className='text-red-700 text-sm'>{errors.email}</StyledText>
                        </View>

                        <View>
                            <StyledText className='mb-1'>Password:</StyledText>
                            <TextInput value={formData.password} onChangeText={(text) => {
                                handleInput("password", text)
                            }} placeholder='Enter your password' className='border border-zinc-400 pl-3' />
                            <StyledText className='text-red-700 text-sm'>{errors.password}</StyledText>
                        </View></>
            }

            <TouchableOpacity onPress={() => {
                handleValidation()

                if (step === 1 && formData.name && formData.surname && formData.phone) {
                    setStep(2)
                }

                if (step === 2) {
                    console.log(formData)
                }
            }} className='bg-green-800 py-5'>
                <StyledText className='text-white text-center font-medium text-lg'>{step === 1 ? "Next" : "Submit"}</StyledText>
            </TouchableOpacity>
        </StyledView>
    )
}

export default Register