import { Text, View } from 'react-native'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';

const ReviewCard = ({ item }) => {
    return (
        <View className='bg-white p-3 rounded-lg'>
            <View className='flex-row'>
                { Array.from({ length: item.rating }, (_, index) => <Ionicons color={'orange'} name='star'/>)}
                { Array.from({ length: 5 - item.rating }, (_, index) => <Ionicons color={'orange'} name='star-outline'/>)}
            </View>
            <Text>{item.comment}</Text>
            <Text>{item.reviewerName}</Text>
            <Text>{item.date}</Text>
        </View>
    )
}

export default ReviewCard