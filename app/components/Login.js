import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  AsyncStorage,
  Image,
  ActivityIndicator,
} from 'react-native';
import { StackNavigator} from 'react-navigation';

export default class Login extends Component<{}> {

  static navigationOptions = {
    header:  false,
  }

  constructor(props) {
    super(props);
    this.state = {
      userEmail: '',
      userPassword: '',
      isLoading: true,
      loadingLogin: false,
      metaR: '',
    }
  }

  componentDidMount() {
    this._loadInitialState().done();
    fetch("http://sandbox.cricscorrer.com/api/v1/index.php?endpoint=meta",{
      method:'get',
      headers: {
        'Content-Type':'application/json',
        'x-api-key':'03a69ec46130e1e1ada02ab2044effa1def0685592226f317b2716baf25749b3'
      }//,
      // body:JSON.stringify({
      //   endpoint: 'meta'
      // })
    })
    .then((response) => response.json())
    .then((res) => {
      var metaString = JSON.stringify(res);
      var meta = JSON.parse(metaString);
      metaR = meta;
      this.setState({
        isLoading: false,
        metaR: meta,
      });
    })
  }

  _loadInitialState = async () => {

    var value = await AsyncStorage.getItem('user');
    var a_t = value;
    if (value !==null) {
      //This taking my user to ListM as my user din't log out.
      this.props.navigation.navigate('ListM',{a_t});
    }
  }

  render() {
    if(this.state.isLoading){
      return(
        <View style={styles.container}>
          <View style={styles.logoContainer}>
            <Image
              style={styles.logo} 
              source={require('./logo.jpg')} 
            />
          </View>
          <ActivityIndicator
             color = '#CCCC00'
             size = "large"
             style = {styles.loading}
          />
        </View>
      );
    } 
    return (
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image
            style={styles.logo} 
            source={require('./logo.jpg')} 
          />
          <Text style={styles.title}> An App made using React-Native </Text>
        </View>
        <KeyboardAvoidingView behavior='padding' style={styles.container1}>

          <TextInput
            placeholder="Username or Email"
            placeholderTextColor="rgba(255,255,255,0.5)"
            underlineColorAndroid='transparent'
            style={styles.input}
            keyboardType='email-address'
            onChangeText={userEmail => this.setState({userEmail})}
          />
          <TextInput
            placeholder="Password"
            placeholderTextColor="rgba(255,255,255,0.5)"
            underlineColorAndroid='transparent'
            secureTextEntry
            returnKeyType="go"
            style={styles.input}
            onChangeText={userPassword => this.setState({userPassword})}
          />
          <TouchableOpacity onPress={this.login} style={styles.buttonContainer}>
            <Text style={styles.buttonText}>LOGIN</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    );
    if(this.state.loadingLogin){
      return(
        <View style={styles.container}>
          <ActivityIndicator 
            size='large'
            color = '#CCCC00'
            style={styles.loading} 
          />
        </View>
      );
    } 
  }

  login =() => {
    this.setState({
      loadingLogin: true, 
    });

    const {userEmail,userPassword} = this.state;
    fetch('http://sandbox.cricscorrer.com/api/v1/index.php',{
    method:'post',
    headers: {
      'Content-Type':'application/json',
      'x-api-key':'03a69ec46130e1e1ada02ab2044effa1def0685592226f317b2716baf25749b3'
    },
      body:JSON.stringify({
      endpoint: 'login',
      user: {
        email: userEmail,
        password: userPassword
      }
    })
  })
  .then((response) => response.json())
   .then((responseJson) => {
      var json = JSON.parse(JSON.stringify(responseJson));
      a_t = json.access_token;
      userid = json.user_id;
      user_role = json.user_role;
      email = json.email;
      if (json.access_token){ 
        this.setState({
        loadingLogin: false, 
        });
        AsyncStorage.setItem('user', json.access_token);
        this.props.navigation.navigate('ListM',{a_t}, {metaR});
      }
      else {
        alert("User do not exists in data base");
        this.setState({
        loadingLogin: false, 
        });
      }
   })
   .catch((error)=> {
     console.error(error);
   });
  }
}
const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor:'#3498db'
  },
  logoContainer:{
    alignItems: 'center',
    flexGrow: 1, 
    justifyContent: 'center'
  },
  logo: {
    width: 100,
    height: 100

  },
  title: {
    color:'#FFFFFF',
    marginTop: 20,
    width: 200,
    textAlign: 'center'
  },

  container1: {
    padding: 20
  },
  input: {
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.21)',
    marginBottom: 10,
    color: '#fff',
    borderRadius: 10,
    paddingHorizontal: 10

  },
  buttonContainer: {
    backgroundColor:'#2980b9',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10
},
  buttonText: {
    textAlign:'center',
    color: '#FFFFFF',
    fontWeight: '700'
},
activityIndicator: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      height: 80
},
loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
