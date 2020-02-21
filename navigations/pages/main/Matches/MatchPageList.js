import React, { Suspense, useEffect } from "react";
import {
  Text,
  ScrollView,
  View,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  ImageBackground,
} from "react-native";
import { observer, inject } from "mobx-react";
import { useSubscription, useQuery } from "@apollo/react-hooks";
import { Button, Input } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";

import RoomItem from "./RoomItem";
import { NEW_ROOM, GET_ROOM } from "../../../queries";

const MatchPageList = props => {
  console.log("MATCHPAGE RENDERED!!!");
  const {
    roomList,
    messages,
    matchExer1,
    navigation,
    myId,
    refreshRoomList,
    likeRoomId,
    subMsgs,
    newOne,
  } = props;
  // console.log("messages in matchPage.js : ", messages);
  // useQuery - getRoom : huntPage.js로 옮김. login.js/matchPageList에서는 에러발생
  // console.log("myId in matchPageList.js : ", myId);
  // const { data: roomData } = useQuery(GET_ROOM, { variables: { id: myId } });
  // console.log("roomData in matchPageList.js : ", roomData);
  // refreshRoomList(roomData.getRoom); // mobx roomlist에 저장

  const { data, loading } = useSubscription(NEW_ROOM, {
    variables: { id: myId },
    fetchPolicy: "no-cache",
  });

  // 구독-할당한 data에 내용이 있으면 기존 message배열에 추가
  const handleNewRoom = () => {
    // console.log("handle newroom invoked!");
    // console.log("data in handle newroom : ", loading, data);
    if (!loading) {
      console.log("loading passed!");
      if (data.newRoom !== null) {
        // const { newRoom } = data;
        console.log("newRoom.participants in huntPage : ", data.newRoom.participants);
        // Alert.alert("Match!!!");
        subMsgs(data.newRoom);
      } else {
        console.log("roomData in matchPageList.js is undefined!");
      }
    }
  };

  // data값을 지켜보며 변경이 있을 때만 실행됨 - subscription
  useEffect(() => {
    handleNewRoom();
    console.log("useEffect invoked!");
  }, [data]);

  useEffect(() => {
    if (newOne !== null) {
      refreshRoomList(newOne);
      console.log("useEffect invoked in refresh!!!!!");
    }
  }, []);

  const moveHunt = () => {
    navigation.navigate("HuntPage");
  };

  return (
    <ImageBackground
      source={require("../../../../assets/gradient2.jpg")}
      style={{ width: "100%", height: "100%", backgroundColor: "black" }}
    >
      <Suspense
        fallback={
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ActivityIndicator />
          </View>
        }
      >
        <View style={styles.container}>
          <ScrollView style={styles.list}>
            {messages.length !== 0 ? (
              messages.map((room, i) => {
                return <RoomItem room={room} key={i} navigation={navigation} />;
              })
            ) : (
              <View style={styles.textContainer}>
                <TouchableOpacity onPress={moveHunt}>
                  <Text style={styles.text}>Find Your Friends!</Text>
                </TouchableOpacity>
              </View>
            )}
          </ScrollView>
        </View>
      </Suspense>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    // backgroundColor: "#f7d794",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  list: {
    width: "100%",
  },
  textContainer: {
    justifyContent: "center",
    marginTop: 260,
    marginLeft: 95,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default inject(({ matchStore, myProfileStore }) => ({
  roomList: matchStore.roomList,
  messages: matchStore.messages,
  matchExer1: matchStore.matchExer1,
  refreshRoomList: matchStore.refreshRoomList,
  myId: myProfileStore.id,
  likeRoomId: myProfileStore.likeRoomId,
  subMsgs: matchStore.subMsgs,
  newOne: matchStore.newOne,
}))(observer(MatchPageList));
