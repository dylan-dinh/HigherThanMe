import * as ReactNavigation from 'react-navigation';
import React from 'react';
import LoginScreen from '../Screens/Login';
//import RegisterScreen from "../Screens/Register"
import HomeScreen from '../Screens/Home';
import ConnectionStateScreen from '../Screens/HandleConnectionState';
//import ProfilScreen from "../Screens/Profil"

const AppNavigator = ReactNavigation.createSwitchNavigator(
  {
    Login: {
      screen: LoginScreen,
      navigationOptions: {
        title: 'Login',
        headerStyle: '#2f2d30',
        headerLeft: null,
      },
    },
    /*Register: {
            screen: RegisterScreen,
            navigationOptions: () => ({
                title: "Register",
                headerBackTitle: null
            })
        },*/
    Home: {
      screen: HomeScreen,
      navigationOptions: () => ({
        title: 'Welcome',
        headerBackTitle: null,
      }),
    },
    ConnectionState: {
      screen: ConnectionStateScreen,
      navigationOptions: () => ({
        title: 'Welcome',
        headerBackTitle: null,
      }),
    },
    /*Profil: {
            screen: ProfilScreen,
            navigationOptions: () => ({
                title: "Welcome",
                headerBackTitle: null,
            })
        },*/
  },

  {
    initialRouteName: 'ConnectionState',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#2f2d30',
      },
      headerTintColor: 'pink',
      headerTitleStyle: 'pink',
      headerMode: 'screen',
      cardStyle: {backgroundColor: '#2f2d30'},
    },
  },
);

const AppContainer = ReactNavigation.createAppContainer(AppNavigator);

export default AppContainer;
