import { View, Text, SafeAreaView, TouchableOpacity, Image, TextInput, KeyboardAvoidingView } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { useState, useContext } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'

const LoginScreen = () => {
    const navigation = useNavigation()
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    const handellogin = async () =>{
        try {
            const loginData = await axios.post('http://192.168.141.62:3000/api/auth/login', formData)
            console.log(loginData);
            await AsyncStorage.setItem('user', JSON.stringify(loginData.data.user));
            navigation.navigate('Bottomnavigation')
            
        } catch (error) {
            console.log(error);
            
        }
    }

  return (
    <SafeAreaView className=' flex-1'>
        <View className=' w-screen p-2 mt-8  absolute top-0 z-50  '>
            <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name='chevron-back-circle' size={30} />
            </TouchableOpacity>
        </View>

        <Image 
        source={require('../assets/images/bk.png')}
        style={{ resizeMode: 'contain'}}
        className=' w-[350] h-[350]  '
        />
        <KeyboardAvoidingView className=' justify-center items-center mt-10 '>
            <Text className=' text-2xl font-bold text-green-900'>Unlimited Luxurious Furniture</Text>
            <View className=' w-screen p-5'>
                <Text className=' text-sm font-bold text-green-900'>Email</Text>
                <View className=' w-full h-12 p-1 bg-blue-200 rounded-md flex-row justify-center items-center '>
                    <Ionicons name='mail-outline' size={24}   />
                <TextInput keyboardType='text' className=' flex-1 p-1   bg-blue-200 rounded-md  text-xl' value={formData.email}  onChangeText={(text) =>{setFormData({...formData, email: text})}} />
                </View>


                <Text className=' text-sm font-bold text-green-900 mt-4'>Password</Text>
                <View className=' w-full h-12 p-1 bg-blue-200 rounded-md flex-row justify-center items-center '>
                    <Ionicons name='lock-closed-outline' size={24}  />
                <TextInput keyboardType='text' className=' flex-1 p-1   bg-blue-200 rounded-md  text-xl' secureTextEntry={false}  value={formData.password}  onChangeText={(text) =>{setFormData({...formData, password: text})}} />
                </View>

                <TouchableOpacity onPress={handellogin}>
                    <View  className=' w-full bg-green-900 p-2 rounded-md  font-bold  justify-center items-center mt-6'>
                        <Text className=' text-xl text-white'>Login</Text>
                    </View>
                </TouchableOpacity>

                <View className=' w-full justify-center items-center flex-row mt-2'>
                    <Text className=' text-sm font-bold text-green-900'>Don't have an account?</Text> 
                        <TouchableOpacity onPress={() =>{navigation.navigate('RegistrationScreen')}}>
                            <Text className=' text-sm font-bold text-green-900'>Register</Text>
                        </TouchableOpacity>
                        
                </View>

            </View>
        </KeyboardAvoidingView>
      
    </SafeAreaView>
  )
}

export default LoginScreen