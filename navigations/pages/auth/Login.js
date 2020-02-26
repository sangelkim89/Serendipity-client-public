import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  AsyncStorage,
  Image,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Asset } from "expo-asset";
import { AppLoading } from "expo";
import { observer, inject } from "mobx-react";
import { useMutation } from "@apollo/react-hooks";
import { LOG_IN, GET_LIST, GET_ME } from "../../queries";
const { width, height } = Dimensions.get("window");
// 이미지 불러오는 함수
function cacheImages(img) {
  return img.map(item => {
    if (typeof item === "string") {
      return Image.prefetch(item);
    } else {
      return Asset.fromModule(item).downloadAsync();
    }
  });
}
// 로그인 컴포넌트
function Login(props) {
  console.log("LOGIN RENDERED!!!");
  // Store 비할당구조

  const {
    ID,
    PW,
    loginId,
    loginPW,
    recommendUser,
    getCardList,
    saveMyProfile,
    addUserId,
    myId,
    emptyLoginInfo,
  } = props;

  const [isReady, doReady] = useState(false);
  // useMutate - Login
  const [logInRes, { data }] = useMutation(LOG_IN);
  // useMutate - getHuntList
  const [getMutateHuntList, { getCardData }] = useMutation(GET_LIST);
  // uesMutate - getMeRES
  const [getMeRES] = useMutation(GET_ME);
  // 이미지 불러오는 메소드
  async function _loadAssetsAsync() {
    const imgAssets = cacheImages([require("../../../assets/gradient.png")]);
    // const fontAssets = cacheFonts([FontAwesome.font]);
    await Promise.all([...imgAssets]);
  }

  async function getLogInfo() {
    // 현재 로그아웃 기능이 없어서 무조건 로그아웃 되게 만들었으니 참고!
    await AsyncStorage.setItem("isLoggedIn", "false");
    const logInfo = await AsyncStorage.getItem("isLoggedIn");
  }

  // useEffect
  useEffect(() => {
    getLogInfo();
  }, []);

  // 로그인 메소드
  async function _doLogin() {
    try {
      const {
        data: { signIn },
      } = await logInRes({
        variables: {
          email: loginId,
          password: loginPW,
        },
      });
      emptyLoginInfo();
      console.log("GRAPHQL_LOGIN", signIn);
      if (signIn) {
        // doLogin("true");
        const signInData = JSON.parse(signIn);
        await AsyncStorage.setItem("jwt", signInData.token);
        // 로그인시 DB의 유저아이디를 가져오는 코드 - 서버도 변경 필요. myprofile작업내용에 따라 결정될 예정
        console.log("signInData.id in login.js : ", signInData.id);
        await addUserId(signInData.id); // mobx store에 id 저장
        await AsyncStorage.setItem("isLoggedIn", "true");
        await console.log("로그인됐니_성공?", await AsyncStorage.getItem("jwt"));
        await console.log("myId in try dologin", myId);
      } else {
        // doLogin("false");
        const jwt = await AsyncStorage.getItem("jwt");
        const ili = await AsyncStorage.getItem("isLoggedIn");
        console.log("로그인됐니_실패?", ili, jwt);
      }
    } catch (e) {
      console.log("LOGIN_CATCH : ", e);
    } finally {
      const asyncIsLoggedIn = await AsyncStorage.getItem("isLoggedIn");
      // console.log("LOGIN_CLICK_LOCAL_isLoggedIn : ", asyncIsLoggedIn);
      if (asyncIsLoggedIn === "true") {
        props.navigation.navigate("TabNav");
        const getCard = await getMutateHuntList();
        await getCardList(getCard);
        await console.log("getCard await 함 :", getCard);
        //=======================================================================
        const getMyProfile = await getMeRES({
          variables: { id: myId },
        });
        console.log("MyProfile Store에 저장: ", getMyProfile.data.getMe);
        saveMyProfile(getMyProfile);
        //=======================================================================
        props.navigation.navigate("TabNav");
      } else {
        Alert.alert("로그인 정보를 다시 확인해주세요!");
      }
      console.log("myId in login.js finally : ", myId);
    }
  }
  _doSignUp = () => {
    props.navigation.navigate("SignUpInfo");
  };
  // 렌더되는 부분
  if (!isReady) {
    return (
      <AppLoading
        startAsync={_loadAssetsAsync}
        onFinish={() => {
          doReady(true);
        }}
        onError={console.warn}
      />
    );
  }
  console.log("=============LOGIN_JUST_RENDER===============");
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ ...StyleSheet.absoluteFill }}>
        <Image
          style={{ flex: 1, width: null, height: null }}
          source={require("../../../assets/gradient2.jpg")}
        />
      </View>
      <Image style={styles.mainPic} source={require("../../../assets/eatplaylove.png")}></Image>
      <View style={{ height: height / 2, justifyContent: "center", alignItems: "center" }}>
        <View style={styles.formArea}>
          <TextInput
            style={styles.textForm}
            placeholder={"ID"}
            placeholderStyle={{ color: "red" }}
            onChangeText={value => {
              ID(value);
            }}
          />
          <TextInput
            secureTextEntry={true}
            style={styles.textForm}
            placeholder={"Password"}
            onChangeText={potato => {
              PW(potato);
            }}
          />
        </View>
        <TouchableOpacity onPress={_doLogin}>
          <View style={{ ...styles.btn }}>
            <Text style={{ fontWeight: "bold" }}>SIGN IN</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={_doSignUp}>
          <View style={styles.btn}>
            <Text style={{ fontWeight: "bold" }}>SIGN UP</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "flex-end",
  },
  textForm: {
    backgroundColor: "white",
    marginVertical: 5,
    width: 250,
    height: 50,
    borderRadius: 25,
  },
  btn: {
    backgroundColor: "white",
    width: 250,
    height: 50,
    marginHorizontal: 20,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 5,
  },
  mainPic: {
    flex: 1,
    margin: 30,
    marginLeft: -0.5,
    marginBottom: -15,
    width: width,
  },
});
export default inject(({ signupStore, huntStore, myProfileStore }) => ({
  ID: signupStore.inputId,
  PW: signupStore.inputPW,
  loginId: signupStore.loginId,
  loginPW: signupStore.loginPW,
  emptyLoginInfo: signupStore.emptyLoginInfo,
  recommendUser: huntStore.recommendUser,
  getCardList: huntStore.getCardList,
  saveMyProfile: myProfileStore.saveMyProfile,
  addUserId: myProfileStore.addUserId,
  myId: myProfileStore.id,
}))(observer(Login));
