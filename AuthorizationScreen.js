import React from 'react';
import { View, Button, Image, StyleSheet, Text } from 'react-native';

const AuthorizationScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image
        source={require('./logo.png')}
        style={styles.logo}
      />
      <Button
        title="Sign In"
        //onPress={() => navigation.navigate('SignIn')}
        style={styles.button}
      />
      <Text>OR</Text>
      <Button
        title="Sign Up"
        //onPress={() => navigation.navigate('SignUp')}
        style={styles.button}
      />
      <Button
        title="Continue as a Guest"
        onPress={() => navigation.navigate('Address')}
        style={styles.button}
      />
      <Button
        title="Restaurants"
        onPress={() => navigation.navigate('Restaurant')}
        style={styles.button}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    marginBottom: 20,
  },
  logo: {
    width: 250,
    height: 250,
    resizeMode: 'contain',
    marginBottom: 10,
  },
});

export default AuthorizationScreen;
