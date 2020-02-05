import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from "react-native";
import { observer, inject } from "mobx-react";
import { SafeAreaView } from "react-native-safe-area-context";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
// import Geocode from "react-geocode";

@inject("signupStore")
@observer
class SignupCompany extends React.Component {
  static navigationOptions = { headerShown: false };

  _doNext() {
    this.props.navigation.navigate("SignupIdcard");
  }

  render() {
    const { signupStore } = this.props;
    // Geocode.setApiKey("PROVIDER_GOOGLE");
    // Geocode.enableDebug;
    // const getAddressFromCoord = (lat, lon) => {
    //   Geocode.fromLatLng(lat, lon).then(res => {
    //     let address = res;
    //     console.log("ADDRESS", address);
    //   });
    // };
    // getAddressFromCoord(signupStore.marker.lat, signupStore.marker.lon);

    console.log("마커_스토어", signupStore.marker.lat);
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#ecf0f1" }}>
        <Text>SignupCompany</Text>
        <TextInput
          style={styles.input}
          placeholder="회사명"
          onChangeText={value => {
            signupStore.inputCompanyName(value);
          }}
        ></TextInput>
        <TextInput
          style={styles.input}
          placeholder="업종"
          onChangeText={value => {
            signupStore.inputCompanySort(value);
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
          {signupStore.marker.lat && signupStore.marker.lon ? (
            <Marker
              coordinate={{
                latitude: signupStore.marker.lat, // 변수
                longitude: signupStore.marker.lon, // 변수
              }}
              onPress={e => console.log(e)}
            />
          ) : null}
        </MapView>
        <Text>
          {signupStore.marker.lat} && {signupStore.marker.lon}
        </Text>
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
