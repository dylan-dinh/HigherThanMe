
import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

import NavigatorService from './Navigation/NavigatorService'
import './Navigation/Navigator'
import AppContainer from './Navigation/Navigator';
import { ThemeProvider } from "react-native-elements";

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const App = () => {
  return (
    <>
      <View style={styles.container}>
        <ThemeProvider theme={theme}>
          <AppContainer
            ref={navigatorRef => {
              NavigatorService.setTopLevelNavigator(navigatorRef);
            }}
          />
        </ThemeProvider>
      </View>
    </>
  );
};

const theme = {
  Button: {
    titleStyle: {
      color: "pink"
    }
  }
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

export default App;
