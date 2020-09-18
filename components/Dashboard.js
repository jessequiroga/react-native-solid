import React, { Component } from 'react';
import {
    Button,
    FlatList,
    StyleSheet,
    Text,
    View
} from 'react-native'
import { Card, Header, ListItem } from 'react-native-elements';

export default class Dashboard extends Component {

    constructor(props) {
        super(props);
        console.log("dash ctor");
        this.state = {
            webId: this.props.webId,
            public_folder: []
        }
        this.logout = this.logout.bind(this);
        console.log("dash logged= " + this.state.webId)
    }

    componentDidMount() {
        console.log("dash component did mount");
        this.fetch_public();
    }

    fetch_public() {
        console.log("dash fetch_public");
        fetch('http://063b4a83f166.ngrok.io/getpublic', {
            method: "GET",
            headers: {
                Accept: 'application-json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'webId': this.state.webId
            }
        }).then(resp => resp.json()).then(data => {
            console.log("dash fetch resp " + data);
            this.setState((state) => ({
                public_folder: data.files
            }));
            console.info("state files: " + JSON.stringify(this.state.public_folder));
        }).catch(err => {
            console.error("dash fetch err " + err);
        });
    }

    logout() {
        console.log("dash logout");
        fetch('http://063b4a83f166.ngrok.io/logout', {
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
                <Header
                    // leftComponent={{ icon: 'menu', color: '#fff' }}
                    centerComponent={{ text: this.state.webId, style: { color: '#fff' } }}
                // rightComponent={{ icon: 'home', color: '#fff' }}
                />
                <Text style={styles.text}>Welcome {this.state.webId}</Text>
                <Card containerStyle={{ padding: 0 }} >
                    {
                        this.state.public_folder.map((k, v) => {
                            <ListItem
                                key={v}
                                title={v.name}
                            />
                        })
                    }
                </Card>
                <FlatList
                    data={this.state.public_folder}
                    renderItem={({ item }) => <Text style={styles.item}>{item.name}</Text>}
                />
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
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
    text: {
        padding: 5
    }
});