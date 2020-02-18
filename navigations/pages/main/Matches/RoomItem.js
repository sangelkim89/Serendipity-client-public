import React from "react";
import { Text, View, Image, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { observer, inject } from "mobx-react";

const RoomItem = props => {
  const { room, navigation, myId } = props;

  function moveChatRoom() {
    navigation.navigate("ChatPage", {
      id: room.id,
      messages: room.message,
      participants: room.participants,
    });
  }

  const opponent = room.participants[0].id === myId ? room.participants[1] : room.participants[0];
  console.log("room.message in roomitem : ", room.message);
  // console.log("myId in roomitem : ", myId);
  // console.log("opponent in roomitem : ", opponent);

  console.log("message array from roomitem: ", room.messages);

  if (room.message.length !== 0) {
    const lastChatRaw = room.message[room.message.length - 1]["text"];
    const lastChat = lastChatRaw.length > 30 ? lastChatRaw.substring(0, 40) + "..." : lastChatRaw;
    return (
      <TouchableOpacity onPress={moveChatRoom} style={styles.touch}>
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
            <Text>{lastChat}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  } else {
    return (
      <TouchableOpacity onPress={moveChatRoom} style={styles.touch}>
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
    // backgroundColor: "green",
  },
  touch: {
    padding: 5,
    // backgroundColor: "red",
  },
  info: {
    padding: 10,
    // backgroundColor: "brown",
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
  },
});

export default inject(({ myProfileStore }) => ({
  myId: myProfileStore.id,
}))(observer(RoomItem));
