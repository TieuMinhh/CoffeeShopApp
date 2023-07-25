import React, { Component } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  Image,
  FlatList,
  ToastAndroid,
  LogBox,
} from "react-native";
import { BlurView } from "expo-blur";

import {
  Ionicons,
  MaterialCommunityIcons,
  FontAwesome5,
  Foundation,
} from "@expo/vector-icons";
import colors from "..//Store/colors";
import { connect } from "react-redux";
const { height, width } = Dimensions.get("window");
import userServices from "../../../api/userServices";
import getToken from "../../../../global/getToken";
import global from "../../../../global/global";

import axios from "axios";
class Order extends Component {
  constructor(props) {
    super(props);
    this.state = {
      taiKhoan: "",
    };
  }

  async componentDidMount() {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
    let token = await getToken();
    console.log("Token dang luu trong local:", token);
    let data = await userServices.checkToken(token);
    this.setState({
      taiKhoan: data.userInfo,
    });
  }

  quayLai = () => {
    this.props.navigation.goBack();
  };

  handleDatHang = async () => {
    let cart = await axios.post("http://192.168.1.5:8081/api/v1/dathang", {
      arr: this.props.reduxState.listCanThanhToan,
    });
    console.log(cart);
    this.props.arrGioHang([]);
    this.props.listCanThanhToan([]);
    this.props.tienCanThanhToan(0);
    // this.props.reduxState.history.popToTop();
    ToastAndroid.show("Đặt hàng thành công", ToastAndroid.LONG);
    global.setTabBarBadge(0);
    this.props.navigation.popToTop();
  };

