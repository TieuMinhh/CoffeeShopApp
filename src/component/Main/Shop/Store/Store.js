// import react,{Component,useState} from "react";
// import {
//     TextInput,
//     SafeAreaView,
//     ScrollView,
//     StyleSheet,
//     Text,
//     View,
//     TouchableOpacity,
//     Image,
//     Dimensions,
//   } from "react-native";
// import { BlurView } from "expo-blur";
// import { Ionicons } from "@expo/vector-icons";

// import global from "../../../../global/global";
import colors from "./colors";
// import Categories2 from "./Categories2";

import React, { Component } from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  Button,
  Dimensions,
  FlatList,
} from "react-native";
import sp1 from "../../../../public/temp/sp1.jpeg";
import { addCart, getProduct } from "../../../api/userServices";
import getToken from "../../../../global/getToken";
import global from "../../../../global/global";
import axios from "axios";
import { BlurView } from "expo-blur";
import { Ionicons } from "@expo/vector-icons";
import ImageCoffee from "./coffees/mainn.jpg";

// import DetailProduct from "../../../DetailProduct/";

// var image = Coffee[0].image;
const windowHeight = Dimensions.get("window").height;
const { width } = Dimensions.get("window");
export default class Store extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arr: [],
      quantity: 0,
      listCategory: [],
      isHover: false,
      action: "",
    };

    global.setArrCart = () => {}; //Khai báo cho có
    global.setArrSearch = (arrSearch) =>
      this.setState(
        {
          arr: arrSearch,
        },
        console.log("No chay vo constructor")
      );
    // global.id_product = () => { }
  }

  async componentDidMount() {
    console.log("Tét compodidmout");

    let response = await getProduct();
    this.setState({
      arr: response.listProduct,
    });

    let listCategory = await axios.get(
      "http://192.168.138.6:8081/api/v1/category?id=ALL"
    );
    console.log("Tan: ", listCategory.data.listCategory);
    this.setState({
      listCategory: listCategory.data.listCategory,
    });
    console.log("Danh sach san pham", response);
  }
  handleAction = (trangthai) => {
    this.setState({ action: trangthai });
  };

  handleAddGioHang = async (id_product) => {
    try {
      let token = await getToken();
      console.log("Token: ", token);
      //let response = await handleGetAllUser('ALL');
      //let response = await handleGetAllUserShop()
      let response = await addCart(token, id_product, 1);
      let cart = await axios.post("http://192.168.138.6:8081/api/v1/account");
      global.setArrCart(cart.data.list);
      global.setTabBarBadge(cart.data.list.length);
    } catch (e) {
      console.log(e);
    }
  };

  handlePressIn = () => {
    this.setState({ isHover: true });
  };

  handlePressOut = () => {
    this.setState({ isHover: false });
  };

  diDenProductDetail = (id_product) => {
    console.log("Detail product:", id_product);
    global.id_product(id_product);
    this.props.navigation.push("DETAIL_PRODUCT");
  };

  render() {
    let listCategory = this.state.listCategory;
    let arrProduct = this.state.arr;
    const { isHover } = this.state;
    console.log("Xem thử:", arrProduct);
    return (
      <ScrollView style={styles.viewContent}>
        <View>
          <Text style={styles.titile}>Danh mục sản phẩm</Text>
          {/* Danh Mục */}
          <FlatList
            data={listCategory}
            horizontal={true}
            renderItem={({ item, index }) => (
              <TouchableOpacity style={styles.item}>
                <Text
                  style={
                    this.state.action == index
                      ? styles.textitemac
                      : styles.textitem
                  }
                  onPress={() => this.handleAction(index)}
                >
                  {item.name}
                </Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id}
          />
        </View>

        <View style={styles.bodyview}>
          {arrProduct &&
            arrProduct.map((item, index) => {
              return (
                <View style={styles.product}>
                  {/* this.props.navigation.push */}
                  <BlurView tint="dark" intensity={95} style={styles.pad}>
                    <TouchableOpacity
                      style={styles.container}
                      onPress={() => this.diDenProductDetail(item.id_product)}
                    >
                      {/* <Image
                        style={styles.img}
                        source={{
                          uri: `http://192.168.138.6:8081${item.images}`,
                        }}
                      ></Image> */}
                      <Image source={ImageCoffee} style={styles.img} />
                    </TouchableOpacity>
                    <Text numberOfLines={2} style={styles.nametext}>
                      {item.name_product}
                    </Text>
                    <Text numberOfLines={1} style={styles.includedtext}>
                      {item.detail}
                    </Text>
                    <View style={styles.infoview}>
                      <View style={styles.priceview}>
                        <Text style={styles.pricetext}>{item.price} VND</Text>
                        {/* <TextInput
                        value={this.state.quantity}
                        onChangeText={(text) =>
                          this.setState({ quantity: text })
                        }
                      /> */}
                        {/* <Button title="+" onPress={text => this.setState({ quantity: this.state.quantity + 1 })}></Button> */}
                      </View>
                      <TouchableOpacity
                        style={styles.add}
                        onPress={() => this.handleAddGioHang(item.id_product)}
                      >
                        <Ionicons
                          name="add"
                          size={10 * 2}
                          color={colors.white}
                        />
                      </TouchableOpacity>
                    </View>
                  </BlurView>
                </View>
              );
            })}
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  viewContent: {
    backgroundColor: "#000",
    padding: 10,
  },
  container: {
    height: 150,
    width: "100%",
  },

  titile: {
    color: colors.white,
    fontSize: 10 * 2.4,
    fontWeight: "600",
    // textAlign:"center",
    marginBottom: 12,
    marginLeft: 10,
  },
  textitem: {
    color: colors.secondary,
    fontSize: 10 * 2,
  },
  textitemac: {
    color: colors["white-smoke"],
    fontSize: 10 * 2,
  },
  item: {
    // padding: 10,
    margin: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  product: {
    width: width / 2 - 10 * 2,
    marginBottom: 10,
    borderRadius: 10 * 2,
    overflow: "hidden",
  },
  img: {
    width: "100%",
    height: "100%",
    borderRadius: 10 * 2,
  },
  nametext: {
    color: colors.white,
    fontWeight: "600",
    fontSize: 10 * 1.6,
    marginTop: 10,
    marginBottom: 10 / 2,
  },
  bodyview: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    backgroundColor: "#000",
  },
  pad: {
    padding: 10,
  },
  includedtext: {
    color: colors.secondary,
    fontSize: 10 * 1.2,
  },
  pricetext: {
    color: colors.white,
    fontSize: 10 * 1.5,
  },
  add: {
    backgroundColor: colors.primary,
    padding: 10 / 2,
    borderRadius: 10,
  },
  infoview: {
    marginVertical: 10 / 2,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  priceview: {
    flexDirection: "row",
  },
});

// const styles = StyleSheet.create({

//     viewContent: {
//         backgroundColor:"#000",
//         padding:10,
//     },
//     bodyview: {
//       flexDirection: "row",
//       flexWrap: "wrap",
//       justifyContent: "space-between",
//       backgroundColor:"#000"
//     },
//     product: {
//       width: width / 2 - 10 * 2,
//       marginBottom: 10,
//       borderRadius: 10 * 2,
//       overflow: "hidden",
//     },
//     pad: {
//       padding: 10,
//     },
//     container: {
//       height: 150,
//       width: "100%",
//     },
//     img: {
//       width: "100%",
//       height: "100%",
//       borderRadius: 10 * 2,
//     },
//     rate: {
//       position: "absolute",
//       right: 0,
//       borderBottomStartRadius: 10 * 3,
//       borderTopEndRadius: 10 * 2,
//       overflow: "hidden",
//     },
//     rateblurview: {
//       flexDirection: "row",
//       padding: 10 - 2,
//     },
//     rateicon: {
//       marginLeft: 10 / 2,
//     },
//     ratetext: {
//       color: colors.white,
//       marginLeft: 10 / 2,
//     },
//     nametext: {
//       color: colors.white,
//       fontWeight: "600",
//       fontSize: 10 * 1.7,
//       marginTop: 10,
//       marginBottom: 10 / 2,
//     },
//     includedtext: {
//       color: colors.secondary,
//       fontSize: 10 * 1.2,
//     },
//     infoview: {
//       marginVertical: 10 / 2,
//       flexDirection: "row",
//       justifyContent: "space-between",
//       alignItems: "center",
//     },
//     priceview: {
//       flexDirection: "row",
//     },
//     priceicon: {
//       color: colors.primary,
//       marginRight: 10 / 2,
//       fontSize: 10 * 1.6,
//     },
//     pricetext: {
//       color: colors.white,
//       fontSize: 10 * 1.6,
//     },
//     add: {
//       backgroundColor: colors.primary,
//       padding: 10 / 2,
//       borderRadius: 10,
//     },
//   });
