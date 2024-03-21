import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import OrderItem from './OrderItem';

const orderHistoryData = [
  {
    id: '1',
    date: '2024-03-20',
    total: 23.98,
    items: [
      { id: '1', name: 'Burger', quantity: 1, price: 9.99 },
      { id: '2', name: 'Pasta', quantity: 1, price: 12.99 },
    ],
  },
  {
    id: '2',
    date: '2024-03-19',
    total: 12.98,
    items: [
      { id: '3', name: 'Taco', quantity: 2, price: 3.99 },
    ],
  },
];

const OrderHistoryScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Order History</Text>
      <FlatList
        data={orderHistoryData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.orderContainer}>
            <Text style={styles.date}>{item.date}</Text>
            <Text style={styles.total}>Total: ${item.total.toFixed(2)}</Text>
            <FlatList
              data={item.items}
              keyExtractor={(orderItem) => orderItem.id}
              renderItem={({ item: orderItem }) => (
                <OrderItem
                  name={orderItem.name}
                  quantity={orderItem.quantity}
                  price={orderItem.price}
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
  orderContainer: {
    marginBottom: 20,
  },
  date: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  total: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default OrderHistoryScreen;
