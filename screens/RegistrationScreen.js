import { View, Text, SafeAreaView, TouchableOpacity, Image, TextInput, KeyboardAvoidingView } from 'react-native'
import React, { useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'

const RegistrationScreen = () => {
    const navigation = useNavigation()
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        location: ''
    })

    const handelregister = async ()=>{
        try {
            const regiData = await axios.post('http://192.168.141.62:3000/api/auth/register', formData)
            console.log(regiData);
            await AsyncStorage.setItem('user', JSON.stringify(regiData.data.user));
            navigation.navigate('Bottomnavigation')
            
        } catch (error) {
            console.log(error);
            
        }

    }
  return (
    <SafeAreaView className=' flex-1'>
        <View className=' w-screen p-2 mt-8  absolute top-0 z-50  '>
            <TouchableOpacity>
            <Ionicons name='chevron-back-circle' size={30} />
            </TouchableOpacity>
        </View>

        <Image 
        source={require('../assets/images/bk.png')}
        style={{ resizeMode: 'contain'}}
        className=' w-[350] h-[250]  '
        />
        <KeyboardAvoidingView className=' justify-center items-center mt-1 '>
            <Text className=' text-2xl font-bold text-green-900'>Unlimited Luxurious Furniture</Text>
            <View className=' w-screen p-5'>
            <Text className=' text-sm font-bold text-green-900'>Username</Text>
                <View className=' w-full h-12 p-1 bg-blue-200 rounded-md flex-row justify-center items-center '>
                    <Ionicons name='person-outline' size={24}   />
                <TextInput keyboardType='text' className=' flex-1 p-1   bg-blue-200 rounded-md  text-xl' value={formData.username}  onChangeText={(text) =>{setFormData({...formData, username: text})}} />
                </View>

                <Text className=' text-sm font-bold text-green-900 mt-4'>Email</Text>
                <View className=' w-full h-12 p-1 bg-blue-200 rounded-md flex-row justify-center items-center '>
                    <Ionicons name='mail-outline' size={24}   />
                <TextInput keyboardType='text' className=' flex-1 p-1   bg-blue-200 rounded-md  text-xl' value={formData.email}  onChangeText={(text) =>{setFormData({...formData, email: text})}} />
                </View>


                <Text className=' text-sm font-bold text-green-900 mt-4'>Password</Text>
                <View className=' w-full h-12 p-1 bg-blue-200 rounded-md flex-row justify-center items-center '>
                    <Ionicons name='lock-closed-outline' size={24}  />
                <TextInput keyboardType='text' className=' flex-1 p-1   bg-blue-200 rounded-md  text-xl' secureTextEntry={false} value={formData.password}  onChangeText={(text) =>{setFormData({...formData, password: text})}} />
                </View>

                <Text className=' text-sm font-bold text-green-900 mt-4'>Location</Text>
                <View className=' w-full h-12 p-1 bg-blue-200 rounded-md flex-row justify-center items-center '>
                    <Ionicons name='location-outline' size={24}  />
                <TextInput keyboardType='text' className=' flex-1 p-1   bg-blue-200 rounded-md  text-xl' value={formData.location}  onChangeText={(text) =>{setFormData({...formData, location: text})}} />
                </View>


                <TouchableOpacity onPress={handelregister}>
                    <View  className=' w-full bg-green-900 p-2 rounded-md  font-bold  justify-center items-center mt-6'>
                        <Text className=' text-xl text-white'>Register</Text>
                    </View>
                </TouchableOpacity>

                <View className=' w-full justify-center items-center flex-row mt-2'>
                    <Text className=' text-sm font-bold text-green-900'>Already have an account?</Text> 
                        <TouchableOpacity onPress={() =>{navigation.navigate('LoginScreen')}}>
                            <Text className=' text-sm font-bold text-green-900'>Login</Text>
                        </TouchableOpacity>
                        
                </View>

            </View>
        </KeyboardAvoidingView>
      
    </SafeAreaView>
  )
}

export default RegistrationScreen