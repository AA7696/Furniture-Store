import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native'
import { useIsFocused } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';

const {width, height} = Dimensions.get('window')

const ProfileScreen = () => {
  const navigation = useNavigation()
  const isFocused =  useIsFocused();
  const [user, setUser] = useState(null)
  const getToken = async ()=>{
    try {
      const loginUser = await AsyncStorage.getItem('user')
      const loginUserObj = JSON.parse(loginUser)
      const value = await axios.get(`http://192.168.141.62:3000/api/user/${loginUserObj._id}`,{
        headers: {
          'Authorization': `Bearer ${loginUserObj.token}`
        }
      })
      if(value) {
        setUser(value.data)
      }
    } catch (error) {
      console.log(error);
    }
  }

  const logOut = async ()=>{
    try {
      await AsyncStorage.removeItem('user');
      navigation.navigate('LoginScreen')
      setUser(null)
      
    } catch (error) {
      console.log(error);
      
    }
  }
useEffect(()=>{
  if(isFocused){
    getToken()
  }
},[isFocused])

  return (
    <SafeAreaView className=' flex-1'>
        <Image 
        source={require('../assets/images/space.jpg')}
        style={{resizeMode: 'cover', width: width, height: height/3.5 }}
         />
         <View style={{width: 100, height: 100, top: 180, left: width/2.7
          , position: 'absolute'}}>
          <Image source={require('../assets/images/profile.jpeg')}
          style={{width: 100, height: 100, borderRadius: 100, resizeMode: 'cover'}}
           />
         </View>
         {!user?(
                   <View className=' flex-1 items-center mt-16'>
                   <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')} >
                    <View className=' w-28 h-10 bg-blue-300 rounded-full justify-center items-center '>
                      <Text className=' text-lg'>Login</Text>
                    </View>
                   </TouchableOpacity>
          
                   </View>  
         ): (
          <View className=' flex-1 items-center mt-10 '>
            <Text className=' text-lg font-medium'>Welcome {user.username}</Text>
            <TouchableOpacity onPress={logOut}>
            <View className=' w-28 h-10 bg-blue-300 rounded-full justify-center items-center p-1 mt-1'>
              <Text className=' text-base'>Log Out</Text>
            </View>

            </TouchableOpacity>
            <View className='divide-y divide-slate-500'>
            <View className=' w-screen  h-20  '>
              <TouchableOpacity  onPress={() => navigation.navigate('LikeScreen')} >
                <View className=' w-full h-full px-5 items-center flex-row'>
                  <Ionicons name='heart-outline' size={22} />
                  <Text className=' text-base font-medium text-gray-500 mx-2 '>Favorites</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View className=' w-screen  h-20  '>
              <TouchableOpacity >
                <View className=' w-full h-full px-5 items-center flex-row'>
                  <Ionicons name='bag-outline' size={22} />
                  <Text className=' text-base font-medium text-gray-500 mx-2 '>Orders</Text>
                </View>
              </TouchableOpacity>
            </View>

            <View className=' w-screen  h-20  '>
              <TouchableOpacity onPress={() => navigation.navigate('CartScreen')}  >
                <View className=' w-full h-full px-5 items-center flex-row'>
                  <Ionicons name='cart-outline' size={22} />
                  <Text className=' text-base font-medium text-gray-500 mx-2 '>Cart</Text>
                </View>
              </TouchableOpacity>
            </View>

            <View className=' w-screen  h-20  '>
              <TouchableOpacity  >
                <View className=' w-full h-full px-5 items-center flex-row'>
                  <Ionicons name='person-remove-outline' size={22} />
                  <Text className=' text-base font-medium text-gray-500 mx-2 '>Delete Account</Text>
                </View>
              </TouchableOpacity>
            </View>


            </View>


          </View>
          
         )}

    </SafeAreaView>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({})