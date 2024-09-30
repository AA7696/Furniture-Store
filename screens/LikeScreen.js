import { Dimensions, StyleSheet, Text, View, TouchableOpacity, FlatList, ScrollView } from 'react-native'
import React, { useEffect, useState, useContext } from 'react'
import { SafeAreaView } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import CartProduct from '../components/Cart/CartProduct'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import LikeProduct from '../components/Like/LikeProduct'

const { width } = Dimensions.get('window')

const LikeScreen = () => {
  const navigation = useNavigation()
  const [list, setList] = useState([])


  const userLike = async () =>{
    try {
      const value = await AsyncStorage.getItem('user')
      const valueJson = JSON.parse(value)
      const userId = valueJson._id
      const response = await axios.get(`http://192.168.141.62:3000/api/like/${userId}`)
      const productList = response.data.like.productList
      setList(productList)
    } catch (error) {
      console.log(error)
    }
                                                   
  }

  
  useEffect(() =>{
    userLike()

  },[list])




  return (
    <SafeAreaView className=' flex-1 px-4'>
      <View className=' flex flex-row  items-center  h-10   rounded-full px-2 bg-green-900 mt-14 fixed z-50 ' style={{ width: width - 34 }}>
        <TouchableOpacity onPress={() => {navigation.goBack() }}>
          <Ionicons name='chevron-back-circle' size={30} color='white' />
        </TouchableOpacity>
        <Text className='  text-xl mx-2 font-bold text-white'>Favorites</Text>
      </View>
      <ScrollView
      showsVerticalScrollIndicator={false}
      >
      <View className=' mt-4' style={{ width: width - 34 }}>
        <FlatList 
        data={list}
        keyExtractor={(item) => item.productId}
        renderItem={({item}) => <LikeProduct item={item}  />}
        showsVerticalScrollIndicator={false}
        scrollEnabled={false}
        contentContainerStyle={{flex:1}}

        />
      </View>

      </ScrollView>
    </SafeAreaView>
  )
}

export default LikeScreen

const styles = StyleSheet.create({})