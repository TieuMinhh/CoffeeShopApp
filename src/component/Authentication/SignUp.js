import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
  ToastAndroid,
} from "react-native";

const heightWindow = Dimensions.get("window").height;
// import ImagePicker from 'react-native-image-picker'
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { connect } from "react-redux";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      phone: "",
      name: "",
      address: "",
      avatar: "",
      password: "",
      image: null,
      setImage: null,
    };
  }
  pickImage = async () => {
    this.setState({
      image: "",
    });
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      this.setState({
        setImage: result.assets[0].uri,
      });
      // setImage(result.assets[0].uri);
    }
  };
  handleTakePhoto = async () => {
    this.setState({
      setImage: "",
    });
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images, // chỉ chọn ảnh
      allowsEditing: true, // cho phép chỉnh sửa trước khi lưu ảnh
      aspect: [4, 3], // tỷ lệ khung hình
      quality: 1, // chất lượng ảnh (0-1)
    });
    if (!result.canceled) {
      // nếu không hủy việc chụp ảnh
      this.setState({ image: result.assets[0].uri }); // lưu đường dẫn của ảnh vào state
    }
  };

  upload = async () => {
    const { email, password, name, phone, avatar, address, setImage } =
      this.state;
    const fd = new FormData();
    let anhChup = this.state.image;
    let anhThuVien = this.state.setImage;
    let anhLuu = "";
    if (anhChup) {
      anhLuu = anhChup;
    } else {
      anhLuu = anhThuVien;
    }
    fd.append("avatar", {
      name: new Date() + "_profile",
      uri: anhLuu,
      type: "image/jpg",
    });
    // fd.append('logo', this.state.setImage)
    console.log(this.state.setImage);
    fd.append("email", email);
    fd.append("phone", phone);
    fd.append("address", address);
    fd.append("password", password);
    fd.append("name", name);

    console.log(fd);
    // let response = await axios.post('http://192.168.1.5:8081/api/v1/admin/createcategory', fd)

    // let response = await axios({
    //     url: "http://192.168.1.5:8081/api/v1/admin/createcategory",
    //     method: 'POST',
    //     data: fd,
    //     headers: {
    //         Accept: 'application/json',
    //         'Content-Type': 'multipart/form-data',

    //     }
    // })

    let response = await axios({
      url: "http://192.168.1.5:8081/api/v1/account/signup",
      method: "POST",
      data: fd,
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
    });
    ToastAndroid.show("Đăng ký thành công", ToastAndroid.LONG);
    // console.log(response);

    this.setState({
      email: "",
      phone: "",
      name: "",
      address: "",
      avatar: "",
      password: "",
      image: null,
      setImage: null,
    });
  };

  quayLai = () => {
    this.props.navigation.goBack();
  };

  goBackHome = () => {
    this.props.navigation.popToTop();
  };
  // quayLai = async () => {
  //   await AsyncStorage.removeItem("@token");
  //   this.props.navigation.goBack();
  // };

  render() {
    // const { wrapper } = style;
    const { email, password, name, phone, avatar, address, setImage, image } =
      this.state;
    console.log(this.state.setImage);
    console.log(this.state.image);
    console.log(this.props);
    return (
      <SafeAreaView style={styles.main}>
        <View style={styles.goBack}>
          <TouchableOpacity
            style={styles.goBack}
            onPress={() => this.quayLai()}
          >
            <MaterialIcons name="chevron-left" color="#000" size={26} />
            <Text style={styles.backText}>Quay Lại</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.goBackHome}
            // onPress={() => this.props.reduxState.history.push("MAIN")}
            onPress={() => this.goBackHome()}
          >
            <Ionicons name="home" color="#000" size={26} />
          </TouchableOpacity>
        </View>
        <View style={styles.container}>
          <View style={styles.wFull}>
            <View style={styles.row}>
              <Text style={styles.brandName}>Đăng Ký</Text>
            </View>

            <TextInput
              style={styles.input}
              placeholder="Tên"
              value={name}
              onChangeText={(text) => this.setState({ name: text })}
            ></TextInput>
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={(text) => this.setState({ email: text })}
            ></TextInput>
            <TextInput
              style={styles.input}
              secureTextEntry={true}
              placeholder="Mật Khẩu"
              value={password}
              onChangeText={(text) => this.setState({ password: text })}
            ></TextInput>
            <TextInput
              style={styles.input}
              placeholder="Số Điện Thoại"
              value={phone}
              onChangeText={(text) => this.setState({ phone: text })}
            ></TextInput>
            <TextInput
              style={styles.input}
              placeholder="Địa Chỉ"
              value={address}
              onChangeText={(text) => this.setState({ address: text })}
            ></TextInput>

            <View style={styles.takeImageBtn}>
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.TakeImageBtn}
                onPress={() => this.handleTakePhoto()}
              >
                <Text style={styles.ImageText}>Chụp Ảnh</Text>
              </TouchableOpacity>
              {/* <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}> */}
              {image && (
                <Image
                  source={{ uri: image }}
                  style={{ width: 80, height: 80 }}
                />
              )}
              {/* <Button title="Take a photo" onPress={this.handleTakePhoto} /> */}
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.TakeImageBtn}
                onPress={() => this.pickImage()}
              >
                <Text style={styles.ImageText}>Chọn Ảnh Từ Thư Viện</Text>
              </TouchableOpacity>
              {setImage && (
                <Image
                  source={{ uri: setImage }}
                  style={{ width: 80, height: 80 }}
                />
              )}
            </View>

            <View style={styles.loginBtnWrapper}>
              <TouchableOpacity
                // onPress={() => navigation.navigate()}
                onPress={() => this.upload()}
                activeOpacity={0.7}
                style={styles.loginBtn}
              >
                <Text style={styles.loginText}>Đăng Ký</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}> Bạn Đã Có Tài Khoản? </Text>
            <TouchableOpacity
              onPress={() => this.props.reduxState.history.push("SIGN_IN")}
            >
              <Text style={styles.signupBtn}>Đăng Nhập</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);

