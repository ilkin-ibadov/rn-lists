import React, { useEffect, useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { FlashList } from "@shopify/flash-list";
import ProductCard from '@/components/ProductCard';
import SectionListComponent from '@/components/SectionList';

export default function HomeScreen() {
  const [products, setProducts] = useState([])

  const getProducts = async () => {
    try {
      const res = await fetch('https://dummyjson.com/products')
      const data = await res.json()
      setProducts(data.products)
    } catch (error) {
      console.error(error)
    }
  }

  const Seperator = () => {
    return (
      <View className='h-2 w-2'></View>
    )
  }

  useEffect(() => {
    getProducts()
  }, [])

  return (
    <FlashList
      className='p-2'
      numColumns={2}
      // ItemSeparatorComponent={Seperator}
      data={products}
      renderItem={({ item }) => <ProductCard item={item} />}
      keyExtractor={(item) => item.id}
    />
  );
}