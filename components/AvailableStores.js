import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import storesData from '../data/restro.json';
import { db, auth } from '../firebaseConfig';
import { ref, onValue } from 'firebase/database';

const AvailableStores = ({ navigation }) => {
    const [userName, setUserName] = useState('');
    const [stores, setStores] = useState([]);

    useEffect(() => {
        // Fetch the user's name from the Realtime Database based on the logged-in user's UID
        // Assuming this part remains unchanged
        const userID = auth.currentUser.uid;
        const userRef = ref(db, 'users/' + userID);

        // Listen for changes in the user's data
        onValue(userRef, (snapshot) => {
            if (snapshot.exists()) {
                const userData = snapshot.val();
                setUserName(userData.firstName + ' ' + userData.lastName);
            } else {
                setUserName('User Not Found'); // Handle the case where user data is not found
            }
        });

        // Set the stores from the imported JSON data
        setStores(storesData.stores);
    }, []);

    const renderStoreItem = ({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate('Menu', { store: item })} style={styles.storeItem}>
            <Text style={styles.storeName}>{item.name}</Text>
            <Text style={styles.storeLocation}>{item.location}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Welcome, {userName}!</Text>
            <Text style={styles.sectionTitle}>Available Stores:</Text>
            <FlatList
                data={stores}
                renderItem={renderStoreItem}
                keyExtractor={(item, index) => (item.id || index).toString()} // Provide a default value if id is undefined
                contentContainerStyle={{ paddingBottom: 20 }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    storeItem: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 15,
        marginBottom: 10,
        width: '100%',
    },
    storeName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    storeLocation: {
        fontSize: 16,
    },
});

export default AvailableStores;
