import React, { Component } from "react";
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native'

import fit from '../../../../public/temp/fit.jpg'
import maxi from '../../../../public/temp/maxi.jpg'

import little from '../../../../public/temp/little.jpg'
const heightWindow = Dimensions.get("window").height;

import Swiper from "react-native-swiper";

export default class Category extends Component {

    render() {
        const { wrapper } = style
        return (
            <View style={wrapper}>
                <Text>Danh sách sản phẩm</Text>
                <Swiper>
                    <Image source={fit} style={{ height: 150, width: 300 }} />
                    <Image source={maxi} style={{ height: 150, width: 300 }} />
                    <Image source={little} style={{ height: 150, width: 300 }} />
                </Swiper>
            </View>
        )
    }
}

const style = StyleSheet.create({
    wrapper: {
        height: heightWindow / 3, backgroundColor: '#fff', margin: 7
    }
})