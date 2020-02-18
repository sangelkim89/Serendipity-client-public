import React, { Suspense, useState, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  TextInput,
  ActivityIndicator,
  KeyboardAvoidingView,
} from "react-native";
import { useMutation, useApolloClient, useQuery, useSubscription } from "@apollo/react-hooks";

import { inject, observer } from "mobx-react";

import { GET_MESSAGE, SEND_MESSAGE, NEW_MESSAGE } from "../../../queries";

function ChatPage(props) {
  const { navigation, myId, refreshRoomList, subChats } = props;
  const { id, messages, participants } = navigation.state.params;
  // console.log("props.navigation.state.params : ", props.navigation.state.params);
  // console.log("messages in chatPage.js : ", messages);
  const opponent = participants[0].id === myId ? participants[1] : participants[0];
  // console.log("myId in chatpage : ", myId);
  // console.log("opponent : ", opponent);

  // 채팅인풋메세지 - 각 방의 독립성을 위해 store에서 useState로 옮김
  const [message, setMessage] = useState("");

  // 채팅 페이지
  const onChangeText = e => {
    setMessage(e);
    console.log("채팅 인풋 메세지 입력 : ", message);
  };

  // 프로필 페이지로 이동, 이미지와 프로필 정보를 파람스로 전달
  const moveProfile = () => {
    navigation.navigate("ProfilePage", { profile: opponent });
  };

  // 메세지 서버 송부
  const [sendMessageMethod, { data }] = useMutation(SEND_MESSAGE);

  // data에 구독한 데이터 할당
  const { data: newMsgData, loading } = useSubscription(NEW_MESSAGE, {
    variables: { roomId: id },
    fetchPolicy: "no-cache",
  });

  // 구독-할당한 data에 내용이 있으면 기존 message배열에 추가
  const handleNewMessage = () => {
    if (!loading) {
      if (newMsgData !== undefined) {
        const { newMessage } = newMsgData;
        console.log("newMessage in chatPage.js : ", newMessage);
        subChats(id, myId, opponent.id, newMessage);
      }
    }
  };

  // data값을 지켜보며 변경이 있을 때만 실행됨(useEffect === componentDidMount + componentDidUpdate)
  useEffect(() => {
    console.log("useEffect in chatpage.js invoked!!!");
    handleNewMessage();
  }, [newMsgData]);

  // message를 가져다가 mutation 날리는 메소드
  const onSubmit = async () => {
    if (message === "") {
      return;
    }
    try {
      console.log("message before send : ", message);
      const {
        data: { sendMessage },
      } = await sendMessageMethod({
        variables: { roomId: id, message: message, toId: opponent.id },
      });
      console.log("sendMessage sent by method : ", sendMessage);
      // messages.push(sendMessage);
      setMessage("");
    } catch (e) {
      console.log("onsubmit error in chatpage : s", e);
    }
  };

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
        <View style={styles.profile}>
          <TouchableOpacity onPress={moveProfile}>
            <Image
              source={{
                uri: opponent.profileImgLocation,
              }}
              style={styles.image}
            />
            <Text>{opponent.name}</Text>
          </TouchableOpacity>
        </View>
        {/* <KeyboardAvoidingView enabled behavior="padding"> */}
        <View>
          <ScrollView>
            {messages.map((msg, i) => {
              return msg.from.id === myId ? (
                <View key={i} style={styles.meChat}>
                  <Text>{msg.text}</Text>
                  <Text style={styles.timeStamp}></Text>
                </View>
              ) : (
                <View key={i} style={styles.otherChat}>
                  <Image source={{ uri: opponent.profileImgLocation }} style={styles.image} />
                  <View style={styles.otherChatText}>
                    <Text>{msg.text}</Text>
                    <Text style={styles.timeStamp}></Text>
                  </View>
                </View>
              );
            })}
            <TextInput
              onChangeText={onChangeText}
              value={message}
              style={{ borderStyle: "solid", borderColor: "black", borderWidth: 1 }}
            />
            <TouchableOpacity onPress={onSubmit}>
              <Text>입력</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
        {/* </KeyboardAvoidingView> */}
      </View>
    </Suspense>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    paddingBottom: 60,
    margin: 10,
  },
  profile: {
    alignItems: "center",
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 20,
  },
  meChat: {
    alignSelf: "flex-end",
    padding: 10,
    borderStyle: "solid",
    borderRadius: 10,
    margin: 5,
    backgroundColor: "#97caef",
  },
  otherChat: {
    flexDirection: "row",
    padding: 10,
    // justifyContent: "center",
  },
  otherChatText: {
    borderRadius: 10,
    padding: 10,
    margin: 5,
    backgroundColor: "#cccccc",
  },
  timeStamp: {
    fontSize: 8,
  },
});

export default inject(({ myProfileStore, matchStore }) => ({
  myId: myProfileStore.id,
  refreshRoomList: matchStore.refreshRoomList,
  subChats: matchStore.subChats,
}))(observer(ChatPage));

// message의 createdAt 제공 요청
