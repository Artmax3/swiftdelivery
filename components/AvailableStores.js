import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, TextInput } from 'react-native';
import storesData from '../data/restro.json';
import { db, auth } from '../firebaseConfig';
import { ref, onValue } from 'firebase/database';

const AvailableStores = ({ navigation }) => {
    const [userName, setUserName] = useState('');
    const [stores, setStores] = useState([]);
    const [searchQuery, setSearchQuery] = useState(''); 
    const [filteredStores, setFilteredStores] = useState([]); 

    const checkIfStoreIsOpen = (store) => store.isOpen ? 'Open' : 'Closed';

    const handleSearch = (query) => { 
        setSearchQuery(query);
        if (query) {
            setFilteredStores(stores.filter(store => store.name.toLowerCase().includes(query.toLowerCase())));
        } else {
            setFilteredStores(stores);
        }
    };

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
        setFilteredStores(storesData.stores); 
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
                    <TouchableOpacity onPress={() => navigation.navigate('CustomerReviews')}>
                        <Text style={styles.businessProfileButton}>Reviews</Text>
                    </TouchableOpacity>
                </TouchableOpacity>
            ) : (
                <View style={[styles.storeItem, { backgroundColor: '#eee' }]}>
                    <Text style={styles.storeName}>{item.name}</Text>
                    <Text style={styles.storeLocation}>{item.location}</Text>
                    <Text style={[styles.storeStatus, { color: 'red' }]}>Closed</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('CustomerReviews')}>
                        <Text style={styles.businessProfileButton}>Reviews</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Welcome, {userName}!</Text>
            <TextInput 
                style={styles.searchBar}
                value={searchQuery}
                onChangeText={handleSearch}
                placeholder="Search for dishes or restaurants"
            />
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
                data={filteredStores} 
                renderItem={renderStoreItem}
                keyExtractor={(item, index) => (item.id || index).toString()} 
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
    businessProfileButton: {
        fontSize: 13,
        color: 'blue',
        fontWeight: 100,
        textDecorationLine: 'underline',
        marginBottom: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    searchBar: { 
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 8,
        padding: 10,
        marginBottom: 20,
    },
});

export default AvailableStores;