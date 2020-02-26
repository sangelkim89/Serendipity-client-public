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
import { useMutation, useSubscription } from "@apollo/react-hooks";
import { FontAwesome } from "@expo/vector-icons";
import { inject, observer } from "mobx-react";
import { Input } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";

import { SEND_MESSAGE, NEW_MESSAGE, GET_ROOM } from "../../../queries";

function ChatPage(props) {
  console.log("CHATPAGE RENDERED!!!");
  const { navigation, myId, refreshRoomList, subChats, addNewOne, newOne, refreshChat } = props;
  const { id, messages, participants } = navigation.state.params;
  console.log("ROOM_ID", id);

  const opponent = participants[0].id === myId ? participants[1] : participants[0];

  const [message, setMessage] = useState("");
  const combinedMSGs = messages;
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
  const { data: roomWithNewMSG, loading: loadingMsg } = useSubscription(NEW_MESSAGE, {
    variables: { roomId: id },
  });

  // // 구독-할당한 data에 내용이 있으면 기존 message배열에 추가
  const handleNewMessage = () => {
    console.log("HANDLE_NEW_MSG_ACT");
    if (!loadingMsg) {
      if (roomWithNewMSG !== undefined) {
        const { newMessage } = roomWithNewMSG;
        subChats(newMessage); // 새로운 메세지가 포함된 룸 하나로 전체 룸리스트 업데이트
        const extractedData = newMessage.room.messages[newMessage.room.messages.length - 1];
        combinedMSGs.push(extractedData);
        console.log("combinedMSGs in handleNewMsg : ", combinedMSGs[combinedMSGs.length - 1]);
      }
    }
  };

  // data값을 지켜보며 변경이 있을 때만 실행됨
  useEffect(() => {
    console.log("useEffect in chatpage.js invoked!!!");
    handleNewMessage();
  }, [roomWithNewMSG]);

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
      // console.log("message before send : ", message);
      const {
        data: { sendMessage },
      } = await sendMessageMethod({
        variables: { roomId: id, message: message, toId: opponent.id },
      });
      setMessage("");
    } catch (e) {
      console.log("onsubmit error in chatpage : ", e);
    }
  };

  // scroll bottom
  const [scrollView, downScroll] = useState(null);
  function scrollToEnd() {
    this.scrollView.scrollToEnd();
  }

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
                {combinedMSGs.map((msg, i) => {
                  function timeStamp() {
                    let timeArr = msg.createdAt.substring(11, 16).split(":");
                    let hour = Number(timeArr[0]) + 9;

                    if (hour > 24) {
                      if ((hour - 24).toString().length < 2) {
                        console.log("시간1", hour);
                        return `0${(hour - 24).toString()}:${timeArr[1]}`;
                      }
                    } else {
                      if (hour > 24) {
                        console.log("시간2", hour - 24);
                        return `${(hour - 24).toString()}:${timeArr[1]}`;
                      } else {
                        console.log("시간3", hour);
                        return `${hour.toString()}:${timeArr[1]}`;
                      }
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
  newOne: matchStore.newOne,
  refreshChat: matchStore.refreshChat,
}))(observer(ChatPage));

// message의 createdAt 제공 요청
