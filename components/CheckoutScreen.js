import React, { useState } from 'react';
import { View, Text, Button, Alert, StyleSheet, TextInput, ScrollView } from 'react-native';
import { useStripe, CardField, useConfirmPayment } from '@stripe/stripe-react-native';

const CheckoutScreen = ({ route, navigation }) => {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [cardDetails, setCardDetails] = useState();
  const { confirmPayment } = useConfirmPayment();

  // Extract order details from route parameters
  const { orders, subtotal, tax, scheduledDate, address, instructions } = route.params;

  const initializePaymentSheet = async () => {
    // Fetch PaymentIntent and other details from database
    const { paymentIntent, ephemeralKey, customer } = await fetchPaymentSheetParams();

    // Initialize the payment sheet
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
    if (!cardDetails?.complete) {
      Alert.alert("Error", "Please enter complete card details");
      return;
    }

    Alert.alert("Success", "Payment information saved successfully");
  };

  const fetchPaymentSheetParams = async () => {
    // Placeholder for your backend call
    return {
      paymentIntent: 'pi_123456789',
      ephemeralKey: 'ek_123456789',
      customer: 'cus_123456789',
    };
  };

  const handleConfirmOrder = async () => {
    await initializePaymentSheet();
    // Post-payment logic
    navigation.navigate('Home');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Checkout</Text>
      <Text style={styles.subtitle}>Order Details:</Text>
      <View style={styles.orderDetails}>
        <Text>Subtotal: ${subtotal.toFixed(2)}</Text>
        <Text>Tax: ${tax.toFixed(2)}</Text>
        <Text>Total: ${(subtotal + tax).toFixed(2)}</Text>
        {scheduledDate && <Text>Scheduled for: {scheduledDate.toLocaleDateString()} {scheduledDate.toLocaleTimeString()}</Text>}
      </View>
      <Text style={styles.subtitle}>Delivery Address: {address}</Text>
      <Text style={styles.subtitle}>Delivery Instructions: {instructions} </Text>
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
});

export default CheckoutScreen;
