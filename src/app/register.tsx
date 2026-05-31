import { useState } from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller'

const Register = () => {
    const [step, setStep] = useState(1)
    const [formData, setFormData] = useState({
        name: '',
        lastname: '',
        email: '',
        password: '',
        phone: ''
    })
    const [errors, setErrors] = useState({
        name: '',
        lastname: '',
        email: '',
        password: '',
        phone: ''
    })

    const validate = () => {
        if (!formData.name) {
            setErrors(prevState => ({ ...prevState, name: 'Name is required' }))
        }

        if (!formData.lastname) {
            setErrors(prevState => ({ ...prevState, lastname: 'Lastname is required' }))
        }

        if (!formData.phone) {
            setErrors(prevState => ({ ...prevState, phone: 'Number is required' }))
        }

        if (step === 2) {
            if (!formData.email) {
                setErrors(prevState => ({ ...prevState, email: 'Email is required' }))
            }

            if (!formData.email.includes('@')) {
                setErrors(prevState => ({ ...prevState, email: 'Invalid email' }))
            }

            if (formData.password.length < 8) {
                setErrors(prevState => ({ ...prevState, password: 'Password must be at least 8 characters long' }))
            }
        }

        return Object.values(errors).every(error => error === '')
    }

    const handleChange = (name, value) => {
        setFormData(prevState => ({ ...prevState, [name]: value }))
    }

    const handleSubmit = () => {
        setErrors({
            name: '',
            lastname: '',
            email: '',
            password: '',
            phone: ''
        })

        if (!validate()) {
            return
        }

        if (step === 1 && formData.name && formData.lastname && formData.phone) {
            setStep(2)
        } else {
            console.log(formData)
        }
    }

    return (
        <KeyboardAwareScrollView
            contentContainerClassName="flex-1 bg-white justify-center px-5 pb-8 pt-8"
            bottomOffset={16}
            keyboardShouldPersistTaps="handled"
        >
            <View className="border border-zinc-300 p-5 gap-5">
                <View className='flex-row items-center justify-between'>
                    <TouchableOpacity onPress={() => setStep(1)} className={`${step === 1 ? 'bg-green-700' : 'border-zinc-300'} size-14 border rounded-full items-center justify-center`}>
                        <Text className={`text-xl ${step === 1 ? 'text-white' : 'text-zinc-400'}`}>1</Text>
                    </TouchableOpacity>

                    <View className='border-b border-zinc-300 w-2/3'>

                    </View>

                    <TouchableOpacity onPress={() => {formData.name && formData.lastname && formData.phone && setStep(2)}} className={`${step === 2 ? 'bg-green-700' : 'border-zinc-300'} size-14 border rounded-full items-center justify-center`}>
                        <Text className={`text-xl ${step === 2 ? 'text-white' : 'text-zinc-400'}`}>2</Text>
                    </TouchableOpacity>
                </View>
                {
                    step === 1 ? <>
                        <View className="gap-2">
                            <Text>Name</Text>
                            <TextInput value={formData.name} onChangeText={(text) => handleChange('name', text)} placeholder="Enter your name" className="border border-zinc-300 pl-3 py-2" />
                            {errors.name && <Text className="text-red-500 text-sm">{errors.name}</Text>}
                        </View>

                        <View className="gap-2">
                            <Text>Lastname</Text>
                            <TextInput value={formData.lastname} onChangeText={(text) => handleChange('lastname', text)} placeholder="Enter your lastname" className="border border-zinc-300 pl-3 py-2" />
                            {errors.lastname && <Text className="text-red-500 text-sm">{errors.lastname}</Text>}
                        </View>

                        <View className="gap-2">
                            <Text>Phone</Text>
                            <TextInput value={formData.phone} onChangeText={(text) => handleChange('phone', text)} placeholder="Enter your number" className="border border-zinc-300 pl-3 py-2" />
                            {errors.phone && <Text className="text-red-500 text-sm">{errors.phone}</Text>}
                        </View>
                    </> :
                        <>
                            <View className="gap-2">
                                <Text>Email</Text>
                                <TextInput value={formData.email} onChangeText={(text) => handleChange('email', text)} placeholder="Enter your email" keyboardType="email-address" autoCapitalize="none" className="border border-zinc-300 pl-3 py-2" />
                                {errors.email && <Text className="text-red-500 text-sm">{errors.email}</Text>}
                            </View>

                            <View className="gap-2">
                                <Text>Password</Text>
                                <TextInput value={formData.password} onChangeText={(text) => handleChange('password', text)} placeholder="Enter your password" secureTextEntry className="border border-zinc-300 pl-3 py-2" />
                                {errors.password && <Text className="text-red-500 text-sm">{errors.password}</Text>}
                            </View>
                        </>
                }

                <TouchableOpacity onPress={handleSubmit} className="bg-green-700 py-6">
                    <Text className="text-center text-white text-xl">{step === 1 ? "Next" : 'Submit'}</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAwareScrollView>
    )
}

export default Register
