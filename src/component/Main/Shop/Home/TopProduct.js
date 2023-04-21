import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  Button,
} from "react-native";
import sp1 from "../../../../public/temp/sp1.jpeg";
import { addCart, getProduct } from "../../../api/userServices";
import getToken from "../../../../global/getToken";
import global from "../../../../global/global";
import axios from "axios";

export default class TopProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arr: [],
      quantity: 0,
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
    console.log("Danh sach san pham", response);
  }

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

  diDenProductDetail = (id_product) => {
    console.log("Detail product:", id_product);
    global.id_product(id_product);
    this.props.navigation.push("DETAIL_PRODUCT");
  };
  render() {
    const { container, titleContainer, body, productContainer } = styles;
    let arrProduct = this.state.arr;
    console.log("Xem thử:", arrProduct);
    return (
      <View style={container}>
        <View style={titleContainer}>
          <Text>TOP PRODUCT</Text>
        </View>
        <View style={body}>
          {arrProduct &&
            arrProduct.map((item, index) => {
              return (
                <View style={productContainer}>
                  {/* this.props.navigation.push */}
                  <TouchableOpacity
                    onPress={() => this.diDenProductDetail(item.id_product)}
                  >
                    <Image
                      source={{
                        uri: `http://192.168.138.6:8081${item.images}`,
                      }}
                      style={{ height: 130, width: 147 }}
                    ></Image>
                  </TouchableOpacity>
                  <Text>{item.name}</Text>
                  <Text>{item.price}nghìn đồng</Text>
                  <Text>{item.detail}</Text>
                  {/* <Button title="-" ></Button> */}
                  <TextInput
                    value={this.state.quantity}
                    onChangeText={(text) => this.setState({ quantity: text })}
                  />
                  {/* <Button title="+" onPress={text => this.setState({ quantity: this.state.quantity + 1 })}></Button> */}
                  <TouchableOpacity
                    onPress={() => this.handleAddGioHang(item.id_product)}
                  >
                    <Text>Buy</Text>
                  </TouchableOpacity>
                </View>
              );
            })}
        </View>
        {/* <View style={body}>
                    <View style={productContainer}>
                        <Image source={{ uri: 'http://192.168.138.6:8081/image/image-1676180053712.jpg' }} style={{ height: 200, width: 147 }}></Image>
                        <Text>Product name</Text>

                        <TouchableOpacity onPress={() => this.handleAddGioHang()}>
                            <Text>Buy</Text></TouchableOpacity>
                    </View>
                    <View style={productContainer}>
                        <Image source={sp1} style={{ height: 200, width: 147 }}></Image>
                        <Text>Product name</Text>
                        <Text>200$</Text>
                    </View>
                    <View style={productContainer}>
                        <Image source={sp1} style={{ height: 200, width: 147 }}></Image>
                        <Text>Product name</Text>
                        <Text>200$</Text>
                    </View>
                    <View style={productContainer}>
                        <Image source={sp1} style={{ height: 200, width: 147 }}></Image>
                        <Text>Product name</Text>
                        <Text>200$</Text>
                    </View>
                </View>*/}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    margin: 10,
  },
  titleContainer: {
    height: 50,
    justifyContent: "center",
    paddingLeft: 10,
    shadowColor: "#2E272B",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
  },
  body: {
    flexDirection: "row",
    justifyContent: "space-around",
    flexWrap: "wrap",
  },
  productContainer: {
    borderWidth: 1,
    width: 150,
    shadowColor: "#2E272B",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    marginBottom: 10,
  },
});
