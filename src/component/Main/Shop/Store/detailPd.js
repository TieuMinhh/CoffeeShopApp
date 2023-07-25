import {
    Dimensions,
    ImageBackground,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
  } from "react-native";
  import React, { useState } from "react";
  
  import { Ionicons,FontAwesome5 } from "@expo/vector-icons";
  import colors from "./colors";
  // import SPACING from "../config/SPACING";
  import { BlurView } from "expo-blur";
  import ImageCoffee from "./coffees/mainn.jpg"

  
  const { height, width } = Dimensions.get("window");
  
  const sizes = ["S", "M", "L"];
  
  const CoffeeDetailsScreen = ({ coffee }) => {
    const [activeSize, setActiveSize] = useState(null);
    return (
      <>
        <ScrollView>
          <SafeAreaView>
            <ImageBackground
              source={ImageCoffee}
              style={styles.imgbg}
              imageStyle={{
                borderRadius: 10 * 3,
              }}
            >
              <View style={styles.viewhd}>
                <TouchableOpacity style={styles.buttonhd}>
                  <Ionicons
                    name="return-up-back"
                    color={colors.light}
                    size={10 * 2.5}
                  />
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonhd}>
                  <Ionicons name="cart" color={colors.light} size={10 * 2.5} />
                </TouchableOpacity>
              </View>
  
              <View style={styles.viewbt}>
                <BlurView intensity={80} tint="dark" style={styles.blurview}>
                  <View>
                    <Text style={styles.nametext}>{coffee.name}</Text>
                    <Text style={styles.inclutext}>{coffee.included}</Text>
                  </View>
                </BlurView>
              </View>
            </ImageBackground>
  
            <View style={styles.viewbd}>
              <Text style={styles.destext}>Description</Text>
              <Text numberOfLines={3} style={{ color: colors.white }}>
                {coffee.description}
              </Text>
              <View style={styles.viewsize}>
                <Text style={styles.sizetext}>Size</Text>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  {sizes.map((size, index) => (
                    <TouchableOpacity
                      onPress={() => setActiveSize(size)}
                      key={index}
                      style={[
                        styles.buttonsize,
                        activeSize == size && {
                          borderColor: colors.primary,
                          backgroundColor: colors.dark,
                        },
                      ]}
                    >
                      <Text
                        style={[
                          styles.fonetext,
                          activeSize === size && {
                            color: colors.primary,
                          },
                        ]}
                      >
                        {size}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </View>
          </SafeAreaView>
        </ScrollView>
        <SafeAreaView style={styles.safefoot}>
          <View
            style={{
              padding: 10,
              alignItems: "center",
              justifyContent: "center",
              paddingLeft: 10 * 3,
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <FontAwesome5 name="cart-plus" color={colors["white-smoke"]} size={10 * 2} />
            </View>
            <Text style={{ color: colors.white, fontSize: 10 * 2 }}>
              Giỏ Hàng
            </Text>
          </View>
          <TouchableOpacity
            style={{
              marginRight: 10,
              backgroundColor: colors.primary,
              width: width / 2 + 10 * 1,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 10 * 2,
            }}
          >
            <Text
              style={{
                color: colors.white,
                fontSize: 10 * 2,
                fontWeight: "700",
              }}
            >
              Buy Now
            </Text>
          </TouchableOpacity>
        </SafeAreaView>
      </>
    );
  };
  
  export default CoffeeDetailsScreen;
  
  const styles = StyleSheet.create({
    imgbg: {
      height: height / 2.5 + 10 * 2,
      justifyContent: "space-between",
    },
    viewhd: {
      flexDirection: "row",
      justifyContent: "space-between",
      padding: 10 * 2,
      paddingTop: 35,
    },
    buttonhd: {
      backgroundColor: colors.dark,
      padding: 10,
      borderRadius: 10 * 1.5,
    },
    viewbt: {
      borderRadius: 10 * 3,
      overflow: "hidden",
    },
    blurview: {
      padding: 10 * 2,
      flexDirection: "row",
      justifyContent: "space-between",
    },
    nametext: {
      fontSize: 10 * 2,
      color: colors.white,
      fontWeight: "600",
      marginBottom: 10,
    },
    inclutext: {
      fontSize: 10 * 1.8,
      color: colors["white-smoke"],
      fontWeight: "500",
      marginBottom: 10,
    },
    viewbd: {
      padding: 10,
    },
    destext: {
      color: colors["white-smoke"],
      fontSize: 10 * 1.7,
      marginBottom: 10,
    },
    viewsize: {
      marginVertical: 10 * 2,
    },
    sizetext: {
      color: colors["white-smoke"],
      fontSize: 10 * 1.7,
      marginBottom: 10,
    },
    buttonsize: {
      borderWidth: 2,
      paddingVertical: 10 / 2,
      borderRadius: 10,
      backgroundColor: colors["dark-light"],
      width: width / 3 - 10 * 2,
      alignItems: "center",
    },
    fonetext: {
      color: colors["white-smoke"],
      fontSize: 10 * 1.9,
    },
    safefoot: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
  });
  
  