import React, { useState } from 'react';
import { View, Text, Button, Alert, StyleSheet } from 'react-native';
import { useStripe, CardField, useConfirmPayment } from '@stripe/stripe-react-native';

const CheckoutScreen = ({ navigation }) => {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [cardDetails, setCardDetails] = useState();
  const { confirmPayment } = useConfirmPayment();

  const initializePaymentSheet = async () => {
    // Fetch PaymentIntent and other details from your backend
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

    // Normally you would send cardDetails to your server here to handle payment
    // For demonstration, we'll simulate successful save
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
    <View style={styles.container}>
      <Text style={styles.title}>Checkout</Text>
      <Text>Your order details will be displayed here.</Text>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
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
