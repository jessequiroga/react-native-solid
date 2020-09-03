import React, { Component } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native'

export default class Dashboard extends Component {

    constructor(props) {
        super(props);
        console.log("dashboard ctor");
        this.state = {
            loggedIn: this.props.loggedIn,
            webId: this.props.session.webId
        }
        this.logout = this.logout.bind(this);
        console.log("dashboard logged= " + this.state.loggedIn)
    }

    logout() {
        console.log("logout");
        fetch('https://e7de78e4e4f3.ngrok.io/logout', {
            method: "POST",
            headers: {
                Accept: 'application-json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({
                webId: this.state.webId
            })
        }).then((resp) => {
            console.log("logout successful");
            this.setState((state) => ({
                loggedIn: false,
                webId: ""
            }))
            window.location.reload();
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Welcome {this.state.webId}</Text>
                <Button
                    title={'Logout'}
                    style={styles.input}
                    onPress={this.logout} />
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