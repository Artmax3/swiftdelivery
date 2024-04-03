import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, Button } from 'react-native';

let orderHistoryData = [
  {
    id: '1',
    date: '2024-03-20',
    total: 23.98,
    isAccepted: true,
    progress: 'Preparing',
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
    progress: 'Cancelled',
    items: [
      { id: '3', name: 'Taco', quantity: 2, price: 3.99 },
    ],
  },
  {
    id: '3',
    date: '2024-03-18',
    total: 15.98,
    isAccepted: true,
    progress: 'Delivered',
    items: [
      { id: '4', name: 'Pizza', quantity: 1, price: 15.98 },
    ],
  },
  {
    id: '4',
    date: '2024-03-17',
    total: 20.98,
    isAccepted: true,
    progress: 'Delivered',
    items: [
      { id: '5', name: 'Salad', quantity: 2, price: 10.49 },
    ],
  },
  {
    id: '5',
    date: '2024-03-16',
    total: 10.99,
    isAccepted: true,
    progress: 'Delivered',
    items: [
      { id: '6', name: 'Soup', quantity: 1, price: 10.99 },
    ],
  },
  {
    id: '6',
    date: '2024-03-15',
    total: 30.98,
    isAccepted: true,
    progress: 'Preparing',
    items: [
      { id: '7', name: 'Steak', quantity: 1, price: 30.98 },
    ],
  },
  {
    id: '7',
    date: '2024-03-14',
    total: 8.99,
    isAccepted: false,
    progress: 'Cancelled',
    items: [
      { id: '8', name: 'Ice Cream', quantity: 1, price: 8.99 },
    ],
  },
  {
    id: '8',
    date: '2024-03-13',
    total: 14.99,
    isAccepted: true,
    progress: 'Delivered',
    items: [
      { id: '9', name: 'Sandwich', quantity: 1, price: 14.99 },
    ],
  },
  {
    id: '9',
    date: '2024-03-12',
    total: 12.99,
    isAccepted: true,
    progress: 'Delivered',
    items: [
      { id: '10', name: 'Chicken', quantity: 1, price: 12.99 },
    ],
  },
  {
    id: '10',
    date: '2024-03-11',
    total: 16.99,
    isAccepted: true,
    progress: 'Delivered',
    items: [
      { id: '11', name: 'Fish', quantity: 1, price: 16.99 },
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

const handleCancelOrder = (orderId) => {
  orderHistoryData = orderHistoryData.map(order =>
    order.id === orderId ? { ...order, isAccepted: false, progress: 'Cancelled' } : order
  );
  console.log(`Order ${orderId} has been cancelled.`);
};

const handleReorder = (orderId) => {
  const orderToReorder = orderHistoryData.find(order => order.id === orderId);
  if (!orderToReorder) {
    console.log(`Order ${orderId} not found.`);
    return;
  }

  const newOrder = {
    ...orderToReorder,
    id: Math.max(...orderHistoryData.map(order => Number(order.id))) + 1 + '', // generate a new id
    date: new Date().toISOString().split('T')[0], // set the current date
    progress: 'Preparing',
  };

  orderHistoryData = [newOrder, ...orderHistoryData];
  console.log(`Order ${orderId} has been reordered as order ${newOrder.id}.`);
};

const Separator = () => (
  <View style={styles.separator} />
);

const OrderHistoryScreen = () => {
  const [orders, setOrders] = useState(orderHistoryData);
  const [sortOption, setSortOption] = useState('date');

  const handleSortChange = (value) => {
    setSortOption(value);
    if (value === 'date') {
      setOrders([...orders].sort((a, b) => new Date(b.date) - new Date(a.date)));
    } else if (value === 'total') {
      setOrders([...orders].sort((a, b) => b.total - a.total));
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Order History</Text>
      <View style={styles.sortOptions}>
        <Button title="Sort by Date" onPress={() => handleSortChange('date')} />
        <Button title="Sort by Total" onPress={() => handleSortChange('total')} />
      </View>
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={Separator}
        renderItem={({ item }) => (
          <View style={styles.orderContainer}>
            <Text style={styles.date}>{item.date}</Text>
            <Text style={styles.total}>Total: ${item.total.toFixed(2)}</Text>
            <Text style={styles.progress}>Progress: {item.progress}</Text>
            <Text style={[styles.acceptanceStatus, item.isAccepted ? { color: 'green' } : { color: 'red' }]}>
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
            <View style={styles.buttonContainer}>
              <Button title="Print Receipt" onPress={() => printReceipt(item.id)} />
              <Button title="Cancel Order" onPress={() => handleCancelOrder(item.id)} />
              <Button title="Reorder" onPress={() => handleReorder(item.id)} />
            </View>
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
  progress: {
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
  sortOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  separator: {
    height: 1,
    width: "100%",
    backgroundColor: "#444",
    marginBottom: 20,
  },
});

export default OrderHistoryScreen;