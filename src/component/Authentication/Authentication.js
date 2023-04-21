import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Button, AsyncStorage } from 'react-native';
import SignIn from './SignIn';
import SignUp from './SignUp';

export default class Authentication extends Component {
    constructor(props) {
        super(props)
        this.state = {
            signIn: false
        }

    }
    quayLai = async () => {
        await AsyncStorage.removeItem('@token')
        this.props.navigation.goBack()

    }

    diDenMain = () => {
        this.props.navigation.push('MAIN')
    }

    signIn = () => {
        this.setState({
            signIn: false
        })
    }

    signUp = () => {
        this.setState({
            signIn: true
        })
    }
    render() {


        const mainJSX = this.state.signIn ? <SignUp /> : <SignIn diDenMain={this.diDenMain} />
        return (
            <View style={{ backgroundColor: "#02be6e", flex: 1 }}>
                <Text>Hello from Authentication</Text>
                <TouchableOpacity
                    onPress={() => this.quayLai()}>
                    <Text>Go to back</Text>
                </TouchableOpacity>
                {mainJSX}

                <TouchableOpacity style={{ height: 50, width: 150, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', marginTop: 100 }}
                    onPress={() => this.signIn()}
                >
                    <Text >SIGN IN</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ height: 50, width: 150, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', marginTop: 20 }}
                    onPress={() => this.signUp()}
                >
                    <Text >SIGN UP</Text>
                </TouchableOpacity>

            </View>
        );
    }

}