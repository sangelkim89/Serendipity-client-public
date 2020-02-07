import React, { useEffect, useState } from "react";
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
import { gql } from "apollo-boost";
import LOG_IN from "../../mutation";

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

  // useMutate
  const LOG_IN = gql`
    mutation signIn($email: String!, $password: String!) {
      signIn(email: $email, password: $password)
    }
  `;

  const [logInRes, { data }] = useMutation(LOG_IN);

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
