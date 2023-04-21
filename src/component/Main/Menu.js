import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  AsyncStorage,
} from "react-native";
import Imageprofile from "../../public/temp/profile.png";
import global from "../../global/global";
import getToken from "../../global/getToken";
import { CommonActions } from "@react-navigation/native";

export default class Menu extends Component {
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
  gotoAuthentication = () => {
    this.props.navigation.push("AUTHENTICATION");
  };

  render() {
    const { container, profile, btnStyle, btnText, btnSignInStyle } = styles;
    const user = this.state.user;
    // if (user) {
    //     console.log(user.userInfo.name);
    // }

    const logoutJSX = (
      <View style={{ flex: 1 }}>
        <TouchableOpacity onPress={() => this.gotoAuthentication()}>
          <Text style={{ btnStyle }}>Đăng nhập khách hàng</Text>
        </TouchableOpacity>
      </View>
    );

    const loginJSX = (
      <View style={{ flex: 1, alignItems: "center" }}>
        <Text>{user && user.userInfo && user.userInfo.name}</Text>
        <View>
          <TouchableOpacity
            style={btnSignInStyle}
            onPress={() => this.gotoChangeInfo()}
          >
            <Text>Change InFo</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={btnSignInStyle}
            onPress={() => this.gotoOderHistory()}
          >
            <Text>Order History</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={btnSignInStyle}
            onPress={() => this.onSignOut()}
          >
            <Text>Sign Out</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
    const mainJSX = this.state.user ? loginJSX : logoutJSX;
    // const mainJSX = logoutJSX
    console.log("State user của Menu: ", this.state.user);
    let image = user && user.userInfo && user.userInfo.avatar;
    return (
      <View style={container}>
        <Image
          source={{ uri: `http://192.168.138.6:8081/image/${image}` }}
          style={profile}
        />

        {mainJSX}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { backgroundColor: "#02be6e", flex: 1, alignItems: "center" },
  profile: {
    height: 150,
    width: 150,
    borderRadius: 75,
  },
  btnStyle: {
    height: 50,
    backgroundColor: "#fff",
    justifyContent: "center",
    borderRadius: 5,
    paddingHorizontal: 70,
    fontSize: 20,
  },
  btnText: {
    color: "#34B089",
    fontSize: 20,
  },
  btnSignInStyle: {
    height: 50,
    backgroundColor: "#fff",
    justifyContent: "center",
    borderRadius: 5,
    paddingHorizontal: 70,
    width: 200,
    alignItems: "center",
    marginTop: 10,
  },
});
