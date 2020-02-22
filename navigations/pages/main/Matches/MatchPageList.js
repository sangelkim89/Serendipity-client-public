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
import { useSubscription, useQuery, useMutation, useLazyQuery } from "@apollo/react-hooks";
import { Button, Input } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";

import RoomItem from "./RoomItem";
import { NEW_ROOM, GET_ROOM } from "../../../queries";

const MatchPageList = props => {
  console.log("MATCHPAGE RENDERED!!!");
  const {
    roomList,
    matchExer1,
    navigation,
    myId,
    refreshRoomList,
    likeRoomId,
    subMsgs,
    newOne,
  } = props;

  // useEffect(() => {
  //   console.log("useEffect in matchPageList!!!");
  // }, [roomList]);

  // const { data, loading } = useSubscription(NEW_ROOM, {
  //   variables: { id: myId },
  //   fetchPolicy: "no-cache",
  // });

  // // 구독-할당한 data에 내용이 있으면 기존 message배열에 추가
  // const handleNewRoom = () => {
  //   // console.log("handle newroom invoked!");
  //   // console.log("data in handle newroom : ", loading, data);
  //   if (!loading) {
  //     console.log("loading passed!");
  //     if (data.newRoom !== null) {
  //       // const { newRoom } = data;
  //       console.log("newRoom.participants in huntPage : ", data.newRoom.participants);
  //       // Alert.alert("Match!!!");
  //       subMsgs(data.newRoom);
  //     } else {
  //       console.log("roomData in matchPageList.js is undefined!");
  //     }
  //   }
  // };

  // // data값을 지켜보며 변경이 있을 때만 실행됨 - subscription
  // useEffect(() => {
  //   handleNewRoom();
  //   console.log("useEffect invoked!");
  // }, [data]);

  // useEffect(() => {
  //   if (newOne !== null) {
  //     refreshRoomList(newOne);
  //     console.log("useEffect invoked in refresh!!!!!");
  //   }
  // }, []);

  // useQuery - getRoom : login.js/matchPageList에서는 에러발생

  console.log("myId : ", myId);
  const { loading, data } = useQuery(GET_ROOM, {
    variables: { id: "myId : ", myId },
    fetchPolicy: "network-only",
  });
  console.log(data);

  useEffect(() => {
    console.log("useEffect invoked");
    if (!loading) {
      console.log("useEffect for getRoomMethod", data);
      // 왜 useEffect 안으로 들어가면 채팅방이 보이지 않는가???
      if (data !== undefined && data !== null) {
        console.log("data 있을때");
        console.log(data);
        refreshRoomList(data.getRoom);
      } // mobx roomlist에 저장
    }
  }, []);

  // // 최초렌더
  // if (initRoomData !== undefined && initRoomData !== null) {
  //   console.log("useEffect 바깥 initRoomData있을때!!!");
  //   refreshRoomList(initRoomData.getRoom);
  // } // mobx roomlist에 저장

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
            {roomList.length !== 0 ? (
              roomList.map((room, i) => {
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
  matchExer1: matchStore.matchExer1,
  refreshRoomList: matchStore.refreshRoomList,
  myId: myProfileStore.id,
  likeRoomId: myProfileStore.likeRoomId,
  subMsgs: matchStore.subMsgs,
  newOne: matchStore.newOne,
}))(observer(MatchPageList));
