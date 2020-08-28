import React, { useCallback } from 'react';
import { Button, Linking, StyleSheet, Text } from 'react-native';


// export const tryExtLogin = (idp) => {
//     const openUrl = useCallback(async (idp) => {
//         const supported = await Linking.canOpenURL(idp);
//         if (supported) {
//             await Linking.openURL(idp);
//         } else {
//             Alert.alert("Cannot open URL: " + idp);
//         }
//     }, [idp]);
// }

const idp = "https://solid.community";

const componentDidMount = () => {
    Linking.getInitialURL().then((url) => {
        if (url) {
            this.handleOpenURL(url)
        }
    }).catch(err => { })
    Linking.addEventListener('url', this.handleOpenURL)
}

const componentWillUnmount = () => {
    Linking.removeEventListener('url', this.handleOpenURL)
}

export const ExternalLogin = (props) => {
    // tryExtLogin();
    const openUrl = useCallback(async (idp) => {
        const supported = await Linking.canOpenURL(idp);
        if (supported) {
            await Linking.openURL(idp);
        } else {
            Alert.alert("Cannot open URL: " + idp);
        }
    }, [idp]);
    return (
        <>
            <Text>External</Text>
            <Button
                title={'Login'}
                style={styles.input}
                onPress={openUrl(idp)} />
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
