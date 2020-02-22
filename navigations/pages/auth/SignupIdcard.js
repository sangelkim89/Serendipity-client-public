import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
  ImageBackground,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { SafeAreaView } from "react-native-safe-area-context";
import { observer, inject } from "mobx-react";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import { Button, Input } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";

const { width, height } = Dimensions.get("window");

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
      <ImageBackground
        source={require("../../../assets/gradient2.jpg")}
        style={{ width: "100%", height: "100%" }}
      >
        <SafeAreaView style={styles.container}>
          <View style={styles.picButtonContainer}>
            <TouchableOpacity onPress={this.permitCamera.bind(this)} style={styles.picButton}>
              <Icon name="camera-retro" size={30} color="white" style={{ marginRight: 10 }} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.permitGallery()} style={styles.picButton}>
              <Icon name="image" size={30} color="white" style={{ marginRight: 10 }} />
            </TouchableOpacity>
          </View>

          {signupStore.imgIdCard ? (
            <Image source={signupStore.imgIdCard} style={styles.picContainer} />
          ) : (
            <View style={styles.textContainer}>
              <Text style={styles.text}>choose your ID card</Text>
            </View>
          )}

          <View style={styles.btnContainer}>
            {signupStore.imgIdCard ? (
              <Button
                buttonStyle={{
                  width: "80%",
                  marginLeft: 45,
                  borderRadius: 20,
                }}
                icon={
                  <Icon name="arrow-right" style={{ marginLeft: 10 }} size={15} color="white" />
                }
                iconRight
                title="Submit"
                onPress={this._doNext.bind(this)}
              />
            ) : (
              <Button
                disabled={true}
                buttonStyle={{
                  width: "80%",
                  marginLeft: 45,
                  borderRadius: 20,
                }}
                icon={
                  <Icon
                    name="exclamation-circle"
                    style={{ marginLeft: 10 }}
                    size={20}
                    color="red"
                  />
                }
                iconRight
                title="Please Take Your ID Card"
                onPress={this._doNext.bind(this)}
              />
            )}
          </View>
        </SafeAreaView>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: wp("10%"),
    paddingRight: wp("10%"),
    justifyContent: "center",
    alignContent: "center",
  },
  picContainer: {
    flex: 1,
    width: "100%",
    height: height - 200,
  },
  picButtonContainer: {
    // flex: 1,
    height: height - 700,
    flexDirection: "row",
    padding: 10,
    justifyContent: "space-around",
    alignItems: "center",
  },
  picButton: {
    padding: 5,
  },
  btnContainer: {
    height: height / 10,
    marginTop: 10,
  },
  text: {
    fontSize: 15,
    color: "white",
  },
  text: {
    fontSize: 25,
    fontWeight: "bold",
  },
  textContainer: {
    justifyContent: "center",
    alignItems: "center",
    margin: 20,
  },
});

export default SignupIdcard;
