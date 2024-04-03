import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './components/HomeScreen.js';
import OrderScreen from './components/OrderScreen.js';
import AuthorizationScreen from './components/AuthorizationScreen.js';
import AddressScreen from './components/AddressScreen.js';
import CheckoutScreen from './components/CheckoutScreen.js';
import { StripeProvider } from '@stripe/stripe-react-native';
import AvailableStores from './components/AvailableStores.js';
import Cart from './components/Cart.js';
import SignUpScreen from './components/SignUpScreen.js'
import SignInScreen from './components/SignInScreen.js'
import Menu from './components/MenuScreen.js';
import BusinessProfile from './components/BusinessProfile.js';
import EditProductInfo from './components/EditProductInfo.js'


const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Order" component={OrderScreen} />
        <Stack.Screen name="Auth" component={AuthorizationScreen} />
        <Stack.Screen name="Address" component={AddressScreen} />
        <Stack.Screen name="Checkout" component={CheckoutScreen} />
        <Stack.Screen name="Restaurant" component={AvailableStores} />
        <Stack.Screen name="Menu" component={Menu} />
        <Stack.Screen name="Cart" component={Cart} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="BusinessProfile" component={BusinessProfile} />

        <Stack.Screen name="EditProductInfo" component={EditProductInfo} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
