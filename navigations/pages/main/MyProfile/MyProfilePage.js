import React from "react";
import { Text, View, TouchableOpacity, Image, ImageBackground } from "react-native";
import { observer, inject } from "mobx-react";
import { useQuery } from "@apollo/react-hooks";
import { GET_ME } from "../../../queries";

function MyProfilePage(props) {
  const { tagDATA } = props;

  _gotoEditPage = () => {
    props.navigation.navigate("EditPage");
  };

  _gotoSettingPage = () => {
    props.navigation.navigate("SettingPage");
  };

  const { loading, error, data } = useQuery(GET_ME);

  console.log("GET_ME는 과연 불러오는가", data.getMe);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "grey",
      }}
    >
      <View style={{ flex: 9, alignItems: "center", backgroundColor: "#f7d794" }}>
        <View
          style={{
            width: 400,
            flex: 1,
            backgroundColor: "#F5A9F2", //빨간색 안에 있는 분홍박스
            alignItems: "center",
          }}
        >
          <Image
            style={{ width: 400, height: 600 }}
            source={{
              uri: data.getMe.profileImgLocation,
            }}
          />

          <View
            style={{
              width: 200,
              flex: 1,
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              position: "absolute",
              alignSelf: "flex-start",
            }}
          >
            <Text style={{ fontSize: 17.5 }}></Text>

            <View
              style={{
                flex: 1,
                backgroundColor: "rgba(255, 255, 255, 0.5)",
                flexDirection: "row",
              }}
            >
              <View style={{ backgroundColor: "rgba(0, 0, 255, 0.5)" }}>
                <Text style={{ fontSize: 30, color: "white" }}>{data.getMe.name}</Text>
              </View>
              <View style={{ backgroundColor: "rgba(255, 0, 0, 0.5)" }}>
                <Text style={{ fontSize: 30, color: "white" }}>{data.getMe.birth}</Text>
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
                <Text style={{ fontSize: 30, color: "white" }}>{data.getMe.companyName}</Text>
              </View>
              <View style={{ backgroundColor: "rgba(255,0,0,0.5)" }}>
                <Text style={{ fontSize: 30, color: "white" }}>{data.getMe.companyRole}</Text>
              </View>
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
              }}
            >
              <View style={{ backgroundColor: "rgba(0,0,255,0.5)" }}>
                <Text style={{ fontSize: 30, color: "white" }}>
                  {data.getMe.tags[0] + data.getMe.tags[1] + data.getMe.tags[2]}
                </Text>
              </View>
              <View style={{ backgroundColor: "rgba(255,0,0,0.5)" }}>
                <Text style={{ fontSize: 30, color: "white" }}>
                  {data.getMe.tags[0][8] + data.getMe.tags[0][9] + data.getMe.tags[0][10]}
                </Text>
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
                <Text style={{ fontSize: 30, color: "white" }}>
                  {data.getMe.tags[0][14] + data.getMe.tags[0][15] + data.getMe.tags[0][16]}
                </Text>
              </View>
              <View style={{ backgroundColor: "rgba(255,0,0,0.5)" }}>
                <Text style={{ fontSize: 30, color: "white" }}>
                  {data.getMe.tags[0][20] +
                    data.getMe.tags[0][21] +
                    data.getMe.tags[0][22] +
                    data.getMe.tags[0][23]}
                </Text>
              </View>
            </View>
            <View style={{ flex: 1, backgroundColor: "rgba(255,0,0,0.5)" }}>
              <Text style={{ fontSize: 30, color: "white" }}>
                {data.getMe.tags[0][27] +
                  data.getMe.tags[0][28] +
                  data.getMe.tags[0][29] +
                  data.getMe.tags[0][30]}
              </Text>
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
          backgroundColor: "#f7d794",
        }}
      >
        <View style={{ backgroundColor: "skyblue" }}>
          <TouchableOpacity onPress={_gotoEditPage}>
            <Text>수정</Text>
          </TouchableOpacity>
        </View>
        <View style={{ backgroundColor: "steelblue" }}>
          <TouchableOpacity onPress={_gotoSettingPage}>
            <Text>톱니바퀴</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* 수정, 톱니바퀴========================================================= */}
    </View>
  );
}

export default inject(({ myProfileStore }) => ({
  tagDATA: myProfileStore.tagDATA,
}))(observer(MyProfilePage));
