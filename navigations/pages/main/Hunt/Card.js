import React from "react";
import { View, Text, Image, StyleSheet, Dimensions, ImageBackground } from "react-native";

// import data from "./mockup";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

const Card = ({ recommendUser }) => {
  // console.log("CARD_GET_DATA", recommendUser.profileImgLocation);
  return (
    <View activeOpacity={1}>
      <ImageBackground
        style={styles.img}
        imageStyle={{ borderRadius: 50 }}
        source={{ uri: recommendUser.profileImgLocation }}
        resizeMode="cover"
      >
        <View style={styles.info}>
          <Text style={styles.text}> {recommendUser.name}</Text>
          {/* <Text style={styles.text}>
            {recommendUser.tags.map((item, i) => {
              return <Text key={i}>{item}</Text>;
            })}
          </Text> */}
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
    zIndex: 100,
    // backgroundColor: "brown",
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
  // fontFamily: "Do Hyeon",
});

export default Card;
