import { SectionList, Text, View } from 'react-native'
import React from 'react'

const data = [
    {
        title: 'Fruits',
        data: [
            { id: '1', name: 'Apple' },
            { id: '2', name: 'Banana' },
            { id: '3', name: 'Orange' },
        ],
    },
    {
        title: 'Vegetables',
        data: [
            { id: '4', name: 'Carrot' },
            { id: '5', name: 'Broccoli' },
            { id: '6', name: 'Potato' },
        ],
    },
    {
        title: 'Drinks',
        data: [
            { id: '7', name: 'Water' },
            { id: '8', name: 'Coffee' },
            { id: '9', name: 'Tea' },
        ],
    },
    {
        title: 'Drinks',
        data: [
            { id: '7', name: 'Water' },
            { id: '8', name: 'Coffee' },
            { id: '9', name: 'Tea' },
        ],
    },
    {
        title: 'Drinks',
        data: [
            { id: '7', name: 'Water' },
            { id: '8', name: 'Coffee' },
            { id: '9', name: 'Tea' },
        ],
    },
    {
        title: 'Drinks',
        data: [
            { id: '7', name: 'Water' },
            { id: '8', name: 'Coffee' },
            { id: '9', name: 'Tea' },
        ],
    },
    {
        title: 'Drinks',
        data: [
            { id: '7', name: 'Water' },
            { id: '8', name: 'Coffee' },
            { id: '9', name: 'Tea' },
        ],
    },
    {
        title: 'Drinks',
        data: [
            { id: '7', name: 'Water' },
            { id: '8', name: 'Coffee' },
            { id: '9', name: 'Tea' },
        ],
    },
];

const SectionListComponent = () => {
    return (
        <SectionList
            sections={data}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <View className='p-4 border border-zinc-300'>
                    <Text>{item.name}</Text>
                </View>
            )}
            renderSectionHeader={({ section }) => (
                <View className='p-2 my-4'>
                    <Text className='font-bold'>{section.title}</Text>
                </View>
            )}
        />
    )
}

export default SectionListComponent