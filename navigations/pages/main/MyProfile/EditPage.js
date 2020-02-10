import React from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
} from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { observer, inject } from "mobx-react";

@inject("signupStore", "myProfileStore")
@observer
class EditPage extends React.Component {
  static navigationOptions = { headerShown: false };

  _gotoSettingPage = () => {
    this.props.navigation.navigate("SettingPage");
  };

  _gotoMyProfilePage = () => {
    this.props.navigation.navigate("MyProfilePage");
  };

  render() {
    const { signupStore, myProfileStore } = this.props;

    console.log("마커_스토어", signupStore.marker.lat);
    console.log("저장된 이름 :", myProfileStore.mockDATA.data.getMe.name);
    return (
      <ScrollView>
        <View
          style={{
            flex: 1,
            backgroundColor: "grey",
            height: 1200, //<<====창 크기 조절합시다
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
              backgroundColor: "green",
            }}
          >
            <View style={{ backgroundColor: "skyblue" }}>
              <TouchableOpacity onPress={this._gotoMyProfilePage}>
                <Text>마이프로필</Text>
              </TouchableOpacity>
            </View>

            <View style={{ backgroundColor: "steelblue" }}>
              <TouchableOpacity onPress={this._gotoSettingPage}>
                <Text>톱니바퀴</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={{ flex: 8, alignItems: "center", backgroundColor: "red" }}>
            <View style={styles.pinkbox}>
              <Image
                style={{ width: 200, height: 246.75 }}
                source={require("../../../../testpic.png")}
              />
              <View
                style={{
                  width: 400,
                  flex: 1,
                  // backgroundColor: "#81F7D8",
                  alignSelf: "flex-start",
                }}
              >
                <View
                  style={{
                    //  backgroundColor: "white",
                    flexDirection: "row",
                  }}
                >
                  <View style={{ backgroundColor: "rgba(0, 0, 255, 0.5)" }}>
                    <Text style={{ fontSize: 30, color: "white" }}>
                      {myProfileStore.mockDATA.data.getMe.name}
                    </Text>
                  </View>
                  <View style={{ backgroundColor: "rgba(255, 0, 0, 0.5)" }}>
                    <Text style={{ fontSize: 30, color: "white" }}>
                      {myProfileStore.mockDATA.data.getMe.birth}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    //  backgroundColor: "white",
                    flexDirection: "row",
                  }}
                >
                  <View style={{ backgroundColor: "rgba(0,0,255,0.5)" }}>
                    <Text style={{ fontSize: 30, color: "white" }}>회사</Text>
                  </View>
                  <View style={{ backgroundColor: "rgba(255,0,0,0.5)" }}>
                    <Text style={{ fontSize: 30, color: "white" }}>업종</Text>
                  </View>
                </View>

                <View
                  style={{
                    //  backgroundColor: "white",
                    flexDirection: "row",
                  }}
                >
                  <View style={{ backgroundColor: "rgba(0,0,255,0.5)" }}>
                    <Text style={{ fontSize: 30, color: "white" }}>태그1</Text>
                  </View>
                  <View style={{ backgroundColor: "rgba(255,0,0,0.5)" }}>
                    <Text style={{ fontSize: 30, color: "white" }}>태그2</Text>
                  </View>
                </View>

                <View
                  style={{
                    //  backgroundColor: "white",
                    flexDirection: "row",
                  }}
                >
                  <View style={{ backgroundColor: "rgba(0,0,255,0.5)" }}>
                    <Text style={{ fontSize: 30, color: "white" }}>태그3</Text>
                  </View>
                  <View style={{ backgroundColor: "rgba(255,0,0,0.5)" }}>
                    <Text style={{ fontSize: 30, color: "white" }}>태그4</Text>
                  </View>
                </View>

                <View
                  style={{
                    //  backgroundColor: "white",
                    flexDirection: "row",
                  }}
                >
                  <View style={{ backgroundColor: "rgba(0,0,255,0.5)" }}>
                    <Text style={{ fontSize: 30, color: "white" }}>태그5</Text>
                  </View>
                </View>
                {/* ================================================================================== */}
                <View style={{ flex: 1, backgroundColor: "#ecf0f1" }}>
                  <TextInput
                    style={styles.input}
                    placeholder={myProfileStore.mockDATA.data.name}
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
                </View>
                {/* ================================================================================== */}

                <Text>
                  {signupStore.marker.lat} && {signupStore.marker.lon}
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
              backgroundColor: "green",
            }}
          >
            <View style={{ backgroundColor: "skyblue" }}>
              <Text>로그아웃</Text>
            </View>
            <View style={{ backgroundColor: "steelblue" }}>
              <Text>탈퇴</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}

export default EditPage;

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
  pinkbox: {
    width: 400,
    flex: 1,
    backgroundColor: "#F5A9F2", //빨간색 안에 있는 분홍박스
    alignItems: "center",
  },
});
