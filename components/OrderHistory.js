import React from 'react';
import { View, Text, FlatList, StyleSheet, Button } from 'react-native';

const orderHistoryData = [
  {
    id: '1',
    date: '2024-03-20',
    total: 23.98,
    isAccepted: true,
    items: [
      { id: '1', name: 'Burger', quantity: 1, price: 9.99 },
      { id: '2', name: 'Pasta', quantity: 1, price: 12.99 },
    ],
  },
  {
    id: '2',
    date: '2024-03-19',
    total: 12.98,
    isAccepted: false,
    items: [
      { id: '3', name: 'Taco', quantity: 2, price: 3.99 },
    ],
  },
  {
    id: '3',
    date: '2024-03-18',
    total: 15.98,
    isAccepted: true,
    items: [
      { id: '4', name: 'Pizza', quantity: 1, price: 15.98 },
    ],
  },
  {
    id: '4',
    date: '2024-03-17',
    total: 20.00,
    isAccepted: false,
    items: [
      { id: '5', name: 'Salad', quantity: 2, price: 10.00 },
    ],
  },
];

const OrderItem = ({ name, quantity, price }) => (
  <View style={styles.orderItem}>
    <Text style={styles.itemName}>{name}</Text>
    <Text style={styles.itemQuantity}>Quantity: {quantity}</Text>
    <Text style={styles.itemPrice}>Price: ${price.toFixed(2)}</Text>
  </View>
);

const printReceipt = (orderId) => {
  console.log(`Printing receipt for order ${orderId}`);
};


const cancelOrder = (orderId) => {
  orderHistoryData = orderHistoryData.map(order => 
    order.id === orderId ? { ...order, isAccepted: false } : order
  );
  console.log(`Order ${orderId} has been cancelled.`);
};

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
            <Text style={[styles.acceptanceStatus, item.isAccepted ? {color: 'green'} : {color: 'red'}]}>
              {item.isAccepted ? 'Accepted' : 'Not Accepted'}
            </Text>
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
            <Button title="Print Receipt" onPress={() => printReceipt(item.id)} />
            <Button title="Cancel Order" onPress={() => handleCancelOrder(item.id)} />
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
  acceptanceStatus: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'green',
  },
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  itemName: {
    fontSize: 16,
  },
  itemQuantity: {
    fontSize: 16,
  },
  itemPrice: {
    fontSize: 16,
  },
});

export default OrderHistoryScreen;