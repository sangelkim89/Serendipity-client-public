import React, { Component } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

class SignupTag extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  _doNext() {
    this.props.navigation.replace("Login");
  }

  render() {
    return (
      <View>
        <Text> SignupTag </Text>
        <TouchableOpacity onPress={this._doNext.bind(this)}>
          <Text style={{ fontSize: 30, backgroundColor: "blue" }}>Submit</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default SignupTag;
