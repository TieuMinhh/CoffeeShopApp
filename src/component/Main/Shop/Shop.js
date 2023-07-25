import React, { Component } from "react";
import { Text, View, TouchableOpacity, Dimensions } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Home from "./Home/Home";
import Contact from "./Contact/Contact";
import Store from "./Store/Store";
import Cart from "./Cart/Cart";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import Ionicons from "react-native-vector-icons/Ionicons";
import Header from "./Header";
import global from "../../../global/global";
import { Ionicons, AntDesign, FontAwesome5 } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();
const windowHeight = Dimensions.get("window").height;
export default class Shop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      setTabBarBadge: 0,
    };

    global.setTabBarBadge = (setTabBarBadge) =>
      this.setState(
        {
          setTabBarBadge,
        },
        console.log("setTabBarBadge global", setTabBarBadge)
      );
    global.id_product = (id_product) => {
      this.setState(
        {
          idproduct: id_product,
        },
        console.log(id_product)
      );
    };
  }
  componentDidMount() {}
  onpenMenu = () => {
    this.props.open();
  };

  render() {
    console.log("Shop");
    console.log("setTabBarBadge render", this.state.setTabBarBadge);
    const setTabBarBadge =
      this.state.setTabBarBadge === 0 ? null : this.state.setTabBarBadge;
    return (
      <View style={{ flex: 1 }}>
        {/* <View style={{ height: windowHeight / 7, paddingTop: 4 }}>
                    <TouchableOpacity style={{ backgroundColor: 'green', height: 30, width: 100, borderRadius: 10, alignItems: 'center' }}
                        onPress={() => this.onpenMenu()}
                    >
                        <Text style={{ top: 4.999 }}>
                            Open Menu
                        </Text>
                    </TouchableOpacity>
                </View> */}
        <Header open={this.onpenMenu} />
        {/* <NavigationContainer> */}

        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === "Trang Chủ") {
                iconName = focused ? "home" : "home";
              } else if (route.name === "Settings") {
                iconName = focused ? "ios-list" : "ios-list-outline";
              }

              if (route.name === "Sản Phẩm") {
                iconName = focused ? "coffee" : "coffee";
              } else if (route.name === "Settings") {
                iconName = focused ? "ios-list" : "ios-list-outline";
              }

              if (route.name === "Giỏ Hàng") {
                iconName = focused ? "shopping-cart" : "shopping-cart";
              } else if (route.name === "Settings") {
                iconName = focused ? "ios-list" : "ios-list-outline";
              }

              if (route.name === "Cá Nhân") {
                iconName = focused ? "user-alt" : "user-alt";
              } else if (route.name === "Settings") {
                iconName = focused ? "ios-list" : "ios-list-outline";
              }
              // You can return any component that you like here!
              return (
                <FontAwesome5 name={iconName} size={10 * 2.3} color={color} />
              );
            },
            tabBarActiveTintColor: "#945305",
            tabBarInactiveTintColor: "#222222",
            headerShown: false,
            tabBarInactiveBackgroundColor: "#fff",
            tabBarActiveBackgroundColor: "#ddd",
          })}
        >
          <Tab.Screen name="Trang Chủ" component={Home} />
          <Tab.Screen name="Sản Phẩm" component={Store} />
          <Tab.Screen
            name="Giỏ Hàng"
            component={Cart}
            options={{ tabBarBadge: setTabBarBadge }}
          />
          <Tab.Screen name="Cá Nhân" component={Contact} />
        </Tab.Navigator>
        {/* </NavigationContainer> */}
      </View>
    );
  }
}
