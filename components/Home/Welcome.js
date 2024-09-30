import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Feather, Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

const Welcome = () => {
    const navigation = useNavigation()
  return (
    <View>
     <View className=' w-full'>
      <Text className=' text-4xl font-bold mt-1 mx-3'>Find The Most</Text>
      <Text className=' text-4xl font-bold mt-1 mx-3 text-green-900'>Luxurious Furniture</Text>
      </View>

      <View className=' flex flex-row justify-center items-center rounded-md bg-blue-100 my-3 mx-3 h-[45px] pl-1'>
        <TouchableOpacity className=' mr-2'>
           <Feather name='search' size={24}  />
        </TouchableOpacity>
        <View className=' mr-1 rounded-sm bg-blue-100 flex-1'>
          <TextInput 
          className=' font-normal w-full p-2 '
          value=''
          onPress={() =>navigation.navigate("Search")}
          placeholder='What are you looking for?'
          />

        </View>
        <View className=' flex justify-center items-center '>
        <TouchableOpacity className='rounded-md w-[50px] h-full bg-green-900 flex flex-row items-center justify-center'>
            <Ionicons name= 'camera-outline' size={30} color= "white" />
        </TouchableOpacity>
      </View>

      </View>


    </View>
  )
}

export default Welcome

const styles = StyleSheet.create({})