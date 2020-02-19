import React from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  AsyncStorage,
} from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { observer, inject } from "mobx-react";
import { LOG_OUT } from "../../../queries";
import { useMutation } from "@apollo/react-hooks";

// @inject("signupStore")
// @observer
function SettingPage(props) {
  // static navigationOptions = { headerShown: false };

  const _gotoEditPage = () => {
    props.navigation.navigate("EditPage");
  };

  const _gotoMyProfilePage = () => {
    props.navigation.navigate("MyProfilePage");
  };

  const [logoutMethod, { data }] = useMutation(LOG_OUT);

  const _logOut = async () => {
    try {
      const { data } = await logoutMethod();
      console.log("data : ", data);
      await AsyncStorage.setItem("jwt", "");
      console.log("logout token : ", await AsyncStorage.getItem("jwt"));
      Alert.alert("정상적으로 로그아웃 되었습니다.");
      props.navigation.navigate("AuthStack");
    } catch (e) {
      console.log("logout catch msg : ", e);
    }
  };

  const _withDrawal = () => {
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
          <TouchableOpacity onPress={_gotoMyProfilePage}>
            <Text>마이프로필</Text>
          </TouchableOpacity>
        </View>
        <View style={{ backgroundColor: "steelblue" }}>
          <TouchableOpacity onPress={_gotoEditPage}>
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
          <TouchableOpacity onPress={_logOut}>
            <Text>로그아웃</Text>
          </TouchableOpacity>
        </View>
        <View style={{ backgroundColor: "steelblue" }}>
          <TouchableOpacity onPress={_withDrawal}>
            <Text>회원탈퇴</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default SettingPage;

// const styles = StyleSheet.create({});
