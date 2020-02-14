import React from "react";
import { Text, View, Image, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const RoomItem = props => {
  const { room, navigation } = props;
  // console.log("navigation from roomitem: ", navigation);
  function moveChatRoom() {
    navigation.navigate("ChatPage", { room: room });
  }

  const lastChatRaw = room.chats[room.chats.length - 1]["text"];

  const lastChat = lastChatRaw.length > 30 ? lastChatRaw.substring(0, 40) + "..." : lastChatRaw;

  return (
    <TouchableOpacity onPress={moveChatRoom} style={styles.touch}>
      <View style={styles.container}>
        <View style={styles.imgContainer}>
          <Image source={{ uri: room.image }} style={styles.image} />
        </View>
        <View style={styles.info}>
          <Text style={styles.userId}>{room.profile.userId}</Text>
          <Text>{lastChat}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
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

export default RoomItem;
