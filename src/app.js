import React, { Component } from 'react';
import { View } from 'react-native';
import Firebase from 'firebase';
import { Header, Button, CardSection, Spinner } from './components/common';
import LoginForm from './components/LoginForm';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: null,
      loggedInAs: ''
    }
  }
  componentWillMount(){
    Firebase.initializeApp({
    apiKey: 'AIzaSyCWUMYLyVDfSoyb3SxlQPnTnqkYHn11rGE',
    authDomain: 'authenticationproject-ba4d0.firebaseapp.com',
    databaseURL: 'https://authenticationproject-ba4d0.firebaseio.com',
    projectId: 'authenticationproject-ba4d0',
    storageBucket: 'authenticationproject-ba4d0.appspot.com',
    messagingSenderId: '779017858423'
  });

    Firebase.auth().onAuthStateChanged((user) => {
      if(user){
        this.setState({
          loggedIn: true
        });
      }else{
        this.setState({
          loggedIn: false
        });
      }
    });
  }
  logOut(){
    Firebase.auth().signOut();
  }
  renderContent(){
    switch(this.state.loggedIn){
      case true:
        return (
          <CardSection>
            <Button onPress={this.logOut}>
              LogOut
            </Button>
          </CardSection>
        );
      case false:
        return <LoginForm /> ;
      default:
        return <Spinner size="large" />
    }
  }
  render() {
    return (
      <View>
        <Header headerText="Authentication" />
        {this.renderContent()}
      </View>
    )
  }
}

export default App;
