import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { observer, inject } from "mobx-react";

@inject("signupStore")
@observer
class SignupIdcard extends React.Component {
  _doNext() {
    this.props.navigation.replace("Login");
  }

  render() {
    const { signupStore } = this.props;
    return (
      <View>
        <Text>SignupIdcard</Text>
        <TouchableOpacity onPress={this._doNext.bind(this)}>
          <Text style={{ fontSize: 30, backgroundColor: "blue" }}>Next</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={signupStore.profileExer}>
          <Text style={{ fontSize: 15, backgroundColor: "green" }}>Next</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default SignupIdcard;
