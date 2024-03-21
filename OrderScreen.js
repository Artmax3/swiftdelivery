import React, { useState } from 'react';
import MenuItem from './MenuItem.js';
import { View, Text, FlatList, Button, StyleSheet, Alert } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

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

const OrdersScreen = ({ navigation }) => { // Make sure to receive the navigation prop here
  // State for handling the visibility of the date picker
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  // State for storing the selected date
  const [selectedDate, setSelectedDate] = useState('');

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setSelectedDate(date.toString()); // Convert date to string or handle as necessary
    hideDatePicker();
    Alert.alert("Order Scheduled", `Your order has been scheduled for ${date}`);
  };

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
      <Button title="Schedule Order" onPress={showDatePicker} />
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="datetime"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
      {selectedDate ? <Text>Scheduled for: {selectedDate}</Text> : null}
      {/* Add the Proceed to Checkout button here */}
      <Button title="Proceed to Checkout" onPress={() => navigation.navigate('Checkout')} />
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
  // Add any additional styles you need here
});

export default OrdersScreen;
