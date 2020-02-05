import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { observer, inject } from "mobx-react";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";

@inject("signupStore")
@observer
class SignupPic extends React.Component {
  state = {
    path: null,
  };

  _doNext() {
    this.props.navigation.replace("SignupTag");
  }

  async permitCamera() {
    const { status, permissions } = await Permissions.getAsync(Permissions.CAMERA);
    if (status !== "granted") {
      const { status, permissions } = await Permissions.askAsync(Permissions.CAMERA);
      if (status === "granted") {
        // this.setState({ status });
        this.props.navigation.replace("TakeCamera");
      } else {
        console.log("Galery permission is not granted!");
      }
    } else {
      // this.setState({ status });
      this.props.navigation.replace("TakeCamera");
    }
  }

  async permitGallery() {
    const { status, permissions } = await Permissions.getAsync(Permissions.CAMERA_ROLL);
    if (status !== "granted") {
      const { status, permissions } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status === "granted") {
        this.setState({ cameraStatus: true });
        this.pickImage();
      } else {
        console.log("Galery permission is not granted!");
        this.setState({ cameraStatus: false });
      }
    } else {
      this.setState({ cameraStatus: true });
      this.pickImage();
    }
  }

  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });
    this.props.signupStore.imgProfile = result;
    console.log("this.props.signupStore.imgProfile : ", this.props.signupStore.imgProfile);
  };

  render() {
    const { signupStore } = this.props;

    return (
      <View>
        <Text>SignupPic</Text>
        {signupStore.imgProfile ? (
          <Image source={signupStore.imgProfile} style={{ width: 305, height: 159 }} />
        ) : null}
        <TouchableOpacity onPress={this.permitCamera.bind(this)}>
          <Text>Camera</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.permitGallery()}>
          <Text>Galery</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this._doNext.bind(this)}>
          <Text style={{ fontSize: 30, backgroundColor: "blue" }}>Next page</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={signupStore.profileExer}>
          <Text style={{ fontSize: 15, backgroundColor: "green" }}>Next</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default SignupPic;
