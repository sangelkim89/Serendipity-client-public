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
  ScrollView,
} from "react-native";

import { observer, inject } from "mobx-react";

import { FontAwesome } from "@expo/vector-icons";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;
function MyProfilePage(props) {
  const { myProfile, tagDATA } = props;

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
      <ScrollView>
        <View style={styles.imgContainer}>
          <Image style={styles.image} source={{ uri: myProfile.profileImgLocation }} />
        </View>
        <View style={styles.textContainer}>
          <View style={styles.etcText}>
            <Text style={styles.textId}>{myProfile.name}</Text>
            <Text style={styles.textId}>{age}</Text>
          </View>

          <View style={styles.etcText}>
            <Text style={styles.textCompany}>{myProfile.companyName}</Text>
            <Text style={styles.textCompany}>{myProfile.companyRole}</Text>
          </View>

          <View style={styles.etcText}>
            <Text style={styles.textCompany}>{myProfile.email}</Text>
            <Text style={styles.textCompany}>{myProfile.phone}</Text>
          </View>

          <View style={styles.tagContainer}>
            {tagDATA.map((tag, i) => {
              return (
                <Text style={styles.textTag} key={i}>
                  {tag}
                </Text>
              );
            })}
          </View>
        </View>

        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
            padding: 10,

            // backgroundColor: "#f7d794",
          }}
        >
          <TouchableOpacity onPress={_gotoEditPage}>
            <FontAwesome name="edit" style={{ color: "#4A148C", fontSize: 25 }} />
            <Text>수정</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={_gotoSettingPage}>
            <FontAwesome name="cogs" style={{ color: "#4A148C", fontSize: 25 }} />
            <Text>설정</Text>
          </TouchableOpacity>
        </View>
        {/* 수정, 톱니바퀴========================================================= */}
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 350,
    height: 400,
    justifyContent: "flex-end",
    borderRadius: 20,
    borderWidth: 3,
    borderColor: "#7a42f4",
  },
  imgContainer: {
    padding: 30,
    alignItems: "center",
  },

  textContainer: {
    padding: 10,
    alignItems: "center",
  },
  etcText: {
    flexDirection: "row",
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
  textTag: {
    fontSize: 20,
    color: "#2c3e50",
    backgroundColor: "pink",
    padding: 5,
    borderWidth: 1,
    borderColor: "#ff6348",
    borderRadius: 5,
    margin: 3,
  },
});

export default inject(({ myProfileStore }) => ({
  tagDATA: myProfileStore.tags2,
  myProfile: myProfileStore.myProfile.data.getMe,
}))(observer(MyProfilePage));