  render() {
    let taiKhoan = this.state.taiKhoan;
    console.log("tai khoan: ", taiKhoan);
    let listCart = this.props.reduxState.listCanThanhToan;
    let tongTien = this.props.reduxState.tienCanThanhToan;
    console.log("mang: ", this.props.reduxState.listCanThanhToan);
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
          <Text style={styles.headerTitle}>Đặt hàng</Text>
        </View>

        <ScrollView style={{ backgroundColor: "#000" }}>
          <View>
            <Text style={styles.addressInfo}>Thông tin nhận hàng</Text>
            <BlurView tint="dark" intensity={100} style={styles.container}>
              <Foundation name="map" size={24} color={colors.primary} />
              <Text style={styles.addressText}>Tên: {taiKhoan.name}</Text>
              <Text style={styles.addressText}>SĐT: {taiKhoan.phone}</Text>
              <Text style={styles.address}>Địa chỉ: {taiKhoan.address}</Text>
            </BlurView>
          </View>

          <View>
            <Text style={styles.delivery}>Hình thức giao hàng</Text>

            <BlurView tint="dark" intensity={100} style={styles.deliveryView}>
              <FontAwesome5 name="truck" size={20} color={colors.primary} />
              <Text style={styles.deliveryName}>
                Giao hàng tận nơi: 20000 đ
                {/* Giao hàng tận nơi: 20000 đ交 货: 20000 越 南 盾 */}
              </Text>
              <Text style={styles.deliveryText}>
                Thời gian giao hàng từ 30-60 phút tùy thuộc vào thời điểm và
                khoảng cách. Nếu có sự chậm trễ mong quý khách thông cảm. Cafe
                Happiness xin chân thành cảm ơn!
                {/* 交 货 时 间 为 30-60 分 钟，具 体 取 决 于 时 间 和 距 离。如 有
                延 误，敬 请 谅 解。不 安 的 咖 啡 对 不 起 谢 谢 感 谢 您 在 我
                们 的 商 店 购 物 */}
              </Text>
            </BlurView>
          </View>
          <View>
            <Text style={styles.orderInfo}>Danh sách sản phẩm</Text>
            {/* Flatlist */}
          </View>
          <FlatList
            data={listCart}
            renderItem={({ item }) => (
              <BlurView
                tint="dark"
                intensity={100}
                style={styles.orderContainer}
              >
                <TouchableOpacity>
                  <Image
                    source={{
                      uri: `http://192.168.1.5:8081/image/${item.images}`,
                    }}
                    style={styles.orderImage}
                  />
                </TouchableOpacity>
                <View
                  style={{
                    marginLeft: 12,
                    flexDirection: "column",
                  }}
                >
                  <Text style={styles.orderName}>{item.name}</Text>
                  <Text style={styles.orderSize}>
                    Size:
                    <View>
                      <Text style={styles.orderSizeText}>
                        {+item.size == 360 ? "S" : item.size == 500 ? "M" : "L"}
                      </Text>
                    </View>
                  </Text>
                  <Text style={styles.orderOuantity}>x{item.quantity}</Text>
                  <Text style={styles.orderPrice}>
                    Giá: {item.price_size} đ
                  </Text>
                </View>
              </BlurView>
            )}
          />

          <View style={{ marginTop: 30 }}>
            <View style={styles.lineOne}></View>
            <Text style={styles.paymethod}>Phương thức thanh toán</Text>

            <BlurView tint="dark" intensity={100} style={styles.paymethodView}>
              <MaterialCommunityIcons
                name="cash-multiple"
                size={24}
                color={colors.primary}
              />
              <Text style={styles.paymethodText}>Thanh toán khi nhận hàng</Text>
            </BlurView>
            <View style={styles.lineTwo}></View>
          </View>

          <BlurView tint="dark" intensity={100} style={styles.payView}>
            <View style={{ flexDirection: "column", marginRight: 60 }}>
              <Text style={styles.payText}>Tạm Tính:</Text>
              <Text style={styles.payText}>Phí vận chuyển:</Text>
              <Text style={styles.payText}>Tổng tiền:</Text>
            </View>
            <View style={{ flexDirection: "column" }}>
              <Text style={styles.payText}> {tongTien} đ</Text>
              <Text style={styles.payText}> 20000 đ</Text>
              <Text style={styles.paySum}> {tongTien + 20000} đ</Text>
            </View>
          </BlurView>
        </ScrollView>

        <SafeAreaView style={styles.footer}>
          <Text style={styles.footerText}>Tổng cộng: {tongTien + 20000} đ</Text>

          <TouchableOpacity
            style={styles.orderButton}
            onPress={() => this.handleDatHang()}
          >
            <Text style={styles.buttonName}>Đặt Hàng</Text>
          </TouchableOpacity>
        </SafeAreaView>
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
    arrGioHang: (arrGioHang) =>
      dispatch({ type: "arrCart", payload: arrGioHang }),
    history: (history) => dispatch({ type: "history", payload: history }),
    tongtien: (tongTien) => dispatch({ type: "tongtien", payload: tongTien }),
    listCanThanhToan: (listCanThanhToan) =>
      dispatch({ type: "listCanThanhToan", payload: listCanThanhToan }),
    tienCanThanhToan: (tienCanThanhToan) =>
      dispatch({ type: "tienCanThanhToan", payload: tienCanThanhToan }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Order);

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
    right: 122.8,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    top: 1,
    right: 22,
  },
  addressInfo: {
    color: "#ddd",
    marginTop: 16,
    marginLeft: 16,
    fontWeight: "500",
  },
  container: {
    padding: 10,
    // backgroundColor: "#f1f4ff",
    backgroundColor: "#000",
    borderWidth: 1,
    // borderColor: "#f1f4ff",
    width: "90%",
    height: "auto",
    borderRadius: 15,
    // borderWidth: 0.1,
    marginTop: 8,
    left: 16,
  },
  addressText: {
    color: "#ddd",
    marginTop: 4,
    marginBottom: 4,
    fontWeight: "500",
  },
  address: {
    color: "#ddd",
    fontWeight: "500",
  },
  delivery: {
    color: "#ddd",
    marginTop: 18,
    marginLeft: 16,
    fontWeight: "500",
  },
  deliveryView: {
    padding: 10,
    backgroundColor: "#f1f4ff",
    borderWidth: 1,
    // borderColor: "#f1f4ff",
    width: "90%",
    height: "auto",
    borderRadius: 15,
    // borderWidth: 2.2,
    marginTop: 8,
    marginBottom: 4,
    left: 16,
  },
  deliveryName: {
    color: "#ddd",
    fontWeight: "500",
    marginBottom: 4,
    marginTop: 4,
  },
  deliveryText: {
    color: "#ddd",
    fontWeight: "500",
    marginBottom: 4,
    lineHeight: 22,
  },
  orderInfo: {
    color: "#ddd",
    marginTop: 18,
    marginLeft: 16,
    fontWeight: "500",
  },
  orderContainer: {
    flexDirection: "row",
    padding: 10,
    backgroundColor: "#f1f4ff",
    borderWidth: 1,
    // borderColor: "#f1f4ff",
    width: "90%",
    height: 114,
    borderRadius: 15,
    // borderWidth: 2.2,
    marginTop: 8,
    left: 16,
  },
  orderImage: {
    height: 80,
    width: 80,
    borderRadius: 10,
    position: "relative",
    top: 4,
    marginRight: 5,
  },
  orderName: {
    fontSize: 18,
    color: "#ddd",
    fontWeight: "500",
    marginBottom: 2,
  },
  orderSize: {
    fontSize: 15,
    color: "#ddd",
    fontWeight: "500",
    marginBottom: 8,
  },
  orderSizeText: {
    color: colors.primary,
    fontSize: 10 * 1.8,
    fontWeight: "500",
    position: "relative",
    top: 6,
    left: 4,
  },
  orderPrice: {
    fontSize: 15,
    color: "#ddd",
    fontWeight: "500",
    marginLeft: 140,
    marginTop: -10,
    opacity: 0.9,
  },
  orderOuantity: {
    fontSize: 15,
    color: "#ddd",
    fontWeight: "500",
    marginLeft: 210,
    top: -16,
  },
  lineOne: {
    backgroundColor: "#000",
    borderWidth: 0.2,
    borderColor: "#f1f4ff",
    width: "90%",
    marginTop: 2,
    left: 16,
  },
  lineTwo: {
    backgroundColor: "#000",
    borderWidth: 0.2,
    borderColor: "#f1f4ff",
    width: "90%",
    marginTop: 28,
    marginBottom: 16,
    left: 16,
  },
  paymethod: {
    color: "#ddd",
    fontWeight: "500",
    marginTop: 18,
    marginLeft: 16,
  },
  paymethodView: {
    padding: 10,
    backgroundColor: "#f1f4ff",
    borderWidth: 1,
    // borderColor: "#f1f4ff",
    width: "90%",
    height: "auto",
    borderRadius: 15,
    // borderWidth: 2.2,
    marginTop: 8,
    left: 16,
  },
  paymethodText: {
    color: "#ddd",
    fontWeight: "500",
    marginBottom: 4,
  },

  payView: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    margin: 18,
    padding: 10,
    backgroundColor: "#f1f4ff",
    borderWidth: 1,
    // borderColor: "#f1f4ff",
    width: "90%",
    height: "auto",
    borderRadius: 15,
    // borderWidth: 2.2,
    marginTop: 8,
  },
  payText: {
    color: "#ddd",
    fontWeight: "500",
  },
  paySum: {
    fontWeight: "500",
    color: colors.primary,
  },
  footer: {
    backgroundColor: "#000",
    flexDirection: "row",
    justifyContent: "space-between",
    height: 70,
  },
  footerText: {
    color: "#ddd",
    marginLeft: 68,
    marginTop: 24.8,
    fontSize: 10 * 1.48,
    fontWeight: "500",
  },
  orderButton: {
    marginTop: 14,
    marginRight: 16,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10 * 1.2,
    height: 44,
    width: 130,
  },
  buttonName: {
    color: colors.white,
    fontSize: 10 * 1.6,
    fontWeight: "600",
  },
});
