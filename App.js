import { StatusBar } from 'expo-status-bar';
import React, { Component } from "react";
import { Alert, StyleSheet, Text, TextInput, Button, View, Picker } from 'react-native';
import Dashboard from './components/Dashboard';

export default class App extends Component {
	constructor(props) {
		super(props);
		console.log("App ctor");
		this.state = {
			username: "",
			password: "",
			idp: "https://solid.community",
			webId: "",
			session: {},
			loggedIn: false
		}
		this.login = this.login.bind(this);
		this.check = this.check.bind(this);
	}

	check() {
		console.log("check session");
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
		fetch('https://e7de78e4e4f3.ngrok.io/login', {
			method: "POST",
			headers: {
				Accept: 'application-json',
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*'
			},
			body: JSON.stringify({
				username: this.state.username,
				password: this.state.password,
				idp: this.state.idp
			})
		}).then(response => response.json())
			.then(data => {
				console.log(data);
				console.log("keys: " + Object.keys(data));
				this.setState((state) => ({
					webId: data.webId,
					session: data,
					loggedIn: true
				}));
				console.log("state: " + JSON.stringify(this.state));
			})
			.catch(error => error.json())
			.catch(error => {
				console.log(error);
			})
		console.log("after");
	}

	render() {
		if (this.state.loggedIn) {
			return (
				<Dashboard loggedIn={this.state.loggedIn} session={this.state.session} />
			)
		} else {
			return (
				<View style={styles.container}>
					<Text>Form</Text>
					<Text>Your webId is: {this.state.webId}. </Text>
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
						<Picker.Item label="solid.community" value="https://solid.community/" />
						<Picker.Item label="inrupt.net" value="https://inrupt.net/" />
					</Picker>
					<Button
						title={'Login'}
						style={styles.input}
						onPress={this.login} />
					<Button
						title={'Check'}
						style={styles.input}
						onPress={this.check}
					/>
				</View>
			);
		}
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