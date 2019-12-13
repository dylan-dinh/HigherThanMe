import React, {Component} from 'react';
import {View, TextInput, StyleSheet, Text, AsyncStorage} from 'react-native';
import {Button} from 'react-native-elements';
import qs from 'querystring';
import '../Navigation/Navigator';
import '../Navigation/NavigatorService';

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      password2: '',
      isSame: null,
      firstName: '',
      lastName: '',
      city: '',
    };
  }
  handleEmail = text => {
    this.setState({email: text});
  };

  handlePassword = text => {
    this.setState({password: text});
  };

  handlePassword2 = text => {
    this.setState({password2: text});
  };

  handleFirstName = text => {
    this.setState({firstName: text});
  };
  handleLastName = text => {
    this.setState({lastName: text});
  };
  handleCity = text => {
    this.setState({city: text});
  };

  comparePassword = () => {
    if (this.state.password === this.state.password2)
      this.setState({isSame: true});
    else this.setState({isSame: false});
  };

  getRegister = async (email, password, firstName, lastName, city) => {
    this.comparePassword();
    if (this.state.isSame === true) {
      const data = {
        email: this.state.email,
        password: this.state.password,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        city: this.state.city,
      };
      const response = await fetch('http://localhost:8000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: qs.stringify(data),
      });
      const byte = await response.json();
      console.log(response.status);
      if (response.status === 200) {
        alert('Vous venez de vous inscrire à HigherThanMe');
      } else {
        alert('Email ou mot de passe mal formaté');
      }
    } else {
      alert('Les mots de passe ne correspondent pas');
    }
  };
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

        <TextInput
          style={styles.input}
          underlineColorAndroid={'transparent'}
          secureTextEntry={true}
          placeholder={'Verify password'}
          placeholderTextColor={'rgba(92, 99,216, 1)'}
          autoCapitalize={'none'}
          onChangeText={this.handlePassword2}
          keyboardType={'default'}
        />

        <TextInput
          style={styles.input}
          underlineColorAndroid={'transparent'}
          placeholder={'First name'}
          placeholderTextColor={'rgba(92, 99,216, 1)'}
          autoCapitalize={'none'}
          onChangeText={this.handleFirstName}
          keyboardType={'default'}
        />
        <TextInput
          style={styles.input}
          underlineColorAndroid={'transparent'}
          placeholder={'Last name'}
          placeholderTextColor={'rgba(92, 99,216, 1)'}
          autoCapitalize={'none'}
          onChangeText={this.handleLastName}
          keyboardType={'default'}
        />
        <TextInput
          style={styles.input}
          underlineColorAndroid={'transparent'}
          placeholder={'City'}
          placeholderTextColor={'rgba(92, 99,216, 1)'}
          autoCapitalize={'none'}
          onChangeText={this.handleCity}
          keyboardType={'default'}
        />

        <Button
          buttonStyle={styles.submitButton}
          title="Register"
          onPress={() => {
            this.getRegister(
              this.state.email,
              this.state.password,
              this.state.firstName,
              this.state.lastName,
              this.state.city,
            );
          }}
        />
        <Button
          buttonStyle={styles.submitButton2}
          title="Go to log in page"
          onPress={() => this.props.navigation.navigate('Login')}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 200,
    backgroundColor: '#2f2d30',
    padding: 30,
    flex: 1,
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
