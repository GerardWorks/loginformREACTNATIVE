import React, { Component } from 'react';
import { Text } from 'react-native';
import Firebase from 'firebase';
import { Button, Card, CardSection, Input, Spinner } from './common';

class LoginForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: '',
      error: '',
      loading: false
    }
  }
  onButtonPress(){
    const { email, password } = this.state;
    this.setState({
      error: '',
      loading: true
    });
    Firebase.auth().signInWithEmailAndPassword(email, password)
    .then(this.onLoginSuccess.bind(this))
    .catch(() => {
      Firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(this.onLoginSuccess.bind(this))
      .catch(this.onLoginFail.bind(this))
    });
  }
  onLoginFail(){
    this.setState({
      error: 'Authentication Failed',
      loading: false
    });
  }
  onLoginSuccess(){
    this.setState({
      email: '',
      password: '',
      loading: false,
      error: 'Login Success'
    })
  }
  renderButton(){
    if(this.state.loading){
      return <Spinner size='small'/>
    }

    return(
      <Button onPress={this.onButtonPress.bind(this)}>
        Login
      </Button>
    )
  }
  render() {
    return (
      <Card>
          <CardSection >
            <Input
              label="Email"
              placeholder="youremail@mail.com"
              value={this.state.email}
              onChangeText={email => this.setState({email})}
            />
          </CardSection>
          <CardSection>
            <Input
              secureTextEntry
              label="Password"
              placeholder="password"
              value={this.state.password}
              onChangeText={password => this.setState({password})}
            />
          </CardSection>
          <Text style={styles.errorTextStyle}>{this.state.error}</Text>
          <CardSection>
            {this.renderButton()}
          </CardSection>

      </Card>
    );
  }
}

const styles={
  errorTextStyle:{
    fontSize:20,
    alignSelf: 'center',
    color: 'red'
  }
}

export default LoginForm;
