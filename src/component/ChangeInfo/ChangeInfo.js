import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default class ChangeInfo extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }

    }
    quayLai = () => {
        this.props.navigation.goBack()
    }
    render() {
        return (
            <View style={{ backgroundColor: 'yellow', flex: 1 }}>
                <Text>Hello from ChangeInfo</Text>
                <TouchableOpacity
                    onPress={() => this.quayLai()}>
                    <Text>Go to back</Text>
                </TouchableOpacity>

            </View>
        );
    }

}