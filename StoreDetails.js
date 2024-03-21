import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Button } from 'react-native';

const StoreDetails = ({ route, navigation }) => {
  const { store } = route.params;

  const [menuItems, setMenuItems] = useState([
    { id: 1, name: 'Noodles', price: '$5.99' },
    { id: 2, name: 'Dumpling', price: '$7.49' },
    { id: 3, name: 'Butter Chicken', price: '$4.99' },
    { id: 4, name: 'Biryani', price: '$6.99' },
  ]);

  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    setCartItems([...cartItems, item]);
  };

  const renderMenuItem = ({ item }) => (
    <View style={styles.menuItem}>
      <Text style={styles.itemName}>{item.name}</Text>
      <Text style={styles.itemPrice}>{item.price}</Text>
      <Button title="Add to Cart" onPress={() => addToCart(item)} />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.storeName}>{store.name}</Text>
      <Text style={styles.storeLocation}>{store.location}</Text>
      <Text style={styles.sectionTitle}>Menu:</Text>
      <FlatList
        data={menuItems}
        renderItem={renderMenuItem}
        keyExtractor={item => item.id.toString()}
      />
      <Button title="View Cart" onPress={() => navigation.navigate('Cart', { cartItems })} />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  storeName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  storeLocation: {
    fontSize: 18,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 10,
    width: '100%',
  },
  itemName: {
    fontSize: 16,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default StoreDetails;
