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

import { GET_MESSAGES, SEND_MESSAGE, NEW_MESSAGE } from "../../../queries";

function ChatPage(props) {
  const { navigation, myId } = props;
  const { id, messages, participants } = navigation.state.params;
  // console.log("props.navigation.state.params : ", props.navigation.state.params);
  // console.log("messages : ", messages);
  const opponent = participants[0].id === myId ? participants[1] : participants[0];

  // 채팅인풋메세지 - 각 방의 독립성을 위해 store에서 useState로 옮김
  const [message, setMessage] = useState("");

  // 채팅 페이지
  const onChangeText = e => {
    setMessage(e);
    console.log("인풋 메세지 입력 : ", message);
  };

  // 프로필 페이지로 이동, 이미지와 프로필 정보를 파람스로 전달
  const moveProfile = () => {
    navigation.navigate("ProfilePage", { profile: opponent });
  };

  // 메세지 서버 송부
  const [sendMessageMethod, { data }] = useMutation(SEND_MESSAGE);

  // // 메세지를 서버에서 받아와서 oldMessages로 할당
  // const {
  //   data: { messages: oldMessages },
  //   error,
  // } = useQuery(GET_MESSAGES, {
  //   suspend: true,
  // });

  // // 기존 messages 스테이트를 oldMessages로 업데이트
  // messages = [...oldMessages];

  // // data에 구독한 데이터 할당
  // const { data } = useSubscription(NEW_MESSAGE);

  // // 구독-할당한 data에 내용이 있으면 기존 message배열에 추가
  // const handleNewMessaged = () => {
  //   if (data !== undefined) {
  //     const { newMessage } = data;
  //     messages = [...messages, newMessage];
  //   }
  // };

  // // data값을 지켜보며 변경이 있을 때만 실행됨(useEffect === componentDidMount + componentDidUpdate)
  // useEffect(() => {
  //   handleNewMessage();
  // }, [data]);

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
        <KeyboardAvoidingView enabled behavior="padding">
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
            </ScrollView>
          </View>
          <TextInput onChangeText={onChangeText} value={message} />
          <TouchableOpacity onPress={onSubmit}>
            <Text>입력</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    </Suspense>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
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

export default inject(({ matchStore, myProfileStore }) => ({
  myId: myProfileStore.id,
}))(observer(ChatPage));

// message의 createdAt 제공 요청
