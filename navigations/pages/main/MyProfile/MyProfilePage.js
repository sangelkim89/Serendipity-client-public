import React from "react";

import {
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  ImageBackground,
  StyleSheet,
  Dimensions,
} from "react-native";

import { observer, inject } from "mobx-react";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;
function MyProfilePage(props) {
  const { id, myProfile, myProfileStore } = props;

  const _gotoEditPage = () => {
    props.navigation.navigate("EditPage");
  };

  const _gotoSettingPage = () => {
    props.navigation.navigate("SettingPage");
  };

  const birth = myProfile.birth;
  let birthYear = birth.split("-")[0];
  let nowYear = new Date().getFullYear();
  let age = nowYear - birthYear + 1;

  // console.log("useMutation {data} : ", data);
  // console.log("GET_ME는 과연 불러오는가 tag :", JSON.parse(data.getMe.tags)[0]);
  // console.log("GET_ME는 과연 불러오는가 img", data.getMe.profileImgLocation);

  return (
    <ImageBackground
      source={require("../../../../assets/gradient2.jpg")}
      style={{
        width: "100%",
        height: "100%",
        //  backgroundColor: "black"
      }}
    >
      <Text style={{ fontSize: 18 }}>{/*빈공간*/}</Text>

      <View
        style={{
          flex: 1,
          // backgroundColor: "grey",
        }}
      >
        <View
          style={{
            flex: 9,
            alignItems: "center",
            //  backgroundColor: "#f7d794"
          }}
        >
          <View
            style={{
              flex: 1,
              // backgroundColor: "#F5A9F2", //빨간색 안에 있는 분홍박스
              alignItems: "center",
            }}
          >
            <Image
              style={{ width: 410, height: 400 }}
              source={{ uri: myProfile.profileImgLocation }}
            />

            <View
              style={{
                flex: 1,
                // backgroundColor: "rgba(255, 255, 255, 0.5)",
                flexDirection: "row",
              }}
            >
              <Text style={styles.textId}>{myProfile.name}</Text>
              <Text style={styles.textId}>{age}</Text>
            </View>
            <View
              style={{
                flex: 1,
                //  backgroundColor: "white",
                flexDirection: "row",
              }}
            >
              <Text style={styles.textCompany}>{myProfile.companyName}</Text>
              <Text style={styles.textCompany}>{myProfile.companyRole}</Text>
            </View>
            <View style={styles.tagContainer}>
              <Text style={styles.tagsStyle}>{myProfile.tags[0]}</Text>
              <Text style={styles.tagsStyle}>{myProfile.tags[1]}</Text>
              <Text style={styles.tagsStyle}>{myProfile.tags[2]}</Text>
              <Text style={styles.tagsStyle}>{myProfile.tags[3]}</Text>
              <Text style={styles.tagsStyle}>{myProfile.tags[4]}</Text>
            </View>
          </View>
        </View>

        <View
          style={{
            flex: 1,
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
            <TouchableOpacity onPress={_gotoEditPage}>
              <Text>수정</Text>
            </TouchableOpacity>
          </View>
          <View
            style={
              {
                //  backgroundColor: "steelblue"
              }
            }
          >
            <TouchableOpacity onPress={_gotoSettingPage}>
              <Text>톱니바퀴</Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* 수정, 톱니바퀴========================================================= */}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  img: {
    zIndex: 1,
    borderRadius: 20,
    padding: 10,
    width: SCREEN_WIDTH - 50,
    height: SCREEN_HEIGHT - 190,
    marginLeft: 6,
  },
  info: {
    marginLeft: 20,
    zIndex: 100,
    flexDirection: "row",
    marginTop: 410,
  },
  tagsStyle: {
    fontSize: 20,
    color: "#2c3e50",
    backgroundColor: "pink",
    padding: 5,
    borderWidth: 1,
    borderColor: "#ff6348",
    borderRadius: 5,
    margin: 3,
  },
  tagContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 5,
  },
  textId: {
    color: "black",
    fontSize: 30,
    margin: 10,
    marginTop: -10,
    fontWeight: "bold",
  },
  textCompany: {
    color: "black",
    marginTop: -10,
    margin: 10,
    fontSize: 25,
  },
});

export default inject(({ myProfileStore }) => ({
  id: myProfileStore.id,
  myProfile: myProfileStore.myProfile.data.getMe,
  myProfileStore: myProfileStore,
}))(observer(MyProfilePage));
