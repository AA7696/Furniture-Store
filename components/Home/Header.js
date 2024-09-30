import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

const Header = () => {
  const navigation = useNavigation()
  return (
    <View className=" flex-1 justify-between items-center w-screen p-4">
      <View className='flex-1 justify-between items-center w-full flex-row'>
        <Text className=' text-base font-medium'>
           New Arreival
        </Text>
        <TouchableOpacity onPress={() =>{navigation.navigate('NewRivalScreen')}}>
          <Ionicons name='grid' size={24} color='#004225' />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({})