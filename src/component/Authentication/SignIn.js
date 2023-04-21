import React, { Component } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import userServices from '../api/userServices'
import global from "../../global/global";
import saveToken from '../../global/saveToken'

export default class SignIn extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: ''
        }
    }

    onSignIn = async () => {
        console.log('Thử');
        const { email, password } = this.state;
        let data = await userServices.signIn(email, password)
        console.log(data);
        console.log('data:', data.userData);
        await saveToken(data.userData)
        global.onSignIn(data)
        console.log(data);
        this.props.diDenMain()

    }

    render() {
        const { wrapper } = style
        const { email, password } = this.state;
        return (
            <View>
                <View style={{ height: 50, backgroundColor: '#fff', margin: 10 }}>
                    <TextInput placeholder='Email' value={email} onChangeText={text => this.setState({ email: text })}></TextInput>
                </View>
                <View style={{ height: 50, backgroundColor: '#fff', margin: 10 }}>
                    <TextInput placeholder='Password' value={password} onChangeText={text => this.setState({ password: text })}></TextInput>
                </View>

                <TouchableOpacity style={{ height: 50, width: 150, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center' }}
                    onPress={() => this.onSignIn()}
                >
                    <Text >SIGN IN NOW</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const style = StyleSheet.create({
    wrapper: {

    }
})