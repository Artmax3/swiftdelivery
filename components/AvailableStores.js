import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
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
        <View>
            {item.isOpen ? (
                <TouchableOpacity onPress={() => navigation.navigate('Menu', { store: item })} style={styles.storeItem}>
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
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Welcome, {userName}!</Text>
            <TouchableOpacity onPress={() => navigation.navigate('BusinessProfile')} style={styles.storeItem}>
                <Text style={styles.storeName}>Business Profile</Text>
            </TouchableOpacity>
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
});

export default AvailableStores;
