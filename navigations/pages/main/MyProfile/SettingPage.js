import React from "react";
import { Text, View, Image, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { observer, inject } from "mobx-react";

@inject("signupStore")
@observer
class SettingPage extends React.Component {
  static navigationOptions = { headerShown: false };

  _gotoEditPage = () => {
    this.props.navigation.navigate("EditPage");
  };

  _gotoMyProfilePage = () => {
    this.props.navigation.navigate("MyProfilePage");
  };

  render() {
    const { signupStore } = this.props;

    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "grey",
          height: 1000,
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
            backgroundColor: "green",
          }}
        >
          <View style={{ backgroundColor: "skyblue" }}>
            <TouchableOpacity onPress={this._gotoMyProfilePage}>
              <Text>마이프로필</Text>
            </TouchableOpacity>
          </View>
          <View style={{ backgroundColor: "steelblue" }}>
            <TouchableOpacity onPress={this._gotoEditPage}>
              <Text>수정</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
            backgroundColor: "pink",
          }}
        >
          <View style={{ backgroundColor: "skyblue" }}>
            <TouchableOpacity onPress={this._gotoMyProfilePage}>
              <Text>로그아웃</Text>
            </TouchableOpacity>
          </View>
          <View style={{ backgroundColor: "steelblue" }}>
            <TouchableOpacity onPress={this._gotoEditPage}>
              <Text>회원탈퇴</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

export default SettingPage;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#6a89cc",
    width: "100%",
    height: "100%",
  },
  map: {
    flex: 3,
    margin: 30,
    borderWidth: 5,
    borderColor: "#7a42f4",
  },
  input: {
    margin: 15,
    height: 40,
    borderColor: "#7a42f4",
    borderWidth: 1,
  },
  nextbtn: {
    margin: 15,
    height: 40,
    borderColor: "#7a42f4",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  pinkbox: {
    width: 400,
    flex: 1,
    backgroundColor: "#F5A9F2", //빨간색 안에 있는 분홍박스
    alignItems: "center",
  },
});
