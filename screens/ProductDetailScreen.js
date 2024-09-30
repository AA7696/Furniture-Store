import { Dimensions, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation, useRoute } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';


const {width} = Dimensions.get('window')

const ProductDetailScreen = ({navigation}) => {
    const route = useRoute();
    const {item} = route.params;
    const [count, setCount] = useState(1)
    const [like, setLike] = useState(false)

    const increment = () =>{
        setCount(prev => prev + 1)
    }
    const decrement = () =>{
        if(count <= 1){
            setCount(1)
        }else{
            setCount(prev => prev - 1)
        }
    }

    const addToCart = async () =>{
        try {
            const user = await AsyncStorage.getItem('user')
            const jsonUser = JSON.parse(user)
            const userId = jsonUser._id
            const token = jsonUser.token
            const data = await axios.post('http://192.168.141.62:3000/api/cart',{
                userId: userId,
                cartItemId: item._id,
                quantity: count,
                price: item.price
            },{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })


            
        } catch (error) {
            
        }
    }

    const addToLike = async () =>{
        try {
            const user = await AsyncStorage.getItem('user')
            const jsonUser = JSON.parse(user)
            const userId = jsonUser._id
            const token = jsonUser.token
            const data = await axios.post('http://192.168.141.62:3000/api/like',{
                userId: userId,
                productId: item._id
            },{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            
            
        } catch (error) {
            console.log(error);
        }
    }

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

    const handleLikes = async () => {
        try {
          // Get the current liked products from AsyncStorage
          const likedProducts = await AsyncStorage.getItem("likedProducts");
          // Parse the JSON string into an array
          const likedProductsArray = likedProducts ? JSON.parse(likedProducts) : [];
      
          // Check if the product is already liked
          if (likedProductsArray.includes(item._id)) {
            // Remove the product ID from the array if it's already liked
            likedProductsArray.splice(likedProductsArray.indexOf(item._id), 1);
          } else {
            // Add the product ID to the array if it's not liked
            likedProductsArray.push(item._id);
          }
      
          // Store the updated array in AsyncStorage
          await AsyncStorage.setItem("likedProducts", JSON.stringify(likedProductsArray));
      
          // Toggle the like state
        } catch (error) {
          console.log(error);
        }
      };
    const handleLike = () =>{
        setLike(!like)
        console.log(like);
        if(like){
            deleteBtn()
            console.log('del');
        }
        if(!like){
            addToLike()
            
            console.log('add');
        }
        
          handleLikes()
    }

    

    useEffect(() => {
        const checkIfLiked = async () => {
          try {
            const likedProducts = await AsyncStorage.getItem("likedProducts");
            const likedProductsArray = likedProducts ? JSON.parse(likedProducts) : [];
            if (likedProductsArray.includes(item._id)) {
              setLike(true);
            }
          } catch (error) {
            console.log(error);
          }
        };
        checkIfLiked();
      }, [item._id]);

    // useEffect(() =>{
    //     const checkIfLiked = async () => {
    //         try {
    //             const likedProducts = await AsyncStorage.removeItem("likedProducts");
                
    //         } catch (error) {
                
    //         }
    //     }
    //     checkIfLiked()
    // })

  return (
    <>
    <SafeAreaView className=' flex-1 bg-slate-50'>
        <View className=' flex flex-row w-full justify-between items-center p-2 absolute top-9 z-50'>
            <TouchableOpacity onPress={() => {navigation.goBack()}} >
                <Ionicons name='chevron-back-circle' size={30} />
            </TouchableOpacity>

            <TouchableOpacity onPress={handleLike}>
                <Ionicons name={like? 'heart': 'heart-outline'} size={30} color='#004225' />
            </TouchableOpacity>
        </View>

        <Image source={{uri: item.imageUrl}} 
        style={{aspectRatio: 1, resizeMode: 'cover'}}
        />
        <View  style={{width: width}} className=' -mt-4 bg-slate-50 rounded-t-2xl '>
            <View className=' mx-5 pb-3 flex-row justify-between items-center w-[90%] top-3'>
                <Text className=' text-lg font-bold top-2'>{item.title}</Text>
                <View className=' bg-blue-200 rounded-3xl p-1 w-24 flex justify-center items-center top-2'>
                    <Text className=' text-lg font-bold'>₹ {item.price}</Text>
                </View>
            </View>

            <View className=' reting mx-5 pb-3 flex-row justify-between items-center w-[90%]  top-5'>
               <View className=' stars flex flex-row gap-1 w-[40%] top-1'>
                {[1,2,3,4].map((star, index) =>{
                    return(
                        <Ionicons key={index} name='star' size={20} color='#FFD700' />

                    )
                })}
                <Text>(4.5)</Text>
               </View>

               <View className=' counter flex-row justify-between items-center gap-2'>
                <TouchableOpacity onPress={increment}>
                <Ionicons name='add-circle-outline' size={34} />
                </TouchableOpacity>

                <Text className=' text-xl'>{count}</Text>

                <TouchableOpacity onPress={decrement}>
                <Ionicons name='remove-circle-outline' size={34} />
                </TouchableOpacity>

               </View>

            </View>

            <View className='description mx-5 pb-3 flex-col  w-[90%]  top-7'>
                <Text className=' text-lg font-bold'>Description</Text>
                <Text>
                    {item.description}
                    This is a product description. This is a product description. This is a product description. This is
                    This is a product description. This is a product description. This is a product description. This is
                </Text>

            </View>

            <View className=' location  mx-5 p-1   w-[90%]  top-9 flex-row justify-between items-center bg-blue-100 rounded-3xl'>

                <View className=' flex flex-row gap-2'>
                    <Ionicons name= 'location' size={21} />
                    <Text className=' font-semibold'>{item.location}</Text>
                </View>

                <View className=' flex flex-row gap-2 items-center'>
                    <Ionicons name= 'bicycle-outline' size={22} />
                    <Text  className=' font-semibold mx-1'>Free Delivery</Text>
                </View>


            </View>


            <View className='w-[90%] flex flex-row justify-between items-start mx-5 top-16'>
                <View className=' bg-black w-60 flex p-2 rounded-3xl justify-center items-center'>
                   <TouchableOpacity>
                    <Text className=' text-white text-lg'>Buy Now</Text>
                   </TouchableOpacity>
                </View>

                <View className=' flex flex-row justify-center items-center rounded-full bg-black p-2'>
                    <TouchableOpacity onPress={() =>{
                        addToCart()
                        navigation.navigate('CartScreen')
                    }}>
                    <Ionicons name='cart' size={28} color='white' />

                    </TouchableOpacity>
                </View>
            </View>
        </View>
    </SafeAreaView>
    </>
  )
}

export default ProductDetailScreen

const styles = StyleSheet.create({})