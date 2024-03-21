import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';

const AvailableStores = ({ navigation }) => {
    const stores = [
        { id: 1, name: 'Hakka Restaurant', location: '123 Main St' },
        { id: 2, name: 'Chinese Restaurant', location: '456 Dundas St' },
        { id: 3, name: 'Indian Restaurant', location: '789 Ann St' },
        { id: 4, name: 'IndiMex Restaurant', location: '321 Emery St' },
    ];

    const renderStoreItem = ({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate('Menu', { store: item })} style={styles.storeItem}>
            <Text style={styles.storeName}>{item.name}</Text>
            <Text style={styles.storeLocation}>{item.location}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.sectionTitle}>Available Stores:</Text>
            <FlatList
                data={stores}
                renderItem={renderStoreItem}
                keyExtractor={item => item.id.toString()}
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
