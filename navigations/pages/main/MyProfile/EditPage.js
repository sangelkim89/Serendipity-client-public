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
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { observer, inject } from "mobx-react";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";

function EditPageFunction(props) {
  // static navigationOptions = { headerShown: false };

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
        this.props.navigation.navigate("TakeCamera", {
          from: "idcard",
        });
      } else {
        console.log("Gallery permission is not granted!");
      }
    } else {
      this.props.navigation.navigate("TakeCamera", {
        from: "idcard",
      });
    }
  }

  async function permitGallery() {
    const { status, permissions } = await Permissions.getAsync(Permissions.CAMERA_ROLL);
    if (status !== "granted") {
      const { status, permissions } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status === "granted") {
        this.setState({ cameraStatus: true });
        this.pickImage();
      } else {
        console.log("Galery permission is not granted!");
        this.setState({ cameraStatus: false });
      }
    } else {
      this.setState({ cameraStatus: true });
      this.pickImage();
    }
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });
    console.log("pickImg result : ", result);
    this.props.signupStore.imgIdCard = result;
    this.props.signupStore.imgIdCardName = result.uri.substr(-10);
    this.props.signupStore.imgIdCardUri = result.uri;
    if (result.uri.substr(-4)[0] === ".") {
      this.props.signupStore.imgIdCardType = result.uri.substr(-3);
    } else {
      this.props.signupStore.imgIdCardUri = result.uri.substr(-4);
    }
    console.log("this.props.signupStore.imgIdCardUri : ", this.props.signupStore.imgIdCardUri);
  };

  return (
    <KeyboardAvoidingView enable behavior="position">
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

          {/* 빨간창=============================================================== */}
          <View style={{ flex: 8, alignItems: "center", backgroundColor: "#f7d794" }}>
            {/* 분홍창=============================================================== */}
            <View style={styles.pinkbox}>
              {/* 이미지=============================================================== */}
              <View style={styles.picButtonContainer}>
                <TouchableOpacity onPress={this.permitCamera.bind(this)} style={styles.picButton}>
                  <Text style={styles.text}>Camera</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.permitGallery()} style={styles.picButton}>
                  <Text style={styles.text}>Gallery</Text>
                </TouchableOpacity>
              </View>
              {signupStore.imgIdCard ? (
                <Image source={signupStore.imgIdCard} style={styles.picContainer} />
              ) : (
                <View style={styles.picContainer}>
                  <Text>choose your Idcard</Text>
                </View>
              )}
              <View style={styles.submitButtonContainer}>
                <TouchableOpacity onPress={this._doNext.bind(this)} style={styles.submitButton}>
                  <Text style={styles.text}>Submit</Text>
                </TouchableOpacity>
              </View>

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
