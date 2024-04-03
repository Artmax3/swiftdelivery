import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, FlatList, TouchableOpacity, TextInput } from 'react-native';

const CartScreen = ({ route, navigation }) => {
    const [cartItems, setCartItems] = useState(route.params.cartItems.map(item => ({ ...item, quantity: 1 })));

    const removeFromCart = (indexToRemove) => {
        setCartItems(currentItems => currentItems.filter((_, index) => index !== indexToRemove));
    };

    const incrementQuantity = (index) => {
        const updatedCartItems = [...cartItems];
        updatedCartItems[index].quantity += 1;
        setCartItems(updatedCartItems);
    };

    const decrementQuantity = (index) => {
        const updatedCartItems = [...cartItems];
        if (updatedCartItems[index].quantity > 1) {
            updatedCartItems[index].quantity -= 1;
            setCartItems(updatedCartItems);
        }
    };

    const editQuantity = (index, newQuantity) => {
        const updatedCartItems = [...cartItems];
        if (newQuantity >= 0) { // Prevent negative quantities
            updatedCartItems[index].quantity = newQuantity;
            setCartItems(updatedCartItems);
        }
    };

    const goToOrderScreen = () => {
        navigation.navigate('Order', { orders: cartItems });
    };

    const renderItem = ({ item, index }) => (
        <View style={styles.itemContainer}>
            <Text>{item.name} - {item.price}</Text>
            <View style={styles.quantityContainer}>
                <TouchableOpacity onPress={() => decrementQuantity(index)} style={styles.quantityButton}>
                    <Text style={styles.quantityButtonText}>-</Text>
                </TouchableOpacity>
                <TextInput
                    style={styles.quantityInput}
                    value={item.quantity ? item.quantity.toString() : '0'}
                    keyboardType="numeric"
                    onChangeText={(text) => editQuantity(index, parseInt(text) || 0)}
                />
                <TouchableOpacity onPress={() => incrementQuantity(index)} style={styles.quantityButton}>
                    <Text style={styles.quantityButtonText}>+</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => removeFromCart(index)} style={styles.actionButton}>
                <Text style={styles.actionButtonText}>Remove</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Your Cart</Text>
            <FlatList
                data={cartItems}
                renderItem={renderItem}
                keyExtractor={(_, index) => index.toString()}
            />
            <Button title="Proceed to Checkout" onPress={goToOrderScreen} />
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    quantityInput: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        paddingLeft: 5,
        marginRight: 10,
        width: 50,
    },
    quantityButton: {
        backgroundColor: 'lightgray',
        borderRadius: 5,
        padding: 5,
    },
    quantityButtonText: {
        fontSize: 20,
    },
    actionButton: {
        backgroundColor: 'red',
        padding: 5,
        borderRadius: 5,
    },
    actionButtonText: {
        color: 'white',
    },
});

export default CartScreen;
