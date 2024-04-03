import React, { useState, useEffect } from 'react';
import { View, Text, Button, Alert, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useStripe, CardField, useConfirmPayment } from '@stripe/stripe-react-native';

const CheckoutScreen = ({ route, navigation }) => {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [cardDetails, setCardDetails] = useState();
  const { confirmPayment } = useConfirmPayment();

  const { orders, subtotal, tax, scheduledDate, address, instructions, deliveryOption } = route.params;

  const [estimatedTime, setEstimatedTime] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('card'); 

  useEffect(() => {
    if (!scheduledDate) {
      const currentTime = new Date();
      const deliveryTime = new Date();
      deliveryTime.setHours(currentTime.getHours() + 1);
      setEstimatedTime(deliveryTime.toLocaleTimeString());
    }
  }, [scheduledDate]);

  const initializePaymentSheet = async () => {
    const { paymentIntent, ephemeralKey, customer } = await fetchPaymentSheetParams();

    const { error } = await initPaymentSheet({
      customerId: customer,
      customerEphemeralKeySecret: ephemeralKey,
      paymentIntentClientSecret: paymentIntent,
      merchantDisplayName: 'Your Merchant Name',
    });
    if (error) {
      Alert.alert("Error", error.message);
    } else {
      presentPaymentSheet();
    }
  };

  const handleSavePaymentInfo = async () => {
    if (!cardDetails?.complete && paymentMethod === 'card') {
      Alert.alert("Error", "Please enter complete card details");
      return;
    }

    Alert.alert("Success", "Payment information saved successfully");
  };

  const fetchPaymentSheetParams = async () => {
    return {
      paymentIntent: 'pi_123456789',
      ephemeralKey: 'ek_123456789',
      customer: 'cus_123456789',
    };
  };

  const handleConfirmOrder = async () => {
    if (paymentMethod === 'card') {
      await initializePaymentSheet();
    } else {
      // Max, can you handle cash on delivery logic to save the order details to the user's database without payment processing lol
    }
    Alert.alert("Order received!");
    navigation.navigate('Home');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Checkout</Text>
      <Text style={styles.subtitle}>Order Details:</Text>
      {orders.map((order, index) => (
        <View key={index} style={styles.orderItem}>
          <Text>{order.name}</Text>
          <Text>${order.price.toFixed(2)}</Text>
          <Text>Quantity: {order.quantity}</Text>
        </View>
      ))}
      <View style={styles.orderDetails}>
        <Text>Subtotal: ${subtotal.toFixed(2)}</Text>
        <Text>Tax: ${tax.toFixed(2)}</Text>
        <Text>Total: ${(subtotal + tax).toFixed(2)}</Text>
        {scheduledDate ? (
          <Text>Scheduled for: {scheduledDate.toLocaleDateString()} {scheduledDate.toLocaleTimeString()}</Text>
        ) : (
          <Text>Estimated Time: {estimatedTime}</Text>
        )}
      </View>
      <Text style={styles.subtitle}>Delivery Address: {address}</Text>
      {instructions.trim() !== '' && <Text style={styles.subtitle}>Delivery Instructions: {instructions} </Text>}
      <Text style={styles.subtitle}>Delivery Option: {deliveryOption} </Text>
      {paymentMethod === 'card' && (
        <CardField
          postalCodeEnabled={true}
          placeholder={{
            number: '4242 4242 4242 4242',
          }}
          cardStyle={styles.card}
          style={styles.cardContainer}
          onCardChange={(cardDetails) => {
            setCardDetails(cardDetails);
          }}
        />
      )}
      <TouchableOpacity style={styles.paymentMethodButton} onPress={() => setPaymentMethod('card')}>
        <Text style={styles.paymentMethodText}>Pay with Card</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.paymentMethodButton} onPress={() => setPaymentMethod('cash')}>
        <Text style={styles.paymentMethodText}>Cash on Delivery</Text>
      </TouchableOpacity>
      <Button title="Save My Payment Information" onPress={handleSavePaymentInfo} />
      <Button title="Confirm Order" onPress={handleConfirmOrder} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  orderDetails: {
    marginBottom: 20,
  },
  orderItem: {
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  card: {
    backgroundColor: '#FFFFFF',
  },
  cardContainer: {
    height: 50,
    width: '100%',
    marginVertical: 30,
  },
  paymentMethodButton: {
    backgroundColor: '#007bff',
    borderRadius: 8,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  paymentMethodText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default CheckoutScreen;
