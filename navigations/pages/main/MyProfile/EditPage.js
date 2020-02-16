import React from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { observer, inject } from "mobx-react";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";

import { useQuery } from "@apollo/react-hooks";
import { GET_ME } from "../../../queries";

function EditPageFunction(props) {
  // static navigationOptions = { headerShown: false };

  const { loading, error, data } = useQuery(GET_ME);

  console.log("GET_ME는 과연 불러오는가", data.getMe);
  console.log("GET_ME는 과연 불러오는가", data.getMe.birth);

  const {
    signupStore,
    myProfileStore,
    inputCompanyName,
    inputCompanyRole,
    tagDATA,
    tagDATA2,
    addtagState,
    addtagState2,
    Tag,
    changeColor,
    changeColorState,
  } = props;

  // function _doNext() {
  //   if (emailBoolean === true && phoneBoolean === true) {
  //     props.navigation.navigate("SignupCompany");
  //   } else {
  //     Alert.alert("이메일 인증 및 휴대폰인증이 안되었습니다.");
  //   }
  // }

  function _gotoSettingPage() {
    props.navigation.navigate("SettingPage");
  }

  function _gotoMyProfilePage() {
    props.navigation.navigate("MyProfilePage");
  }

  function _doEditData() {
    props.navigation.navigate("MyProfilePage");
    props.myProfileStore.submitEditData();
  }

  async function permitCamera() {
    const status = await Permissions.getAsync(Permissions.CAMERA);
    if (status !== "granted") {
      const status = await Permissions.askAsync(Permissions.CAMERA);
      if (status === "granted") {
        props.navigation.navigate("EditCamera", {
          from: "idcard",
        });
      } else {
        props.navigation.navigate("EditCamera", {
          from: "idcard",
        });
      }
    } else {
      console.log("여기냐 ? Gallery permission is not granted!");
    }
  }

  return (
    <KeyboardAvoidingView behavior="height">
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
              <TouchableOpacity onPress={_gotoMyProfilePage}>
                <Text>마이프로필</Text>
              </TouchableOpacity>
            </View>

            <View style={{ backgroundColor: "steelblue" }}>
              <TouchableOpacity onPress={_gotoSettingPage}>
                <Text>톱니바퀴</Text>
              </TouchableOpacity>
            </View>
          </View>
          {/* 사진 */}
          <View>
            {myProfileStore.imgIdCard ? (
              <Image source={myProfileStore.imgIdCard} style={styles.picContainer} />
            ) : (
              <View style={styles.picContainer}>
                <Text>choose your Idcard</Text>
              </View>
            )}
            <View style={styles.picButtonContainer}>
              <TouchableOpacity onPress={permitCamera} style={styles.picButton}>
                <Text style={styles.text}>Camera</Text>
              </TouchableOpacity>
            </View>
          </View>
          {/* 빨간창=============================================================== */}
          <View style={{ flex: 8, alignItems: "center", backgroundColor: "#f7d794" }}>
            {/* 분홍창=============================================================== */}
            <View style={styles.pinkbox}>
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
                  <TouchableOpacity
                    style={{ backgroundColor: "rgba(0,0,255,0.5)" }}
                    onPress={() => console.log("Pressed")}
                  >
                    <TextInput
                      onChangeText={e => {
                        inputCompanyName(e);
                      }}
                    >
                      <Text style={{ fontSize: 30, color: "white" }}>
                        {myProfileStore.mockDATA.data.getMe.companyName}
                      </Text>
                    </TextInput>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{ backgroundColor: "rgba(255,0,0,0.5)" }}
                    onPress={() => console.log("Pressed")}
                  >
                    <TextInput
                      onChangeText={e => {
                        inputCompanyRole(e);
                      }}
                    >
                      <Text style={{ fontSize: 30, color: "white" }}>
                        {myProfileStore.mockDATA.data.getMe.companyRole}
                      </Text>
                    </TextInput>
                  </TouchableOpacity>
                </View>

                {/* 세번째줄=============================================================== */}
                {/* 태그 테스트========================================================= */}

                <View>
                  {tagDATA2.map((tag, f, e) => {
                    return (
                      <TouchableOpacity
                        key={f}
                        tag={tag}
                        onPress={() => {
                          Tag(f);
                          changeColor(f);
                          console.log("changeColorState 여기냐:", changeColorState);
                        }}
                        style={[
                          styles.tagColor,
                          { backgroundColor: changeColorState ? "red" : "pink" },
                        ]}
                      >
                        <Text>{tag}</Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
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
                  onPress={e => myProfileStore.markerClick(e.nativeEvent.coordinate)}
                >
                  {myProfileStore.marker.lat && myProfileStore.marker.lon ? (
                    <Marker
                      coordinate={{
                        latitude: myProfileStore.marker.lat, // 변수
                        longitude: myProfileStore.marker.lon, // 변수
                      }}
                      onPress={e => console.log(e)}
                    />
                  ) : null}
                </MapView>
                <Text>
                  {myProfileStore.marker.lat} && {myProfileStore.marker.lon}
                </Text>
                {/* 뭐지 여기는? ================================================================================== */}
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
                    <TouchableOpacity onPress={_doEditData}>
                      <Text>수정 확정</Text>
                    </TouchableOpacity>
                  </View>
                </View>
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
              <TouchableOpacity onPress={_gotoMyProfilePage}>
                <Text>마이프로필</Text>
              </TouchableOpacity>
            </View>
            <View style={{ backgroundColor: "steelblue" }}>
              <TouchableOpacity onPress={_gotoSettingPage}>
                <Text>톱니바퀴</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* 하단 초록창 ================================================================================== */}
        </View>
        {/* 회색창 ================================================================================== */}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

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
  IdcardContainer: {
    flex: 1,
    backgroundColor: "white",
    paddingLeft: wp("10%"),
    paddingRight: wp("10%"),
    justifyContent: "center",
    alignContent: "center",
    backgroundColor: "yellow",
  },
  picContainer: {
    width: 200,
    height: 246.75,
    backgroundColor: "orange",
  },

  picButtonContainer: {
    width: 200,
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    position: "absolute",
    alignSelf: "flex-start",
  },
  submitButtonContainer: {
    flex: 1,
    backgroundColor: "violet",
    padding: 10,
  },
  picButton: {
    backgroundColor: "green",
    padding: 5,
  },
  submitButton: {
    backgroundColor: "blue",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "brown",
  },
  text: {
    fontSize: 15,
    color: "white",
  },
});

export default inject(({ signupStore, myProfileStore }) => ({
  myProfileStore: myProfileStore,
  signupStore: signupStore,
  inputCompanyName: myProfileStore.inputCompanyName,
  inputCompanyRole: myProfileStore.inputCompanyRole,
  tagDATA: myProfileStore.mockDATA.data.getMe.tags,
  tagDATA2: myProfileStore.tagDATA,
  addtagState: myProfileStore.addtagState,
  addtagState2: myProfileStore.addtagState2,
  changeColorState: myProfileStore.changeColorState,
  changeColor: myProfileStore.changeColor,
  Tag: myProfileStore.addtagState2,
}))(observer(EditPageFunction));
