import React from 'react';
import { View, Button, Image, StyleSheet, Text } from 'react-native';

const AuthorizationScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require('./logo.png')}
          style={styles.logo}
        />
      </View>
      <Button
        title="Sign In"
        color="white"
        onPress={() => navigation.navigate('SignIn')}
        style={styles.button}
      />
      <Text style={styles.subtext}>OR</Text>
      <Button
        title="Sign Up"
        color="white"
        onPress={() => navigation.navigate('SignUp')}
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
    backgroundColor: '#000501',
  },
  logoContainer: {
    backgroundColor: '#D5D8E1',
    padding: 10,
    borderRadius: 15,
    marginBottom: 10,
  },
  logo: {
    width: 250,
    height: 250,
    resizeMode: 'contain',
  },
  button: {
    marginBottom: 20,
  },
  subtext: {
    color: '#D5D8E1',
  }
});


export default AuthorizationScreen;
