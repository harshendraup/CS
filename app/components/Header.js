import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3498db',
  },
  input: {
    flex: 1,
    height: 30,
    backgroundColor: 'rgba(255,255,255,0.21)',
    marginTop: 10,
    marginBottom: 10,
    color: '#fff',
    textAlign:'center',
    color: '#FFFFFF',
    paddingHorizontal: 10
  }
});

const Header = (props) => (
  <View style={styles.container}>
    <TextInput
      style={styles.input}
      placeholder="Search..."
      placeholderTextColor='#FFFFFF'
      underlineColorAndroid='transparent'
      onChangeText={(text) => console.log('searching for ', text)}
    />
  </View>
);

export default Header;