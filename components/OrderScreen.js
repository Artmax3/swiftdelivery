import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Button, TextInput, Alert, TouchableOpacity } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const OrderScreen = ({ route, navigation }) => {
  const { orders } = route.params;
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [address, setAddress] = useState('');
  const [instructions, setInstructions] = useState('');
  const [deliveryOption, setDeliveryOption] = useState('Drop-off');

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirmDate = (date) => {
    setSelectedDate(date);
    hideDatePicker();
  };

  const calculateSubtotal = () => {
    let subtotal = 0;
    for (const order of orders) {
      subtotal += (order.price || 0) * (order.quantity || 0);
    }
    return subtotal;
  };

  const calculateTotalBill = () => {
    const subtotal = calculateSubtotal();
    const tax = subtotal * 0.13; 
    const total = subtotal + tax;
    return total.toFixed(2);
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text>{item.name} - Quantity: {item.quantity}</Text>
      <Text>Total Price: ${(item.price * item.quantity).toFixed(2)}</Text>
    </View>
  );

  const handleCheckout = () => {
    if (!address.trim()) {
      Alert.alert('Error', 'Please provide both delivery address.');
      return;
    }

    navigation.navigate('Checkout', {
      orders,
      subtotal: calculateSubtotal(),
      tax: calculateTotalBill() - calculateSubtotal(),
      scheduledDate: selectedDate,
      address,
      instructions,
      deliveryOption 
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, { height: 50 }]}
          placeholder="Delivery Address"
          value={address}
          onChangeText={setAddress}
          multiline
        />
        <TextInput
          style={[styles.input, { height: 100 }]}
          placeholder="Delivery Instructions"
          value={instructions}
          onChangeText={setInstructions}
          multiline
        />
      </View>

      <View style={styles.deliveryOptionContainer}>
        <Text style={styles.deliveryOptionTitle}>Delivery Option:</Text>
        <View style={styles.optionsContainer}>
          <TouchableOpacity
            style={styles.optionButton}
            onPress={() => setDeliveryOption('Drop-off')}
          >
            <Text style={deliveryOption === 'Drop-off' ? styles.optionSelected : styles.option}>
              Drop-off at the door
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.optionButton}
            onPress={() => setDeliveryOption('Hand it')}
          >
            <Text style={deliveryOption === 'Hand it' ? styles.optionSelected : styles.option}>
              Hand it to me
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.header}>Your Order</Text>
      <FlatList
        data={orders}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
      <View style={styles.subtotalContainer}>
        <Text>Sub-total:</Text>
        <Text>${calculateSubtotal().toFixed(2)}</Text>
      </View>
      <View style={styles.subtotalContainer}>
        <Text>Tax (13%):</Text>
        <Text>${(calculateSubtotal() * 0.13).toFixed(2)}</Text>
      </View>
      <View style={styles.totalContainer}>
        <Text>Total:</Text>
        <Text>${calculateTotalBill()}</Text>
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Schedule Order" onPress={showDatePicker} />
        <Text>
          Scheduled for: {selectedDate ? selectedDate.toLocaleDateString() : 'Not scheduled'}
        </Text>
      </View>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="datetime"
        onConfirm={handleConfirmDate}
        onCancel={hideDatePicker}
      />
      <Button title="Proceed to Checkout" onPress={handleCheckout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  itemContainer: {
    marginBottom: 10,
  },
  subtotalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    borderTopWidth: 1,
    paddingTop: 10,
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    marginTop: 20,
  },
  deliveryOptionContainer: {
    marginVertical: 20,
  },
  deliveryOptionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  optionButton: {
    padding: 10,
  },
  option: {
    fontSize: 14,
  },
  optionSelected: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default OrderScreen;


