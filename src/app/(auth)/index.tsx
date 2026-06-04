import { useRouter } from 'expo-router'
import { useState } from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller'
import { login } from '@/api/auth'

const Login = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    })
    const [errors, setErrors] = useState({
        username: '',
        password: ''
    })

    const validate = () => {

        if (!formData.username) {
            setErrors(prevState => ({ ...prevState, email: 'Username is required' }))
        }

        // if (!formData.username.includes('@')) {
        //     setErrors(prevState => ({ ...prevState, email: 'Invalid email' }))
        // }

        if (formData.password.length < 8) {
            setErrors(prevState => ({ ...prevState, password: 'Password must be at least 8 characters long' }))
        }

        return Object.values(errors).every(error => error === '')
    }

    const handleChange = (name, value) => {
        setFormData(prevState => ({ ...prevState, [name]: value }))
    }

    const handleSubmit = () => {
        setErrors({
            username: '',
            password: ''
        })

        if (!validate()) {
            return
        }

        login(formData)
    }

    return (
        <KeyboardAwareScrollView
            contentContainerClassName="flex-1 bg-white justify-center px-5 pb-8 pt-8"
            bottomOffset={16}
            keyboardShouldPersistTaps="handled"
        >
            <View className="border border-zinc-300 p-5 gap-5">
                <View className="gap-2">
                    <Text>Username</Text>
                    <TextInput value={formData.username} onChangeText={(text) => handleChange('username', text)} placeholder="Enter your username" keyboardType="email-address" autoCapitalize="none" className="border border-zinc-300 pl-3 py-2" />
                    {errors.username && <Text className="text-red-500 text-sm">{errors.username}</Text>}
                </View>

                <View className="gap-2">
                    <Text>Password</Text>
                    <TextInput value={formData.password} onChangeText={(text) => handleChange('password', text)} placeholder="Enter your password" secureTextEntry className="border border-zinc-300 pl-3 py-2" />
                    {errors.password && <Text className="text-red-500 text-sm">{errors.password}</Text>}
                </View>

                <TouchableOpacity onPress={handleSubmit} className="bg-green-700 py-6">
                    <Text className="text-center text-white text-xl">Login</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAwareScrollView>
    )
}

export default Login
