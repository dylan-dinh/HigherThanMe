import React, {Component} from 'react';
import {View, StyleSheet, Text, AsyncStorage, ScrollView} from 'react-native';
import {Button} from 'react-native-elements';
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
  }
  getInfoUser = async token => {
    const response = await fetch('http://localhost:8000/info_user/' + token, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    const bite = await response.json();
    this.setState({
      firstName: bite.firstName,
      lastName: bite.lastName,
      city: bite.city,
    });
    console.log(bite);
  };

  getPosition() {
    Geolocation.getCurrentPosition(position => {
      const initialPosition = position.coords.latitude;
      this.setState({initialPosition: initialPosition});
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
        <Button
          buttonStyle={styles.submitButton}
          title="Ma lattitute actuelle"
          onPress={() => {
            this.getPosition();
          }}
        />
        <Text style={styles.titleText}>
          ma position actuelle {this.state.initialPosition}
        </Text>
        <Text style={styles.titleText}>
          ma last position {this.state.lastPosition}
        </Text>
        <Button
          buttonStyle={styles.decoButton}
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
    top: 400,
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingTop: 50,
    color: 'pink',
  },
});
