import { StyleSheet, Text, TouchableOpacity, View, Dimensions, Image } from 'react-native'
import React, { useCallback, useEffect, useState , useContext} from 'react'
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PersonContext from '../../context/PersonContext';

const {width} = Dimensions.get('window')

const LikeProduct = ({item}) => {
    const navigation = useNavigation();
    const [product, setProduct] = useState({});
    const productDetails = async () =>{
        try {
            const details = await axios.get(`http://192.168.141.62:3000/api/products/${item.productId}`)
            setProduct(details.data.product)
            
        } catch (error) {
            console.log(error)    
        }
        
    }


    useEffect(() =>{
        productDetails()

    },[])

    const deleteBtn = async () =>{
        try {
            const user = await AsyncStorage.getItem('user')
            const userJson = JSON.parse(user)
            const userId = userJson._id
            const res = await axios.delete(`http://192.168.141.62:3000/api/like/${userId}/${item.productId}`) 
            const id = await AsyncStorage.getItem("likedProducts")
            const likedProducts = JSON.parse(id)
            console.log(likedProducts);
            const index = likedProducts.findIndex((pro) => pro.toString() === item.productId.toString())
            likedProducts.splice(index, 1)
            await AsyncStorage.setItem("likedProducts", JSON.stringify(likedProducts))
            console.log('deleted');
  
        } catch (error) {
            console.log(error)
            
        }
    }
  return (
     <View className=' w-full rounded-md shadow-md  mt-3 flex flex-row bg-slate-100 ' style={{height: 90}}>
     <View className=' flex-3 '>
                <Image
                source={{uri: product.imageUrl}}
                className=' rounded-md'
                style={{width: width-250, height: 90}}
                resizeMode='cover'
                 />
            </View>

            <View className=' flex-1 mx-2 justify-center  '>
                <Text className=' text-xl font-semibold'>{product.title}</Text>
                <Text className=' font-semibold'>Price: ₹{product.price}</Text>

            </View>
            <TouchableOpacity className=' justify-center mr-2 ' onPress={deleteBtn}>
                <Ionicons name='trash-bin-outline' size={34} color='red' />
            </TouchableOpacity>


    </View>

  )
}

export default LikeProduct

const styles = StyleSheet.create({})