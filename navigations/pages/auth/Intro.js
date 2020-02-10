import React from "react";
import { Text, View, Button, AsyncStorage } from "react-native";
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
          onPress={async () => {
            const logInfo = await AsyncStorage.getItem("isLoggedIn");
            console.log("앱_로그인포", logInfo);
            if (logInfo === "true") {
              this.props.navigation.navigate("TabNav");
            }
            this.props.navigation.navigate("Login");
          }}
        ></Button>
      </View>
    );
  }
}

export default Intro;
