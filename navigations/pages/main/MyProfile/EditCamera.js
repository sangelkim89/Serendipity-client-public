import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Camera } from "expo-camera";
import { TouchableOpacity } from "react-native-gesture-handler";
import { FontAwesome, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { inject, observer } from "mobx-react";

@inject("myProfileStore")
@observer
class EditCamera extends Component {
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
        console.log("pickImg result 야 어디야: ", photo);
        this.props.myProfileStore.imgIdCard = photo;
        this.props.myProfileStore.imgIdCardName = photo.uri.substr(-10);
        this.props.myProfileStore.imgIdCardUri = photo.uri;
        if (result.uri.substr(-4)[0] === ".") {
          this.props.myProfileStore.imgIdCardType = photo.uri.substr(-3);
        } else {
          this.props.myProfileStore.imgIdCardUri = photo.uri.substr(-4);
        }
        console.log(
          "this.props.myProfileStore.imgIdCardUri : ",
          this.props.myProfileStore.imgIdCardUri,
        );
      }
      if (this.props.navigation.state.params.from === "pic") {
        console.log("여기엔 뭐가 뜨는거니 pickImg result 디질래: ", photo);
        this.props.myProfileStore.imgProfile = photo;
        this.props.myProfileStore.imgProfileName = photo.uri.substr(-10);
        this.props.myProfileStore.imgProfileUri = photo.uri;
        if (result.uri.substr(-4)[0] === ".") {
          this.props.myProfileStore.imgProfileType = photo.uri.substr(-3);
        } else {
          this.props.myProfileStore.imgProfileUri = photo.uri.substr(-4);
        }
        console.log(
          "this.props.myProfileStore.imgProfileUri : ",
          this.props.myProfileStore.imgProfileUri,
        );
      }
    }
  };

  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });
    console.log("pick image : ", result);

    if (result.cancelled === false) {
      this.props.myProfileStore.imgIdCard = result;
      this.props.myProfileStore.imgIdCardName = result.uri.substr(-10);
      this.props.myProfileStore.imgIdCardUri = result.uri;

      if (result.uri.substr(-4)[0] === ".") {
        this.props.myProfileStore.imgIdCardType = result.uri.substr(-3);
      } else {
        this.props.myProfileStore.imgIdCardUri = result.uri.substr(-4);
      }

      console.log(
        "this.props.myProfileStore.imgIdCardUri 바꿨을때 : ",
        this.props.myProfileStore.imgIdCardUri,
      );
      this.props.navigation.navigate("EditPage");
    } else if (result.cancelled === true) {
      this.props.myProfileStore.imgIdCardUri = this.props.myProfileStore.myProfile.data.getMe.profileImgLocation;
      console.log(
        "this.props.myProfileStore.imgIdCardUri 안바꿨을때 : ",
        this.props.myProfileStore.imgIdCardUri,
      );
      this.props.navigation.navigate("EditPage");
    }
  };

  render() {
    const { myProfileStore } = this.props;
    console.log("Camera.Constants.Type : ", Camera.Constants.Type);

    return (
      <View style={styles.cam}>
        <Camera
          style={styles.cam}
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
    flexDirection: "column-reverse",
  },
});

export default EditCamera;
