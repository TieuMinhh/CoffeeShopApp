import React, { Component } from "react";
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native'

import banner from '../../../../public/temp/banner.jpg'
const heightWindow = Dimensions.get("window").height;

export default class Collection extends Component {

    render() {
        const { wrapper } = style
        return (
            <View style={wrapper}>
                <View >
                    <Text>QUẦN ÁO XỊN CỦA TAO</Text>
                </View>
                <View  >
                    <Image style={{ height: 150, width: 300 }}
                        source={banner}
                    /></View>
            </View>
        )
    }
}

const style = StyleSheet.create({
    wrapper: {
        height: heightWindow / 3, backgroundColor: '#fff', margin: 7
    }
})