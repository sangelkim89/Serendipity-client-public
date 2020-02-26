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
        <View style={styles.infoContainer}>
          <View style={styles.info}>
            <Text style={styles.text}>{recommendUser.name}</Text>
            <Text style={styles.text2}>{age}</Text>
          </View>
          <View style={styles.info}>
            <Text style={styles.text2}>{recommendUser.companyName}</Text>
            <Text style={styles.text2}>{recommendUser.companyRole}</Text>
          </View>
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
  infoContainer: {
    flex: 1,
    justifyContent: "flex-end",
    // backgroundColor: "gray",
  },
  info: {
    // flex: 1,
    // backgroundColor: "white",
    marginLeft: 20,
    zIndex: 100,
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
  },
  text: {
    fontSize: 25,
    color: "white",
    textShadowColor: "black",
    fontWeight: "bold",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 1,
    marginRight: 15,
  },
  text2: {
    fontSize: 25,
    color: "white",
    textShadowColor: "black",
    fontWeight: "bold",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 1,
    marginRight: 15,
  },
});

export default Card;
