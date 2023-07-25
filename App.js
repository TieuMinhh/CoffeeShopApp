import { StyleSheet, Text, View, StatusBar } from "react-native";
import React, { Component } from "react";
import axios from "axios";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Main from "./src/component/Main/Main";
import Authentication from "./src/component/Authentication/Authentication";
import OderHistory from "./src/component/OrderHistory/OrderHistory";
import ChangeInfo from "./src/component/ChangeInfo/ChangeInfo";
import { NavigationContainer } from "@react-navigation/native";
import OrderHistory from "./src/component/OrderHistory/OrderHistory";
import DetailProduct from "./src/component/DetailProduct/DetailProduct";
import Header from "./src/component/Main/Shop/Header";
import Cart from "./src/component/Main/Shop/Cart/Cart";
import SignUp from "./src/component/Authentication/SignUp";
import ChangePassword from "./src/component/ChangePassword/ChangePassword";
import ForgotPassword from "./src/component/ForgotPassword/ForgotPassword";

import { Provider } from "react-redux";
import { createStore } from "redux";

import rootReducer from "./src/store/rootReducer";
import SignIn from "./src/component/Authentication/SignIn";
import Order from "./src/component/Main/Shop/Cart/Order";
import ResetPassword from "./src/component/ForgotPassword/ResetPassword";
import EnterOTP from "./src/component/ForgotPassword/EnterOTP";
const reduxStore = createStore(rootReducer);
const Stack = createNativeStackNavigator();
StatusBar.setHidden(true);
export default class App extends Component {
  render() {
    return (
      <Provider store={reduxStore}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="MAIN"
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="MAIN" component={Main} />
            <Stack.Screen name="CHANGE_INFO" component={ChangeInfo} />
            <Stack.Screen name="ORDER_HISTORY" component={OrderHistory} />
            <Stack.Screen name="AUTHENTICATION" component={Authentication} />
            <Stack.Screen name="DETAIL_PRODUCT" component={DetailProduct} />
            <Stack.Screen name="HEADER" component={Header} />
            <Stack.Screen name="CART" component={Cart} />
            <Stack.Screen name="SIGN_UP" component={SignUp} />
            <Stack.Screen name="SIGN_IN" component={SignIn} />
            <Stack.Screen name="CHANGE_PASSWORD" component={ChangePassword} />
            <Stack.Screen name="FORGOT_PASSWORD" component={ForgotPassword} />
            <Stack.Screen name="ENTER_OTP" component={EnterOTP} />
            <Stack.Screen name="RESET_PASSWORD" component={ResetPassword} />
            <Stack.Screen name="ORDER" component={Order} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
