import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'

import { useNavigation } from '@react-navigation/native'
const ProductCard = ({item}) => {
  const navigation = useNavigation()

  return (
    <TouchableOpacity onPress={() => navigation.navigate('ProductDetailScreen', {item})}>
    <View style= {{width: 152, height: 195, marginEnd: 22, borderRadius: 16}} className=' bg-blue-200 p-1  '>
        <View style={{width: 142,  borderRadius: 12, flex: 1}} className=' overflow-hidden '>
            <Image source={{uri: item.imageUrl}} className='' style={{aspectRatio: 1, resizeMode: 'cover'}} />
        </View>
        <View className=' p-1'>
            <Text style={{fontSize: 16, fontWeight: 'bold', color: 'black'}} numberOfLines={1}>{item.title}</Text>
            <Text style={{fontSize: 12, color: 'black'}}>{item.suplier}</Text>
            <Text style={{fontSize: 14, fontWeight: 'bold', color: 'black'}}>Price: ₹{item.price}</Text>
        </View>

       <TouchableOpacity className=' absolute right-2 bottom-2'>
        <Ionicons name='add-circle' color='#004225' size={32} />
       </TouchableOpacity>
      
    </View>
    </TouchableOpacity>
  )
}

export default ProductCard

const styles = StyleSheet.create({})