import colors from "./colors";

import React, { Component } from "react";
import { connect } from "react-redux";
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
import Search from "../Search/Search";
// import DetailProduct from "../../../DetailProduct/";

// var image = Coffee[0].image;
// const { height } = Dimensions.get("window").height;
const { width } = Dimensions.get("window");
const { height } = Dimensions.get("window");
class Store extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arr: [],
      quantity: 0,
      listCategory: [],
      trangthai: "",
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
      "http://192.168.1.5:8081/api/v1/category?id=ALL"
    );
    console.log("Tan: ", listCategory.data.listCategory);
    this.setState({
      listCategory: listCategory.data.listCategory,
    });
    console.log("Danh sach san pham", response);
  }

  handleAddGioHang = async (id_product) => {
    try {
      let token = await getToken();
      console.log("Token: ", token);
      //let response = await handleGetAllUser('ALL');
      //let response = await handleGetAllUserShop()
      let response = await addCart(token, id_product, 1);
      let cart = await axios.post("http://192.168.1.5:8081/api/v1/account");
      global.setArrCart(cart.data.list);
      global.setTabBarBadge(cart.data.list.length);
    } catch (e) {
      console.log(e);
    }
  };

  diDenProductDetail = (id_product) => {
    console.log("Detail product:", id_product);
    // global.id_product(id_product);
    this.props.history(this.props.navigation);
    this.props.product(id_product);
    this.props.navigation.push("DETAIL_PRODUCT");
  };

  onClickTrangThai = async (trangthai, id_category) => {
    console.log(id_category);
    let arrProduct = await axios.get(
      `http://192.168.1.5:8081/api/v1/admin/product?id=${id_category}`
    );
    console.log("id_category:", arrProduct.data.listProduct);
    this.setState({
      trangthai: trangthai,
      arr: arrProduct.data.listProduct,
    });
  };

  handleTimKiem = (list) => {
    console.log("hello: ", list);
    this.setState({
      arr: list,
    });
  };
  render() {
    let listCategory = this.state.listCategory;
    let arrProduct = this.state.arr;
    console.log("chiều cao là: ", height);
    console.log("chiều rộng là: ", width);
    console.log("Xem thử:", this.props);
    return (
      <>
        <Search handleTimKiem={(list) => this.handleTimKiem(list)} />
        <View style={{ backgroundColor: "#000" }}>
          <Text style={styles.title}>Danh mục sản phẩm</Text>
          {/* Danh Mục */}
          <FlatList
            data={listCategory}
            horizontal={true}
            renderItem={({ item, index }) => (
              <TouchableOpacity style={styles.item}>
                <Text
                  style={
                    this.state.trangthai == index
                      ? styles.textitemac
                      : styles.textitem
                  }
                  onPress={() => this.onClickTrangThai(index, item.id_category)}
                >
                  {item.name}
                </Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id}
          />
        </View>
        <ScrollView style={styles.viewContent}>
          {/* Danh Mục */}

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
                        <Image
                          source={{
                            uri: `http://192.168.1.5:8081/image/${item.images}`,
                          }}
                          style={styles.img}
                        />
                      </TouchableOpacity>
                      <Text numberOfLines={1} style={styles.nametext}>
                        {item.name_product}
                      </Text>
                      <Text numberOfLines={1} style={styles.includedtext}>
                        {item.detail}
                      </Text>
                      <View style={styles.infoview}>
                        <View style={styles.priceview}>
                          <Text style={styles.pricetext}>{item.price} đ</Text>
                        </View>
                        <TouchableOpacity
                          style={styles.add}
                          onPress={() =>
                            this.diDenProductDetail(item.id_product)
                          }
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
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    reduxState: state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    product: (id_product) =>
      dispatch({ type: "id_product", payload: id_product }),
    history: (history) => dispatch({ type: "history", payload: history }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Store);

const styles = StyleSheet.create({
  viewContent: {
    backgroundColor: "#000",
    padding: 14,
    // marginTop:8,
  },
  container: {
    height: 150,
    width: "100%",
  },
  title: {
    color: colors.white,
    fontSize: 10 * 2.4,
    fontWeight: "600",
    marginBottom: 10,
    marginLeft: 14,
    marginTop: 16,
  },
  item: {
    margin: 14,
    marginBottom: -2,
    marginTop: -2,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  textitem: {
    color: colors.secondary,
    fontSize: 10 * 2,
  },
  textitemac: {
    color: colors.primary,
    fontSize: 10 * 2,
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
