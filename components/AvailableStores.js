import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ImageBackground, Button } from 'react-native';
import storesData from '../data/restro.json';
import { db, auth } from '../firebaseConfig';
import { ref, onValue } from 'firebase/database';

const AvailableStores = ({ navigation }) => {
    const [userName, setUserName] = useState('');
    const [stores, setStores] = useState([]);

    const checkIfStoreIsOpen = (store) => store.isOpen ? 'Open' : 'Closed';

    useEffect(() => {
        const userID = auth.currentUser.uid;
        const userRef = ref(db, 'users/' + userID);

        onValue(userRef, (snapshot) => {
            if (snapshot.exists()) {
                const userData = snapshot.val();
                setUserName(userData.firstName + ' ' + userData.lastName);
            } else {
                setUserName('User Not Found');
            }
        });
        setStores(storesData.stores);
    }, []);

    const renderStoreItem = ({ item }) => (
        <ImageBackground
            source={{ uri: item.imageURL }}
            style={styles.storeItem}
            imageStyle={{ borderRadius: 8 }}
        >
            <View style={styles.storeItemContent}>
                {item.isOpen ? (
                    <TouchableOpacity onPress={() => navigation.navigate('Menu', { store: item })}>
                        <Text style={styles.storeName}>{item.name}</Text>
                        <Text style={styles.storeLocation}>{item.location}</Text>
                        <Text style={[styles.storeStatus, { color: item.isOpen ? 'green' : 'red' }]}>
                            {checkIfStoreIsOpen(item)}
                        </Text>
                    </TouchableOpacity>
                ) : (
                    <View style={[styles.storeItem, { backgroundColor: '#eee' }]}>
                        <Text style={styles.storeName}>{item.name}</Text>
                        <Text style={styles.storeLocation}>{item.location}</Text>
                        <Text style={[styles.storeStatus, { color: 'red' }]}>Closed</Text>
                    </View>
                )}
                <TouchableOpacity onPress={() => navigation.navigate('CustomerReviews')}>
                    <Text style={styles.businessProfileReviewsButton}>Reviews</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Welcome, {userName}!</Text>
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={() => navigation.navigate('OrderHistory')}>
                    <Text style={styles.businessProfileButton}>Order History</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('BusinessProfile')}>
                    <Text style={styles.businessProfileButton}>Business Profile</Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.sectionTitle}>Available Stores:</Text>
            <FlatList
                data={stores}
                renderItem={renderStoreItem}
                keyExtractor={(item, index) => (item.id || index).toString()}
                contentContainerStyle={{ paddingBottom: 20 }}
            />

            <Button title="View Cart" color={"red"} onPress={() => navigation.navigate('Cart')} />

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: '#000501',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        marginTop: 20,
        color: 'white',
        textAlign: 'center',
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: 'white'
    },
    storeItem: {
        borderRadius: 8,
        marginBottom: 10,
        // opacity: 0.5,
        overflow: 'hidden',
    },
    imageStyle: {
        opacity: 0.1
    },
    storeItemContent: {
        borderWidth: 1,
        borderColor: '#ccc',
        // opacity:0.5,
        padding: 15,
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
    },
    storeName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    storeLocation: {
        fontSize: 16,
    },
    storeStatus: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 5,
    },
    businessProfileButton: {
        fontSize: 15,
        color: 'white',
        fontWeight: '100',
        textDecorationLine: 'underline',
        marginBottom: 20,
    },
    businessProfileReviewsButton: {
        fontSize: 15,
        color: 'black',
        fontWeight: '100',
        textDecorationLine: 'underline',
        marginBottom: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});

export default AvailableStores;
