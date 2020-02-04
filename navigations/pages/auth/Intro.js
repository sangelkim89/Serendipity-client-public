import React from "react";
import { Text, View, Button } from "react-native";
import Swiper from "react-native-swiper";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

class Intro extends React.Component {
  render() {
    return (
      <View>
        <Text>Intro</Text>
        <Button
          title={"Login"}
          onPress={() => {
            this.props.navigation.navigate("Login");
          }}
        ></Button>
      </View>
    );
  }
}

export default Intro;
