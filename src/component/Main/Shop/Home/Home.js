import React, { Component } from "react";
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import Collection from "./Collection";
import Category from "./Category";
import TopProduct from "./TopProduct";
export default class Home extends Component {

    render() {
        let { navigation } = this.props
        return (

            <ScrollView style={{ backgroundColor: "#fff", flex: 1 }}>
                <Collection />
                <Category />
                {/* <TopProduct navigation={navigation} /> */}
            </ScrollView>

        )
    }

}