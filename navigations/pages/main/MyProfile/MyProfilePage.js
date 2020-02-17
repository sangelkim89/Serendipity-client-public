import React from "react";
import { Text, View, TouchableOpacity, Image, ImageBackground } from "react-native";

import { observer, inject } from "mobx-react";

import { useQuery } from "@apollo/react-hooks";
import { GET_ME } from "../../../queries";

function MyProfilePage(props) {
  _gotoEditPage = () => {
    props.navigation.navigate("EditPage");
  };

  _gotoSettingPage = () => {
    props.navigation.navigate("SettingPage");
  };
  const { loading, error, data } = useQuery(GET_ME);

  console.log("GET_ME는 과연 불러오는가", data.getMe);
  console.log("GET_ME는 과연 불러오는가 tag :", JSON.parse(data.getMe.tags)[0]);
  console.log("GET_ME는 과연 불러오는가 img", data.getMe.profileImgLocation);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "grey",
      }}
    >
      {/* 빨간색 박스 ==================================================================================== */}
      <View style={{ flex: 9, alignItems: "center", backgroundColor: "#f7d794" }}>
        {/* 분홍색 박스(사진 및 각종정보) ==================================================================================== */}
        <View
          style={{
            width: 400,
            flex: 1,
            backgroundColor: "#F5A9F2", //빨간색 안에 있는 분홍박스
            alignItems: "center",
          }}
        >
          {/* 이미지 ==================================================================================== */}
          {/* <Image style={{ width: 400, height: 600 }} source={require("../../../../testpic.png")} /> */}
          <Image
            style={{ width: 400, height: 600 }}
            source={{
              uri: "https://serendipity-uploads.s3.ap-northeast-2.amazonaws.com/1581585310171",
            }}
          />
          {/* https://serendipity-uploads.s3.ap-northeast-2.amazonaws.com/1581585310171 */}

          {/* 각종 정보 ==================================================================================== */}
          <View
            style={{
              width: 200,
              flex: 1,
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              position: "absolute",
              alignSelf: "flex-start",
            }}
          >
            {/* 맨위에 빈칸 ==================================================================================== */}
            <Text style={{ fontSize: 17.5 }}></Text>
            {/* 맨 윗줄 이름 나이==================================================================================== */}
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
            {/* 두번째 줄 회사 업종==================================================================================== */}
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
            {/* 세번째 줄 태그==================================================================================== */}
            <View
              style={{
                flex: 1,
                //  backgroundColor: "white",
                flexDirection: "row",
              }}
            >
              <View style={{ backgroundColor: "rgba(0,0,255,0.5)" }}>
                <Text style={{ fontSize: 30, color: "white" }}>
                  {JSON.parse(data.getMe.tags)[0]}
                </Text>
              </View>
              <View style={{ backgroundColor: "rgba(255,0,0,0.5)" }}>
                <Text style={{ fontSize: 30, color: "white" }}>
                  {JSON.parse(data.getMe.tags)[1]}
                </Text>
              </View>
            </View>
            {/* 네번째 줄 태그==================================================================================== */}

            <View
              style={{
                flex: 1,
                //  backgroundColor: "white",
                flexDirection: "row",
              }}
            >
              <View style={{ backgroundColor: "rgba(0,0,255,0.5)" }}>
                <Text style={{ fontSize: 30, color: "white" }}>
                  {JSON.parse(data.getMe.tags)[2]}
                </Text>
              </View>
              <View style={{ backgroundColor: "rgba(255,0,0,0.5)" }}>
                <Text style={{ fontSize: 30, color: "white" }}>
                  {JSON.parse(data.getMe.tags)[3]}
                </Text>
              </View>
            </View>
            {/* 다섯번째 줄 태그==================================================================================== */}
            <View style={{ flex: 1, backgroundColor: "rgba(255,0,0,0.5)" }}>
              <Text style={{ fontSize: 30, color: "white" }}>{JSON.parse(data.getMe.tags)[4]}</Text>
            </View>

            {/* 다섯번째줄 */}
          </View>
          {/* {각종 정보} */}
        </View>
        {/* 분홍박스 */}
      </View>
      {/* 빨간박스 */}
      {/* 수정, 톱니바퀴========================================================= */}
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
