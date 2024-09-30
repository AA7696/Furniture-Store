import { Dimensions, FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { Fontisto } from '@expo/vector-icons'
import Welcome from '../components/Home/Welcome'
import Header from '../components/Home/Header'
import ProductCardRow from '../components/Home/ProductCardRow'

const data = [
  {
    id: 1,
    url: "https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?cs=srgb&dl=pexels-eric-mufasa-578798-1350789.jpg&fm=jpg",
  },
  {
    id: 2,
    url:  "https://t4.ftcdn.net/jpg/03/71/92/67/360_F_371926762_MdmDMtJbXt7DoaDrxFP0dp9Nq1tSFCnR.jpg"
  },
  {
    id: 3,
    url: "https://m.media-amazon.com/images/S/aplus-media-library-service-media/cd61ec0a-963f-41b0-9ed7-8e12ad75f634.__CR0,0,970,600_PT0_SX970_V1___.jpg",
  }
]

const {width, height} = Dimensions.get("window")

const HomeScreen = () => {


  return (
    <SafeAreaView >
      <View className=' space-x-3 px-4 pb-2'>
        <View className=' flex flex-row justify-between'>
          <Ionicons name='location-outline' size={24} />
          <Text className=' text-lg font-semibold text-gray-500'>India</Text>

          <View className='  items-end '>
            <View className=' flex absolute bottom-4 w-4 h-4 rounded-lg items-center justify-center bg-green-700 z-[999]'>
              <Text className=' text-white font-normal '>8</Text>
            </View>
            <TouchableOpacity>
            <Ionicons name='cart' size={32} color='black' />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <ScrollView>
       <Welcome />
       <View className=' flex-1 justify-center items-center  '>
        <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString() }
        renderItem={({item}) =>{
          return (
            <View style={{width:width, height: height/4, justifyContent: 'center', alignItems: 'center'}}>
              <Image style={{width: '90%', height: '90%', justifyContent: 'center', alignItems: 'center'}} source={{uri: item.url}} className=' rounded-md' />
            </View>
          )
        }}
        horizontal={true}
        pagingEnabled ={true}
        showsHorizontalScrollIndicator={true}
        bounces={false}
        
         />
       </View>
       <Header />
       <ProductCardRow />
      </ScrollView>
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})