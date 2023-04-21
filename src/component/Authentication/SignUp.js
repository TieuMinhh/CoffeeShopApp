import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Image,
  Button,
} from "react-native";

const heightWindow = Dimensions.get("window").height;
// import ImagePicker from 'react-native-image-picker'
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";

export default class SignUp extends Component {
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
    // let response = await axios.post('http://192.168.138.6:8081/api/v1/admin/createcategory', fd)

    // let response = await axios({
    //     url: "http://192.168.138.6:8081/api/v1/admin/createcategory",
    //     method: 'POST',
    //     data: fd,
    //     headers: {
    //         Accept: 'application/json',
    //         'Content-Type': 'multipart/form-data',

    //     }
    // })

    let response = await axios({
      url: "http://192.168.138.6:8081/api/v1/account/signup",
      method: "POST",
      data: fd,
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(response);
  };

  render() {
    const { wrapper } = style;
    const { email, password, name, phone, avatar, address, setImage, image } =
      this.state;
    console.log(this.state.setImage);
    console.log(this.state.image);
    return (
      <View>
        <View style={{ height: 35, backgroundColor: "#fff", margin: 5 }}>
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={(text) => this.setState({ email: text })}
          ></TextInput>
        </View>
        <View style={{ height: 35, backgroundColor: "#fff", margin: 5 }}>
          <TextInput
            placeholder="phone"
            value={phone}
            onChangeText={(text) => this.setState({ phone: text })}
          ></TextInput>
        </View>
        <View style={{ height: 35, backgroundColor: "#fff", margin: 5 }}>
          <TextInput
            placeholder="password"
            value={password}
            onChangeText={(text) => this.setState({ password: text })}
          ></TextInput>
        </View>
        <View style={{ height: 35, backgroundColor: "#fff", margin: 5 }}>
          <TextInput
            placeholder="name"
            value={name}
            onChangeText={(text) => this.setState({ name: text })}
          ></TextInput>
        </View>
        <View style={{ height: 35, backgroundColor: "#fff", margin: 5 }}>
          <TextInput
            placeholder="address"
            value={address}
            onChangeText={(text) => this.setState({ address: text })}
          ></TextInput>
        </View>
        {/* <TouchableOpacity style={{ height: 50, backgroundColor: '#fff', margin: 5 }} onPress={() => this.pickImage()}>
                    <TextInput editable={false}>Ảnh Avatar</TextInput>
                </TouchableOpacity> */}
        <Button
          title="Chụp ảnh"
          onPress={() => this.handleTakePhoto()}
          style={{}}
        />
        {/* <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}> */}
        {image && (
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
        )}
        {/* <Button title="Take a photo" onPress={this.handleTakePhoto} /> */}
        <Button title="Chọn ảnh từ thư viện" onPress={() => this.pickImage()} />
        {setImage && (
          <Image
            source={{ uri: setImage }}
            style={{ width: 200, height: 200 }}
          />
        )}
        {/* </View> */}
        {/* <Image source={{ uri: `http://192.168.138.6:8081/image/logo-1677728192587.jpg` }} style={{ width: 200, height: 200 }} /> */}
        <TouchableOpacity
          style={{
            height: 50,
            width: 150,
            backgroundColor: "#fff",
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => this.upload()}
        >
          <Text>SIGN UP</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const style = StyleSheet.create({
  wrapper: {
    height: heightWindow / 3,
    backgroundColor: "#ffffff",
    margin: 7,
  },
});
