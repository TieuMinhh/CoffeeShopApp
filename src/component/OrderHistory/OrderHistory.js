import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

export default class OrderHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    
  }

  quayLai = () => {
    this.props.navigation.goBack();
  };

  render() {
    return (
      <View style={{ backgroundColor: "yellow", flex: 1 }}>
        <Text>Hello Tân OrderHistory</Text>
        <TouchableOpacity onPress={() => this.quayLai()}>
          <Text>Go to back</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
