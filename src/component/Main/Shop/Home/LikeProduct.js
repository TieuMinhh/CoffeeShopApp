import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  BlurView,
  TouchableOpacity,
} from "react-native";

import colors from "./config/colors";
import coffees from "./config/coffees";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

export default class Category extends Component {
  render() {
    return (
      <View>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          <View style={{ width: "100%", marginVertical: 10 / 100 }}>
            <Text style={styles.txt2}>Sản phẩm ưa thích</Text>
          </View>

          {coffees.map((coffee) => (
            <View key={coffee.id} style={styles.coffee}>
              <BlurView tint="dark" intensity={95} style={{ padding: 10 }}>
                <TouchableOpacity style={styles.product}>
                  <Image source={coffee.image} style={styles.image} />
                  <View style={styles.coverRate}>
                    <BlurView
                      tint="dark"
                      intensity={70}
                      style={{
                        flexDirection: "row",
                        padding: 10 - 2,
                      }}
                    >
                      <Ionicons
                        style={{
                          marginLeft: 10 / 2,
                        }}
                        name="star"
                        color={colors.primary}
                        size={10 * 1.7}
                      />
                      <Text
                        style={{
                          color: colors.white,
                          marginLeft: 10 / 2,
                        }}
                      >
                        {coffee.rating}
                      </Text>
                    </BlurView>
                  </View>
                </TouchableOpacity>

                <Text
                  numberOfLines={2}
                  style={{
                    color: colors.white,
                    fontWeight: "600",
                    fontSize: 10 * 1.7,
                    marginTop: 10,
                    marginBottom: 10 / 2,
                  }}
                >
                  {coffee.name}
                </Text>
                <Text
                  numberOfLines={1}
                  style={{
                    color: colors.secondary,
                    fontSize: 10 * 1.2,
                  }}
                >
                  {coffee.included}
                </Text>
                <View
                  style={{
                    marginVertical: 10 / 2,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <View style={{ flexDirection: "row" }}>
                    <Text style={styles.price}>{coffee.price}</Text>
                  </View>
                  <TouchableOpacity
                    style={{
                      backgroundColor: colors.primary,
                      padding: 10 / 2,
                      borderRadius: 10,
                    }}
                  >
                    <Ionicons name="add" size={10 * 2} color={colors.white} />
                  </TouchableOpacity>
                </View>
              </BlurView>
            </View>
          ))}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  txt2: {
    color: colors.white,
    fontSize: 10 * 2.4,
    fontWeight: "600",
  },

  coffee: {
    width: width / 2 - 10 * 2,
    marginBottom: 10,
    borderRadius: 10 * 2,
    overflow: "hidden",
  },
  product: {
    height: 150,
    width: "100%",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 10 * 2,
  },
  coverRate: {
    position: "absolute",
    right: 0,
    borderBottomStartRadius: 10 * 3,
    borderTopEndRadius: 10 * 2,
    overflow: "hidden",
  },
  logoPrice: {
    color: colors.primary,
    marginRight: 10 / 2,
    fontSize: 10 * 1.6,
  },
  price: {
    color: colors.white,
    fontSize: 10 * 1.6,
  },
});
