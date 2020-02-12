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
        {/* 회색창=============================================================== */}
        <View
          style={{
            backgroundColor: "grey",
            height: 1200, //<<====창 크기 조절합시다
          }}
        >
          {/* 마이프로필, 톱니바퀴=============================================================== */}
          <Text style={{ fontSize: 18 }}>{/*빈공간*/}</Text>
          <View
            style={{
              flex: 0.6,
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
              backgroundColor: "#f7d794",
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

          {/* 빨간창=============================================================== */}
          <View style={{ flex: 8, alignItems: "center", backgroundColor: "#f7d794" }}>
            {/* 분홍창=============================================================== */}
            <View style={styles.pinkbox}>
              {/* 이미지=============================================================== */}
              <Image
                style={{ width: 200, height: 246.75 }}
                source={require("../../../../testpic.png")}
              />
              {/* 각종정보=============================================================== */}
              <View
                style={{
                  width: 400,
                  flex: 1,
                  backgroundColor: "rgba(255,255,255,0.5)",
                  alignSelf: "flex-start",
                }}
              >
                {/* 첫번째줄=============================================================== */}
                <View
                  style={{
                    //  backgroundColor: "white",
                    flexDirection: "row",
                  }}
                >
                  <View style={{ backgroundColor: "rgba(0, 0, 255, 0.5)" }}>
                    <Text style={{ fontSize: 30, color: "white" }}>
                      {" "}
                      {myProfileStore.mockDATA.data.getMe.name}{" "}
                    </Text>
                  </View>
                  <View style={{ backgroundColor: "rgba(255, 0, 0, 0.5)" }}>
                    <Text style={{ fontSize: 30, color: "white" }}>
                      {myProfileStore.mockDATA.data.getMe.birth}
                    </Text>
                  </View>
                </View>
                {/* 두번째줄=============================================================== */}
                <View
                  style={{
                    //  backgroundColor: "white",
                    flexDirection: "row",
                  }}
                >
                  <View style={{ backgroundColor: "rgba(0,0,255,0.5)" }}>
                    <Text style={{ fontSize: 30, color: "white" }}>
                      {" "}
                      {myProfileStore.mockDATA.data.getMe.companyName}{" "}
                    </Text>
                  </View>
                  <View style={{ backgroundColor: "rgba(255,0,0,0.5)" }}>
                    <Text style={{ fontSize: 30, color: "white" }}>
                      {" "}
                      {myProfileStore.mockDATA.data.getMe.companyRole}{" "}
                    </Text>
                  </View>
                </View>
                {/* 세번째줄=============================================================== */}
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
                {/* 네번째줄=============================================================== */}
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
                {/* 다섯번째줄=============================================================== */}
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
                {/* 텍스트인풋=============================================================== */}
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
                {/* 지도=============================================================== */}
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
                {/* 뭐지 여기는? ================================================================================== */}
                <View style={{ flex: 1, backgroundColor: "black" }}></View>
              </View>
              {/* 각종정보 ================================================================================== */}
            </View>
            {/* 분홍창 ================================================================================== */}
          </View>
          {/* 빨간창 ================================================================================== */}
          {/* 하단 초록창 ================================================================================== */}
          <View
            style={{
              flex: 0.6,
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
              backgroundColor: "#f7d794",
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
          {/* 하단 초록창 ================================================================================== */}
        </View>
        {/* 회색창 ================================================================================== */}
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
    backgroundColor: "#f7d794", //빨간색 안에 있는 분홍박스
    alignItems: "center",
  },
});
