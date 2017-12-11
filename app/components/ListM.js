import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  AppRegistry,
  ListView,
  Image,
  TouchableOpacity,
  TextInput, 
  ActivityIndicator,
  AsyncStorage
} from 'react-native';
import Header from './Header';
import clamp from 'clamp';
import { Content, Container, Title, 
         Button, Icon, List, 
         ListItem, Input, Thumbnail, 
         DeckSwiper, Card, CardItem } from 'native-base';
import { StackNavigator} from 'react-navigation';
var cards = [];

export default class ListM extends Component<{}> {

    //static navigationOptions = ({navigation}) => ({title:`${navigation.state.params.a_t}`});
    static navigationOptions = { title:  'Your Matches', };

    constructor(props) {
      super(props);
      this.state = {
        isLoading: true, 
        matchlist: false,
        venueimage: false,
        clonedVenues: [],
        vimage: [],
        a_t: this.props.navigation.state.params.a_t,
        metaR: this.props.navigation.state.params.metaR,
      } 
    }
    componentDidMount() {
      
      fetch("http://sandbox.cricscorrer.com/api/v1/index.php?endpoint=matches",{
        method:'get',
        headers: {
          'Content-Type':'application/json',
          'x-api-key':'03a69ec46130e1e1ada02ab2044effa1def0685592226f317b2716baf25749b3',
          'Authorization':'Bearer ' + a_t
        }//,
        // body:JSON.stringify({
        //   endpoint: 'meta'
        // })
      })
      .then((response) => response.json())
      .then((res) => {
        var stdDataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        var resString = JSON.stringify(res);
        var data = JSON.parse(resString);
        var v1   = metaR.venues;
        var v = data.matches;
        var listim = [];
        var mvi   =  [];
        var htn   =  [];
        var atn   =  [];
        for (var i = 0; i < data.matches.length; i++)
        {
          mvi[i] = data.matches[i].venue_id;
        }
        for (var i = 0; i < data.matches.length; i++)
        {
          for ( var j = 0; j < metaR.venues.length; j++)
          {
            if (mvi[i]==metaR.venues[j].id)
            {
              listim[i]= {
                image: metaR.venues[j].image,
              };
            }
          }
        }
        for (var i = 0; i < data.matches.length; i++)
        {
          mvi[i] = data.matches[i].home_team_id;
        }
        for (var i = 0; i < data.matches.length; i++)
        {
          for ( var j = 0; j < metaR.teams.length; j++)
          {
            if (mvi[i]==metaR.teams[j].id)
            {
              htn[i]= {
                HomeTeam: metaR.teams[j].name,
              };
            }
          }
        }
        for (var i = 0; i < data.matches.length; i++)
        {
          mvi[i] = data.matches[i].away_team_id;
        }
        for (var i = 0; i < data.matches.length; i++)
        {
          for ( var j = 0; j < metaR.teams.length; j++)
          {
            if (mvi[i]==metaR.teams[j].id)
            {
              atn[i]= {
                image: listim[i].image,
                HomeTeam: htn[i].HomeTeam,
                GuestTeam: metaR.teams[j].name,
              };
            }
          }
        }
        for ( var i = 0; i < atn.length; i++)
        {
          {
            cards[i]= {
              image: atn[i].image,
              HomeTeam: atn[i].HomeTeam,
              GuestTeam: atn[i].name,
            };
          }
        }
        this.setState({
          isLoading: false,
          matchlist: true,   
          clonedVenues: stdDataSource.cloneWithRows(atn),
        });        
      }).catch(error=>{
        alert("No response from server");
      })
    }
    render() {
      if(this.state.isLoading){
        return(
          <View style={styles.container}>
            <ActivityIndicator
             color = '#CCCC00'
             size = "large"
             style = {styles.activityIndicator}/>
          </View>
        );
      }
      if(this.state.matchlist)
      {       
        return (
          <View style={styles.container}>            
            <ListView 
              
              dataSource={this.state.clonedVenues}
              renderRow={
                (rowData) => 
                <TouchableOpacity style={styles.listContainer} onPress={this.venuedetails} >
                  <Image style={{width: 100, height: 75, padding: 15}}
                    source={{uri: rowData.image}}
                  />               
                  <Text style={styles.title}>{rowData.HomeTeam} v/s {rowData.GuestTeam}</Text>
                </TouchableOpacity>              
              }
              renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
              renderHeader={() => 
                <TextInput
                  style={styles.input}
                  placeholder="Search..."
                  placeholderTextColor='#FFFFFF'
                  underlineColorAndroid='transparent'
                  onChangeText={(text) => console.log('searching for ', text)}
                />
              }
            >
            </ListView>        
          </View>
        );
      }
      if(this.state.venueimage)
      {
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
                      <Text style={styles.title}>{item.HomeTeam} v/s {item.GuestTeam}</Text>
                    </CardItem>
                  </Card>
                }>
              </DeckSwiper>
            </View>
          </Container>    
        );
      }
    }
  venuedetails =() => {
    navigationOptions = { title:  'Your Venues', };
    this.setState({
      venueimage: true,
      matchlist: false,
    });        
  }
}

const styles = StyleSheet.create({
  
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#CCCC00',
  },
  container:{
    flex: 1,
    backgroundColor:'#3498db'
  },
  title: {
    color:'#FFFFFF',
    padding: 20,
    //width: 200,
    textAlign: 'center'
  },
  activityIndicator: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      height: 80
   }, 
   listContainer: {
    flexDirection: 'row',
    padding: 10
   },
   input: {
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.21)',
    marginBottom: 10,
    color: '#fff',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginTop: 5,
    marginLeft: 5, 
    marginRight: 5
  },
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
    backgroundColor: '#3498db'
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
    height: 400,
    width:  250,
    padding: 5
  }
});
