import React, { Component } from "react";
import {
  Button,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Image,
} from "react-native";
import global from "../../../../global/global";
import axios from "axios";
import getToken from "../../../../global/getToken";
import { checkToken } from "../../../api/userServices";

export default class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listCart: null,
    };
    global.setArrCart = (listCart) =>
      this.setState(
        { listCart: listCart },
        console.log("List cart day ne:", listCart)
      );
  }

  async componentDidMount() {
    let token = await getToken();
    console.log("Token cart: ", token);
    if (!token) {
      this.setState({
        listCart: null,
      });
    }
    // let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF9hY2NvdW50IjoxLCJlbWFpbCI6ImFkbWluLmZvb2RvcmRlckBnbWFpbC5jb20iLCJwaG9uZSI6IjAzMjEiLCJuYW1lIjoiS2ltIMSQ4bqhaSBQaG9uZyIsImNyZWF0ZWRfdGltZSI6IjIwMjItMDktMjFUMDU6MTI6MjYuMDAwWiIsImFkZHJlc3MiOiI1MiIsImF2YXRhciI6IicnIiwic3RhdHVzIjowLCJyb2xlIjoxLCJpYXQiOjE2Nzc3NDIzMjZ9.cVxNo4bTJq2zKQomgAlFFKHbfjCZ9y5Vm4zmcavUC3k'
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    let cart = await axios.post("http://192.168.138.6:8081/api/v1/account");
    this.setState({ listCart: cart.data.list });
    global.setArrCart(cart.data.list);
    global.setTabBarBadge(cart.data.list.length);
  }

  addCart = async () => {
    let token = await getToken();
    // let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF9hY2NvdW50IjoxLCJlbWFpbCI6ImFkbWluLmZvb2RvcmRlckBnbWFpbC5jb20iLCJwaG9uZSI6IjAzMjEiLCJuYW1lIjoiS2ltIMSQ4bqhaSBQaG9uZyIsImNyZWF0ZWRfdGltZSI6IjIwMjItMDktMjFUMDU6MTI6MjYuMDAwWiIsImFkZHJlc3MiOiI1MiIsImF2YXRhciI6IicnIiwic3RhdHVzIjowLCJyb2xlIjoxLCJpYXQiOjE2Nzc3NDIzMjZ9.cVxNo4bTJq2zKQomgAlFFKHbfjCZ9y5Vm4zmcavUC3k'
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    //let response = await handleGetAllUser('ALL');
    //let response = await handleGetAllUserShop()
    // let response = await axios.get('http://192.168.138.6:8081/api/v1/admin/account')
    let response = await axios.post(
      "http://192.168.138.6:8081/api/v1/product/2"
    );
    console.log("Check token add cart:", response);
  };

  deleteCart = async (id_product) => {
    let token = await getToken();
    // let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF9hY2NvdW50IjoxLCJlbWFpbCI6ImFkbWluLmZvb2RvcmRlckBnbWFpbC5jb20iLCJwaG9uZSI6IjAzMjEiLCJuYW1lIjoiS2ltIMSQ4bqhaSBQaG9uZyIsImNyZWF0ZWRfdGltZSI6IjIwMjItMDktMjFUMDU6MTI6MjYuMDAwWiIsImFkZHJlc3MiOiI1MiIsImF2YXRhciI6IicnIiwic3RhdHVzIjowLCJyb2xlIjoxLCJpYXQiOjE2Nzc3NDIzMjZ9.cVxNo4bTJq2zKQomgAlFFKHbfjCZ9y5Vm4zmcavUC3k'
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    //let response = await handleGetAllUser('ALL');
    //let response = await handleGetAllUserShop()
    // let response = await axios.get('http://192.168.138.6:8081/api/v1/admin/account')
    let response = await axios.delete(
      `http://192.168.138.6:8081/api/v1/product/${id_product}`
    );
    console.log(response);
    let cart = await axios.post("http://192.168.138.6:8081/api/v1/account");
    console.log("CArt", cart.data);
    if (cart && cart.data && cart.data.list) {
      global.setArrCart(cart.data.list);
      console.log("CArt hien thi: ", cart.data.list.length);
      global.setTabBarBadge(cart.data.list.length);
    } else {
      global.setArrCart([]);
      global.setTabBarBadge(0);
    }
    this.setState({
      num: this.state.num + 1,
    });
    // console.log(cart.data.list);
    // global.setArrCart(listCart)
  };

  render() {
    const listCart = this.state.listCart;

    console.log("Cart 1: ", listCart);
    // if (user) {
    //     console.log('Cart 2: ',);
    //     console.log('Cart 3: ',);
    // }

    return (
      <View style={{ backgroundColor: "green", flex: 1, alignItems: "center" }}>
        <Text>Cart</Text>
        {/* {

                    listCart && listCart.map((item, index) => {
                        return (
                            <View style={{
                                borderWidth: 1,
                                width: 150, shadowColor: '#2E272B',
                                shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.2,
                                marginBottom: 10
                            }}>
                                <Text>Tên sản phẩm: {item.name}</Text>
                                <Text>:Giá: {item.price}nghìn đồng</Text>
                                <Text>Số lượng: {item.quantity}</Text>
                                <TouchableOpacity onPress={() => this.deleteCart(item.id_product)}>
                                    <Text>Xóa</Text></TouchableOpacity>
                            </View>
                        )
                    })
                } */}
        <FlatList
          data={listCart}
          renderItem={({ item }) => (
            <View
              style={{
                borderWidth: 1,
                width: 300,
                shadowColor: "#2E272B",
                shadowOffset: { width: 0, height: 3 },
                shadowOpacity: 0.2,
                marginBottom: 10,
                padding: 10,
                backgroundColor: "#95819c",
                flexDirection: "row",
              }}
            >
              <View>
                <Image
                  source={{ uri: `http://192.168.138.6:8081/${item.images}` }}
                  style={{ height: 60, width: 60, alignItems: "center" }}
                ></Image>
              </View>
              <View style={{ marginLeft: 10 }}>
                <Text>Tên sản phẩm: {item.name}</Text>
                <Text>Giá: {item.price}nghìn đồng</Text>
                <Text>Số lượng: {item.quantity}</Text>
                <TouchableOpacity
                  onPress={() => this.deleteCart(item.id_product)}
                >
                  <Text>Xóa</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
    );
  }
}
