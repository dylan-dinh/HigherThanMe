import React, { Component } from "react";
import { View, TextInput, StyleSheet, Text, AsyncStorage } from "react-native";
import { Button } from "react-native-elements";
import qs from 'querystring'
import "../Navigation/Navigator"
import "../Navigation/NavigatorService"

var email;
var password;

getLoggedIn = async (url, email, password) => {
    const data = {
        email: email,
        password: password,
    }
   const response = await fetch(url, {
        method: 'POST', 
        headers: {
            //'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: qs.stringify(data) // body data type must match "Content-Type" header
      });
    await console.log(response.type); // parses JSON response into native JavaScript objects
    }

    storeData = async () => {
        try {
          await AsyncStorage.setItem('@MySuperStore:key', );
        } catch (error) {
          // Error saving data
        }
      };

    export default class Login extends Component {
        constructor(props) {
            super(props);
            this.state = {
            }
        }
        handleEmail = text => {
            email = text
            console.log(email)
        };
    
        handlePassword = text => {
           password = text
           console.log(password)
        }
    render() {
        return (
        <View style={styles.container}>
        <TextInput
                    style={styles.input}
                    underlineColorAndroid={"transparent"}
                    placeholder={"Email"}
                    placeholderTextColor={"rgba(92, 99,216, 1)"}
                    autoCapitalize={"none"}
                    onChangeText={this.handleEmail}
                    keyboardType={"email-address"}
                />
                <TextInput
                    style={styles.input}
                    underlineColorAndroid={"transparent"}
                    secureTextEntry={true}
                    placeholder={"Password"}
                    placeholderTextColor={"rgba(92, 99,216, 1)"}
                    autoCapitalize={"none"}
                    onChangeText={this.handlePassword}
                    keyboardType={"default"}
                />
                <Button
                    buttonStyle={styles.submitButton}
                    title="Get logged in !"
                    onPress={() => getLoggedIn("http://localhost:8000/login", email, password)}
                />
                <Button
                    buttonStyle={styles.submitButton2}
                    title="Create an account !"
                    onPress={() => this.props.navigation.navigate("Register")}
                />
        </View>
    )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#2f2d30",
      padding: 30,
    },
    input: {
        margin: 8,
        height: 40,
        borderColor: "rgba(92, 99,216, 1)",
        borderWidth: 2,
        color: "pink",
        borderRadius: 5
    },
    submitButton: {
        backgroundColor: "rgba(92, 99,216, 1)",
        padding: 1,
        margin: 15,
        height: 40,
        borderColor: "transparent",
        borderWidth: 0,
        borderRadius: 5
    },
    submitButton2: {
        backgroundColor: "rgba(92, 99,216, 1)",
        padding: 1,
        margin: 15,
        height: 40,
        borderColor: "transparent",
        borderWidth: 0,
        borderRadius: 5
    }
  });
  