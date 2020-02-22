import React from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { observer, inject } from "mobx-react";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";

const { height } = Dimensions.get("window");

function SignupTag(props) {
  const { Tag, tagDATA, tags } = props;
  console.log("TAGS_IN_TAGS", tags);
  //Tag, tagDATA를 props로 사용합니다.
  _doNextPage = () => {
    props.navigation.navigate("SignupPic");
  };

  const tagLength = tags.length;
  console.log("태그길이", tagLength);

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require("../../../assets/gradient2.jpg")}
        style={{ width: "100%", height: "100%" }}
      >
        <View style={styles.titleArea}>
          <Text style={styles.title}>자신과 관련된 태그를 5개이하로 선택해주세요!</Text>
          <View style={styles.titleTagContainer}>
            {tags.map((item, i) => (
              <Text key={i} style={styles.titleTag}>
                {item}
              </Text>
            ))}
          </View>
        </View>

        <ScrollView style={styles.scroll}>
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
                    style={[
                      {
                        fontWeight: tags.indexOf(tag) === -1 ? "100" : "bold",
                        fontSize: tags.indexOf(tag) === -1 ? 13 : 14,
                      },
                    ]}
                  >
                    {tag}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>

        {tags.length > 0 ? (
          <Button
            buttonStyle={{
              width: "90%",
              marginLeft: 22,
              borderRadius: 20,
              elevation: 10,
            }}
            icon={<Icon name="arrow-right" style={{ marginLeft: 10 }} size={15} color="white" />}
            iconRight
            title={`NEXT    ${tagLength} / 5`}
            onPress={_doNextPage}
          />
        ) : (
          <Button
            disabled={true}
            buttonStyle={{
              width: "90%",
              marginLeft: 22,
              borderRadius: 20,
            }}
            icon={
              <Icon name="exclamation-circle" style={{ marginLeft: 10 }} size={20} color="red" />
            }
            iconRight
            title="Please Check Tags One More!"
            onPress={_doNextPage}
          />
        )}
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
    height: height / 5,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    // borderColor: "blue",
    // borderWidth: 1,
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
  },
  titleTagContainer: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    width: "90%",
  },
  titleTag: {
    fontSize: 16,
    // marginTop: 10,
    margin: 5,
    borderColor: "#70a1ff",
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: "pink",
    borderColor: "#ff6348",
  },
  scroll: {
    // backgroundColor: "blue",
    height: height - 250,
  },
  buttonArea: {
    width: "100%",
    padding: 5,
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "center",
    // alignItems: "center",
  },
  tagColor: {
    alignItems: "center",
    justifyContent: "center",
    padding: 4,
    margin: 10,
    width: "28%",
    height: 45,
    borderColor: "#70a1ff",
    borderWidth: 3,
    borderRadius: 20,
  },
});

export default inject(({ signupStore }) => ({
  Tag: signupStore.addtagState,
  tagDATA: signupStore.tagDATA,
  tags: signupStore.tags,
}))(observer(SignupTag));
