import React from "react";
import { Text, ScrollView, View, TouchableOpacity, StyleSheet } from "react-native";
import { observer, inject } from "mobx-react";

import RoomItem from "./RoomItem";

const MatchPageList = props => {
  const { roomList, matchExer1, navigation } = props;
  // console.log("navigation from MatchPageList : ", navigation);
  return (
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: "yellow",
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

// // 스테이트
// @observable roomList = []; // 채팅방

// // 메소드
// @action
// matchExer = () => {
//   console.log("매치스토어 메소드 작동");
// };
