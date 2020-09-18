import { StatusBar } from 'expo-status-bar';
import React, { Component } from "react";
import { Alert, StyleSheet, Text, TextInput, Button, View } from 'react-native';
import Dashboard from './components/Dashboard';
import AsyncStorage from '@react-native-community/async-storage';
// import { Picker } from '@react-native-community/picker'
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/Feather';
export default class App extends Component {
	constructor(props) {
		super(props);
		console.log("App ctor");
		this.state = {
			username: "",
			password: "",
			idp: "https://progekta.eu/",
			webId: "",
			session: {},
			loggedIn: false
		}
		this.login = this.login.bind(this);
		this.check = this.check.bind(this);
		this.storage = this.storage.bind(this);
	}

	storeData(key, value) {
		console.info("storeData");
		try {
			AsyncStorage.setItem(key, value).then(resp => {
				console.info("resp: " + resp);
			});

		} catch (e) {
			console.error(e);
		}
	}

	getData(key) {
		console.info("getData");
		try {
			return AsyncStorage.getItem(key);
		} catch (e) {
			console.error(e);
		}
	}

	storage() {
		var keys = AsyncStorage.getAllKeys();
		console.log("storage: " + JSON.stringify(AsyncStorage.getAllKeys()));
	}

	check() {
		console.log("check session");
	}

	login() {
		console.log("\tlogin!");
		this.storeData('@idp', this.state.idp);
		this.getData('@idp').then(resp => {
			var value = resp;
			console.info("store and read: " + value);
		});
		console.log("username: " + this.state.username + ", password: " + this.state.password + ", idp: " + this.state.idp);
		fetch('http://063b4a83f166.ngrok.io/login', {
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
		}).then(response => response.json()).then(data => {
			this.setState((state) => ({
				webId: data.webId,
				session: data,
				loggedIn: true
			}));
			this.storeData('@idtoken', data.authorization.id_token);
			console.log("state: " + JSON.stringify(this.state));
		})
			.catch(error => { })
			.catch(error => {
				console.log(error);
			})
		console.log("after");
	}

	render() {
		if (this.state.loggedIn) {
			return (
				<Dashboard webId={this.state.webId} />
			)
		} else {
			return (
				<>
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
						{/* <Picker
					selectedValue={this.state.idp}
					style={{ height: 50, width: 150 }}
					onValueChange={(idp) => this.setState({ idp })}
				>
					<Picker.Item label="solid.community" value="https://solid.community/" />
					<Picker.Item label="progekta.eu" value="https://progekta.eu/" />
					<Picker.Item label="inrupt.net" value="https://inrupt.net/" />
				</Picker> */}
						<DropDownPicker
							items={[
								{ label: 'progekta.eu', value: 'https://progekta.eu/' },
								{ label: 'solid.community', value: 'https://solid.community/' },
								{ label: 'inrupt.net', value: 'https://inrupt.net/' }
							]}
							defaultValue={this.state.idp}
							containerStyle={{ height: 40 }}
							style={{ backgroundColor: '#fafafa' }}
							itemStyle={{
								justifyContent: 'flex-start'
							}}
							dropDownStyle={{ backgroundColor: '#fafafa' }}
							onChangeItem={item => this.setState({
								idp: item.value
							})}
						/>

						<Button
							title={'Login'}
							style={styles.input}
							onPress={this.login}
						/>
					</View>
				</>

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
	input: {
		width: 200,
		height: 44,
		padding: 10,
		borderWidth: 1,
		borderColor: 'black',
		marginBottom: 10,
	},
    text: {
        padding: 5
    }
});