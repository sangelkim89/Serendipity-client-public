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

  console.log("myId : ", myId);

  const [getRoomMethod, { data }] = useMutation(GET_ROOM);
  console.log("'matchPageList body'에서 겟룸 데이터  : ", data);

  const handleGetRoom = async () => {
    const roomDataHGR = await getRoomMethod({
      variables: { id: myId },
    });
    await console.log("roomDataHGR : ", roomDataHGR);
    return roomDataHGR;
  };

  useEffect(() => {
    const roomdataUE = handleGetRoom();
    console.log("useEffect invoked");
    if (roomdataUE !== undefined) {
      console.log("'useEffect 안' 겟룸메소드 결과 : ", roomdataUE);
      refreshRoomList(roomdataUE.data.getRoom);
      // mobx roomlist에 저장
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
            {roomList !== undefined && roomList.length !== 0 ? (
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
