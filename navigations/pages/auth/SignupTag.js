import React, { Component } from "react";
import { View, Text, TouchableOpacity, Button, StyleSheet } from "react-native";
//리액트 네이티브로부터 {뷰, 텍스트, 터쳐블오파시티, 버튼,스타일시트} 가져온다.
import Tags from "react-native-tags";
//import { SafeAreaProvider } from "react-native-safe-area-view";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { observer, inject } from "mobx-react";

@inject("signupStore")
@observer
class SignupTag extends Component {
  state = {};

  _doNext() {
    this.props.navigation.replace("SignupPic");
  }

  _doBefore() {
    this.props.navigation.replace("SignupCompany");
  }

  render() {
    const { signupStore } = this.props;
    return (
      //  <SafeAreaView> 잉잉 ㅠㅠ 나도 쓰고 싶다
      <View style={styles.container}>
        <View>
          <Text> 넌 필요없지 않냐 </Text>
          <TouchableOpacity onPress={this._doNext.bind(this)}>
            <Text style={{ fontSize: 30, backgroundColor: "blue" }}>다음페이지</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this._doBefore.bind(this)}>
            <Text style={{ fontSize: 30, backgroundColor: "green" }}>이전페이지</Text>
          </TouchableOpacity>
          <View style={styles.container}></View>
        </View>
        <Button title="태그1" onPress={() => Alert.alert("태그")} />
        {/* onPress를 했을 때, title에 접근을 할 수 있다. 이 때, title 이름 자체를 보내는 방법. */}
        {/* 반대로, 스토어에 . */}
        {/* $를 통해  */}
        <Button title="태그2" onPress={() => Alert.alert("태그")} />
        <Button title="태그3" onPress={() => Alert.alert("태그")} />
        <Button title="태그4" onPress={() => Alert.alert("태그")} />
        <Button title="태그5" onPress={() => Alert.alert("태그")} />
        <Button title="태그6" onPress={() => Alert.alert("태그")} />
        <Button title="태그7" onPress={() => Alert.alert("태그")} />
        <Button title="태그8" onPress={() => Alert.alert("태그")} />
        <Button title="태그9" onPress={() => Alert.alert("태그")} />
        <Button title="태그10" onPress={() => Alert.alert("태그")} />
        <Button title="태그10" onPress={() => Alert.alert("태그")} />
      </View>
      //</SafeAreaView>
    );
  }
}

export default SignupTag;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "grey",
    paddingLeft: wp("10%"),
    paddingRight: wp("10%"),
    justifyContent: "center",
  },
  titleArea: {
    backgroundColor: "green",
    width: "100%",
    padding: wp("30%"),
  },
  title: {
    fontSize: wp("10%"),
  },
});
