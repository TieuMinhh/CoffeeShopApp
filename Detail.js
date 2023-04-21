import React, { Component } from "react"
import { View, Text, StyleSheet, TouchableOpacity } from "react-native"

export default class Detail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            love: 0
        }
    }
    handleClick = ({ navigation }) => {
        navigation.navigate('Detail')
    }

    render() {
        return (
            <TouchableOpacity onPress={() => this.handleClick({ navigation })}>
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
        backgroundColor: "black",
        margin: 20,
        height: 100
    }
})