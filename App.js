import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import { StackNavigator} from 'react-navigation';
import Login from './app/components/Login';
import ListM from './app/components/ListM';
import VenueD from './app/components/VenueD';

const Application = StackNavigator({
    Home: { screen: Login },
    ListM: { screen: ListM},
    VenueD: { screen: VenueD},
    }, {
        navigationOption: {
            header: false,
        }    
});

export default class App extends Component<{}> {
    render() {
      return (
        <Application />
      );
    }
}