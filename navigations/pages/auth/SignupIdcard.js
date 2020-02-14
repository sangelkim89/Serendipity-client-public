import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { SafeAreaView } from "react-native-safe-area-context";
import { observer, inject } from "mobx-react";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";

@inject("signupStore")
@observer
class SignupIdcard extends React.Component {
  static navigationOptions = { headerShown: false };
  _doNext() {
    this.props.navigation.navigate("Login");
    this.props.signupStore.submitSignupData();
  }

  async permitCamera() {
    const status = await Permissions.getAsync(Permissions.CAMERA);
    if (status !== "granted") {
      const status = await Permissions.askAsync(Permissions.CAMERA);
      if (status === "granted") {
        this.props.navigation.navigate("TakeCamera", {
          from: "idcard",
        });
      } else {
        console.log("Gallery permission is not granted!");
      }
    } else {
      this.props.navigation.navigate("TakeCamera", {
        from: "idcard",
      });
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
  };

  render() {
    const { signupStore } = this.props;
    return (
      <SafeAreaView style={styles.container}>
        <View>
          <Text>SignupCompany</Text>
        </View>
        <View style={styles.picButtonContainer}>
          <TouchableOpacity onPress={this.permitCamera.bind(this)} style={styles.picButton}>
            <Text style={styles.text}>Camera</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.permitGallery()} style={styles.picButton}>
            <Text style={styles.text}>Gallery</Text>
          </TouchableOpacity>
        </View>
        {signupStore.imgIdCard ? (
          <Image source={signupStore.imgIdCard} style={styles.picContainer} />
        ) : (
          <View style={styles.picContainer}>
            <Text>choose your Idcard</Text>
          </View>
        )}
        <View style={styles.submitButtonContainer}>
          <TouchableOpacity onPress={this._doNext.bind(this)} style={styles.submitButton}>
            <Text style={styles.text}>Submit</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingLeft: wp("10%"),
    paddingRight: wp("10%"),
    justifyContent: "center",
    alignContent: "center",
    backgroundColor: "yellow",
  },
  picContainer: {
    flex: 7,
    width: "100%",
    backgroundColor: "orange",
  },
  picButtonContainer: {
    flex: 1,
    flexDirection: "row",
    padding: 10,
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "black",
  },
  submitButtonContainer: {
    flex: 1,
    backgroundColor: "violet",
    padding: 10,
  },
  picButton: {
    backgroundColor: "green",
    padding: 5,
  },
  submitButton: {
    backgroundColor: "blue",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "brown",
  },
  text: {
    fontSize: 15,
    color: "white",
  },
});

export default SignupIdcard;
