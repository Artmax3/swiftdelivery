import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const UpdateProductInfoScreen = () => {
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productPrice, setProductPrice] = useState('');

  const handleUpdateProduct = () => {

    console.log('Product updated:', productName, productDescription, productPrice);

    setProductName('');
    setProductDescription('');
    setProductPrice('');
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Update Product Info</Text>
      <TextInput
        style={styles.input}
        placeholder="Product Name"
        value={productName}
        onChangeText={setProductName}
      />
      <TextInput
        style={styles.input}
        placeholder="Product Description"
        value={productDescription}
        onChangeText={setProductDescription}
      />
      <TextInput
        style={styles.input}
        placeholder="Product Price"
        value={productPrice}
        onChangeText={setProductPrice}
        keyboardType="numeric"
      />
      <Button title="Update Product" onPress={handleUpdateProduct} />
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

export default UpdateProductInfoScreen;
