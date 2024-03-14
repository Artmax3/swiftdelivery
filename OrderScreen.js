import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import MenuItem from './MenuItem.js';

const restaurantData = [
  {
    id: '1',
    name: 'Some random diner',
    menu: [
      { id: '1', name: 'Burger', description: 'Juicy beef burger', price: 9.99 },
      { id: '2', name: 'Pasta', description: 'Spaghetti with tomato sauce', price: 12.99 },
    ],
  },
  {
    id: '2',
    name: 'Another random diner',
    menu: [
      { id: '3', name: 'Taco', description: 'Classic Mexican taco', price: 3.99 },
      { id: '4', name: 'Burrito', description: 'Bean and cheese burrito', price: 8.99 },
    ],
  },
];

const OrdersScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Orders</Text>
      <FlatList
        data={restaurantData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.restaurantContainer}>
            <Text style={styles.restaurantName}>{item.name}</Text>
            <FlatList
              data={item.menu}
              keyExtractor={(menuItem) => menuItem.id}
              renderItem={({ item: menuItem }) => (
                <MenuItem
                  name={menuItem.name}
                  description={menuItem.description}
                  price={menuItem.price}
                />
              )}
            />
          </View>
        )}
      />
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
  restaurantContainer: {
    marginBottom: 20,
  },
  restaurantName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default OrdersScreen;
