import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';

const ManageBusinessProfileScreen = ({ navigation }) => {
  const [businessName, setBusinessName] = useState('');
  const [businessAddress, setBusinessAddress] = useState('');
  const [businessPhoneNumber, setBusinessPhoneNumber] = useState('');
  const [businessDescription, setBusinessDescription] = useState('');
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');


  const [products, setProducts] = useState([
    { id: 1, name: 'Pizza', price: '10.00', description: 'Delicious cheese pizza' },
    { id: 2, name: 'Burger', price: '8.00', description: 'Juicy beef burger with fries' },
    { id: 3, name: 'Pasta', price: '12.00', description: 'Pasta with tomato sauce and cheese' },
    { id: 4, name: 'Salad', price: '7.00', description: 'Fresh salad with a variety of vegetables' },
  ]);

  const handleSaveProfile = () => {
    console.log('Business Profile Saved:', businessName, businessAddress, businessPhoneNumber, businessDescription, products);
  };

  const editProductInfo = (id) => {
    navigation.navigate('EditProductInfo', { productId: id });
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
      <TextInput
        style={styles.input}
        placeholder="Product Name"
        value={productName}
        onChangeText={setProductName}
      />
      <TextInput
        style={styles.input}
        placeholder="Product Price"
        value={productPrice}
        onChangeText={setProductPrice}
        keyboardType="numeric"
      />
      <Text style={styles.title}>Products</Text>
      <ScrollView>
        {products.map((product, index) => (
          <View key={product.id}>
            <Text style={styles.productName}>{product.name}</Text>
            <Text style={styles.productPrice}>{product.price}</Text>
            <Text style={styles.productDescription}>{product.description}</Text>
            <Button title="Edit" onPress={() => editProductInfo(product.id)} />
          </View>
        ))}
      </ScrollView>
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
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  productPrice: {
    fontSize: 16,
  },
  productDescription: {
    fontSize: 14,
  },
});

export default ManageBusinessProfileScreen;
