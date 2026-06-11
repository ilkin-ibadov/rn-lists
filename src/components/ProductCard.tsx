import { Image, Text, TouchableOpacity, View } from 'react-native';
import React from 'react'

const ProductCard = ({ item }) => {
    return (
        <TouchableOpacity>
            <View className='p-4 items-center border border-zinc-300 m-2 rounded-lg relative'>
                <Text className='absolute right-3 top-3 bg-red-600 text-white font-bold px-2 rounded'>${item.price}</Text>
                <Image source={{ uri: item?.thumbnail }} className='size-[150px]' />
                <Text numberOfLines={1} className='font-medium'>{item?.title}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default ProductCard