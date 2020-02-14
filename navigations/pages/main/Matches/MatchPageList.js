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
import { useSubscription } from "@apollo/react-hooks";

import RoomItem from "./RoomItem";
import { NEW_ROOM } from "../../../queries";

const MatchPageList = props => {
  const { roomList, matchExer1, navigation } = props;

  const { data } = useSubscription(NEW_ROOM);

  // 구독-할당한 data에 내용이 있으면 기존 message배열에 추가
  const handleNewRoom = () => {
    if (data !== undefined) {
      const { newRoom } = data;
      roomList = [...roomList, newRoom];
    }
  };

  // data값을 지켜보며 변경이 있을 때만 실행됨
  useEffect(() => {
    handleNewRoom();
  }, [data]);

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
          {roomList.map((room, i) => {
            return <RoomItem room={room} key={i} navigation={navigation} />;
          })}
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

export default inject(({ matchStore }) => ({
  roomList: matchStore.roomList,
  matchExer1: matchStore.matchExer1,
}))(observer(MatchPageList));
