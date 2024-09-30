import { Dimensions, StyleSheet, Text, TouchableOpacity, View , Image} from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const {width, height} = Dimensions.get('window')

const Card = ({item}) => {
    const navigation = useNavigation()
  return (
    <>
    <TouchableOpacity onPress={() => navigation.navigate('ProductDetailScreen', {item})}>
        <View style={{width: width-34, height: 90, }} className=' rounded-md bg-slate-50 shadow-md flex flex-row mt-4'>
            <View className=' flex-3 '>
                <Image
                source={{uri: item.imageUrl}}
                className=' rounded-md'
                style={{width: width-250, height: 90,}}
                resizeMode='cover'
                 />
            </View>

            <View className=' flex-1 mx-2 justify-center  '>
                <Text className=' text-xl font-semibold'>{item.title}</Text>
                <Text className=' text-sm '>{item.suplier}</Text>
                <Text className=' font-semibold'>Price: ₹{item.price}</Text>
            </View>

        </View>
    </TouchableOpacity>
    </>
  )
}

export default Card

const styles = StyleSheet.create({})