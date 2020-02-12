import React from "react";
import { Text, View, Button, AsyncStorage, StyleSheet } from "react-native";

class Intro extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={{ fontSize: 20 }}>Intro</Text>
        <Button
          style={styles.btn}
          title={"Login"}
          onPress={async () => {
            const logInfo = await AsyncStorage.getItem("isLoggedIn");
            console.log("INTRO_LOCAL_isLoggedIN : ", logInfo);
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  btn: {
    width: 300,
    height: 50,
  },
});

export default Intro;
