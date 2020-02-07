import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  AsyncStorage,
} from "react-native";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { observer, inject } from "mobx-react";
import { useMutation } from "@apollo/react-hooks";

import LOG_IN from "../../mutation";

function Login(props) {
  // console.log("props : ", props);
  const { ID, PW, loginId, loginPW } = props;

  const [logInRes, { loading, error }] = useMutation(LOG_IN);
  async function _doLogin() {
    try {
      await logInRes({
        variables: {
          email: loginId,
          password: loginPW,
        },
      });
    } catch {
      e => {
        console.log("useMutation error in Login.js", e);
      };
    }
    const isLoggedIn = await AsyncStorage.getItem("isLoggedIn");
    console.log("loginId : ", loginId);
    console.log("isLoggedIn(local storage) in Login.js : ", isLoggedIn);
    if (isLoggedIn === "true") {
      props.navigation.navigate("TabNav");
    } else {
      Alert.alert("isLoggedIn is falsy!!!");
    }
    // 서버에 로그인 정보 송신 기능 추가 요
    console.log("logInRes : ", logInRes);
  }

  _doSignUp = () => {
    props.navigation.navigate("SignupBasic");
  };

  useEffect(() => {
    async function getLogInfo() {
      const logInfo = await AsyncStorage.getItem("isLoggedIn");
      console.log("logInfo in login comp : ", logInfo);
    }
    getLogInfo();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.titleArea}>
        <Text style={styles.title}>LOGIN</Text>
      </View>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingLeft: wp("10%"),
    paddingRight: wp("10%"),
    justifyContent: "center",
  },
  titleArea: {
    width: "100%",
    padding: wp("10%"),
    alignItems: "center",
  },
  title: {
    fontSize: wp("10%"),
  },
  formArea: {
    width: "100%",
    paddingBottom: wp("10%"),
  },
  textForm: {
    borderWidth: 0.5,
    borderColor: "#888",
    width: "100%",
    height: hp("5%"),
    paddingLeft: 5,
    paddingRight: 5,
    marginBottom: 5,
  },
  buttonArea: {
    width: "100%",
    height: hp("5%"),
  },
  button: {
    backgroundColor: "#46c3ad",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonTitle: {
    color: "white",
  },
});

export default inject(({ signupStore }) => ({
  ID: signupStore.inputId,
  PW: signupStore.inputPW,
  loginId: signupStore.loginId,
  loginPW: signupStore.loginPW,
}))(observer(Login));
