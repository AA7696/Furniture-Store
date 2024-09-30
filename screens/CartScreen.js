import { Dimensions, StyleSheet, Text, View, TouchableOpacity, FlatList, ScrollView } from 'react-native'
import React, { useEffect, useState, useContext } from 'react'
import { SafeAreaView } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import CartProduct from '../components/Cart/CartProduct'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const { width } = Dimensions.get('window')

const CartScreen = () => {
  const navigation = useNavigation()
  const [list, setList] = useState([])
  const [refresh, setRefresh] = useState(false)


  const userCart = async () =>{
    try {
      const value = await AsyncStorage.getItem('user')
      const valueJson = JSON.parse(value)
      const userId = valueJson._id
      const response = await axios.get(`http://192.168.141.62:3000/api/cart/${userId}`)
      const productList = response.data.cart.productList
      setList(productList)
    } catch (error) {
      console.log(error)
    }
                                                   
  }

  
  useEffect(() =>{
    userCart()

  },[list])

  const handleRefresh = ()=>{
    setRefresh(true)
    userCart()
    setRefresh(false)
  }

  const calculateTotalPrice = () => {
    return list.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const placeOrder = async () =>{
    try {
      const value = await AsyncStorage.getItem('user')
      const valueJson = JSON.parse(value)
      const userName = valueJson.username
      const response = await axios.post('http://192.168.141.62:3000/api/checkout',
        {
          name: "Chair",
          price: 100,
          quantity: 2
        }
      )
      console.log(response.data)
      
    } catch (error) {
      console.log(error)
      
    }
  }


  return (
    <SafeAreaView className=' flex-1 px-4'>
      <View className=' flex flex-row  items-center  h-10   rounded-full px-2 bg-green-900 mt-14 fixed z-50 ' style={{ width: width - 34 }}>
        <TouchableOpacity onPress={() => {navigation.goBack() }}>
          <Ionicons name='chevron-back-circle' size={30} color='white' />
        </TouchableOpacity>
        <Text className='  text-xl mx-2 font-bold text-white'>Cart</Text>
      </View>
      <ScrollView
      showsVerticalScrollIndicator={false}
      >
      <View className=' mt-4' style={{ width: width - 34 }}>
        <FlatList 
        data={list}
        keyExtractor={(item) => item.cartItemId}
        renderItem={({item}) => <CartProduct item={item}  />}
        refreshing={refresh}
        onRefresh={handleRefresh}  
        showsVerticalScrollIndicator={false}
        scrollEnabled={false}
        contentContainerStyle={{flex:1}}

        />
      </View>
      {list.length?(
              <View className=' h-36 rounded-md shadow-lg bg-blue-200  mt-4 mb-2 p-3' style={{width: width-34}}>
              <Text className=' text-2xl font-semibold'>Order</Text>
              <View className=' flex-row justify-center items-center'>
                <Text className=' text-lg flex-1'>Total Price</Text>
                <Text className=' text-sm'>₹{calculateTotalPrice()}</Text>
              </View>
              <TouchableOpacity className='w-full h-10 justify-center items-center bg-green-900 mt-4 rounded-lg' onPress={placeOrder}>
                <View className=' w-full h-10 justify-center items-center bg-green-900  rounded-lg '>
                  <Text className=' text-lg  text-center text-white'>Place Order</Text>
                </View>
              </TouchableOpacity>
            </View>
      
      ): (
        ''
      )}

      </ScrollView>
    </SafeAreaView>
  )
}

export default CartScreen

const styles = StyleSheet.create({})