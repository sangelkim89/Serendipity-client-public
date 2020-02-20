import React from "react";
import { Text, View, Image, StyleSheet, ImageBackground, Alert } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { observer, inject } from "mobx-react";
import { useMutation } from "@apollo/react-hooks";
import { ROOM_DELETE } from "../../../queries";

const RoomItem = props => {
  const { room, navigation, myId, delRoomView } = props;

  const moveChatRoom = () => {
    navigation.navigate("ChatPage", {
      id: room.id,
      messages: room.message,
      participants: room.participants,
    });
  };

  const [roomDelMethod, { data }] = useMutation(ROOM_DELETE);

  const onDelRoom = () => {
    Alert.alert(
      "채팅방을 삭제하시겠습니까?",
      "채팅 내용이 모두 사라지며 상대방과 다시 매치될 수 없습니다.",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => {
            console.log("OK Pressed");
            console.log(room.id);
            roomDelMethod({ variables: { roomId: room.id } });
            // 뷰 삭제 - 스토어에서 해당 뷰에서 룸 삭제
            delRoomView(room.id);
          },
        },
      ],
      { cancelable: true },
    );
  };

  const opponent = room.participants[0].id === myId ? room.participants[1] : room.participants[0];
  // console.log("myId in roomitem : ", myId);
  // console.log("opponent in roomitem : ", opponent);
  // console.log("message array from roomitem: ", room.messages);

  if (room.message.length !== 0) {
    console.log("room 내용 있는 루트 인");
    const lastChatRaw = room.message[room.message.length - 1]["text"];
    const lastChat = lastChatRaw.length > 30 ? lastChatRaw.substring(0, 40) + "..." : lastChatRaw;
    return (
      <TouchableOpacity onPress={moveChatRoom} style={styles.touch} onLongPress={onDelRoom}>
        <View style={styles.container}>
          <View style={styles.imgContainer}>
            <Image
              source={{
                uri: opponent.profileImgLocation,
              }}
              style={styles.image}
            />
          </View>
          <View style={styles.info}>
            <Text style={styles.userId}>{opponent.name}</Text>
            <Text style={styles.chat}>{lastChat}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  } else {
    return (
      <TouchableOpacity onPress={moveChatRoom} style={styles.touch} onLongPress={onDelRoom}>
        <View style={styles.container}>
          <View style={styles.imgContainer}>
            <Image
              source={{
                uri: opponent.profileImgLocation,
              }}
              style={styles.image}
            />
          </View>
          <View style={styles.info}>
            <Text style={styles.userId}>{opponent.name}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flexDirection: "row",
    backgroundColor: "rgba(0, 0, 0, 0.01)",
    // ios shadow
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    // android shadow
    elevation: 3,
  },
  touch: {
    padding: 5,
    // backgroundColor: "red",
  },
  info: {
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  imgContainer: {
    // backgroundColor: "pink",
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 20,
  },
  userId: {
    fontWeight: "bold",
    fontSize: 20,
    marginLeft: 8,
  },
  chat: {
    marginLeft: 20,
  },
});

export default inject(({ myProfileStore, matchStore }) => ({
  myId: myProfileStore.id,
  delRoomView: matchStore.delRoomView,
}))(observer(RoomItem));
