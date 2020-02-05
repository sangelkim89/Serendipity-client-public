import React, { Component } from "react";
import { Text, View } from "react-native";
import { Camera } from "expo-camera";
import { TouchableOpacity } from "react-native-gesture-handler";
import { FontAwesome, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { inject, observer } from "mobx-react";

@inject("signupStore")
@observer
class TakeCamera extends Component {
  state = {
    cameraType: Camera.Constants.Type.back,
  };

  handleCameraType = () => {
    const { cameraType } = this.state;

    this.setState({
      cameraType:
        cameraType === Camera.Constants.Type.back
          ? Camera.Constants.Type.front
          : Camera.Constants.Type.back,
    });
  };

  takePicture = async () => {
    if (this.camera) {
      let photo = await this.camera.takePictureAsync();
      this.props.signupStore.imgProfile = photo;
    }
    console.log("imgProfile : ", signupStore.imgProfile);
  };

  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });
    this.props.signupStore.imgProfile = result;
    this.props.navigation.replace("SignupPic");
  };

  render() {
    const { signupStore } = this.props;
    console.log("Camera.Constants.Type : ", Camera.Constants.Type);

    return (
      <View style={{ flex: 1 }}>
        <Camera
          style={{ flex: 1 }}
          type={this.state.type}
          ref={ref => {
            this.camera = ref;
          }}
        >
          <View
            style={{ flex: 1, flexDirection: "row", justifyContent: "space-between", margin: 20 }}
          >
            <TouchableOpacity
              style={{
                alignSelf: "flex-end",
                alignItems: "center",
                backgroundColor: "transparent",
              }}
              onPress={() => this.pickImage()}
            >
              <Ionicons name="ios-photos" style={{ color: "#fff", fontSize: 40 }} />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                alignSelf: "flex-end",
                alignItems: "center",
                backgroundColor: "transparent",
              }}
              onPress={() => {
                this.takePicture();
                this.props.navigation.replace("SignupPic");
              }}
            >
              <FontAwesome name="camera" style={{ color: "#fff", fontSize: 40 }} />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                alignSelf: "flex-end",
                alignItems: "center",
                backgroundColor: "transparent",
              }}
              onPress={() => this.handleCameraType()}
            >
              <MaterialCommunityIcons
                name="camera-switch"
                style={{ color: "#fff", fontSize: 40 }}
              />
            </TouchableOpacity>
          </View>
        </Camera>
      </View>
    );
  }
}

export default TakeCamera;
