import React from "react";
import { Text, View, TouchableOpacity, Image, ImageBackground } from "react-native";

const MyProfilePage = ({ navigation }) => (
  <View
    style={{
      flex: 1,
      backgroundColor: "grey",
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
      <View style={{ backgroundColor: "powderblue", height: 20 }}>
        <Text>MyProfile</Text>
      </View>
      <View style={{ backgroundColor: "skyblue" }}>
        <TouchableOpacity onPress={() => navigation.navigate("EditPage")}>
          <Text>Hunt</Text>
        </TouchableOpacity>
      </View>
      <View style={{ backgroundColor: "steelblue" }}>
        <TouchableOpacity onPress={() => navigation.navigate("SettingPage")}>
          <Text>Matches</Text>
        </TouchableOpacity>
      </View>
    </View>
    <View style={{ flex: 9, alignItems: "center", backgroundColor: "red" }}>
      <View
        style={{
          width: 400,
          flex: 1,
          backgroundColor: "#F5A9F2", //빨간색 안에 있는 분홍박스
          alignItems: "center",
        }}
      >
        <Image style={{ width: 400, height: 493.5 }} source={require("../../../testpic.png")} />
        <View
          style={{
            width: 200,
            flex: 1,
            // backgroundColor: "#81F7D8",
            position: "absolute",
            alignSelf: "flex-start",
          }}
        >
          <Text>각종 정보 담을꺼요~</Text>
          <View
            style={{
              flex: 1,
              //  backgroundColor: "white",
              flexDirection: "row",
            }}
          >
            <View style={{ backgroundColor: "rgba(0, 0, 255, 0.5)" }}>
              <Text style={{ fontSize: 30, color: "white" }}>이름</Text>
            </View>
            <View style={{ backgroundColor: "rgba(255, 0, 0, 0.5)" }}>
              <Text style={{ fontSize: 30, color: "white" }}>나이</Text>
            </View>
          </View>
          <View
            style={{
              flex: 1,
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
              flex: 1,
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
              flex: 1,
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
              flex: 1,
              //  backgroundColor: "white",
              flexDirection: "row",
            }}
          >
            <View style={{ backgroundColor: "rgba(0,0,255,0.5)" }}>
              <Text style={{ fontSize: 30, color: "white" }}>태그5</Text>
            </View>
          </View>
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
        <TouchableOpacity onPress={() => navigation.navigate("EditPage")}>
          <Text>수정</Text>
        </TouchableOpacity>
      </View>
      <View style={{ backgroundColor: "steelblue" }}>
        <TouchableOpacity onPress={() => navigation.navigate("SettingPage")}>
          <Text>톱니바퀴</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
);

export default MyProfilePage;
