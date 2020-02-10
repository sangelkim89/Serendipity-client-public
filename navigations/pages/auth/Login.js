import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  AsyncStorage,
  ImageBackground,
  Image,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Asset } from "expo-asset";
import { AppLoading } from "expo";
import Animated, { Easing } from "react-native-reanimated";
import { TapGestureHandler, State } from "react-native-gesture-handler";
import { observer, inject } from "mobx-react";
import { useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

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
  // console.log("props : ", props);
  const { ID, PW, loginId, loginPW } = props;

  // useEffect
  useEffect(() => {
    async function getLogInfo() {
      const logInfo = await AsyncStorage.getItem("isLoggedIn");
      console.log("logInfo in login comp : ", logInfo);
    }
    getLogInfo();
  }, []);

  // useState
  const [isLoggedIn, doLogin] = useState("false");
  const [isReady, doReady] = useState(false);

  // useMutate
  const LOG_IN = gql`
    mutation signIn($email: String!, $password: String!) {
      signIn(email: $email, password: $password)
    }
  `;

  const [logInRes, { data }] = useMutation(LOG_IN);

  // 이미지 불러오는 메소드
  async function _loadAssetsAsync() {
    const imgAssets = cacheImages([require("../../../assets/love.gif")]);
    // const fontAssets = cacheFonts([FontAwesome.font]);

    await Promise.all([...imgAssets]);
  }

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
      console.log("data : ", data);
      if (signIn) {
        doLogin("true");
        AsyncStorage.setItem("jwt", signIn);
        AsyncStorage.setItem("isLoggedIn", "true");
        console.log("로그인됐니_성공?", isLoggedIn);
      } else {
        doLogin("false");
        console.log("로그인됐니_실패?", isLoggedIn);
      }
    } catch {
      e => {
        console.log("useMutation error in Login.js", e);
      };
    } finally {
      console.log("login data from server : ", data);
    }

    const asyncIsLoggedIn = await AsyncStorage.getItem("isLoggedIn");
    console.log("isLoggedIn(local storage) in Login.js : ", asyncIsLoggedIn);
    if (asyncIsLoggedIn === "true") {
      props.navigation.navigate("TabNav");
    } else {
      Alert.alert("isLoggedIn is falsy!!!");
    }
  }

  _doSignUp = () => {
    props.navigation.navigate("SignupBasic");
  };

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
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ ...StyleSheet.absoluteFill }}>
        <Image
          style={{ flex: 1, width: null, height: null }}
          source={require("../../../assets/love.gif")}
        />
      </View>
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
});

/**
 <View style={styles.formArea}>
          <TextInput
            style={styles.textForm}
            placeholder={"ID"}
            onChangeText={value => {
              ID(value);
            }}
          />
          <TextInput
            style={styles.textForm}
            placeholder={"Password"}
            onChangeText={potato => {
              PW(potato);
            }}
          />
        </View>
        <View style={styles.buttonArea}>
          <TouchableOpacity style={styles.button} onPress={_doLogin}>
            <Text style={styles.buttonTitle}>Login</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonArea}>
          <TouchableOpacity style={styles.button} onPress={_doSignUp}>
            <Text style={styles.buttonTitle}>SignUp</Text>
          </TouchableOpacity>
        </View>
 */

export default inject(({ signupStore }) => ({
  ID: signupStore.inputId,
  PW: signupStore.inputPW,
  loginId: signupStore.loginId,
  loginPW: signupStore.loginPW,
}))(observer(Login));

/*


// Reanimated 함수 (로그인 버튼 관련 함수)
const {
  Value,
  event,
  block,
  cond,
  eq,
  set,
  Clock,
  startClock,
  stopClock,
  debug,
  timing,
  clockRunning,
} = Animated;

function runTiming(clock, value, dest) {
  const state = {
    finished: new Value(0),
    position: new Value(0),
    time: new Value(0),
    frameTime: new Value(0),
  };

  const config = {
    duration: 1000,
    toValue: new Value(0),
    easing: Easing.inOut(Easing.ease),
  };

  return block([
    cond(clockRunning(clock), 0, [
      set(state.finished, 0),
      set(state.time, 0),
      set(state.position, value),
      set(state.frameTime, 0),
      set(state.toValue, dest),
      startClock(clock),
    ]),
    timing(clock, state, config),
    cond(state.finished, debug("stop clock", stopClock(clock))),
    state.position,
  ]);
}

const [buttonOpacity] = useState(new Value(1));
  const [onStateChange, doChangeLogin] = useState(
    event([
      {
        nativeEvent: state =>
          block([cond(eq(state, State.END), set(buttonOpacity), runTiming(new Clock(), 1, 0))]),
      },
    ]),
  );


*/