const styles = StyleSheet.create({
  main: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    padding: 16,
  },
  goBack: {
    flexDirection: "row",
    marginLeft: -4,
  },
  backText: {
    fontSize: 18,
    marginLeft: -2,
  },
  goBackHome: {
    marginLeft: "66%",
    marginTop: -6,
  },
  container: {
    padding: 15,
    width: "100%",
    position: "relative",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    height: 130,
    width: 130,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    marginBottom: 16,
    marginTop: -80,
  },
  brandName: {
    fontSize: 40,
    textAlign: "center",
    fontWeight: "bold",
    color: "#1F41BB",
    opacity: 0.9,
    // marginTop: -10,
  },
  loginContinueTxt: {
    fontSize: 21,
    textAlign: "center",
    color: "#666666",
    marginBottom: 16,
    fontWeight: "bold",
  },
  input: {
    backgroundColor: "#f1f4ff",
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 15,
    marginVertical: 10,
    borderRadius: 5,
    height: 55,
    paddingVertical: 0,
  },

  loginBtnWrapper: {
    height: 55,
    marginTop: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 5,
  },
  TakeImageBtn: {
    backgroundColor: "#AAAAAA",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    borderRadius: 10,
    shadowColor: "#1F41BB",
    shadowOpacity: 0.3,
    shadowRadius: 10,
    marginBottom: 10,
  },
  ImageText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },

  loginBtn: {
    backgroundColor: "#1F41BB",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: 55,
    borderRadius: 10,
    shadowColor: "#1F41BB",
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  loginText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "800",
  },

  footer: {
    position: "absolute",
    bottom: 20,
    textAlign: "center",
    flexDirection: "row",
  },
  footerText: {
    color: "#666666",
    fontWeight: "bold",
  },
  signupBtn: {
    color: "#1F41BB",
    fontWeight: "bold",
    textDecorationLine: "underline",
  },

  wFull: {
    width: "100%",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
});
