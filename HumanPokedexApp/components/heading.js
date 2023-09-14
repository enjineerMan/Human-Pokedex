import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

function Heading(props) {
    return (
        <View
        style={styles.heading}>
            <Text style={styles.title}>HumanPokedex</Text>
      </View>
    );
}

const styles = StyleSheet.create({
  title: {
    fontWeight:'bold', 
    color:'black', 
    fontSize: 18, 
    marginTop: 17, 
    marginLeft: 10
  },
  heading: {
    flexDirection: 'row',
    height: 50,
    width: '100%',
    backgroundColor: 'red',
  }
});
export default Heading;