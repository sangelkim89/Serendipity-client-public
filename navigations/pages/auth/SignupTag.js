import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { observer, inject } from "mobx-react";

function SignupTag(props) {
  const { Tag, tagDATA, changeColorState, changeColor } = props;

  //Tag, tagDATA를 props로 사용합니다.
  _doNextPage = () => {
    props.navigation.navigate("SignupPic");
    console.log("tag에서 pic로 이동합니다.");
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleArea}>
        <Text style={styles.title}>TagBox</Text>
      </View>
      <View>
        <View>
          {tagDATA.map((tag, f) => {

            return (
              <TouchableOpacity
                key={f}
                tag={tag}
                onPress={() => {
                  Tag(f);
                }}
                style={[styles.tagColor, { backgroundColor: changeColorState ? "red" : "pink" }]}
              >
                <Text>{tag}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      <View style={styles.buttonArea}>
        <TouchableOpacity style={styles.button} onPress={_doNextPage}>
          <Text style={styles.buttonTitle}>next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "grey",
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
  buttonArea: {
    backgroundColor: "#46c3ad",
    width: "100%",
    height: hp("5%"),
  },
  button: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonTitle: {
    color: "white",
  },
  tagColor: {
    padding: 1,
    marginVertical: 1,
    marginHorizontal: 100,
  },
});

export default inject(({ signupStore }) => ({
  Tag: signupStore.addtagState,
  tagDATA: signupStore.tagDATA,
  changeColorState: signupStore.changeColorState,
  changeColor: signupStore.changeColor,
}))(observer(SignupTag));
