import { StyleSheet, Text, View, ActivityIndicator, FlatList } from 'react-native'
import React from 'react'
import Card from './Card'

const SearchGrid = ({apidata, loading, error}) => {
  return (
    <View className=' px-4 ' style={{flex:1}} >
{loading? (
  <ActivityIndicator size="large" color="green" />
):error?(
   <Text style={{ color: 'red' }}>Something went wrong</Text>
): (
  <FlatList 
  data={apidata}
  keyExtractor={(item) => item._id.toString()}
  renderItem={({item}) => {
    return (
        
      <Card key={item._id} item= {item} />
    )
  }}
  numColumns={1}
  showsVerticalScrollIndicator={false}
  contentContainerStyle={{
    flexGrow: 1,
    }}



  />
)}
</View>

  )
}

export default SearchGrid

const styles = StyleSheet.create({})