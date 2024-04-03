import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const ManageBusinessProfileScreen = () => {
  const [businessName, setBusinessName] = useState('');
  const [businessAddress, setBusinessAddress] = useState('');
  const [businessPhoneNumber, setBusinessPhoneNumber] = useState('');
  const [businessDescription, setBusinessDescription] = useState('');

  const handleSaveProfile = () => {
    console.log('Business Profile Saved:', businessName, businessAddress, businessPhoneNumber, businessDescription);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Manage Business Profile</Text>
      <TextInput
        style={styles.input}
        placeholder="Business Name"
        value={businessName}
        onChangeText={setBusinessName}
      />
      <TextInput
        style={styles.input}
        placeholder="Business Address"
        value={businessAddress}
        onChangeText={setBusinessAddress}
      />
      <TextInput
        style={styles.input}
        placeholder="Business Phone Number"
        value={businessPhoneNumber}
        onChangeText={setBusinessPhoneNumber}
        keyboardType="phone-pad"
      />
      <TextInput
        style={styles.input}
        placeholder="Business Description"
        value={businessDescription}
        onChangeText={setBusinessDescription}
        multiline
      />
      <Button title="Save Profile" onPress={handleSaveProfile} />
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
    paddingHorizontal: 10,
  },
});

export default ManageBusinessProfileScreen;
