import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView, Dimensions, Image, KeyboardAvoidingView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React, { useEffect, useState } from 'react'
import { Feather, Ionicons } from '@expo/vector-icons'
import axios from 'axios'
import SearchGrid from '../components/Search/SearchGrid'

const {width} = Dimensions.get('window')


const SearchScreen = () => {
  const [search, setSearch] = useState('')
  const [apidata, setApidata] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handelSubmit = async (value) =>{
    setLoading(true)
    try {
      const res = await axios.get(`http://192.168.141.62:3000/api/products/search/${value}`)
      setApidata(res.data.product)
      setLoading(false)
      setError('')

      
    } catch (er) {
      setError(er)
      setLoading(false)
      console.log(error)
    }
  }

  return (
    <SafeAreaView className=' flex-1' >
          <View className=' flex flex-row justify-center items-center rounded-md bg-blue-100 my-3 mx-3 h-[45px] pl-1  '
            >
        <TouchableOpacity  >
        <Ionicons name= 'camera-outline' size={24} className=' mr-3' />
        </TouchableOpacity>
        <View className=' mr-1 rounded-sm bg-blue-100 flex-1'>
        <TextInput 
          className=' font-normal w-full p-2 '
          value={search}
          onChangeText={(text) =>setSearch(text)}
          placeholder='What are you looking for?'
          />

        </View>
        <View className=' flex justify-center items-center '>
        <TouchableOpacity
        onPress={() =>{handelSubmit(search)}}
         className='rounded-md w-[50px] h-full bg-green-900 flex flex-row items-center justify-center'>
        <Feather name='search' size={24} color="white" />

        </TouchableOpacity>
      </View>

      </View>

      {search === ''? (
        <KeyboardAvoidingView className=' flex-1 items-center mr-10 justify-center mb-10'>
          <Image
          style={{ width: 350, height: 350}}
          source={require('../assets/images/search.png')}
          resizeMode='contain'
          />
        </KeyboardAvoidingView>


      ): (
        <SearchGrid apidata={apidata} loading={loading} error={error} />
      )}
  </SafeAreaView>

  )
}

export default SearchScreen

const styles = StyleSheet.create({})