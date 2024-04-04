import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Button, Alert, Image } from 'react-native';
import storeMenusData from '../data/restro.json';
import { db, auth } from '../firebaseConfig';
import { ref, child, get, update, push, set } from 'firebase/database';

const Menu = ({ route, navigation }) => {
  const { store } = route.params;
  const stores = storeMenusData.stores;
  const storeMenu = stores.find(s => s.name === store.name)?.menu || [];
  
  const menuItems = storeMenu.reduce((acc, category) => {
    acc.push({ category: category.category, isCategory: true });
    acc = acc.concat(category.items.map(item => ({...item, key: `${category.category}-${item.name}`})));
    return acc;
  }, []);

  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    const user = auth.currentUser;
    if (user) {
      const userID = user.uid;
      const cartItemRef = ref(db, `users/${userID}/cartItems/${item.name}`);
  
      get(cartItemRef).then((snapshot) => {
        if (snapshot.exists()) {
          let currentQuantity = snapshot.val().quantity;
          if (typeof currentQuantity !== 'number') {
            currentQuantity = 0; 
          }
          const updatedQuantity = currentQuantity + 1;
          update(cartItemRef, { quantity: updatedQuantity })
            .then(() => Alert.alert("Item quantity updated in cart!"))
            .catch((error) => console.error("Error updating item quantity:", error));
        } else {
          set(cartItemRef, { ...item, quantity: 1 })
            .then(() => Alert.alert("Item added to cart!"))
            .catch((error) => console.error("Error adding item to cart:", error));
        }
      }).catch((error) => {
        console.error("Error fetching cart item:", error);
      });
    } else {
      Alert.alert("User Not Logged In!");
    }
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
          <Image source={{ uri: item.image || 'placeholder_image_url' }} style={styles.itemImage} />
          <View style={styles.itemDetails}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
          </View>
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
        keyExtractor={(item, index) => `${item.key}-${index}`}
      />
      <Button title="View Cart" color='white' onPress={() => navigation.navigate('Cart', { cartItems })} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch', 
    justifyContent: 'flex-start',
    paddingHorizontal: 10, 
    backgroundColor: '#000501', 
  },
  storeName: {
    fontSize: 28, 
    fontWeight: 100,
    marginTop: 20, 
    marginBottom: 5, 
    textAlign: 'center', 
    color: 'white'
  },
  storeLocation: {
    fontSize: 18,
    marginBottom: 15, 
    textAlign: 'center', 
    color: 'white'
  },
  sectionTitle: {
    fontSize: 22, 
    fontWeight: 'bold',
    marginBottom: 15, 
    paddingHorizontal: 10, 
    color: 'white'
  },
  category: {
    backgroundColor: '#D5D8E1', 
    padding: 15, 
    width: '100%',
    marginBottom: 10,
    borderRadius: 5,
  },
  categoryText: {
    fontSize: 20, 
    fontWeight: 'bold',
  },
  menuItem: {
    flexDirection: 'row',
    backgroundColor: '#D5D8E1', 
    marginBottom: 10, 
    borderRadius: 8, 
    overflow: 'hidden', 
    shadowColor: '#000', 
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, 
    padding: 5
  },
  itemDetails: {
    flex: 1,
    padding: 15, 
  },
  itemName: {
    fontSize: 18, 
    fontWeight: 'bold', 
    marginBottom: 5, 
  },
  itemPrice: {
    fontSize: 16, 
    color: '#666', 
  },
  itemImage: {
    width: 90, 
    height: 90,
    borderRadius: 0, 
  },
});


export default Menu;
