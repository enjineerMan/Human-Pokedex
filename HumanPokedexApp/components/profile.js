import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

function Profile(props) {
  return (
    <View style={styles.container}>
      <Image source={require('./download.jpeg')} style={styles.icon} />
      <View style={styles.detailsContainer}>
        <Text style={styles.name}>{"Person1"}</Text>
        <Text style={styles.location}>{"Toronto"}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: 'gray',
  },
  icon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  detailsContainer: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  location: {
    fontSize: 16,
    color: 'gray',
  },
});

export default Profile;
