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
  Dimensions,
  ImageBackground,
} from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { observer, inject } from "mobx-react";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import { useMutation } from "@apollo/react-hooks";
import { EDIT_NO_PIC, GET_ME } from "../../../queries";
import axios from "axios";
import { FontAwesome } from "@expo/vector-icons";
import { SERVER_ENDPOINT } from "react-native-dotenv";

const { width, height } = Dimensions.get("window");

function EditPageFunction(props) {
  // static navigationOptions = { headerShown: false };
  // uesMutate - getMeRES

  const {
    id,
    myProfileStore,
    inputCompanyName,
    inputCompanyRole,
    tagDATA,
    Tag,
    myProfile,
    tags,
    saveMyProfile,
    geoLocation,
    distance,
    companyName,
    companyRole,
    bio,
    password,
  } = props;

  const birth = myProfile.birth;
  let birthYear = birth.split("-")[0];
  let nowYear = new Date().getFullYear();
  let age = nowYear - birthYear + 1;

  const [editNoPicRes] = useMutation(EDIT_NO_PIC);
  const [getMeRES] = useMutation(GET_ME);

  async function _submit() {
    if (myProfileStore.imgIdCardName === null) {
      console.log("사진을 안바꾸면 악시오스는 못쓴다 이자식아");
      await editNoPicRes({
        variables: {
          geoLocation: JSON.stringify({
            lat: geoLocation.lat,
            lon: geoLocation.lon,
          }),
          tags: JSON.stringify(myProfileStore.tags2),
          distance: distance,
          companyName: companyName,
          companyRole: companyRole,
          bio: bio,
          password: password,
        },
      });
      alert("수정이 완료되었습니다.");
      await _gotoMyProfilePage();
    } else {
      console.log("첫번째 순서입니다. 바꾼 내용을 서버로 보낼 겁니다.1");
      // props.myProfileStore.submitEditData();

      // 폼데이터 생성
      const editData = new FormData();
      // 폼데이터에 이미지 추가
      editData.append("profileImg", {
        name: myProfileStore.imgIdCardName,
        type: `image/${myProfileStore.imgIdCardType}`,
        uri: myProfileStore.imgIdCardUri,
      });
      editData.append("gender", myProfileStore.gender);
      editData.append("email", myProfileStore.email); //확인용
      editData.append("name", myProfileStore.name);
      editData.append("password", password);
      editData.append("companyName", companyName);
      editData.append("companyRole", companyRole);
      editData.append(
        "geoLocation",
        JSON.stringify({
          lat: geoLocation.lat,
          lon: geoLocation.lon,
        }),
      );
      editData.append("tags", JSON.stringify(myProfileStore.tags2));
      editData.append("bio", myProfileStore.bio);
      editData.append("distance", Number(distance));

      // signupData.append("bio", this.bio); 서버는 포함하지만 클라이언트 뷰에 포함되지 않음
      // 생성된 폼데이터 확인
      console.log("formdata not send yet : ", editData);
      console.log("server endpoint in editpage : ", SERVER_ENDPOINT);

      const endPoint = `${SERVER_ENDPOINT}/api/img`;
      axios
        .post(endPoint, editData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(res => {
          console.log("edit axios response : ", res);
          alert("수정이 완료되었습니다.");
          _gotoMyProfilePage();
        })

        .catch(e => {
          // console.log("axios error issued!");
          console.log("NETWORK_ERR_AXIOS in MyProfileStore : ", e);
          alert("수정 실패");
        });
    }
  }

  function _gotoSettingPage() {
    props.navigation.navigate("SettingPage");
  }
  async function _gotoMyProfilePage() {
    props.navigation.navigate("MyProfilePage");
    console.log("두 번째 순서입니다. 현재 서버에 새로 저장된 데이터를 스토어로 저장할 겁니다. 2");
    const getMyProfile = await getMeRES({
      variables: { id: id },
    });
    console.log("MyProfile Store에 저장: ", getMyProfile.data.getMe);
    saveMyProfile(getMyProfile);
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

  async function permitGallery() {
    const { status, permissions } = await Permissions.getAsync(Permissions.CAMERA_ROLL);
    if (status !== "granted") {
      const { status, permissions } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status === "granted") {
        pickImage();
      } else {
      }
    } else {
      pickImage();
    }
  }

  async function pickImage() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });
    console.log("pickImg result 여기겠구나: ", result);
    console.log("비밀이 밝혀지는 순간이다: ", result.cancelled);
    if (result.cancelled === false) {
      props.myProfileStore.imgIdCard = result;
      props.myProfileStore.imgIdCardName = result.uri.substr(-10);
      props.myProfileStore.imgIdCardUri = result.uri;

      if (result.uri.substr(-4)[0] === ".") {
        props.myProfileStore.imgIdCardType = result.uri.substr(-3);
      } else {
        props.myProfileStore.imgIdCardUri = result.uri.substr(-4);
      }

      console.log(
        "this.props.myProfileStore.imgIdCardUri 바꿨을때 : ",
        props.myProfileStore.imgIdCardUri,
      );
    } else if (result.cancelled === true) {
      props.myProfileStore.imgIdCardUri = myProfile.profileImgLocation;
      console.log(
        "this.props.myProfileStore.imgIdCardUri 안바꿨을때 : ",
        props.myProfileStore.imgIdCardUri,
      );
    }
  }

  return (
    <ImageBackground
      source={require("../../../../assets/gradient2.jpg")}
      style={{ width: "100%", height: "100%" }}
    >
      <KeyboardAvoidingView behavior="height">
        <ScrollView>
          {/* 회색창=============================================================== */}
          <View
            style={{
              // backgroundColor: "grey",
              height: 1400, //<<====창 크기 조절합시다
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
                // backgroundColor: "#f7d794",
              }}
            >
              <TouchableOpacity style={{ alignItems: "center" }} onPress={_gotoMyProfilePage}>
                <FontAwesome name="id-card" style={{ color: "#4A148C", fontSize: 25 }} />
                <Text>프로필</Text>
              </TouchableOpacity>

              <TouchableOpacity style={{ alignItems: "center" }} onPress={_gotoSettingPage}>
                <FontAwesome name="cogs" style={{ color: "#4A148C", fontSize: 25 }} />
                <Text>설정</Text>
              </TouchableOpacity>
            </View>
            {/* 사진 */}
            <View style={{ alignItems: "center" }}>
              {myProfileStore.imgIdCard ? (
                <Image source={myProfileStore.imgIdCard} style={styles.picContainer} />
              ) : (
                <Image source={{ uri: myProfile.profileImgLocation }} style={styles.picContainer} />
              )}
            </View>
            {/* 빨간창=============================================================== */}
            <View
              style={{
                flex: 8,
                alignItems: "center",
                // backgroundColor: "#f7d794"
              }}
            >
              {/* 각종정보=============================================================== */}
              <View
                style={{
                  flex: 1,
                  // backgroundColor: "rgba(255,255,255,0.5)",
                  // alignSelf: "flex-start",
                }}
              >
                {/* 첫번째줄=============================================================== */}
                <View
                  style={{
                    flex: 0.6,
                    flexDirection: "row",
                    justifyContent: "space-around",
                    alignItems: "center",
                    padding: 5,

                    // backgroundColor: "rgba(255, 255, 255, 0.5)",
                    // backgroundColor: "#f7d794",
                  }}
                >
                  <TouchableOpacity
                    onPress={permitCamera}
                    style={{
                      // backgroundColor: "rgba(255, 255, 255, 0.5)",
                      alignItems: "center",
                    }}
                  >
                    <FontAwesome name="camera" style={{ color: "#4A148C", fontSize: 25 }} />
                    <Text style={styles.text}>Camera</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={permitGallery}
                    style={{
                      //  backgroundColor: "rgba(255, 255, 255, 0.5)",
                      alignItems: "center",
                    }}
                  >
                    <FontAwesome name="image" style={{ color: "#4A148C", fontSize: 25 }} />
                    <Text style={styles.text}>Gallery</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.textContainer}>
                  <View style={styles.etcText}>
                    <Text style={styles.textId}> {myProfile.name} </Text>
                    <Text style={styles.textId}> {age} </Text>
                  </View>
                  <View style={styles.etcText}>
                    <TextInput
                      onChangeText={e => {
                        inputCompanyName(e);
                      }}
                    >
                      <Text style={styles.textCompany}> {myProfile.companyName} </Text>
                    </TextInput>
                    <TextInput
                      onChangeText={e => {
                        inputCompanyRole(e);
                      }}
                    >
                      <Text style={styles.textCompany}> {myProfile.companyRole} </Text>
                    </TextInput>
                  </View>
                </View>

                {/* 태그 테스트========================================================= */}
                <View style={{ alignItems: "center" }}>
                  <View style={styles.buttonArea}>
                    {tagDATA.map((tag, f) => {
                      return (
                        <TouchableOpacity
                          key={f}
                          tag={tag}
                          onPress={() => {
                            Tag(f);
                          }}
                          style={[
                            styles.tagColor,
                            {
                              backgroundColor: tags.indexOf(tag) === -1 ? "transparent" : "pink",
                              borderColor: tags.indexOf(tag) === -1 ? "#70a1ff" : "#ff6348",
                            },
                          ]}
                        >
                          <Text
                            style={{
                              fontWeight: tags.indexOf(tag) === -1 ? "100" : "bold",
                              fontSize: tags.indexOf(tag) === -1 ? 10 : 12,
                            }}
                          >
                            {tag}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                </View>
                {/* 지도=============================================================== */}
                <View style={styles.mapbox}>
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
                        onPress={e => console.log("ㅋㅋ숨어있었네", e)}
                      />
                    ) : null}
                  </MapView>
                </View>
                {/* <Text>
                  {myProfileStore.marker.lat} && {myProfileStore.marker.lon}
                </Text> */}
                {/* 뭐지 여기는? ================================================================================== */}
                <View
                  style={{
                    flex: 0.6,
                    flexDirection: "row",
                    justifyContent: "space-around",
                    alignItems: "center",
                    // backgroundColor: "#f7d794",
                  }}
                >
                  <View
                    style={
                      {
                        //  backgroundColor: "skyblue"
                      }
                    }
                  >
                    <TouchableOpacity style={{ alignItems: "center" }} onPress={_submit}>
                      <FontAwesome name="thumbs-up" style={{ color: "#4A148C", fontSize: 25 }} />
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
              // backgroundColor: "#f7d794",
            }}
          >
            <TouchableOpacity style={{ alignItems: "center" }} onPress={_gotoMyProfilePage}>
              <FontAwesome name="id-card" style={{ color: "#4A148C", fontSize: 25 }} />
              <Text>프로필</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{ alignItems: "center" }} onPress={_gotoSettingPage}>
              <FontAwesome name="cogs" style={{ color: "#4A148C", fontSize: 25 }} />
              <Text>설정</Text>
            </TouchableOpacity>
          </View>
          {/* 하단 초록창 ================================================================================== */}

          {/* 회색창 ================================================================================== */}
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  mapbox: {
    flex: 3,
    borderRadius: 20,
    margin: 30,
    borderWidth: 3,
    borderColor: "#7a42f4",
  },
  map: {
    borderRadius: 20,
    flex: 1,
  },
  pinkbox: {
    width: 400,
    flex: 1,
    // backgroundColor: "#f7d794", //빨간색 안에 있는 분홍박스
    alignItems: "center",
  },
  picContainer: {
    borderWidth: 3,
    borderColor: "#7a42f4",
    width: 350,
    height: 400,
    borderRadius: 20,
  },

  picButtonContainer: {
    width: 350,
    flex: 1,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  buttonArea: {
    width: "100%",
    flexDirection: "row",
    padding: 5,
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
  },
  tagColor: {
    padding: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    width: 100,
    height: 30,
    borderColor: "#70a1ff",
    borderWidth: 3,
    borderRadius: 50,
  },
  text: {
    fontSize: 15,
    color: "black",
  },
  textId: {
    fontSize: 30,
    color: "white",
    textShadowColor: "black",
    fontWeight: "bold",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 1,
  },
  textCompany: {
    fontSize: 25,
    color: "white",
    textShadowColor: "black",
    fontWeight: "bold",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 1,
  },
  textContainer: {
    padding: 15,
    alignItems: "center",
  },
  etcText: {
    flexDirection: "row",
  },
});

export default inject(({ myProfileStore }) => ({
  id: myProfileStore.id,
  myProfileStore: myProfileStore,
  inputCompanyName: myProfileStore.inputCompanyName,
  inputCompanyRole: myProfileStore.inputCompanyRole,
  tagDATA: myProfileStore.tagDATA,
  addtagState: myProfileStore.addtagState,
  addtagState2: myProfileStore.addtagState2,
  Tag: myProfileStore.addtagState2,
  tags: myProfileStore.tags2,
  myProfile: myProfileStore.myProfile.data.getMe,
  saveMyProfile: myProfileStore.saveMyProfile,
  geoLocation: myProfileStore.marker,
  distance: myProfileStore.distance,
  companyName: myProfileStore.companyName,
  companyRole: myProfileStore.companySort,
  bio: myProfileStore.bio,
  password: myProfileStore.password,
}))(observer(EditPageFunction));
