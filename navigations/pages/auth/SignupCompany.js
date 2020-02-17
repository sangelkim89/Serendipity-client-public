import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, TextInput, ImageBackground } from "react-native";
import { observer, inject } from "mobx-react";
import { SafeAreaView } from "react-native-safe-area-context";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { Button, Input } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";

// import Geocode from "react-geocode";

@inject("signupStore")
@observer
class SignupCompany extends React.Component {
  static navigationOptions = { headerShown: false };

  _doNext() {
    this.props.navigation.navigate("SignupTag");
  }

  render() {
    const { signupStore } = this.props;

    console.log("스토어_MARKER", signupStore.marker.lat);
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#ecf0f1" }}>
        <ImageBackground
          source={require("../../../assets/background3.jpg")}
          style={{ width: "100%", height: "100%" }}
        >
          <View style={styles.mapContainer}>
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
            <Text style={styles.marking}>
              {signupStore.marker.lat} && {signupStore.marker.lon}
            </Text>
          </View>

          <Input
            placeholder="회사명"
            containerStyle={styles.input}
            inputStyle={{ color: "white" }}
            leftIcon={<Icon name="child" size={24} color="grey" style={{ marginRight: 10 }} />}
            onChangeText={value => {
              signupStore.inputCompanyName(value);
            }}
          />

          <Input
            placeholder="업종"
            containerStyle={styles.input}
            inputStyle={{ color: "white" }}
            leftIcon={<Icon name="child" size={24} color="grey" style={{ marginRight: 10 }} />}
            onChangeText={value => {
              signupStore.inputCompanySort(value);
            }}
          />

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
            onPress={this._doNext.bind(this)}
          />
        </ImageBackground>
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
  mapContainer: {
    marginLeft: 6,
    width: 400,
    height: 420,
    alignItems: "center",
    justifyContent: "center",
  },
  marking: {
    fontSize: 20,
  },
  map: {
    width: "100%",
    flex: 1,
    margin: 30,

    borderColor: "#7a42f4",
    margin: 30,
  },
  input: {
    backgroundColor: "transparent",
    marginVertical: 10,
    width: 280,
    height: 50,
    marginLeft: 5,

    width: "95%",
  },
  nextbtn: {
    marginTop: 20,
    width: 300,
    fontSize: 30,
    borderColor: "#1e3799",
    borderRadius: 150,
    borderWidth: 3,
    justifyContent: "center",
    alignItems: "center",
  },
});
