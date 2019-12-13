import React, {Component} from 'react';
import {View, TextInput, StyleSheet, Text, AsyncStorage} from 'react-native';
import {Button} from 'react-native-elements';
import qs from 'querystring';
import '../Navigation/Navigator';
import '../Navigation/NavigatorService';

var email;
var password;

storeData = async token => {
  try {
    await AsyncStorage.setItem('token', token);
    console.log('success');
  } catch (error) {
    console.log('error while saving data to async storage');
  }
};

retrieveData = async () => {
  try {
    const value = await AsyncStorage.getItem('token');
    if (value !== null) {
      console.log(value);
      console.log('sucess Retrived token');
    }
  } catch (error) {
    console.log('error while getting data to async storage');
  }
};

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      canConnect: null,
    };
  }
  handleEmail = text => {
    email = text;
    console.log(email);
  };

  handlePassword = text => {
    password = text;
    console.log(password);
  };

  getLoggedIn = async (url, email, password) => {
    const data = {
      email: email,
      password: password,
    };
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        //'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: qs.stringify(data), // body data type must match "Content-Type" header
    });
    const bite = await response.json(); //console.log(JSON.stringify(response, null, 1)); // parses JSON response into native JavaScript objects
    if (response.status == 200) {
      const res = await storeData(bite.token);
      this.setState({canConnect: true});
      this.props.navigation.navigate('Home');
      email = '';
      password = '';
    } else {
      alert('Mauvaise combinaison email / mot de passe');
      this.setState({canConnect: false});
      return;
    }
  };

  /*componentWillMount() {
    email = '';
    password = '';
  }*/

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          underlineColorAndroid={'transparent'}
          placeholder={'Email'}
          placeholderTextColor={'rgba(92, 99,216, 1)'}
          autoCapitalize={'none'}
          onChangeText={this.handleEmail}
          keyboardType={'email-address'}
        />
        <TextInput
          style={styles.input}
          underlineColorAndroid={'transparent'}
          secureTextEntry={true}
          placeholder={'Password'}
          placeholderTextColor={'rgba(92, 99,216, 1)'}
          autoCapitalize={'none'}
          onChangeText={this.handlePassword}
          keyboardType={'default'}
        />
        <Button
          buttonStyle={styles.submitButton}
          title="Get logged in !"
          onPress={() => {
            this.getLoggedIn('http://localhost:8000/login', email, password);
          }}
        />
        <Button
          buttonStyle={styles.submitButton2}
          title="Create an account !"
          onPress={() => this.props.navigation.navigate('Register')}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 250,
    flex: 1,
    backgroundColor: '#2f2d30',
    padding: 30,
  },
  input: {
    margin: 8,
    height: 40,
    borderColor: 'rgba(92, 99,216, 1)',
    borderWidth: 2,
    color: 'pink',
    borderRadius: 5,
  },
  submitButton: {
    backgroundColor: 'rgba(92, 99,216, 1)',
    padding: 1,
    margin: 15,
    height: 40,
    borderColor: 'transparent',
    borderWidth: 0,
    borderRadius: 5,
  },
  submitButton2: {
    backgroundColor: 'rgba(92, 99,216, 1)',
    padding: 1,
    margin: 15,
    height: 40,
    borderColor: 'transparent',
    borderWidth: 0,
    borderRadius: 5,
  },
});
