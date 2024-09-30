import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Carousel = ({item}) => {
  return (
    <View className=' w-[330px] h-[200px]  bg-slate-400 ml-1  '>
      <Image  resizeMode="contain" className=' w-full h-full rounded-xl' source={{uri: item.url}}  />
    </View>
  )
}

export default Carousel

const styles = StyleSheet.create({})