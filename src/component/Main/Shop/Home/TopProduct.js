import React, { Component } from "react";
import { View, Text, StyleSheet, Dimensions, Image } from "react-native";

import CaPheSua from "../Home/Anh/PHIN_SUA_DA.png";
import BacSiuDa from "../Home/Anh/bacxiuda.jpg";
import SinhTo from "../Home/Anh/sinhtoThanhLong.jpg";
import SinhToCarot from "../Home/Anh/sinh-to-ca-rot-ngon.jpg";

import colors from "./config/colors";

const heightWindow = Dimensions.get("window").height;

import Swiper from "react-native-swiper";

export default class Category extends Component {
  render() {
    return (
      <>
        <View style={{ width: "100%", marginVertical: 10 / 100 }}>
          <Text style={styles.txt1}>Sản phẩm bán chạy</Text>
        </View>

        <View style={styles.wrapper}>
          <Swiper style={styles.swipper}>
            <Image source={BacSiuDa} style={styles.Image} />
            <Image source={CaPheSua} style={styles.Image} />
            <Image source={SinhTo} style={styles.Image} />
            <Image source={SinhToCarot} style={styles.Image} />
          </Swiper>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    height: heightWindow / 3,
    backgroundColor: "none",
    margin: 50,
  },
  swipper: {
    borderRadius: 12,
  },
  Image: {
    height: 270,
    width: 270,
    borderRadius: 12,
  },
  txt1: {
    color: colors.white,
    fontSize: 10 * 2.4,
    fontWeight: "600",
    marginBottom: -30,
  },
});
