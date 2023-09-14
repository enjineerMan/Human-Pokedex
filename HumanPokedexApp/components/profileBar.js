import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

function FriendListItem(props) {
  const handleArrowPress = () => {
    // Function to execute when arrow button is pressed
    props.setPage(false);
  };

  return (
    <View style={styles.container}>
      <Image source={require('./download.jpeg')} style={styles.profilePicture} />
      <View style={styles.detailsContainer}>
        <Text style={styles.name}>{props.name}</Text>
        <Text style={styles.location}>{props.location}</Text>
      </View>
      <TouchableOpacity onPress={handleArrowPress} style={styles.arrow}>
        <Image source={require('./right-arrow.png')} style={styles.arrowImage} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 100,
    width: '100%',
    padding: 20,
    backgroundColor: 'transparent',
    borderColor: 'gray',
    borderWidth: 2,
  },
  profilePicture: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  detailsContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  location: {
    fontSize: 16,
    color: 'gray',
  },
  arrow: {
    width: 20,
    height: 20,
    marginLeft: 15,
  },
  arrowImage: {
    width: '100%', // Adjust the arrow image's width to match the TouchableOpacity
    height: '100%', // Adjust the arrow image's height to match the TouchableOpacity
  },
});

export default FriendListItem;
