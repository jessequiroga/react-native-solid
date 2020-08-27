// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  *
//  * @format
//  * @flow strict-local
//  */

// import React from 'react';
// import {
//   SafeAreaView,
//   StyleSheet,
//   ScrollView,
//   View,
//   Text,
//   StatusBar,
// } from 'react-native';

// import {
//   Header,
//   LearnMoreLinks,
//   Colors,
//   DebugInstructions,
//   ReloadInstructions,
// } from 'react-native/Libraries/NewAppScreen';

// import AuthContainer from './components/AuthContainer'
// const text = 'tasos';

// function test() {
//   return text;
// }

// const App: () => React$Node = () => {
//   return (
//     <>
//       <StatusBar barStyle="dark-content" />
//       <SafeAreaView>
//         <View style={styles.sectionContainer}>
//           <Text style={styles.sectionTitle}>Debug</Text>
//           <Text style={styles.sectionDescription}>
//             <DebugInstructions />
//           </Text>
//         </View>
//         <View style={styles.sectionContainer}>
//           <Text style={styles.sectionTitle}>Login</Text>
//           <Text style={styles.sectionDescription}>{text}</Text>
//           <AuthContainer />
//         </View>
//         {/* <ScrollView
//           contentInsetAdjustmentBehavior="automatic"
//           style={styles.scrollView}>
//           <Header />
//           {global.HermesInternal == null ? null : (
//             <View style={styles.engine}>
//               <Text style={styles.footer}>Engine: Hermes</Text>
//             </View>
//           )}
//           <View style={styles.body}>
//             <View style={styles.sectionContainer}>
//               <Text style={styles.sectionTitle}>FIRST</Text>
//               <Text style={styles.sectionDescription}>
//                 <DebugInstructions />
//               </Text>
//             </View>
//             <View style={styles.sectionContainer}>
//               <Text style={styles.sectionTitle}>Step One</Text>
//               <Text style={styles.sectionDescription}>
//                 Edit <Text style={styles.highlight}>App.js</Text> to change this
//                 screen and then come back to see your edits.
//               </Text>
//             </View>
//             <View style={styles.sectionContainer}>
//               <Text style={styles.sectionTitle}>See Your Changes</Text>
//               <Text style={styles.sectionDescription}>
//                 <ReloadInstructions />
//               </Text>
//             </View>
//             <View style={styles.sectionContainer}>
//               <Text style={styles.sectionTitle}>Debug</Text>
//               <Text style={styles.sectionDescription}>
//                 <DebugInstructions />
//               </Text>
//             </View>
//             <View style={styles.sectionContainer}>
//               <Text style={styles.sectionTitle}>Learn More</Text>
//               <Text style={styles.sectionDescription}>
//                 Read the docs to discover what to do next:
//               </Text>
//             </View>
//             <LearnMoreLinks />
//           </View>
//         </ScrollView> */}
//       </SafeAreaView>
//     </>
//   );
// };

// const styles = StyleSheet.create({
//   scrollView: {
//     backgroundColor: Colors.lighter,
//   },
//   engine: {
//     position: 'absolute',
//     right: 0,
//   },
//   body: {
//     backgroundColor: Colors.white,
//   },
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: '600',
//     color: Colors.black,
//   },
//   sectionDescription: {
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: '400',
//     color: Colors.dark,
//   },
//   highlight: {
//     fontWeight: '700',
//   },
//   footer: {
//     color: Colors.dark,
//     fontSize: 12,
//     fontWeight: '600',
//     padding: 4,
//     paddingRight: 12,
//     textAlign: 'right',
//   },
// });

// export default App;

// import React, { Component } from 'react';
// import { Alert, Button, async, TextInput, View, StyleSheet, Linking } from 'react-native';
// import { Colors } from 'react-native/Libraries/NewAppScreen';
// import auth from "solid-auth-client";

// export default class App extends Component {

//   constructor(props) {
//     super(props);
//     webId = '';
//     this.state = {
//       username: '',
//     };
//   }


//   onLogin() {
//     const { username } = this.state;
//     Linking.openURL('https://inrupt.net/login')
//     //Alert.alert('Credentials', `${username} `);
//   }
//   getWebId = (WebId) => {
//     Alert.alert(webId);

//   };

//   getIdentityProvider() {
//     Alert.alert('hi');
//     const idpPromise = new Promise((resolve, _reject) => {
//       Alert.alert('hiii');
//       form.addEventListener("submit", (event) => {
//         event.preventDefault();
//         resolve(form.elements.identity_provider.value);
//       });
//     });
//   }

//   async getWebId() {

//     /* 1. Check if we've already got the user's WebID and access to their Pod: */
//     let session = await auth.currentSession();
//     if (session) {
//       Alert.alert("Yes");
//       Alert.alert('hi');
//       return session.webId;
//     } else {

//       Alert.alert("No");
//       this.onLogin();
//     }
//   }
//   render() {
//     return (


//       <View style={styles.container} hide>
//         <TextInput

//           value={this.state.username}
//           onChangeText={(username) => this.setState({ username })}
//           style={styles.input}
//           value={"https://inrupt.net/login"}
//         />



//         <Button

//           title={'Login'}
//           style={styles.input}
//           onPress={this.getWebId.bind(this)}
//         />
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#ecf0f1',
//   },
//   Button: {
//     width: 200,
//   },
//   input: {
//     width: 200,
//     height: 44,
//     padding: 10,
//     borderWidth: 1,
//     borderColor: 'black',
//     marginBottom: 10,
//   },
// });

import React, { Component } from 'react';
import { Alert, Button, async, TextInput, View, StyleSheet, Linking, Text } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
// import auth from "solid-auth-client";

const solid = { auth: require('solid-auth-cli') };
const idp = "https://solid.community";


export default class App extends Component {

	constructor(props) {
		super(props);
		console.log("app ctor");
		this.state = {
			loggedIn: false,
			username: "",
			password: "",
			idprovider: ""
		}
		this.getWebId = this.getWebId.bind(this);
		this.authlogin = this.authlogin.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange() {
		Alert.alert("handle change");
		// this.setState((state) => ({
		// 	username:
		// }));
	}

	authlogin() {
		console.log("authlogin");
		// auth.login("https://solid.community").catch(err => { Alert.alert(err) });
		Alert.alert("after");
		// let idpPromise = new Promise((resolve, _reject) => {

		// });
		// auth.log
	}
	async getWebId() {
		Alert.alert("onpress");
		console.log("\t\tusername= " + this.state.username + ", password= " + this.state.password);
		/* 1. Check if we've already got the user's WebID and access to their Pod: */
		let session = await auth.currentSession();
		console.log("\tsession: " + session);
		if (session) {
			Alert.alert("\tsession");
			return session.webId;
		} else {
			Alert.alert("\tno session");
			let retvalue = auth.login("https://solid.community");
			console.log("\treturn: " + retvalue);
			// this.authlogin()
			// 	.then(resp => { console.warn("then resp: " + resp) }).catch(err => { console.warn("\t" + err) });
			// this.openLink();
			// Alert.alert()
			// this.onLogin();
		}
	}
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
						onPress={this.authlogin} />
				</View>
				{/* <View style={styles.container} hide>

				</View> */}
			</View>
		);
	}
}

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
