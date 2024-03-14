import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

const AddressScreen = ( {navigation} ) => {
  const [address, setAddress] = useState('');
  const [aptSuite, setAptSuite] = useState('');
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [dropOffOption, setDropOffOption] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          console.error('Permission to access location was denied');
          return;
        }

        let location = await Location.getCurrentPositionAsync({});
        setSelectedLocation({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });
      } catch (error) {
        console.error('Error getting location:', error);
      }
    })();
  }, []);

  const handleMapPress = (event) => {
    const { coordinate } = event.nativeEvent;
    setSelectedLocation(coordinate);
  };

  const handleDropOffOption = (option) => {
    setDropOffOption(option);
  };

  const handleSaveAddress = () => {
    console.log('Address:', address);
    console.log('Apt/Suite:', aptSuite);
    console.log('Selected Location:', selectedLocation);
    console.log('Drop-off Option:', dropOffOption);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Address</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter your address"
        value={address}
        onChangeText={(text) => setAddress(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Apt/Suite (optional)"
        value={aptSuite}
        onChangeText={(text) => setAptSuite(text)}
      />

      <MapView
        style={styles.map}
        initialRegion={{
          latitude: selectedLocation?.latitude || 42.983612,
          longitude: selectedLocation?.longitude || -81.249725,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        onPress={handleMapPress}
      >
        {selectedLocation && (
          <Marker coordinate={selectedLocation} title="Selected Location" />
        )}
      </MapView>

      <View style={styles.dropOffOptions}>
        <Text style={styles.optionsTitle}>Drop-off Options</Text>
        <TouchableOpacity
          style={[styles.optionButton, dropOffOption === 'handToMe' && styles.selectedOption]}
          onPress={() => handleDropOffOption('handToMe')}
        >
          <Text>Hand it to me</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.optionButton, dropOffOption === 'leaveAtDoor' && styles.selectedOption]}
          onPress={() => handleDropOffOption('leaveAtDoor')}
        >
          <Text>Leave at the door</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Save Address" onPress={() => {navigation.navigate('Order'); handleSaveAddress()}}
 />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
  },
  map: {
    flex: 1,
    marginBottom: 20,
  },
  dropOffOptions: {
    marginBottom: 20,
  },
  optionsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  optionButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 10,
  },
  selectedOption: {
    backgroundColor: '#e0e0e0',
  },
  additionalOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  additionalOptionButton: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginRight: 10,
  },
  buttonContainer: {
    marginTop: 20,
  },
});

export default AddressScreen;
