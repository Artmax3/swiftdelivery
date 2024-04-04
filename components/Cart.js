import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, FlatList, TouchableOpacity, TextInput, Alert } from 'react-native';
import { db, auth } from '../firebaseConfig';
import { ref, get, update, child, remove } from 'firebase/database';

const Cart = ({ route, navigation }) => {
    const [cartItems, setCartItems] = useState([]);

    // Fetch cart items from the database when the component mounts
    useEffect(() => {
        const user = auth.currentUser;
        if (user) {
            const userID = user.uid;
            const cartRef = ref(db, `users/${userID}/cartItems`);

            get(cartRef).then((snapshot) => {
                if (snapshot.exists()) {
                    const data = snapshot.val();
                    const items = Object.keys(data).map((key) => ({ ...data[key], id: key }));
                    setCartItems(items);
                } else {
                    setCartItems([]);
                }
            }).catch((error) => {
                console.error("Error fetching cart items:", error);
            });
        } else {
            Alert.alert("User Not Logged In!");
        }
    }, []);

    const removeFromCart = (id) => {
        // Remove item from database
        const user = auth.currentUser;
        if (user) {
            const userID = user.uid;
            const cartItemRef = ref(db, `users/${userID}/cartItems/${id}`);
            remove(cartItemRef).then(() => {
                // Update local state after successful removal from database
                setCartItems(currentItems => currentItems.filter(item => item.id !== id));
            }).catch((error) => {
                console.error("Error removing item from cart:", error);
            });
        } else {
            Alert.alert("User Not Logged In!");
        }
    };

    const updateQuantityInDatabase = (id, quantity) => {
        const user = auth.currentUser;
        if (user) {
            const userID = user.uid;
            const cartItemRef = ref(db, `users/${userID}/cartItems/${id}`);
            update(cartItemRef, { quantity: quantity })
                .then(() => {
                    console.log("Quantity updated in database");
                })
                .catch((error) => {
                    console.error("Error updating quantity in database:", error);
                });
        } else {
            Alert.alert("User Not Logged In!");
        }
    };

    const incrementQuantity = (index) => {
        const updatedCartItems = [...cartItems];
        updatedCartItems[index].quantity += 1;
        setCartItems(updatedCartItems);
        updateQuantityInDatabase(updatedCartItems[index].id, updatedCartItems[index].quantity);
    };

    const decrementQuantity = (index) => {
        const updatedCartItems = [...cartItems];
        if (updatedCartItems[index].quantity > 1) {
            updatedCartItems[index].quantity -= 1;
            setCartItems(updatedCartItems);
            updateQuantityInDatabase(updatedCartItems[index].id, updatedCartItems[index].quantity);
        }
    };

    const editQuantity = (index, newQuantity) => {
        const updatedCartItems = [...cartItems];
        if (newQuantity >= 0) {
            updatedCartItems[index].quantity = newQuantity;
            setCartItems(updatedCartItems);
            updateQuantityInDatabase(updatedCartItems[index].id, updatedCartItems[index].quantity);
        }
    };

    const renderItem = ({ item, index }) => (
        <View style={styles.itemContainer}>
            <Text>{item.name} - ${item.price}</Text>
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
            <TouchableOpacity onPress={() => removeFromCart(item.id)} style={styles.actionButton}>
                <Text style={styles.actionButtonText}>Remove</Text>
            </TouchableOpacity>
        </View>
    );

    const goToOrderScreen = () => {
        navigation.navigate('Order', { orders: cartItems });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Your Cart</Text>
            <FlatList
                data={cartItems}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
            />
            <Button title="Proceed to Checkout" color="white" onPress={goToOrderScreen} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#000501',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: 'white',
    },
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
        padding: 10,
        backgroundColor: 'white',
        borderRadius: '5px',
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

export default Cart;
