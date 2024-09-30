import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { Ionicons } from '@expo/vector-icons';



const Tab = createBottomTabNavigator();

const screenOptions = {
    headerShown: false,
    tabBarShowLabel: false,
    tabBarHideOnKeyboard: true,
    tabBarStyle: {
        height: 60,
        elevation: 0,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0

    }


}

const BottomTabNavigation = () => {
  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen 
      name="Home"
      component={HomeScreen}
      options={{
        tabBarIcon: ({focused}) =>{
            return(
                <Ionicons name={focused? "home" : "home-outline"} size={24} color={focused ? "#004225" : "#000"} />
            )
        }
      }}
       />

<Tab.Screen 
      name="Search"
      component={SearchScreen}
      options={{
        tabBarIcon: ({focused}) =>{
            return(
                <Ionicons name={'search-sharp'} size={24} color={focused ? "#004225" : "#000"} />
            )
        }
      }}
       />

<Tab.Screen 
      name="Profile"
      component={ProfileScreen}
      options={{
        tabBarIcon: ({focused}) =>{
            return(
                <Ionicons name={focused? "person" : "person-outline"} size={24} color={focused ? "#004225" : "#000"} />
            )
        }
      }}
       />


    </Tab.Navigator>
  )
}

export default BottomTabNavigation

const styles = StyleSheet.create({})
