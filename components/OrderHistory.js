import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Button, Alert } from 'react-native';
import { auth, db } from '../firebaseConfig';
import { ref, push, onValue, remove } from 'firebase/database';

const OrderHistoryScreen = ({ navigation }) => {
  const [orderHistory, setOrderHistory] = useState([]);

  useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const userOrderHistoryRef = ref(db, `users/${user.uid}/order_history`);
          onValue(userOrderHistoryRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
              const orders = Object.values(data).map(order => ({
                ...order,
                id: order.id || Object.keys(data).find(key => data[key] === order)
              }));
              setOrderHistory(orders);
            } else {
              setOrderHistory([]);
            }
          });
        }
      } catch (error) {
        console.error('Error fetching order history:', error);
      }
    };

    fetchOrderHistory();
  }, []);

  const cancelOrder = (orderId) => {
    const user = auth.currentUser;
    if (user) {
      const orderRef = ref(db, `users/${user.uid}/order_history/${orderId}`);
      remove(orderRef)
        .then(() => {
          setOrderHistory(prevOrders => prevOrders.filter(order => order.id !== orderId));
          Alert.alert("Order Cancelled", `Order ${orderId} has been cancelled.`);
        })
        .catch((error) => {
          console.error("Error cancelling order:", error);
          Alert.alert("Error", "Failed to cancel the order. Please try again.");
        });
    }
  };

  const reorderOrder = (order) => {
    const user = auth.currentUser;
    if (user) {
      const userCartRef = ref(db, `users/${user.uid}/cartItems`);
      order.orders.forEach((item) => {
        push(userCartRef, {
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        }).then(() => {
          Alert.alert("Order Reordered", "The order items have been added to your cart. You can proceed to checkout.");
          navigation.navigate("Cart");
        }).catch((error) => {
          console.error("Error reordering order:", error);
          Alert.alert("Error", "Failed to reorder the order. Please try again.");
        });
      });
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Order History</Text>
      {orderHistory.length > 0 ? (
        orderHistory.map((order, index) => (
          <View key={index} style={styles.orderContainer}>
            <Text>Ordered Items:</Text>
            {order.orders && order.orders.map((item, itemIndex) => (
              <View key={itemIndex} style={styles.orderItemDetails}>
                <Text>Name: {item.name}</Text>
                <Text>Price: ${item.price ? item.price : 'N/A'}</Text>
                <Text>Quantity: {item.quantity ? item.quantity : 'N/A'}</Text>
              </View>
            ))}
            <Text style={styles.orderDetails}>Delivery Address: {order.address}</Text>
            <Text>Total: ${order.total ? order.total.toFixed(2) : 'N/A'}</Text>
            <Text>Scheduled Date: {order.scheduledDate ? new Date(order.scheduledDate).toLocaleString() : 'N/A'}</Text>
            <Text>Payment Method: {order.paymentMethod ? order.paymentMethod : 'N/A'}</Text>
            <Button title="Reorder" color='blue' onPress={() => reorderOrder(order)} />
            <Button title="Cancel Order" color='red' onPress={() => cancelOrder(order.id)} />

          </View>
        ))
      ) : (
        <Text style={styles.notFound}>No order history found.</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#000501',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: 'white',
  }, 
  notFound: {
    fontSize: 15,
    color: 'white',
  },
  orderContainer: {
    backgroundColor: '#D5D8E1',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  orderItemDetails: {
    marginBottom: 5,
  },
});

export default OrderHistoryScreen;
