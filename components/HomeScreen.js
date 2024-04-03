import React from 'react';
import { View, Text, Image, Button, StyleSheet } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>SwiftDelivery</Text>
      <Image
        source={require('./logo.png')}
        style={styles.logo}
      />
      <Text style={styles.subtitle}>Let's Get Started</Text>
      <Button
        title="Continue →"
        onPress={() => navigation.navigate('Auth')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 50,
    paddingBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  logo: {
    width: 250,
    height: 250,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
  },
  button: {
    marginBottom: 40,
  },
});

export default HomeScreen;
