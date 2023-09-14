/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useState } from 'react';
import Heading from './components/heading'; 
import Profile from './components/profile';
import FriendListItem from './components/profileBar';
const userData = require('./tempDB.json');

function App(): JSX.Element {
  const [page, setPage] = useState(true);
  return (
    <View>
        {/* <Text>Open up App.js to start working on your app!</Text>
        <StatusBar style="auto" /> */}
        <Heading/>
        {page ?         
          <View>
            {/* <FriendListItem name="person1" location="Toronto" setPage = {setPage}/>
            <FriendListItem name="person2" location="Waterloo" setPage = {setPage}/>  */}
            {Object.keys(userData["users"]).map(user => (
              
              <FriendListItem name={user} location={userData["users"][user]["location"]} setPage = {setPage}/>
            ))}
          </View>
        : <View>
            <Profile/>
            <Text>Person1 was encountered at the park</Text>
            <Text>{"<More details about person1>"}</Text>
          </View>
        }
    </View>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
