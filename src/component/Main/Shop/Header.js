import React, { Component } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { BlurView } from "expo-blur";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
export default class Header extends Component {
  render() {
    return (
      <View style={styles.wrapper}>
        <View style={styles.row1}>
          <TouchableOpacity style={styles.cafeIconView}>
            <BlurView style={styles.cafeICon}>
              <Ionicons name="ios-cafe-sharp" size={10 * 3} color="#ccc" />
            </BlurView>
          </TouchableOpacity>
          {/* <Text style={styles.textStyle}>不 安 的 咖 啡</Text> */}
          <Text style={styles.textStyle}>Cafe Happiness</Text>
          {/* <Image source={icLogo} style={iconStyle}></Image> */}
          <BlurView style={styles.homeIconView}>
            <FontAwesome5 name="smile" color="#ccc" size={10 * 2.6} />
          </BlurView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    overflow: "hidden",
    backgroundColor: "#000",
    padding: 10,
    // marginBottom: 8,
  }, //
  row1: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textStyle: {
    fontSize: 25,
    color: "#FF7F24",
    fontWeight: "600",
  },
  cafeIconView: {
    backgroundColor: "#000",
    borderRadius: 10,
    overflow: "hidden",
    width: 10 * 4,
    height: 10 * 4,
  },
  cafeICon: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  homeIconView: {
    backgroundColor: "#000",
    height: "100%",
    padding: 10 / 2,
    borderRadius: 10,
    width: 10 * 4,
    height: 10 * 4,
    justifyContent: "center",
    alignItems: "center",
  },
});
