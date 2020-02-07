import React, { Component } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
//리액트 네이티브로부터 {뷰, 텍스트, 터쳐블오파시티, 버튼,스타일시트} 가져온다.
import Tags from "./TagBox/Tags";
import { inject, observer } from "mobx-react"; // 불러오기

@inject("signupStore")
@observer
class SignupTag extends Component {
  state = {};
  _doNext() {
    this.props.navigation.replace("SignupPic");
  }

  _doBefore() {
    this.props.navigation.replace("TagTest");
  }

  render() {
    return (
      <View>
        <View>
          <Text> 넌 필요없지 않냐 </Text>
          <TouchableOpacity onPress={this._doNext.bind(this)}>
            <Text style={{ fontSize: 30, backgroundColor: "blue" }}>다음페이지</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this._doBefore.bind(this)}>
            <Text style={{ fontSize: 30, backgroundColor: "green" }}>이전페이지</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default SignupTag;

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  UnselectedTags: {
    backgroundColor: "grey",
  },
  TagTemplate: {
    backgroundColor: "green",
  },
  items: {
    fontSize: 18,
    marginBottom: 20,
  },
});
