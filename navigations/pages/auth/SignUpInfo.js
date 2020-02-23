import React from "react";
import { View, Text, StyleSheet, ImageBackground, Dimensions, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Button, Input } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";

const { width, height } = Dimensions.get("window");

export function SignUpInfo(props) {
  function _doNext() {
    props.navigation.navigate("SignupBasic");
  }

  return (
    <ImageBackground
      source={require("../../../assets/gradient2.jpg")}
      style={{ width: "100%", height: "100%" }}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.info}>
          <View style={styles.imgContainer}>
            <Image style={styles.image} source={require("../../../assets/info.gif")} />
          </View>
          <Text style={styles.text}>거리와 관심사를 기반으로 매칭이 됩니다!</Text>
          <Text style={styles.text}>근처에 있는 사람과 식사를 해보아요!</Text>
        </View>

        <View style={styles.button}>
          <Button
            buttonStyle={{
              width: "80%",
              marginLeft: 45,
              borderRadius: 20,
              // backgroundColor: "transparent",
            }}
            icon={<Icon name="arrow-right" style={{ marginLeft: 10 }} size={15} color="white" />}
            iconRight
            title="NEXT"
            onPress={_doNext}
          />
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {},
  info: {
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",

    height: height * 0.85,
  },
  button: {
    // flex: 3,

    marginTop: 10,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    margin: 10,
  },
  imgContainer: {
    flex: 1,
    margin: 20,
    borderWidth: 10,
    borderRadius: 35,
    borderColor: "#201E21",
  },
  image: {
    flex: 1,
    // maxHeight: 380,
    maxWidth: 210,
  },
});

export default SignUpInfo;
