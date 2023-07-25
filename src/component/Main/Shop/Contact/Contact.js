import React, { Component } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  AsyncStorage,
  ScrollView,
} from "react-native";
// import Imageprofile from '../../public/temp/profile.png'
import global from "../../../../global/global";
import getToken from "../../../../global/getToken";
import { CommonActions } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { connect } from "react-redux";
import userServices from "../../../api/userServices";
class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
    };
    global.onSignIn = (user) => {
      console.log("Bên Menu");
      this.onSignIn(user);
    };
  }

  async componentDidMount() {
    let token = await getToken();
    if (token) {
      console.log("Token dang luu trong local:", token);
      let data = await userServices.checkToken(token);
      global.onSignIn(data);
      this.props.signIn(data);
    }
  }
  onSignIn(user) {
    this.setState({ user: user });
  }

  async onSignOut() {
    let token = await getToken();
    await AsyncStorage.removeItem("@token");
    let token1 = await getToken();
    console.log("token1:", token);
    console.log("token2:", token1);
    this.setState({ user: null });
    this.props.navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [
          { name: "MAIN" },
          // {
          //   name: 'Profile',
          //   params: { user: 'jane' },
          // },
        ],
      })
    );
  }

  gotoChangeInfo = () => {
    this.props.navigation.push("CHANGE_INFO");
  };
  gotoOderHistory = () => {
    this.props.navigation.push("ORDER_HISTORY");
  };
  gotoChangePassword = () => {
    this.props.navigation.push("CHANGE_PASSWORD");
  };
  gotoAuthentication = () => {
    this.props.navigation.push("AUTHENTICATION");
  };

  render() {
    const { container, profile, btnStyle, btnText, btnSignInStyle } = styles;
    const user = this.state.user;
    let image =
      this.props.reduxState.signIn &&
      this.props.reduxState.signIn.userInfo.avatar;
    // if (user) {
    //   console.log(user.userInfo.name);
    // }
    console.log("this props contect:", this.props.reduxState);
    const logoutJSX = (
      <View style={styles.logutContainer}>
        <Text style={styles.logoutTitle}>Đăng Nhập Để Tiếp Tục</Text>
        <TouchableOpacity
          style={styles.logoutBtn}
          onPress={() => this.props.reduxState.history.push("SIGN_IN")}
        >
          <Text style={styles.btnStyle}>Đăng Nhập</Text>
        </TouchableOpacity>
      </View>
    );

    const loginJSX = (
      <SafeAreaView style={styles.loginContainer}>
        <Text style={styles.title}>Trang cá nhân</Text>
        <ScrollView>
          <View style={styles.userInfoSection}>
            <View style={{ flexDirection: "row", marginTop: 16 }}>
              <Image
                source={{
                  uri: `http://192.168.1.5:8081/image/${image}`,
                }}
                style={styles.profile}
              />
              <View style={{ marginLeft: 20 }}>
                <Text style={styles.txt}>
                  {/* {user && user.userInfo && user.userInfo.name} */}
                  {this.props.reduxState.signIn &&
                    this.props.reduxState.signIn.userInfo.name}
                </Text>
                {/* <Text style={styles.Text}>
                {this.props.reduxState.signIn &&
                  this.props.reduxState.signIn.userInfo.email}
              </Text> */}
                <View style={styles.online_view}>
                  <View style={styles.online_status}></View>
                  <Text style={styles.Text}>Đang hoạt động</Text>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.userInfoSection}>
            <View style={styles.row}>
              <Icon name="map-marker-radius" color="#777777" size={18} />
              <Text style={{ color: "#777777", marginLeft: 10 }}>
                {this.props.reduxState.signIn &&
                  this.props.reduxState.signIn.userInfo.address}
              </Text>
            </View>
            <View style={styles.row}>
              <Icon name="phone" color="#777777" size={18} />
              <Text style={{ color: "#777777", marginLeft: 10 }}>
                {this.props.reduxState.signIn &&
                  this.props.reduxState.signIn.userInfo.phone}
              </Text>
            </View>
            <View style={styles.row}>
              <Icon name="email" color="#777777" size={18} />
              <Text style={{ color: "#777777", marginLeft: 10 }}>
                {this.props.reduxState.signIn &&
                  this.props.reduxState.signIn.userInfo.email}
              </Text>
            </View>
          </View>

          <View style={styles.infoBoxWrapper}>
            <View style={[styles.infoBox]}>
              <Text style={styles.mainTxt}>1.520.000 Đ</Text>
              <Text style={styles.txtWallet}>Ví tiền</Text>
            </View>
            <View style={styles.infoBox}>
              <Text style={styles.mainTxt}>25</Text>
              <Text style={styles.txtWallet}>Đơn đã đặt</Text>
            </View>
          </View>

          <View style={styles.menuWrapper}>
            <TouchableOpacity onPress={() => this.gotoOderHistory()}>
              <View style={styles.menuItem}>
                <MaterialIcons name="history" color="#ff7f24" size={26} />
                <Text style={styles.menuItemText}>Lịch sử đặt hàng</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => this.gotoChangeInfo()}>
              <View style={styles.menuItem}>
                <MaterialIcons
                  name="published-with-changes"
                  color="#ff7f24"
                  size={26}
                />
                <Text style={styles.menuItemText}>Cập nhật thông tin</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.gotoChangePassword()}>
              <View style={styles.menuItem}>
                <MaterialCommunityIcons
                  name="key-change"
                  color="#ff7f24"
                  size={26}
                />
                <Text style={styles.menuItemText}>Thay đổi mật khẩu</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={styles.menuItem}>
                <MaterialIcons name="help-center" color="#ff7f24" size={26} />
                <Text style={styles.menuItemText}>Trung tâm trợ giúp</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.onSignOut()}>
              <View style={styles.menuItem}>
                <MaterialIcons name="logout" color="#ff7f24" size={26} />
                <Text style={styles.menuItemText}>Đăng xuất</Text>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
    const mainJSX = this.state.user ? loginJSX : logoutJSX;
    // const mainJSX = logoutJSX
    console.log("State user của Menu: ", this.state.user);
    // let image = user && user.userInfo && user.userInfo.avatar;
    return (
      <View style={styles.mainContainer}>
        {mainJSX}
        {/* {loginJSX} */}
      </View>
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
    arrGioHang: (arrGioHang) =>
      dispatch({ type: "arrCart", payload: arrGioHang }),
    signIn: (signIn) => dispatch({ type: "signin", payload: signIn }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Contact);

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "#fff",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 5, // thuộc tính elevation dành cho Android
  },

  profile: {
    height: 90,
    width: 90,
    marginBottom: 4,
    borderRadius: 50,
    marginLeft: -12,
  },

  logoutContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  btnStyle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
  logoutTitle: {
    textAlign: "center",
    fontSize: 14,
    marginBottom: 24,
    fontWeight: "500",
  },
  logoutBtn: {
    backgroundColor: "#1F41BB",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    width: 200,
    height: 50,
    borderRadius: 10,
    shadowColor: "#1F41BB",
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },

  loginContainer: {
    flex: 1,
    backgroundColor: "#f1f4ff",
    // backgroundColor: "#fff",
  },
  title: {
    color: "#ff7f24",
    fontSize: 28,
    fontWeight: "600",
    marginTop: 10,
    marginLeft: 100,
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 18,
    paddingVertical: 4,
  },
  online_view: {
    flexDirection: "row",
    marginLeft: 4,
  },
  online_status: {
    width: 8,
    height: 8,
    backgroundColor: "green",
    marginRight: 4,
    borderRadius: 50,
    position: "relative",
    top: 5,
  },
  Text: {
    fontSize: 12,
    lineHeight: 18,
    fontWeight: "400",
  },
  row: {
    flexDirection: "row",
    marginBottom: 6,
  },
  infoBoxWrapper: {
    borderBottomColor: "#dddddd",
    borderBottomWidth: 2,
    borderTopColor: "#dddddd",
    borderTopWidth: 2,
    flexDirection: "row",
    height: 120,
  },
  infoBox: {
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
    borderRightColor: "#dddddd",
    borderRightWidth: 2,
  },
  menuWrapper: {
    marginTop: 18,
  },
  menuItem: {
    flexDirection: "row",
    paddingVertical: 12,
    paddingHorizontal: 28,
  },
  menuItemText: {
    color: "#555555",
    marginLeft: 18,
    fontWeight: "600",
    fontSize: 18,
    lineHeight: 30,
  },
  txt: {
    fontSize: 22,
    fontWeight: "600",
    marginTop: 8,
    marginBottom: 6,
  },
  txtWallet: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 8,
    marginBottom: 6,
  },
  mainTxt: {
    fontWeight: "600",
    marginBottom: -6,
  },
});
