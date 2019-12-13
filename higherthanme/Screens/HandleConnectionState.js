import React, {Component} from 'react';
import {AsyncStorage} from 'react-native';

import '../Navigation/Navigator';
import '../Navigation/NavigatorService';

export default class HandleConnectionState extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isConnected: null,
    };
    this.retrieveData();
  }

  retrieveData = async () => {
    console.log("leleleleellel")
    try {
      const value = await AsyncStorage.getItem('token');
      if (value !== null) {
        console.log(value);
        console.log('sucess Retrived token IN HANDLE');
        this.setState({isConnected: true});
      }
    } catch (error) {
      console.log(
        'error while getting data to async storage IN CONNECTION STATE',
      );
      this.setState({isConnected: false});
    }
  };
  render() {
    if (this.state.isConnected == true)
      return this.props.navigation.navigate('Home');
    else return this.props.navigation.navigate('Login');
  }
}
