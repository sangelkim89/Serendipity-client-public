import React, { Component } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
// pop 하기 위함
import { StackActions } from "@react-navigation/routers";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  _doLogin() {
    this.props.navigation.replace("TabNav");
  }

  _doSignUp() {
    this.props.navigation.replace("SignupBasic");
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.titleArea}>
          <Text style={styles.title}>LOGIN</Text>
        </View>
        <View style={styles.formArea}>
          <TextInput style={styles.textForm} placeholder={"ID"} />
          <TextInput style={styles.textForm} placeholder={"Password"} />
        </View>
        <View style={styles.buttonArea}>
          <TouchableOpacity style={styles.button} onPress={this._doLogin.bind(this)}>
            <Text style={styles.buttonTitle}>Login</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonArea}>
          <TouchableOpacity style={styles.button} onPress={this._doSignUp.bind(this)}>
            <Text style={styles.buttonTitle}>SignUp</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
export default Login;

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
