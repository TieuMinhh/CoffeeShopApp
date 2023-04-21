import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  Image,
} from "react-native";
import icMenu from "../../../public/appIcon/ic_menu.png";
import icLogo from "../../../public/appIcon/icon_coffee.png";
import { TextInput } from "react-native-gesture-handler";
import axios from "axios";

import colors from "../Shop/Store/colors";
import { BlurView } from "expo-blur";
import { Ionicons } from "@expo/vector-icons";

import Cart from "./Cart/Cart";

const windowHeight = Dimensions.get("window").height;

import global from "../../../global/global";
export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textSearch: "",
    };
  }

  onpenMenu = () => {
    this.props.open();
  };

  onSearch = async () => {
    //console.log('Phong');
    let data = { name: 1 };
    let res = await axios.post("http://192.168.138.6:8081/api/v1/search", {
      name: this.state.textSearch,
    });
    console.log("Search: ", res.data);
    global.setArrSearch(res.data.message);
  };

  render() {
    console.log(this.state.textSearch);
    const { wrapper, row1, textInput, iconStyle, textStyle } = style;
    return (
      <View style={wrapper}>
        <View style={row1}>
          <TouchableOpacity
            style={{
              borderRadius: 10,
              overflow: "hidden",
              width: 10 * 5,
              height: 10 * 5,
            }}
            onPress={() => this.onpenMenu()}
          >
            {/* <Image source={icMenu} style={iconStyle}></Image> */}
            <BlurView
              style={{
                height: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Ionicons
                name="menu"
                size={10 * 3}
                color={colors["white-smoke"]}
              />
            </BlurView>
          </TouchableOpacity>
          <Text style={textStyle}>Coffe Happy</Text>
          {/* <Image source={icLogo} style={iconStyle}></Image> */}
          <BlurView
            style={{
              height: "100%",
              padding: 10 / 2,
              borderRadius: 10,
              width: 10 * 5,
              height: 10 * 5,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Ionicons
              onPress={<Cart />}
              name="cart"
              color={colors["white-smoke"]}
              size={10 * 3}
            />
          </BlurView>
        </View>

        <View
          style={{
            borderRadius: 10,
            overflow: "hidden",
          }}
        >
          <BlurView
            intensity={30}
            style={{
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TextInput
              style={{
                width: "100%",
                color: colors.white,
                fontSize: 10 * 1.7,
                padding: 10,
                paddingLeft: 10 * 3.5,
              }}
              placeholder="Find Your Coffee..."
              placeholderTextColor={colors.light}
            />
            <Ionicons
              style={{
                position: "absolute",
                left: 10,
              }}
              name="search"
              color={colors.light}
              size={10 * 2}
            />
          </BlurView>
        </View>
      </View>
    );
  }
}

const style = StyleSheet.create({
  wrapper: {
    height: windowHeight / 7,
    backgroundColor: "#000",
    padding: 5,
    justifyContent: "space-around",
  }, //
  row1: { flexDirection: "row", justifyContent: "space-between" },
  textInput: { height: windowHeight / 20, backgroundColor: "#ffffff" }, // marginTop: 10
  iconStyle: { height: 30, width: 30 },
  textStyle: { fontSize: 25, color: "#FF7F24", fontWeight: "600" },
});
