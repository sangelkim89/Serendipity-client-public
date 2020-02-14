import React from "react";
import { View, Text, Image, StyleSheet, Dimensions, ImageBackground } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import CardFlip from "react-native-card-flip";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

const Card = ({ recommendUser }) => {
  // console.log("CARD_GET_DATA", recommendUser.profileImgLocation);

  // 나이 구하기
  const birth = recommendUser.birth;
  let birthYear = birth.split("-")[0];
  let nowYear = new Date().getFullYear();
  let age = nowYear - birthYear + 1;

  return (
    <View activeOpacity={1}>
      <ImageBackground
        style={styles.img}
        imageStyle={{ borderRadius: 50 }}
        source={{ uri: recommendUser.profileImgLocation }}
        resizeMode="cover"
      >
        <View style={styles.info}>
          <Text style={styles.text}>{recommendUser.name}</Text>
          <Text style={styles.text}>
            {"    "}
            {age}
          </Text>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  img: {
    zIndex: 1,
    borderRadius: 20,
    padding: 10,
    width: SCREEN_WIDTH - 50,
    height: SCREEN_HEIGHT - 190,
    marginLeft: 6,
  },
  info: {
    marginLeft: 20,
    zIndex: 100,
    flexDirection: "row",
    marginTop: 410,
  },
  text: {
    fontSize: 40,
    color: "white",
    textShadowColor: "black",
    fontWeight: "bold",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 1,
  },
});

export default Card;
