import React from "react";
import { Text, View, StyleSheet, ImageBackground, TouchableOpacity } from "react-native";

class Intro extends React.Component {
  render() {
    return (
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ImageBackground
          style={{
            height: "100%",
            width: "100%",
            marginLeft: 10,
            justifyContent: "center",
            alignItems: "center",
          }}
          source={require("../../../assets/realback.gif")}
        >
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              this.props.navigation.navigate("Login");
            }}
          >
            <Text style={styles.text}>Find Your Friends!</Text>
          </TouchableOpacity>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  btn: {
    marginTop: 350,
  },
  text: {
    padding: 10,
    fontSize: 20,

    borderRadius: 20,
    backgroundColor: "#bdd4ff",
    elevation: 10,
  },
});

export default Intro;
