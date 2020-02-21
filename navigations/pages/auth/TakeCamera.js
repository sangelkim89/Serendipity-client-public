import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Camera } from "expo-camera";
import { TouchableOpacity } from "react-native-gesture-handler";
import { FontAwesome, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { inject, observer } from "mobx-react";

@inject("signupStore")
@observer
class TakeCamera extends Component {
  static navigationOptions = { headerShown: false };
  state = {
    cameraType: Camera.Constants.Type.front,
  };

  handleCameraType = () => {
    const { cameraType } = this.state;
    console.log("cameraType : ", cameraType);
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
      console.log("camera image : ", photo.uri);
      console.log("route? : ", this.props.navigation.state.params.from);
      if (this.props.navigation.state.params.from === "idcard") {
        console.log("pickImg result : ", photo);
        this.props.signupStore.imgIdCard = photo;
        this.props.signupStore.imgIdCardName = photo.uri.substr(-10);
        this.props.signupStore.imgIdCardUri = photo.uri;
        if (result.uri.substr(-4)[0] === ".") {
          this.props.signupStore.imgIdCardType = photo.uri.substr(-3);
        } else {
          this.props.signupStore.imgIdCardUri = photo.uri.substr(-4);
        }
        console.log("this.props.signupStore.imgIdCardUri : ", this.props.signupStore.imgIdCardUri);
      }
      if (this.props.navigation.state.params.from === "pic") {
        console.log("pickImg result : ", photo);
        this.props.signupStore.imgProfile = photo;
        this.props.signupStore.imgProfileName = photo.uri.substr(-10);
        this.props.signupStore.imgProfileUri = photo.uri;
        if (result.uri.substr(-4)[0] === ".") {
          this.props.signupStore.imgProfileType = photo.uri.substr(-3);
        } else {
          this.props.signupStore.imgProfileUri = photo.uri.substr(-4);
        }
        console.log(
          "this.props.signupStore.imgProfileUri : ",
          this.props.signupStore.imgProfileUri,
        );
      }
    }
  };

  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });
    console.log("pick image : ", result);
    if (this.props.navigation.state.params.from === "idcard") {
      console.log("pickImg result : ", result);
      this.props.signupStore.imgIdCard = result;
      this.props.signupStore.imgIdCardName = result.uri.substr(-10);
      this.props.signupStore.imgIdCardUri = result.uri;
      if (result.uri.substr(-4)[0] === ".") {
        this.props.signupStore.imgIdCardType = result.uri.substr(-3);
      } else {
        this.props.signupStore.imgIdCardUri = result.uri.substr(-4);
      }
      console.log("this.props.signupStore.imgIdCardUri : ", this.props.signupStore.imgIdCardUri);
      this.props.navigation.navigate("SignupIdcard");
    }
    if (this.props.navigation.state.params.from === "pic") {
      console.log("pickImg result : ", result);
      this.props.signupStore.imgProfile = result;
      this.props.signupStore.imgProfileName = result.uri.substr(-10);
      this.props.signupStore.imgProfileUri = result.uri;
      if (result.uri.substr(-4)[0] === ".") {
        this.props.signupStore.imgProfileType = result.uri.substr(-3);
      } else {
        this.props.signupStore.imgProfileUri = result.uri.substr(-4);
      }
      console.log("this.props.signupStore.imgProfileUri : ", this.props.signupStore.imgProfileUri);
      this.props.navigation.navigate("SignupPic");
    }
  };

  render() {
    const { signupStore } = this.props;
    console.log("Camera.Constants.Type : ", Camera.Constants.Type);

    return (
      <View style={styles.cam}>
        <Camera
          style={{ ...styles.cam, width: "100%" }}
          type={this.state.cameraType}
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
                this.props.navigation.pop(1);
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

const styles = StyleSheet.create({
  cam: {
    flex: 1,
    justifyContent: "flex-end",
  },
});

export default TakeCamera;
