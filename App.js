import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen.js';
import OrderScreen from './OrderScreen.js';
import AuthorizationScreen from './AuthorizationScreen.js';
import AddressScreen from './AddressScreen.js';
import CheckoutScreen from './CheckoutScreen.js';
import SignInScreen from './SignInScreen.js';
import SignUpScreen from './SignUpScreen.js';
// import OrderUpdatesScreen from './OrderUpdatesScreen';
import { StripeProvider } from '@stripe/stripe-react-native';

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
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        {/* <Stack.Screen name="OrderUpdates" component={OrderUpdatesScreen} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
