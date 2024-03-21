import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, FlatList, TouchableOpacity } from 'react-native';

const CartScreen = ({ route, navigation }) => {
    const [cartItems, setCartItems] = useState(route.params.cartItems);

    const removeFromCart = (indexToRemove) => {
        setCartItems(currentItems => currentItems.filter((_, index) => index !== indexToRemove));
    };

    const renderItem = ({ item, index }) => (
        <View style={styles.itemContainer}>
            <Text>{item.name} - {item.price}</Text>
            <TouchableOpacity onPress={() => removeFromCart(index)} style={styles.removeButton}>
                <Text style={styles.removeButtonText}>Remove</Text>
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
            <Button title="Checkout" onPress={() => navigation.navigate('Checkout')} />
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
    removeButton: {
        backgroundColor: 'red',
        padding: 5,
        borderRadius: 5,
    },
    removeButtonText: {
        color: 'white',
    },
});

export default CartScreen;
