import React, {Component} from 'react';
import {StyleSheet, View, AsyncStorage, StatusBar, Alert} from 'react-native';

import NavigatorService from './Navigation/NavigatorService';
import './Navigation/Navigator';
import AppContainer from './Navigation/Navigator';
import {ThemeProvider} from 'react-native-elements';
import firebase from 'react-native-firebase';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

var token = '';
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.getFcmToken();
  }
  getFcmToken = async () => {
    const fcmToken = await firebase.messaging().getToken();
    if (fcmToken) {
      //console.log(fcmToken);
      token = fcmToken;
      this.registerToTopic(fcmToken);
      //this.showAlert('Your Firebase Token is:', fcmToken);
    } else {
      this.showAlert('Failed', 'No token received');
    }
  };

  requestPermission = async () => {
    try {
      await firebase.messaging().requestPermission();
      // User has authorised
    } catch (error) {
      // User has rejected permissions
    }
  };
  checkPermission = async () => {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      this.getFcmToken();
    } else {
      this.requestPermission();
    }
  };
  messageListener = async () => {
    this.notificationListener = firebase
      .notifications()
      .onNotification(notification => {
        const {title, body} = notification;
        this.showAlert(title, body);
      });

    this.notificationOpenedListener = firebase
      .notifications()
      .onNotificationOpened(notificationOpen => {
        const {title, body} = notificationOpen.notification;
        this.showAlert(title, body);
      });

    const notificationOpen = await firebase
      .notifications()
      .getInitialNotification();
    if (notificationOpen) {
      const {title, body} = notificationOpen.notification;
      this.showAlert(title, body);
    }

    this.messageListener = firebase.messaging().onMessage(message => {
      console.log(JSON.stringify(message));
    });
  };

  showAlert = (title, message) => {
    Alert.alert(
      title,
      message,
      [{text: 'OK', onPress: () => console.log('OK Pressed')}],
      {cancelable: false},
    );
  };
  registerToTopic = token => {
    firebase
      .messaging()
      .subscribeToTopic('SLICK')
      .then(function(res, err) {
        console.log('bijour');
        console.log(res);
      })
      .catch(function(err) {
        console.log(err);
      });
  };
  render() {
    console.disableYellowBox = true;
    this.requestPermission();
    this.checkPermission();
    this.messageListener();
    return (
      <View style={styles.container}>
        <ThemeProvider theme={theme}>
          <AppContainer
            ref={navigatorRef => {
              NavigatorService.setTopLevelNavigator(navigatorRef);
            }}
          />
        </ThemeProvider>
      </View>
    );
  }
}

const theme = {
  Button: {
    titleStyle: {
      color: 'pink',
    },
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});
