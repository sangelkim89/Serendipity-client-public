import React from "react";
import {
  KeyboardAvoidingView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ImageBackground,
} from "react-native";
import { observer, inject } from "mobx-react";
import { SafeAreaView } from "react-native-safe-area-context";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { Button, Input } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";

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
          source={require("../../../assets/gradient2.jpg")}
          style={{ width: "100%", height: "100%" }}
        >
          <KeyboardAvoidingView behavior="position">
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
              <Text style={styles.mapText}>회사위치를 지도에 찍어주세요!</Text>
            </View>

            <Input
              placeholder="회사명"
              containerStyle={styles.input}
              placeholderTextColor="white"
              inputStyle={{ color: "white" }}
              inputContainerStyle={{ borderColor: "white" }}
              leftIcon={<Icon name="child" size={24} color="white" style={{ marginRight: 10 }} />}
              onChangeText={value => {
                signupStore.inputCompanyName(value);
              }}
            />

            <Input
              placeholder="업종"
              containerStyle={styles.input}
              placeholderTextColor="white"
              inputStyle={{ color: "white" }}
              inputContainerStyle={{ borderColor: "white" }}
              leftIcon={<Icon name="child" size={24} color="white" style={{ marginRight: 10 }} />}
              onChangeText={value => {
                signupStore.inputCompanySort(value);
              }}
            />

            {signupStore.companyName && signupStore.companySort ? (
              <Button
                buttonStyle={{
                  width: "80%",
                  marginLeft: 45,
                  borderRadius: 20,
                  // backgroundColor: "transparent",
                }}
                icon={
                  <Icon name="arrow-right" style={{ marginLeft: 10 }} size={15} color="white" />
                }
                iconRight
                title="NEXT"
                onPress={this._doNext.bind(this)}
              />
            ) : (
              <Button
                disabled={true}
                buttonStyle={{
                  width: "90%",
                  marginLeft: 22,
                  borderRadius: 20,
                }}
                icon={
                  <Icon
                    name="exclamation-circle"
                    style={{ marginLeft: 10 }}
                    size={20}
                    color="red"
                  />
                }
                iconRight
                title="Please Check Your Company Information"
                onPress={this._doNext.bind(this)}
              />
            )}
          </KeyboardAvoidingView>
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
  mapText: {
    marginTop: -15,
    marginBottom: 20,
    fontSize: 20,
    fontWeight: "bold",
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
