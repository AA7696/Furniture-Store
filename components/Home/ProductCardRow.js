import { FlatList, StyleSheet, Text, View, Dimensions, ActivityIndicator } from 'react-native'
import React from 'react'
import ProductCard from './ProductCard'
import useFetch from '../../hooks/useFetch'

const ProductCardRow = () => {
    const {data, isLoading, error} = useFetch()
    
  return (
    <View className=' px-4 mt-2'>
        {isLoading? (
            <ActivityIndicator size={'large'}  color='green'/>
        ) : error ? (
            <Text>{error}</Text>
        ): (
            <FlatList
            data={data}
            keyExtractor={(item) => item._id.toString() }
            renderItem={({item}) => {
                return (
                    <ProductCard  item={item} />
                )
            }}
        
            horizontal= {true}
            showsHorizontalScrollIndicator={true}
            
             />
        
        )}
     </View>
  )
}

export default ProductCardRow

const styles = StyleSheet.create({})