import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabNavigation from './Navigation/BottomTabNavigation';
import ProductDetailScreen from './screens/ProductDetailScreen';
import NewRivalScreen from './screens/NewRivalScreen';
import LoginScreen from './screens/LoginScreen';
import RegistrationScreen from './screens/RegistrationScreen';
import CartScreen from './screens/CartScreen';
import LikeScreen from './screens/LikeScreen';
import PersonContextProvider from './context/PersonContextProvider';

const Stack = createNativeStackNavigator()

export default function App() {
  

  return (
    <PersonContextProvider>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
        name='Bottomnavigation'
        component={BottomTabNavigation}
        options={{
          headerShown: false
        }}
        />
      <Stack.Screen 
        name='ProductDetailScreen'
        component={ProductDetailScreen}
        options={{
          headerShown: false
        }}
        />

      <Stack.Screen 
        name='NewRivalScreen'
        component={NewRivalScreen}
        options={{
          headerShown: false
        }}
        />
      <Stack.Screen 
        name='LoginScreen'
        component={LoginScreen}
        options={{
          headerShown: false
        }}
        />
      <Stack.Screen 
        name='RegistrationScreen'
        component={RegistrationScreen}
        options={{
          headerShown: false
        }}
        />
      <Stack.Screen 
        name='CartScreen'
        component={CartScreen}
        options={{
          headerShown: false
        }}
        />

      <Stack.Screen 
        name='LikeScreen'
        component={LikeScreen}
        options={{
          headerShown: false
        }}
        />






      </Stack.Navigator>
      <StatusBar barStyle="dark-content" backgroundColor='whitesmoke' />
    </NavigationContainer>
    </PersonContextProvider>
    
  );
}

