import React, { Component } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native'

export default class Dashboard extends Component {

    constructor(props) {
        super(props);
        console.log("dashboard ctor");
        this.logout = this.logout.bind(this);
        this.state = {
            loggedIn: this.props.loggedIn,
            user: this.props.session.webId
        }
        console.log("dashboard logged= " + this.state.loggedIn)
    }

    logout() {
        console.log("logout");

    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Welcome {this.state.user}</Text>
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