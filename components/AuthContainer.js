import React, { Component } from 'react';
import { Text, Alert } from 'react-native';
import auth from 'solid-auth-client';
// import { LoggedOut } from '@solid/react';

// import { LogoutButton, LoginButton, AuthButton } from '@solid/react';

export default class AuthContainer extends Component {

    constructor(props) {
        super(props);
        // Alert.alert("auth ctor");
        console.log("auth ctor");
        this.login('https://solid.community');
    }

    async login(idp) {
        console.log("login");
        const session = await auth.currentSession();
        if (!session) {
            await auth.login(idp);
        } else {
            alert(`Logged in as ${session.webId}`);
        }
    }

    render() {
        return (
            <>
                <Text>AuthContainer</Text>
                {/* <>
                    <LoggedOut>
                        <p>You are not logged in.</p>
                    </LoggedOut>
                    <LoggedIn>
                        <p>Congratulations, you're logged in!</p>
                    </LoggedIn>
                    <AuthButton popup="/popup.html" login="log in for magic!" logout="log me outta here" />
                </> */}
                {/* <LoginButton popup="popup.html" />
                <LogoutButton>Log me out</LogoutButton>
                <AuthButton popup="popup.html" login="Login here!" logout="Log me out" /> */}
            </>
        );
    }
}