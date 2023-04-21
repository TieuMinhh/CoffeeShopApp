import React, { Component } from "react"
import { View, Text, StyleSheet, TouchableOpacity } from "react-native"

export default class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            love: 0
        }
    }
    // handleClick = ({ navigation }) => {
    //     navigation.navigate('Detail')
    // }

    render() {
        return (
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Detail')}>
                <View style={ao.bao}>
                    <Text>{this.props.ten} </Text>
                    <Text>Phong</Text>
                    <Text>{this.state.love}</Text>
                </View ></TouchableOpacity>
        )
    }
}

const ao = StyleSheet.create({
    bao: {
        width: 100,
        backgroundColor: "yellow",
        margin: 20,
        height: 100
    }
})