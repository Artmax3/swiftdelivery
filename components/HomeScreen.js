import React from 'react';
import { View, Text, Image, Button, StyleSheet } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>SwiftDelivery</Text>
      <View style={styles.logoContainer}>
        <Image
          source={require('./logo.png')}
          style={styles.logo}
        />
      </View>
      <Text style={styles.subtitle}>Let's Get Started</Text>
      <Button
        title="Continue →"
        color="white"
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
    backgroundColor: '#000501',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#D5D8E1',
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
  subtitle: {
    fontSize: 18,
    color: '#D5D8E1',
  },
});



export default HomeScreen;
