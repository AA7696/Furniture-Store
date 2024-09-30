import {  Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { FlatList,ActivityIndicator } from 'react-native'
import useFetch from '../hooks/useFetch'
import { useNavigation } from '@react-navigation/native'
const {width, height} = Dimensions.get('window')
import ProductCard from '../components/Home/ProductCard'

const NewRivalScreen = () => {
    const {data, isLoading, error} = useFetch()
    const navigation = useNavigation()
  return (
    <>
    <SafeAreaView className=' flex-1'>
        <View className=' flex flex-row  items-center absolute left-4 top-16 h-10 bg-[#004225] rounded-full px-2 z-50 ' style={{width: width-34}}>
            <TouchableOpacity onPress={() =>{navigation.goBack()}}>
            <Ionicons name='chevron-back-circle' size={24} color='white'  />
            </TouchableOpacity>
            <Text className=' text-white text-lg mx-2'>Products</Text>
        </View>
        <View className=' px-4 mt-24'>
        {isLoading? (
            <ActivityIndicator size={'large'}  color='green'/>
        ) : error ? (
            <Text>{error}</Text>
        ): (
            <FlatList
            data={data}
            keyExtractor={(item) => item._id.toString() }
            renderItem={({item}) => {
                return (
                    <ProductCard  item={item} />
                )
            }}
        
            contentContainerStyle= {{gap: 20}}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            
             />
        
        )}
     </View>

    </SafeAreaView>
    </>
  )
}

export default NewRivalScreen

const styles = StyleSheet.create({})