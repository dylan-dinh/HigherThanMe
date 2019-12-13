import React, { Component } from 'react';
import { View, StyleSheet, Text, AsyncStorage, ScrollView } from 'react-native';
import { Button } from 'react-native-elements';
import '../Navigation/Navigator';
import '../Navigation/NavigatorService';
import Geolocation from '@react-native-community/geolocation';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      city: '',
      initialPosition: 'null',
      lastPosition: 'null',
    };
    this.retrieveData();
    this.getPosition();
    // this.updateLocation();
  }
  getInfoUser = async (token) => {
    const response = await fetch(
      'https://higherthanme.herokuapp.com/info_user/' + token,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );
    const byte = await response.json();
    this.setState({
      firstName: byte.firstName,
      lastName: byte.lastName,
      //initialPosition: byte.initialPosition,
      city: byte.city,
    });
    console.log(byte);
  };

  updateLocation = async (token) => {
    const response = await fetch('https://higherthanme.herokuapp.com/update_location/' + token,
      {
        method: 'PUT',
        body: this.state.initialPosition,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      })
    const byte = await response.json()
    console.log(byte)
    this.setState({ initialPosition: byte.latitude })
  }

  getPosition() {
    Geolocation.getCurrentPosition(position => {
      const initialPosition = position.coords.latitude;
      this.setState({ initialPosition: initialPosition });
    });
  }

  deconnection = async () => {
    console.log('LOL');
    try {
      await AsyncStorage.clear();
      console.log('deconnected');
      this.props.navigation.navigate('Login');
    } catch (error) {
      console.log(error);
    }
  };

  retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('token');
      if (value !== null) {
        console.log(value);
        console.log('sucess Retrived token IN HOME');
        this.getInfoUser(value);
        // this.updateLocation(value);
        console.log(this.state);
      }
    } catch (error) {
      console.log('error while getting data to async storage in HOME');
    }
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.titleText}>
          Bonjour {this.state.firstName} {this.state.lastName} de{' '}
          {this.state.city}
        </Text>

        <Text style={styles.titleText}>
          Ma position actuelle {this.state.initialPosition}
        </Text>
        <Button
          buttonStyle={styles.submitButton}
          title="Déconnexion"
          onPress={() => {
            this.deconnection();
          }}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2f2d30',
    padding: 30,
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
  decoButton: {
    backgroundColor: 'rgba(92, 99,216, 1)',
    padding: 1,
    margin: 15,
    height: 40,
    borderColor: 'transparent',
    borderWidth: 0,
    borderRadius: 5,
    top: 60,
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingTop: 50,
    color: 'pink',
  },
});
