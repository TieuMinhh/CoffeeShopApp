import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  TextInput,
  Dimensions,
} from "react-native";
import { BlurView } from "expo-blur";
import { Ionicons } from "@expo/vector-icons";
import global from "../../../../global/global";
import axios from "axios";

// const { width, height } = Dimensions.get("window");
export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textSearch: "",
    };
  }

  componentDidMount() {
    console.log("Search ComponentDimount");
  }

  onSearch = async () => {
    //console.log('Phong');
    // let data = { name: 1 };
    let res = await axios.post(
      "http://192.168.1.5:8081/api/v1/search",
      { name: this.state.textSearch },
      { headers: { "content-type": "application/x-www-form-urlencoded" } }
    );
    if (res && res.data) {
      this.props.handleTimKiem(res.data.message);
      this.setState({
        textSearch: "",
      });
    }

    // console.log(res.data.message);
    // console.log(this.state.textSearch);
  };
  render() {
    return (
      <View style={styles.mainSearch}>
        <View style={styles.searchBar}>
          <BlurView intensity={30} style={styles.searchBarView}>
            <TextInput
              style={styles.inputSearch}
              placeholder="  Bạn muốn tìm gì ?"
              placeholderTextColor="#ccc"
              value={this.state.textSearch}
              onChangeText={(text) =>
                this.setState({
                  textSearch: text,
                })
              }
            />
          </BlurView>
        </View>
        <TouchableOpacity
          style={styles.searchArea}
          onPress={() => this.onSearch()}
        >
          <Ionicons
            style={styles.iconSearch}
            name="search"
            color="#ccc"
            size={26}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainSearch: {
    backgroundColor: "#000",
    flexDirection: "row",
  },
  searchBar: {
    borderRadius: 6,
    overflow: "hidden",
    backgroundColor: "#333333",
    width: "80%",
    height: 42,
    marginLeft: 14,
  },
  searchBarView: {
    alignItems: "center",
    justifyContent: "center",
  },
  inputSearch: {
    width: "100%",
    color: "#fff",
    fontSize: 10 * 1.7,
    padding: 10,
    paddingLeft: 6,
  },
  iconSearch: {
    // position: "absolute",
    // left: 10,
  },
  searchArea: {
    backgroundColor: "#333333",
    width: "13%",
    marginLeft: 4,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
});
