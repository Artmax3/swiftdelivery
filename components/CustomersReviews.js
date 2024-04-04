import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const CustomerReviewsScreen = () => {
  const customerReviews = [
    { id: '1', username: 'JohnDoe', rating: 4, comment: 'Great food and friendly staff!' },
    { id: '2', username: 'JaneSmith', rating: 5, comment: 'Best restaurant in town!' },
    { id: '3', username: 'MikeJohnson', rating: 3, comment: 'Good food, but service was a bit slow.' },
  ];

  const renderReviewItem = ({ item }) => (
    <View style={styles.reviewContainer}>
      <Text style={styles.username}>{item.username}</Text>
      <Text style={styles.rating}>Rating: {item.rating}</Text>
      <Text style={styles.comment}>{item.comment}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Customer Reviews</Text>
      <FlatList
        data={customerReviews}
        keyExtractor={(item) => item.id}
        renderItem={renderReviewItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#000501',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white',
    textAlign: 'center'
  },
  reviewContainer: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#D5D8E1",
  },
  username: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  rating: {
    marginBottom: 5,
    color: 'blue'
  },
});

export default CustomerReviewsScreen;
