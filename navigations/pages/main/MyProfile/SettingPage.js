import React from "react";
import { Text, View, Image, TouchableOpacity, StyleSheet, ScrollView, Alert } from "react-native";
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

  _logOut() {
    Alert.alert("정상적으로 로그아웃 되었습니다.");
  }

  _withDrawal = () => {
    Alert.alert(
      "주의",
      "정말 탈퇴하시겠습니까?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ],
      { cancelable: false },
    );
  };

  render() {
    const { signupStore } = this.props;

    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "grey",
        }}
      >
        <Text style={{ fontSize: 18 }}></Text>
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
            flex: 9,
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
            backgroundColor: "pink",
          }}
        >
          <View style={{ backgroundColor: "skyblue" }}>
            <TouchableOpacity onPress={this._logOut}>
              <Text>로그아웃</Text>
            </TouchableOpacity>
          </View>
          <View style={{ backgroundColor: "steelblue" }}>
            <TouchableOpacity onPress={this._withDrawal}>
              <Text>회원탈퇴</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

export default SettingPage;

const styles = StyleSheet.create({});
