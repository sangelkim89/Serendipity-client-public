import React, { Suspense, useEffect } from "react";
import {
  Text,
  ScrollView,
  View,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { observer, inject } from "mobx-react";
import { useSubscription, useQuery } from "@apollo/react-hooks";

import RoomItem from "./RoomItem";
import { NEW_ROOM, GET_ROOM } from "../../../queries";

const MatchPageList = props => {
  const { roomList, messages, matchExer1, navigation, myId, refreshRoomList, likeRoomId } = props;
  // console.log("messages in matchPage.js : ", messages);
  // useQuery - getRoom : huntPage.js로 옮김. login.js/matchPageList에서는 에러발생
  // console.log("myId in matchPageList.js : ", myId);
  // const { data: roomData } = useQuery(GET_ROOM, { variables: { id: myId } });
  // console.log("roomData in matchPageList.js : ", roomData);
  // refreshRoomList(roomData.getRoom); // mobx roomlist에 저장

  // const { data } = useSubscription(NEW_ROOM, { variables: { id: myId } });
  // // console.log("roomlist 1 : ", roomList);

  // // // 구독-할당한 data에 내용이 있으면 기존 message배열에 추가
  // const handleNewRoom = () => {
  //   if (data !== undefined) {
  //     const { newRoom } = data;
  //     console.log("newRoom in matchPageList : ", newRoom);
  //     if (newRoom !== null) {
  //       console.log("newRoom : ", newRoom);
  //       messages.unshift(newRoom);
  //       console.log("messages in matchPageList after like : ", messages);
  //     }
  //   } else {
  //     console.log("data in matchPageList.js is undefined!");
  //   }
  // };

  // // data값을 지켜보며 변경이 있을 때만 실행됨
  // useEffect(() => {
  //   handleNewRoom();
  //   console.log("useEffect invoked!");
  // }, [data]);

  return (
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
        <Text>MatchPageList</Text>
        <ScrollView style={styles.list}>
          {messages.length !== 0 ? (
            messages.map((room, i) => {
              return <RoomItem room={room} key={i} navigation={navigation} />;
            })
          ) : (
            <Text>친구를 찾아서 좋아요 해보세요!</Text>
          )}

          <TouchableOpacity onPress={matchExer1}>
            <Text>touch for method1 test</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </Suspense>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: "#f7d794",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  list: {
    width: "100%",
  },
});

export default inject(({ matchStore, myProfileStore }) => ({
  roomList: matchStore.roomList,
  messages: matchStore.messages,
  matchExer1: matchStore.matchExer1,
  refreshRoomList: matchStore.refreshRoomList,
  myId: myProfileStore.id,
  likeRoomId: myProfileStore.likeRoomId,
}))(observer(MatchPageList));
