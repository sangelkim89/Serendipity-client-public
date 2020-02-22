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
  ImageBackground,
} from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { observer, inject } from "mobx-react";
import { LOG_OUT, DELETE_USER } from "../../../queries";
import { useMutation } from "@apollo/react-hooks";
import { FontAwesome } from "@expo/vector-icons";

// @inject("signupStore")
// @observer
function SettingPage(props) {
  // static navigationOptions = { headerShown: false };

  const _gotoEditPage = () => {
    props.navigation.navigate("EditPage");
  };

  const _gotoSettingPage = () => {
    props.navigation.navigate("SettingPage");
  };

  const _gotoMyProfilePage = () => {
    props.navigation.navigate("MyProfilePage");
  };

  const _secession = () => {
    props.navigation.navigate("AuthStack");
    Alert.alert("만나서 반가웠어요.  함께여서 행복했어요.\n우리 꼭 다시만나요.  고마워요.");
    console.log("삭제가 된건가?");
  };

  const [logoutMethod, { data }] = useMutation(LOG_OUT);
  const _logOut = async () => {
    try {
      const { data } = await logoutMethod();
      console.log("data : ", data);
      await AsyncStorage.setItem("jwt", data.logOut);
      await AsyncStorage.setItem("isLoggedIn", "false");
      console.log("logout token : ", await AsyncStorage.getItem("jwt"));
      console.log("isLoggedIn after logout : ", await AsyncStorage.getItem("isLoggedIn"));
      Alert.alert("정상적으로 로그아웃 되었습니다.");
      props.navigation.navigate("AuthStack");
    } catch (e) {
      console.log("logout catch msg : ", e);
    }
  };

  const [deleteUser] = useMutation(DELETE_USER);

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
        {
          text: "OK",
          onPress: async () => {
            console.log("OK Pressed"), console.log(deleteUser);
            deleteUser({ variables: { id: "1" } }), _secession();
          },
        },
      ],
      { cancelable: false },
    );
  };

  return (
    <ImageBackground
      source={require("../../../../assets/gradient2.jpg")}
      style={{ width: "100%", height: "100%" }}
    >
      <View
        style={{
          flex: 1,
        }}
      >
        <Text style={{ fontSize: 18 }}></Text>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <TouchableOpacity style={{ alignItems: "center" }} onPress={_gotoMyProfilePage}>
            <FontAwesome name="id-card" style={{ color: "#4A148C", fontSize: 25 }} />
            <Text>프로필</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={_gotoEditPage}>
            <FontAwesome name="edit" style={{ color: "#4A148C", fontSize: 25 }} />
            <Text>수정</Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            flex: 9,
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <TouchableOpacity style={{ alignItems: "center" }} onPress={_logOut}>
            <FontAwesome name="toggle-on" style={{ color: "grey", fontSize: 25 }} />
            <Text>로그아웃</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ alignItems: "center" }} onPress={_withDrawal}>
            <FontAwesome name="exclamation-circle" style={{ color: "grey", fontSize: 25 }} />
            <Text>회원탈퇴</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

export default SettingPage;

// const styles = StyleSheet.create({});
