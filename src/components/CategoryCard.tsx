import { StyledText } from './StyledComponents'
import { TouchableOpacity } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons'
import React from 'react'
import { useRouter } from 'expo-router'

const CategoryCard = ({ title, lastDate, hour, iconName }) => {
    const router = useRouter()

    return (
        <TouchableOpacity onPress={() => {
            router.push(`/(tabs)/expenses?category=${title.toLowerCase()}`)
        }} className='bg-white p-5 rounded-xl w-[48%] relative border border-zinc-300'>
            <StyledText className='font-bold text-xl mb-3 !text-black'>{title}</StyledText>
            <StyledText className='text-zinc-400'>{lastDate}</StyledText>
            <StyledText className='text-zinc-400'>{hour}</StyledText>
            <Ionicons className='absolute right-4 bottom-4' size={32} color={'#191b4b'} name={iconName} />
        </TouchableOpacity>
    )
}

export default CategoryCard