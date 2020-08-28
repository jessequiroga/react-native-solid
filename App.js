import { StatusBar } from 'expo-status-bar';
import React, { Component, useCallback } from 'react';
import { Alert, Button, Linking, StyleSheet, Text, View, AsyncStorage } from 'react-native';
import auth from "solid-auth-client";
import { ExternalLogin } from './components/ExternalLogin'

// const externalLogin = (idp) => {
// 	const openUrl = useCallback(async (idp) => {
// 		const supported = await Linking.canOpenURL(idp);
// 		if (supported) {
// 			await Linking.openURL(idp);
// 		} else {
// 			Alert.alert("Cannot open URL: " + idp);
// 		}
// 	}, [idp]);
// }

export default class App extends Component {

	constructor(props) {
		super(props);
		this.state = {
			session: "",
			webId: ""
		}
		// this.fun = this.fun.bind(this);
		this.getWebId = this.getWebId.bind(this);
		this.login = this.login.bind(this);
		this.check = this.check.bind(this);
		this.check();
	}

	fun() {
		console.log("fun");
		return (
			<>
				<Text>function</Text>
			</>
		);
	}

	getWebId() {
		auth.currentSession().then(resp => {
			return resp.webId;
		}).catch((err) => {
			return null;
		});
	}

	async login(idp) {
		try {
			auth.login("https://solid.community/.well-known/solid/login", AsyncStorage)
				.then(resp => {
					console.log("auth login resp: " + JSON.stringify(resp));
				}).catch(err => {
					console.log("auth login err: " + JSON.stringify(err));
				});
		} catch (ex) {
			if (ex instanceof TypeError) {
				console.log("type error: " + ex.message);
				// await externalLogin(idp).then(resp => {
				// 	console.log("external open: " + resp);
				// }).catch(err => {
				// 	console.log("external open err: " + err);
				// });
			}
		}
	}

	check() {
		console.log("check");
		auth.currentSession()
			.then(sess => {
				console.log("auth currentsession resp:" + JSON.stringify(sess));
				if (!sess) {
					console.log("need to login");
					// login();
				} else {
					this.setState({
						session: sess,
						webId: sess.webId
					})
				}
			})
			.catch(err => {
				console.log("auth currentsession err: " + JSON.stringify(err));
			})
	}

	render() {
		return (
			<View style={styles.container} >
				<Text>idp: {idp}</Text>
				<StatusBar style="auto" />
				<Text>{this.fun()}</Text>
				<Text>WebId: {this.state.webId}</Text>
				<Button
					title={'Login'}
					style={styles.input}
					onPress={this.login.bind(this)} />
				{/* <ExternalLogin /> */}
			</View>
		);
	}
}

const idp = "https://solid.community";

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
