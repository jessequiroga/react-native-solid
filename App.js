import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, Component } from "react";
import { Alert, StyleSheet, Text, TextInput, Button, View, Picker } from 'react-native';

export default class App extends Component {
  constructor(props) {
    super(props);
    console.log("constructor");
    this.state = {
      username: "",
      password: "",
      idp: "https://solid.community",
      webId: "",
      session: ""
    }
    this.login = this.login.bind(this);
  }

  login() {
    console.log("\tlogin!");
    console.log("username: " + this.state.username + ", password: " + this.state.password + ", idp: " + this.state.idp);
    /**
     * Here is the URL of the listening Rest API server
     * Try:
     *  localhost:3000
     *  localhost:8081
     */
    fetch('http://abeb8686fb50.ngrok.io/login', {
      method: "POST",
      headers: {
        Accept: 'application-json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
        idp: this.state.idp
      })
    }).then((resp) => {
      // 
      Alert.alert(resp);
    }).catch((err) => {
      Alert.alert(err);
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Form</Text>
        <TextInput
          style={styles.input}
          placeholder="Solid ID"
          onChangeText={(username) => this.setState({ username })}
          value={this.state.username}></TextInput>
        <TextInput
          style={styles.input}
          secureTextEntry={true}
          placeholder="Password"
          onChangeText={(password) => this.setState({ password })}
          value={this.state.password}></TextInput>
        <Picker
          selectedValue={this.state.idp}
          style={{ height: 50, width: 150 }}
          onValueChange={(idp) => this.setState({ idp })}
        >
          <Picker.Item label="inrupt.net" value="https://inrupt.net/" />
          <Picker.Item label="solid.community" value="https://solid.community/" />
        </Picker>
        <Button
          title={'Login'}
          style={styles.input}
          onPress={this.login} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: '#ecf0f1',
  },
  Button: {
    width: 200,
  },
  input: {
    width: 200,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
  },
});