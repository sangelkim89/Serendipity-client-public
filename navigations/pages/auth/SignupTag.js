import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, Dimensions, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { observer, inject } from "mobx-react";
import { Button, Input } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import GridView from "react-native-super-grid";

const { width, height } = Dimensions.get("window");

function SignupTag(props) {
  const { Tag, tagDATA, changeColorState, changeColor, tags } = props;
  console.log("TAGS_IN_TAGS", tags);
  //Tag, tagDATA를 props로 사용합니다.
  _doNextPage = () => {
    props.navigation.navigate("SignupPic");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleArea}>
        <Text style={styles.title}>관심사를 선택해주세요</Text>
      </View>
      <View>
        <View style={styles.buttonArea}>
          {tagDATA.map((tag, f) => {
            return (
              <TouchableOpacity
                key={f}
                tag={tag}
                onPress={() => {
                  Tag(f);
                }}
                style={[
                  styles.tagColor,
                  {
                    backgroundColor: tags.indexOf(tag) === -1 ? "transparent" : "pink",
                  },
                ]}
              >
                <Text
                  style={{
                    fontWeight: tags.indexOf(tag) === -1 ? "100" : "bold",
                    fontSize: tags.indexOf(tag) === -1 ? 15 : 18,
                  }}
                >
                  {tag}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      <Button
        buttonStyle={{
          width: "80%",
          marginLeft: 45,
          borderRadius: 20,
          marginTop: 15,
        }}
        icon={<Icon name="arrow-right" style={{ marginLeft: 10 }} size={15} color="white" />}
        iconRight
        title="NEXT"
        onPress={_doNextPage}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",

    justifyContent: "center",
  },
  titleArea: {
    height: height / 12,
    width: "100%",
    // padding: wp("10%"),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "blue",
  },
  title: {
    fontSize: 30,
  },
  buttonArea: {
    height: height - 170,
    backgroundColor: "green",
    width: "100%",
    flexDirection: "row",
    padding: 5,
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
  },
  tagColor: {
    padding: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    width: 100,
    height: 80,
    borderColor: "blue",
    borderWidth: 3,
    borderRadius: 50,
  },
});

export default inject(({ signupStore }) => ({
  Tag: signupStore.addtagState,
  tagDATA: signupStore.tagDATA,
  changeColorState: signupStore.changeColorState,
  changeColor: signupStore.changeColor,
  tags: signupStore.tags,
}))(observer(SignupTag));
