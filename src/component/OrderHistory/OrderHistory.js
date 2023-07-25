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
  SafeAreaView,
} from "react-native";
import colors from "../Main/Shop/Store/colors";
import { connect } from "react-redux";
import { BlurView } from "expo-blur";
import ListStatus from "./ListStatus";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import getToken from "../../global/getToken";
import userServices from "../api/userServices";

// const windowHeight = Dimensions.get("window").height;
// const windowWidth = Dimensions.get("window").width;
class OrderHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      Data: [],
      page: 1,
      error: null,
      refreshing: false,
      ListOrder: ListStatus,
      trangthai: "",
      listOrder: [],
      listOrder2: [],
      status: 1,
    };
  }

  async componentDidMount() {
    await this.handleDanhSachDonHang(1);
  }

  handleDanhSachDonHang = async (status) => {
    let token = await getToken();

    let data = await userServices.checkToken(token);

    let order = await axios.get(
      `http://192.168.1.5:8081/api/v1/account/donhangtheotaikhoan/${data.userInfo.id_account}`
    );
    // console.log(order.data);
    let res = await axios.get(
      `http://192.168.1.5:8081/api/v1/account/lichsudathang/${data.userInfo.id_account}/${status}`
    );

    this.setState({
      listOrder: res.data.listOrder,
      listOrder2: order.data.listOrder,
    });
  };

  onClickTrangThai = async (trangthai, status) => {
    // console.log(id_category);
    // let arrProduct = await axios.get(
    //   `http://192.168.1.5:8081/api/v1/admin/product?id=${id_category}`
    // );
    // console.log("id_category:", arrProduct.data.listProduct);
    console.log(status);
    await this.handleDanhSachDonHang(status);
    this.setState({
      trangthai: trangthai,
      status: status,
    });
  };

  quayLai = () => {
    this.props.navigation.goBack();
  };

  handleHuyDon = async (id_order) => {
    let res = await axios.post(
      `http://192.168.1.5:8081/api/v1/admin/huydonhang/${id_order}`
    );
    console.log("Id order: ", res.data);
    await this.handleDanhSachDonHang(1);
  };

  render() {
    // console.log("Chiều cao là: ", windowHeight);
    // console.log("Chiều rộng là: ", windowWidth);
    console.log(this.props.reduxState);
    let listOrder = this.state.listOrder;
    let listOrder2 = this.state.listOrder2;
    console.log(listOrder, listOrder2);
    let total = 0;
    return (
      <>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => this.quayLai()}
          >
            <Ionicons
              name="return-up-back"
              color={colors["white"]}
              size={10 * 2.5}
            />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Lịch Sử Đặt Hàng</Text>
        </View>

        <View style={{ backgroundColor: "#000" }}>
          <FlatList
            style={styles.FlatList}
            data={ListStatus}
            horizontal={true}
            renderItem={({ item, index }) => (
              <TouchableOpacity style={styles.item}>
                <Text
                  style={
                    this.state.trangthai == index
                      ? styles.text_item_active
                      : styles.text_item_non_active
                  }
                  onPress={() => this.onClickTrangThai(index, item.id)}
                >
                  {item.name}
                </Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id}
          />
        </View>

        <ScrollView style={styles.bg}>
          {listOrder2 &&
            listOrder2
              .map((item2, index2) => {
                {
                  total = 0;
                }
                if (item2.status == this.state.status) {
                  return (
                    <View style={styles.main_view}>
                      <BlurView
                        tint="dark"
                        intensity={90}
                        style={styles.main_order}
                      >
                        <Text style={styles.date}>{item2.order_time}</Text>

                        {listOrder &&
                          listOrder.map((item, index) => {
                            if (item2.id_order == item.id_order) {
                              {
                                total += item.amount * item.gia;
                              }
                              return (
                                // <View style={styles.box}>
                                <>
                                  <View style={styles.bill1}>
                                    <View>
                                      <View style={styles.photo}>
                                        <Image
                                          style={styles.Anh1}
                                          source={{
                                            uri: `http://192.168.1.5:8081/image/${item.images}`,
                                          }}
                                        ></Image>
                                      </View>
                                    </View>

                                    <View>
                                      <Text style={styles.name}>
                                        {item.name}
                                      </Text>
                                      <Text style={styles.size}>
                                        Size:{" "}
                                        {item.size == 360
                                          ? "S"
                                          : item.size == 500
                                          ? "M"
                                          : "L"}
                                      </Text>
                                      <Text style={styles.amount}>
                                        x{item.amount}
                                      </Text>
                                      <Text style={styles.price}>
                                        Giá: {item.gia} đ
                                      </Text>
                                    </View>
                                  </View>
                                </>
                              );
                            }
                          })}
                        <Text style={styles.total}>Tổng tiền: {total} đ</Text>
                        {this.state.status == 1 && (
                          <TouchableOpacity
                            style={styles.btnCancel}
                            onPress={() => this.handleHuyDon(item2.id_order)}
                          >
                            <Text style={styles.cancel}>Huỷ đơn hàng</Text>
                          </TouchableOpacity>
                        )}
                      </BlurView>
                    </View>
                  );
                }
              })
              .reverse()}
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderHistory);
const styles = StyleSheet.create({
  header: {
    backgroundColor: "#000",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  backButton: {
    backgroundColor: colors.light,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 10 * 1.5,
    width: 48,
    right: 86,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    top: 1,
    right: 22,
  },

  viewContent: {
    backgroundColor: "#99ffff",
    padding: 14,
    // marginTop:8,
  },
  bg: {
    backgroundColor: "#000",
  },
  FlatList: {
    height: 50,
    marginLeft: 10,
  },
  main_view: {
    backgroundColor: "#000",
    elevation: 1,
  },
  main_order: {
    width: "90%",
    marginTop: 44,
    marginBottom: 20,
    marginLeft: 20,
    // backgroundColor: "#B6EAFA",
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    borderColor: "#eee",
    borderWidth: 0.15,
  },
  trangthai: {
    flexDirection: "row",
  },
  container: {
    height: 150,
    width: "100%",
  },
  text_item_non_active: {
    color: colors.secondary,
    fontSize: 18,
  },
  text_item_active: {
    color: colors.primary,
    fontSize: 20,
  },
  item: {
    margin: 6,
    marginBottom: -2,
    marginTop: -2,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: colors.white,
    fontSize: 10 * 2.4,
    fontWeight: "600",
    marginBottom: 10,
    marginLeft: 14,
  },

  textitem: {
    color: colors.secondary,
    fontSize: 10 * 2,
  },
  order_time: {
    // borderTopColor: "#ddd",
  },

  bill1: {
    // borderColor:'eee',
    // borderWidth:2,
    // backgroundColor: "#9fd7f9",
    width: "90%",
    height: 110,
    flexDirection: "row",
    borderBottomColor: "#eee",
    borderBottomWidth: 0.2,
    marginBottom: 20,
    marginTop: -28,
  },
  photo: {
    // borderColor:'none',
    // borderWidth:2,
    height: 180,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  Anh1: {
    width: 50,
    height: 80,
    position: "relative",
    bottom: 30,
    marginRight: 10,
  },
  date: {
    color: "#eee",
    position: "relative",
    bottom: 30,
    fontSize: 18,
  },
  name: {
    color: "#eee",
    fontSize: 20,
    fontWeight: "600",
    marginLeft: 10,
    marginTop: 14,
  },
  size: {
    color: "#eee",
    marginLeft: 10,
    marginTop: 4,
    fontSize: 17,
  },
  amount: {
    color: "#eee",
    marginLeft: 10,
    marginTop: -16,
    fontSize: 17,
    marginLeft: 240,
  },
  price: {
    color: "#eee",
    fontSize: 17,
    marginLeft: 10,
    marginTop: 8,
    marginLeft: 160,
  },
  photo2: {
    // borderColor:'eee',
    // borderWidth:2,
    height: 180,
    width: "30%",
    justifyContent: "center",
    alignItems: "center",
  },
  Anh2: {
    width: 50,
    height: 100,
    position: "relative",
    top: 5,
  },
  total: {
    color: "#eee",
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 10,
  },
  btnCancel: {
    // backgroundColor: "#6ec2f7",
    backgroundColor: "#D17842",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: 40,
    borderRadius: 10,
    shadowColor: "#1F41BB",
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  cancel: {
    color: "#eee",
    fontSize: 17,
  },
});
