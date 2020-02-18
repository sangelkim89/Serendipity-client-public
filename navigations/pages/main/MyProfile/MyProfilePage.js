import React from "react";

import { Text, View, TouchableOpacity, Image, TextInput, ImageBackground } from "react-native";

import { observer, inject } from "mobx-react";

import { useMutation } from "@apollo/react-hooks";
import { GET_ME } from "../../../queries";

function MyProfilePage(props) {
  const { id, myProfile } = props;

  const _gotoEditPage = () => {

    props.navigation.navigate("EditPage");
  };

  const _gotoSettingPage = () => {
    props.navigation.navigate("SettingPage");
  };


  const [getMeRES] = useMutation(GET_ME);

  const submit = async () => {
    const getMyProfile = await getMeRES({
      variables: { id: id },
    });
    console.log("저기니?", getMyProfile);
  };

  // console.log("useMutation {data} : ", data);
  // console.log("GET_ME는 과연 불러오는가 tag :", JSON.parse(data.getMe.tags)[0]);
  // console.log("GET_ME는 과연 불러오는가 img", data.getMe.profileImgLocation);


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

            source={{ uri: myProfile.profileImgLocation }}

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
                <Text style={{ fontSize: 30, color: "white" }}>{myProfile.name}</Text>
              </View>
              <View style={{ backgroundColor: "rgba(255, 0, 0, 0.5)" }}>
                <Text style={{ fontSize: 30, color: "white" }}>{myProfile.birth}</Text>
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
                <Text style={{ fontSize: 30, color: "white" }}>{myProfile.companyName}</Text>
              </View>
              <View style={{ backgroundColor: "rgba(255,0,0,0.5)" }}>
                <Text style={{ fontSize: 30, color: "white" }}>{myProfile.companyRole}</Text>
              </View>
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
              }}
            >
              <View style={{ backgroundColor: "rgba(0,0,255,0.5)" }}>

                <Text style={{ fontSize: 30, color: "white" }}>{myProfile.tags[0]}</Text>
              </View>
              <View style={{ backgroundColor: "rgba(255,0,0,0.5)" }}>
                <Text style={{ fontSize: 30, color: "white" }}>{myProfile.tags[1]}</Text>
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

                <Text style={{ fontSize: 30, color: "white" }}>{myProfile.tags[2]}</Text>
              </View>
              <View style={{ backgroundColor: "rgba(255,0,0,0.5)" }}>
                <Text style={{ fontSize: 30, color: "white" }}>{myProfile.tags[3]}</Text>

              </View>
            </View>
            <View style={{ flex: 1, backgroundColor: "rgba(255,0,0,0.5)" }}>

              <Text style={{ fontSize: 30, color: "white" }}>{myProfile.tags[4]}</Text>
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
  id: myProfileStore.id,
  myProfile: myProfileStore.myProfile.data.getMe,
}))(observer(MyProfilePage));
