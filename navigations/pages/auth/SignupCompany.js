import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from "react-native";
import { observer, inject } from "mobx-react";
import { SafeAreaView } from "react-native-safe-area-context";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";

@inject("signupStore")
@observer
class SignupCompany extends React.Component {
  static navigationOptions = { headerShown: false };

  _doNext() {
    this.props.navigation.replace("SignupIdcard");
  }
  render() {
    const { signupStore } = this.props;

    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#ecf0f1" }}>
        <Text>SignupCompany</Text>
        <TextInput
          style={styles.input}
          placeholder="회사명"
          onChangeText={value => {
            signupStore.inputId(value);
          }}
        ></TextInput>
        <TextInput
          style={styles.input}
          placeholder="업종"
          onChangeText={value => {
            signupStore.inputId(value);
          }}
        ></TextInput>
        <MapView
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          initialRegion={{
            latitude: 37.485403,
            longitude: 126.982203,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
          onPress={e => signupStore.markerClick(e.nativeEvent.coordinate)}
        >
          {/* <Marker
              coordinate={{
                latitude: 37.485403, // 변수
                longitude: 126.982203, // 변수
              }}
              onPress={e => console.log(e)}
            /> */}
        </MapView>
        <TouchableOpacity onPress={this._doNext.bind(this)}>
          <Text style={styles.nextbtn}>Next</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}

export default SignupCompany;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#6a89cc",
    width: "100%",
    height: "100%",
  },
  map: {
    flex: 3,
    margin: 30,
    borderWidth: 5,
    borderColor: "#7a42f4",
  },
  input: {
    margin: 15,
    height: 40,
    borderColor: "#7a42f4",
    borderWidth: 1,
  },
  nextbtn: {
    margin: 15,
    height: 40,
    borderColor: "#7a42f4",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
