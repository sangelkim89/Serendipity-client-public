import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

class SignupCompany extends React.Component {
  _doNext() {
    this.props.navigation.replace("SignupIdcard");
  }

  render() {
    return (
      <View>
        <Text>SignupCompany</Text>
        <TouchableOpacity onPress={this._doNext.bind(this)}>
          <Text style={{ fontSize: 30, backgroundColor: "blue" }}>Next</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default SignupCompany;
