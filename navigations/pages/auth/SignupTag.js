import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { observer, inject } from "mobx-react";
import { Button, Input } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";

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
      <ImageBackground
        source={require("../../../assets/gradient2.jpg")}
        style={{ width: "100%", height: "100%" }}
      >
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
                      borderColor: tags.indexOf(tag) === -1 ? "#70a1ff" : "#ff6348",
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
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    justifyContent: "center",
  },
  titleArea: {
    height: height / 4,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "blue",
    borderWidth: 1,
  },
  title: {
    fontSize: 30,
  },
  buttonArea: {
    height: height - 280,
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
    height: 60,
    borderColor: "#70a1ff",
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
