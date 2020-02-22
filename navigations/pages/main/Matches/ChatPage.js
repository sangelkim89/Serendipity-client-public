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
  ImageBackground,
} from "react-native";
import { useMutation, useApolloClient, useQuery, useSubscription } from "@apollo/react-hooks";
import { FontAwesome } from "@expo/vector-icons";
import { inject, observer } from "mobx-react";
import { Button, Input } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";

import { GET_MESSAGE, SEND_MESSAGE, NEW_MESSAGE, GET_ROOM } from "../../../queries";

function ChatPage(props) {
  console.log("CHATPAGE RENDERED!!!");
  const { navigation, myId, refreshRoomList, subChats, addNewOne } = props;
  const { id, messages, participants } = navigation.state.params;
  // console.log("props.navigation.state.params : ", props.navigation.state.params);
  // console.log("messages in chatPage.js : ", messages);
  const opponent = participants[0].id === myId ? participants[1] : participants[0];
  // console.log("myId in chatpage : ", myId);
  // console.log("opponent : ", opponent);
  // console.log("messages in chatPage : ", messages);
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
    fetchPolicy: "network-only",
  });

  // 구독-할당한 data에 내용이 있으면 기존 message배열에 추가
  const handleNewMessage = () => {
    if (!loading) {
      if (newMsgData !== undefined) {
        const { newMessage } = newMsgData;
        console.log("newMessage in chatPage.js : ", newMessage);
        subChats(id, opponent.id, newMessage);
      }
    }
  };

  // data값을 지켜보며 변경이 있을 때만 실행됨(useEffect === componentDidMount + componentDidUpdate)
  useEffect(() => {
    console.log("useEffect in chatpage.js invoked!!!");
    handleNewMessage();
  }, [newMsgData]);

  const [getRoomMethod, { data: initRoomData }] = useMutation(GET_ROOM, {
    variables: { id: myId },
    fetchPolicy: "no-cache",
  });

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
      const newOne = await getRoomMethod();
      console.log("newOne outside in chatPage - refreshRoomList 작동 arg : ", newOne);
      console.log("initRoomData outside in chatPage - refreshRoomList 작동 arg : ", initRoomData);
      if (newOne !== undefined) {
        console.log("newOne in chatPage - refreshRoomList 작동 arg : ", newOne);
        // refreshRoomList(newOne.data.getRoom);
        addNewOne(newOne.data.getRoom);
      }
      setMessage("");
    } catch (e) {
      console.log("onsubmit error in chatpage : ", e);
    }
  };

  return (
    <ImageBackground
      source={require("../../../../assets/gradient2.jpg")}
      style={{ width: "100%", height: "100%" }}
    >
      {/* <KeyboardAvoidingView enabled behavior="padding"> */}

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
        <Text style={{ fontSize: 18 }}>{"     "}</Text>

        <KeyboardAvoidingView behavior="position">
          <View>
            {/* 오렌지 박스 시작 */}
            <View style={styles.container}>
              <TouchableOpacity
                style={{
                  marginLeft: 10,
                  marginTop: 30,
                  position: "absolute",
                  flex: 1,
                  zIndex: 100,
                }}
                onPress={() => {
                  props.navigation.navigate("MatchPageList");
                }}
              >
                <FontAwesome name="arrow-circle-left" style={styles.backText} />
              </TouchableOpacity>

              <View style={styles.profile}>
                <TouchableOpacity onPress={moveProfile}>
                  <Image
                    source={{
                      uri: opponent.profileImgLocation,
                    }}
                    style={styles.image}
                  />
                  <Text style={styles.name}>{opponent.name}</Text>
                </TouchableOpacity>
              </View>
            </View>
            {/* 스크롤뷰 시작 */}
            <View style={styles.container2}>
              <ScrollView
                style={{ height: "70%" }}
                ref={ref => (this.scrollView = ref)}
                onContentSizeChange={() => {
                  this.scrollView.scrollToEnd({ animated: false });
                }}
              >
                {messages.map((msg, i) => {
                  function timeStamp() {
                    let timeArr = msg.createdAt.substring(11, 16).split(":");
                    let hour = Number(timeArr[0]) + 9;

                    if (hour > 24) {
                      if ((hour - 24).toString().length < 2) {
                        return `0${hour.toString()}:${timeArr[1]}`;
                      }
                    } else {
                      return `${hour.toString()}:${timeArr[1]}`;
                    }
                  }
                  return msg.from.id === myId ? (
                    <View key={i} style={styles.meChat}>
                      <Text>{msg.text}</Text>
                      <Text style={styles.timeStamp}>{timeStamp()}</Text>
                    </View>
                  ) : (
                    <View key={i} style={styles.otherChat}>
                      <Image source={{ uri: opponent.profileImgLocation }} style={styles.image} />
                      <View style={styles.otherChatText}>
                        <Text>{msg.text}</Text>
                        <Text style={styles.timeStamp}>{timeStamp()}</Text>
                      </View>
                    </View>
                  );
                })}
              </ScrollView>
            </View>
            <View style={styles.container}>
              <View style={styles.chatInput}>
                <Input
                  onChangeText={onChangeText}
                  value={message}
                  inputContainerStyle={{ borderColor: "#6c5ce7" }}
                  style={{
                    position: "fixed",
                    bottom: 0,
                    widht: "80%",
                  }}
                  rightIcon={
                    <TouchableOpacity onPress={onSubmit} style={{ marginRight: 10 }}>
                      <Icon
                        name="paper-plane"
                        size={25}
                        color="#6c5ce7"
                        style={{ marginRight: 10 }}
                      />
                    </TouchableOpacity>
                  }
                />
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Suspense>
      {/* </KeyboardAvoidingView> */}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 10,
  },
  container2: {
    paddingBottom: 10,
  },

  profile: {
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  name: {
    marginLeft: 20,
    justifyContent: "center",
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
    backgroundColor: "#ffeaa7",
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
    backgroundColor: "#97caef",
  },
  timeStamp: {
    fontSize: 8,
  },
  chatInput: {
    marginTop: 20,
    flexDirection: "row",
  },
  backText: {
    color: "#6c5ce7",
    fontSize: 30,
  },
});

export default inject(({ myProfileStore, matchStore }) => ({
  myId: myProfileStore.id,
  refreshRoomList: matchStore.refreshRoomList,
  subChats: matchStore.subChats,
  addNewOne: matchStore.addNewOne,
}))(observer(ChatPage));

// message의 createdAt 제공 요청
