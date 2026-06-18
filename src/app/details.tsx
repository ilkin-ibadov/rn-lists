import { Image, Text, View, FlatList, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams } from "expo-router";
import ReviewCard from '@/components/ReviewCard';

const Details = () => {
  const [loading, setLoading] = useState(false)
  const { id } = useLocalSearchParams()
  const [item, setItem] = useState({})

  const getItemDetails = async () => {
    setLoading(true)
    try {
      const res = await fetch(`https://dummyjson.com/products/${id}`)
      const data = await res.json()

      setItem(data)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getItemDetails()
  }, [id])

  if (loading) return <Text>Loading...</Text>

  return (
    !Object.keys(item).length ? <Text>No item found</Text>
      :
      <ScrollView>
        <View className='flex-1'>
          <Image resizeMode='contain' className='w-full h-[300px]' source={{ uri: item.images[0] }} />
          <View className='p-5'>
            <Text className='bg-black text-white px-3 py-1 w-32 text-center mb-2 rounded'>{item.category}</Text>
            <Text className='text-2xl mb-3 font-medium'>{item.title}</Text>
            <Text className='text-zinc-500'>{item.description}</Text>
            <Text className='text-red-800 text-3xl my-4'>${item.price}</Text>

            <FlatList scrollEnabled={false} ListHeaderComponent={() => <Text className='text-lg'>Comments</Text>} contentContainerStyle={{ gap: 10 }} ListEmptyComponent={() => <Text>No comments yet.</Text>} renderItem={({ item }) => <ReviewCard item={item} />} data={item.reviews} />
          </View>

        </View>
      </ScrollView>
  )
}

export default Details