import { Text, View } from 'react-native'
import React, { useCallback } from 'react'
import { useLocalSearchParams, useFocusEffect, useRouter } from 'expo-router';
import { useMMKVObject } from 'react-native-mmkv';
import { FlashList } from '@shopify/flash-list';

const Expenses = () => {
  const [cardInfo] = useMMKVObject('cardInfo')
  const { category } = useLocalSearchParams<{ category?: string }>();
  const router = useRouter();

  // Route params persist across tab presses, so clear the category filter when
  // leaving the screen. This way a tab press shows all expenses, while pushing
  // a category from a CategoryCard still filters as expected.
  useFocusEffect(
    useCallback(() => {
      return () => {
        if (category) {
          router.setParams({ category: '' })
        }
      }
    }, [category, router])
  )

  const expenses = cardInfo?.expenses ?? []
  const expenseItems = category
    ? expenses.filter(item => item.category === category)
    : expenses

  return (
    <FlashList
      className='flex-1'
      renderItem={({ item }) => <View className='p-5 border-b border-zinc-300'>
        <View className='flex-row'>
          <Text className='text-xl font-medium'>{item?.name} - </Text>
          <Text className='font-bold text-lg'>{item?.category}</Text>
        </View>
        <Text className='text-3xl'>${item?.amount}</Text>
      </View>}
      data={expenseItems}
      ListEmptyComponent={() => <Text>No expense found</Text>}
      keyExtractor={(item, index) => index.toString()}
    />
  )
}

export default Expenses
