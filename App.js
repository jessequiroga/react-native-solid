import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';

import auth from "solid-auth-client";

const styles = StyleSheet.create({
	container: {
		// flex: 1,
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

// const session_prom = new Promise(function (resolve, reject) {
// 	auth.currentSession(() => {
// 		reject('Login promise');
// 	}, 200);
// });

// const sessionPromise = (session) => new Promise((resolve, reject) => {
// 	auth.currentSession(() => {
// 		(session) ? resolve(session) : reject(session);
// 	}, 2000);
// });

const idp = "https://solid.community";

export default class App extends Component {

	constructor(props) {
		super(props);
		console.log("\tconstructor");
		this.state = {
			username: "",
			password: "",
			idp: "https://solid.community",
			webId: "",
			session: ""
		}
		this.check_session = this.check_session.bind(this);
		this.promise_session = this.promise_session.bind(this);
		// session_prom.then(value => {
		// 	console.log(value);
		// }).catch(err => {
		// 	console.log(err);
		// });

	}

	check_session() {
		auth.currentSession().then(resp => {
			new Promise(function (resolve, reject) {
				console.log("resp:" + resp);
				return resp;
			})
		}).then(session => {
			if (session) {
				this.setState((state) => {
					session: session
				});
				console.log("yes session, webid: " + this.state.session.webId);
			} else {
				console.log("no session");
				/*auth login*/
				this.do_login();
			}
		}).catch(err => {
			console.error("error check session: " + err);
		});
	}

	do_login() {
		auth.login(idp).then(resp => {
			new Promise(function (resolve, reject) {
				console.log("resp: " + resp);
				return resp; /* ??? */
			})
		}).then(resp => {
			console.log("then resp: " + resp);
			if (session) {
				console.log("session webid: " + this.state.session.webId);
			} else {
				console.warn("error login");
			}
		}).catch(err => {
			console.error("error check session: " + err);
		});
	}

	async promise_login(): Promise<> {
		console.log("\tpromise login");
		return await auth.login(this.state.idp);
	}

	async promise_session(): Promise<> {
		console.log("\promise_session");
		// auth.login("https://solid.community");
		return await auth.currentSession()/*.then(console.log("then session: " + session))*/;
		// if (session) {
		// 	console.log("yes");
		// } else {
		// 	console.log("no");
		// 	auth.cu
		// }
		// console.log("\tsession: " + JSON.stringify(session));
	}

	// async login(idp) {
	// 	const session = await solid.auth.currentSession();
	// 	if (!session)
	// 		await solid.auth.login(idp);
	// 	else
	// 		alert(`Logged in as ${session.webId}`);
	// }
	// login('https://solid.community');

	render() {
		return (
			<View>
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
					<Button
						title={'Login'}
						style={styles.input}
						onPress={this.check_session} />
				</View>
				<View>
					<Text>Your WebID is: {this.state.webId}.</Text>
				</View>
			</View>
		);
	}

}