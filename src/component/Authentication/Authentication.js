import React, { Component } from "react";
import {
  Dimensions,
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Button,
  ImageBackground,
  AsyncStorage,
} from "react-native";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import { connect } from "react-redux";
const { height } = Dimensions.get("window");

class Authentication extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signIn: false,
    };
  }
  // quayLai = async () => {
  //   await AsyncStorage.removeItem("@token");
  //   this.props.navigation.goBack();
  // };

  diDenMain = () => {
    this.props.navigation.popToTop();
  };

  GoToSignUp = () => {
    this.props.navigation.push("SIGN_UP");
  };

  GoToSignIn = () => {
    this.props.navigation.push("SIGN_IN");
  };

  signIn = () => {
    this.setState({
      signIn: false,
    });
  };

  signUp = () => {
    this.setState({
      signIn: true,
    });
  };
  render() {
    // const mainJSX = this.state.signIn ? (
    //   <SignUp GoToSignIn={this.GoToSignIn} />
    // ) : (
    //   <SignIn diDenMain={this.diDenMain} GoToSignUp={this.GoToSignUp} />
    // );
    return (
      // <View style={{ backgroundColor: "#f5fcff", flex: 1 }}>
      //   {/* <Text>Hello from Authentication</Text> */}
      //   <TouchableOpacity onPress={() => this.quayLai()}>
      //     {/* <Text>Go to back</Text> */}
      //   </TouchableOpacity>

      //   {/* {mainJSX} */}
      //   {/* <SignIn diDenMain={this.diDenMain} GoToSignUp={this.GoToSignUp} /> */}
      //   {/* <SignUp GoToSignIn={this.GoToSignIn} /> */}
      //   {/* <TouchableOpacity
      //     style={{
      //       height: 50,
      //       width: 150,
      //       backgroundColor: "#fff",
      //       justifyContent: "center",
      //       alignItems: "center",
      //       marginTop: 100,
      //     }}
      //     onPress={() => this.signIn()}
      //   >
      //     <Text>SIGN IN</Text>
      //   </TouchableOpacity>

      //   <TouchableOpacity
      //     style={{
      //       height: 50,
      //       width: 150,
      //       backgroundColor: "#fff",
      //       justifyContent: "center",
      //       alignItems: "center",
      //       marginTop: 20,
      //     }}
      //     onPress={() => this.signUp()}
      //   >
      //     <Text>SIGN UP</Text>
      //   </TouchableOpacity> */}
      // </View>

      <SafeAreaView>
        <View>
          <ImageBackground
            style={styles.bgImage}
            resizeMode="contain"
            // source={require("../Main/Shop/Store/coffees/welcome-img.png")}
          />
          <View style={styles.title}>
            <Text style={styles.titleMain}>
              {" "}
              Đăng Ký Hoặc Đăng Nhập Tại Đây
            </Text>
            <Text style={styles.titleSub}>
              Chỉ cần bạn đăng nhập, Có mua hay không không quan trọng
            </Text>
          </View>
          <View style={styles.login}>
            <TouchableOpacity
              onPress={() => this.props.reduxState.history.push("SIGN_IN")}
              style={styles.loginBtn}
            >
              <Text style={styles.loginTitle}>Đăng Nhập</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.props.reduxState.history.push("SIGN_UP")}
              style={styles.signupBtn}
            >
              <Text style={styles.signupTitle}>Đăng Ký</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Authentication);

const styles = StyleSheet.create({
  bgImage: {
    height: height / 2.5,
    marginTop: 40,
  },
  title: {
    paddingHorizontal: 10 * 4,
    paddingTop: 10 * 4,
  },
  titleMain: {
    fontSize: 30,
    color: "#1F41BB",
    fontWeight: "800",
    textAlign: "center",
    lineHeight: 40,
  },
  titleSub: {
    fontSize: 16,
    color: "#000",
    textAlign: "center",
    marginTop: 10 * 2.4,
    fontWeight: "500",
    lineHeight: 24,
  },
  login: {
    paddingHorizontal: 10 * 2,
    paddingTop: 10 * 6,
    flexDirection: "row",
  },
  loginBtn: {
    backgroundColor: "#1F41BB",
    paddingVertical: 10 * 1.4,
    paddingHorizontal: 10 * 2,
    marginRight: 12,
    width: "46%",
    borderRadius: 10,
    shadowColor: "#1F41BB",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.3,
  },
  loginTitle: {
    color: "#fff",
    fontSize: 19,
    textAlign: "center",
    fontWeight: "600",
  },
  signupBtn: {
    paddingVertical: 10 * 1.5,
    paddingHorizontal: 10 * 2,
    width: "48%",
    borderRadius: 10,
  },
  signupTitle: {
    color: "#000",
    fontSize: 19,
    textAlign: "center",
    fontWeight: "600",
  },
});
