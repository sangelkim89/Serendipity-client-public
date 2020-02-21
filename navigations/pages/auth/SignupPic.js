import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ImageBackground,
  Dimensions,
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
class SignupPic extends React.Component {
  static navigationOptions = { headerShown: false };
  state = {
    path: null,
  };

  _doNext() {
    // this.props.navigation.navigate("SignupIdcard");
    this.props.navigation.navigate("Login");
    this.props.signupStore.submitSignupData();
  }

  async permitCamera() {
    const { status, permissions } = await Permissions.getAsync(Permissions.CAMERA);
    if (status !== "granted") {
      const { status, permissions } = await Permissions.askAsync(Permissions.CAMERA);
      if (status === "granted") {
        this.props.navigation.navigate("TakeCamera", {
          from: "pic",
        });
      } else {
        console.log("Gallery permission is not granted!");
      }
    } else {
      this.props.navigation.navigate("TakeCamera", {
        from: "pic",
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
    this.props.signupStore.imgProfile = result;
    this.props.signupStore.imgProfileName = result.uri.substr(-10);
    this.props.signupStore.imgProfileUri = result.uri;
    if (result.uri.substr(-4)[0] === ".") {
      this.props.signupStore.imgProfileType = result.uri.substr(-3);
    } else {
      this.props.signupStore.imgProfileUri = result.uri.substr(-4);
    }
    console.log("this.props.signupStore.imgProfileUri : ", this.props.signupStore.imgProfileUri);
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

          {signupStore.imgProfile ? (
            <Image source={signupStore.imgProfile} style={styles.picContainer} />
          ) : (
            <View style={styles.textContainer}>
              <Text style={styles.text}>choose your profile photo</Text>
            </View>
          )}

          <View style={styles.btnContainer}>
            {signupStore.imgProfile ? (
              <Button
                buttonStyle={{
                  width: "80%",
                  marginLeft: 45,
                  borderRadius: 20,
                  elevation: 10,
                }}
                icon={
                  <Icon name="check-circle" style={{ marginLeft: 10 }} size={25} color="#F97F51" />
                }
                iconRight
                title="Submit!"
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
                title="Please Take Your Picture"
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
    fontSize: 25,
    fontWeight: "bold",
  },
  textContainer: {
    justifyContent: "center",
    alignItems: "center",
    margin: 20,
  },
});

export default SignupPic;
