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
  const { messages, navigation, myId } = props;
  const {
    messages: { image, profile, roomId },
  } = navigation.state.params;

  // 채팅인풋메세지 - 각 방의 독립성을 위해 store에서 useState로 옮김
  const [message, setMessage] = useState("");

  // 채팅 페이지
  const onChangeText = e => {
    setMessage(e);
    console.log("인풋 메세지 입력 : ", message);
  };

  // 프로필 페이지로 이동, 이미지와 프로필 정보를 파람스로 전달
  const moveProfile = () => {
    navigation.navigate("ProfilePage", { image: image, profile: profile });
  };

  // 메세지 서버 송부
  const sendMessageMutation = useMutation(SEND_MESSAGE, {
    variables: {
      text: message,
    },
  });

  // 메세지를 서버에서 받아와서 oldMessages로 할당
  const {
    data: { messages: oldMessages },
    error,
  } = useQuery(GET_MESSAGES, {
    suspend: true,
  });

  // 기존 messages 스테이트를 oldMessages로 업데이트
  messages = [...oldMessages];

  // data에 구독한 데이터 할당
  const { data } = useSubscription(NEW_MESSAGE);

  // 구독-할당한 data에 내용이 있으면 기존 message배열에 추가
  const handleNewMessage = () => {
    if (data !== undefined) {
      const { newMessage } = data;
      messages = [...messages, newMessage];
    }
  };

  // data값을 지켜보며 변경이 있을 때만 실행됨(useEffect === componentDidMount + componentDidUpdate)
  useEffect(() => {
    handleNewMessage();
  }, [data]);

  // message를 가져다가 mutation 날리는 메소드
  const onSubmit = async () => {
    if (message === "") {
      return;
    }
    try {
      await sendMessageMutation();
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
            <Image source={{ uri: image }} style={styles.image} />
            <Text>{profile.userId}</Text>
          </TouchableOpacity>
        </View>
        <KeyboardAvoidingView enabled behavior="padding">
          <View>
            <ScrollView>
              {chats.map((chat, i) => {
                return chat.id === myId ? (
                  <View key={i} style={styles.meChat}>
                    <Text>{chat.text}</Text>
                    <Text style={styles.timeStamp}></Text>
                  </View>
                ) : (
                  <View key={i} style={styles.otherChat}>
                    <Image source={{ uri: image }} style={styles.image} />
                    <View style={styles.otherChatText}>
                      <Text>{chat.text}</Text>
                      <Text style={styles.timeStamp}>{time + " : " + minute}</Text>
                    </View>
                  </View>
                );
              })}
            </ScrollView>
          </View>
          <TextInput onChangeText={onChangeText} value={message} />
          <TouchableOpacity>
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
  messages: matchStore.messages,
  myId: myProfileStore.id,
}))(observer(ChatPage));
