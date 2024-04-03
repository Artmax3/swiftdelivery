import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Button, Alert } from 'react-native';
import storeMenusData from '../data/restro.json';

const Menu = ({ route, navigation }) => {
  const { store } = route.params;

  const stores = storeMenusData.stores;

  const storeMenu = stores.find(s => s.name === store.name)?.menu || [];
  
  const menuItems = storeMenu.reduce((acc, category) => {
    acc.push({ category: category.category, isCategory: true });
    acc = acc.concat(category.items);
    return acc;
  }, []);

  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    setCartItems(currentItems => [...currentItems, item]);
    Alert.alert("Item Added to Cart!");
  };

  const renderMenuItem = ({ item }) => {
    if (item.isCategory) {
      return (
        <View style={styles.category}>
          <Text style={styles.categoryText}>{item.category}</Text>
        </View>
      );
    } else {
      return (
        <View style={styles.menuItem}>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
          <Button title="Add to Cart" onPress={() => addToCart(item)} />
        </View>
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.storeName}>{store.name}</Text>
      <Text style={styles.storeLocation}>{store.location}</Text>
      <Text style={styles.sectionTitle}>Menu:</Text>
      <FlatList
        data={menuItems}
        renderItem={renderMenuItem}
        keyExtractor={(item, index) => `${item.name}-${index}`}
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
  category: {
    backgroundColor: '#ccc',
    padding: 10,
    marginBottom: 10,
  },
  categoryText: {
    fontSize: 18,
    fontWeight: 'bold',
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

export default Menu;
