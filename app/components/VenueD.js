import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Image,
  ListView,
  AppRegistry,
  AsyncStorage
} from 'react-native';
import clamp from 'clamp';
import { Text, View, Content, 
         Container, Header, Title, 
         Button, Icon, List, 
         ListItem, Input, Thumbnail, 
         DeckSwiper, Card, CardItem } from 'native-base';
import { StackNavigator} from 'react-navigation';
//let vd1 = this.props.navigation.state.params.vd;
let cards = [
    {
        name: 'One',
        image: 'http://cdn.wonderfulengineering.com/wp-content/uploads/2016/02/red-wallpaper-3D.jpg'
    },
    {
        name: 'Two',
        image: 'http://g01.a.alicdn.com/kf/HTB1U84HKpXXXXbOXpXXq6xXFXXXn/Washable-wrinkle-resistant-font-b-photo-b-font-font-b-backdrops-b-font-150cm-x-200.jpg'
    },
    {
        name: 'Three',
        image: 'http://a.rgbimg.com/cache1nGAOw/users/b/br/branox/300/mi2ZMGO.jpg'
    },
    {
        name: 'Four',
        image: 'http://files.gretastyleinitaly.webnode.it/200002182-308f5318c9/friends-forever-red-pattern.jpg'
    }
];

export default class VenueD extends Component<{}> {

  componentDidMount() {
    
  }
  
  static navigationOptions = { title:  'Venues', };
  render() {
    return (
      <Container>
        <View>
          <DeckSwiper dataSource={cards}
            renderItem={(item)=>
              <Card style={styles.viewStyle}>
                <CardItem>
                  <Image style={styles.photo}
                  source={{uri : item.image}} 
                  />
                </CardItem>
              </Card>
            }>
          </DeckSwiper>
        </View>
      </Container>    
    );
  }
}
const styles = StyleSheet.create({
  screenStyle:{
    flex:1,
    marginTop:20,
    marginBottom: 20,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: '#F7DC6F',
    borderRadius:25,

  },
  viewStyle:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    padding: 25,
    color: 'red',
    textAlign: 'center'
  },
  photo: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 900,
    width:  500
  }
});
