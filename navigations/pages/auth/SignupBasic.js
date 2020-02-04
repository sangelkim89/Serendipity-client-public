import React, { Component } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

class SignupBasic extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  _doNext() {
    this.props.navigation.replace("SignupCompany");
  }

  render() {
    return (
      <View>
        <Text> SignupBasic </Text>
        <TouchableOpacity onPress={this._doNext.bind(this)}>
          <Text style={{ fontSize: 30, backgroundColor: "blue" }}>Next</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default SignupBasic;
