import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen.js';
import OrderScreen from './OrderScreen.js';
import AuthorizationScreen from './AuthorizationScreen.js';
import AddressScreen from './AddressScreen.js';
import CheckoutScreen from './CheckoutScreen.js';
import { StripeProvider } from '@stripe/stripe-react-native';
import AvailableStores from './AvailableStores.js';
import StoreDetails from './StoreDetails.js';
import Cart from './Cart.js';

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
        <Stack.Screen name="Menu" component={StoreDetails} />
        <Stack.Screen name="Cart" component={Cart} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
