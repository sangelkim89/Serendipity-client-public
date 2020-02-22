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
import { NEW_ROOM, GET_ROOM, UPDATE_ROOMS } from "../../../queries";

const MatchPageList = props => {
  console.log("MATCHPAGE RENDERED!!!");
  const {
    roomList,
    navigation,
    myId,
    refreshRoomList,
    likeRoomId,
    subMsgs,
    newOne,
    subRoomByNewMsg,
  } = props;

  console.log("myId : ", myId);

  const [getRoomMethod, { data }] = useMutation(GET_ROOM);
  // console.log("'matchPageList body'에서 겟룸 데이터  : ", data);

  const handleGetRoom = async () => {
    const roomDataHGR = await getRoomMethod({
      variables: { id: myId },
    });
    refreshRoomList(roomDataHGR.data.getRoom);
  };

  useEffect(() => {
    handleGetRoom();
  }, []);

  const { data: updatedRM, loading } = useSubscription(UPDATE_ROOMS, {
    variables: { id: myId },
  });

  console.log("updatedRM : ", loading, updatedRM);

  const handleUpdateRoom = () => {
    if (!loading) {
      console.log("loading passed!");
      if (updatedRM !== undefined) {
        // const { newRoom } = data;
        console.log("섭스크립션 내용있다!");
        // Alert.alert("Match!!!");
        subRoomByNewMsg(updatedRM.updateRooms);
      } else {
        console.log("섭스크립션 내용없다!");
      }
    }
  };

  // data가 업데이트 된 룸이니까 아래서 룸을 맵핑할때 합쳐서 맵핑
  useEffect(() => {
    console.log("useEffect is invoked for matchPageList subscription");
    handleUpdateRoom();
  }, [updatedRM]);

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
  subRoomByNewMsg: matchStore.subRoomByNewMsg,
}))(observer(MatchPageList));
