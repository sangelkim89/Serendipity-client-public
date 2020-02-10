import React, { Component, Suspense } from "react";
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
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

// import withSuspense from "./withSuspense";

class ChatPage extends Component {
  constructor(props) {
    super(props);
    this.moveProfile = this.moveProfile.bind(this);
  }

  moveProfile() {
    const { navigation } = this.props;
    const {
      room: { image, profile },
    } = navigation.state.params;
    navigation.navigate("ProfilePage", { image: image, profile: profile });
  }

  // componentDidMount() {
  //   this.ref.scrollView.scrollToEnd();
  // }

  render() {
    const { navigation } = this.props;
    console.log("navigation in chatpage : ", navigation);
    const {
      room: { image, profile, chats },
    } = navigation.state.params;
    const time =
      new Date().getHours().length === 1 ? "0" + new Date().getHours() : new Date().getHours();
    const minute =
      new Date().getMinutes().length === 1
        ? "0" + new Date().getMinutes()
        : new Date().getMinutes();

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
            <TouchableOpacity onPress={this.moveProfile}>
              <Image source={{ uri: image }} style={styles.image} />
              <Text>{profile.userId}</Text>
            </TouchableOpacity>
          </View>
          {/* <KeyboardAwareScrollView
            resetScrollToCoords={{ x: 0, y: 0 }}
            contentContainerStyle={styles.container}
            scrollEnabled={false}
          > */}
          <KeyboardAvoidingView style={{ flex: 1 }} enable behavior="padding">
            <ScrollView>
              {chats.map((chat, i) => {
                return chat.me ? (
                  <View key={i} style={styles.meChat}>
                    <Text>{chat.me}</Text>
                    <Text style={styles.timeStamp}>{time + " : " + minute}</Text>
                  </View>
                ) : (
                  <View key={i} style={styles.otherChat}>
                    <Image source={{ uri: image }} style={styles.image} />
                    <View style={styles.otherChatText}>
                      <Text>{chat.other}</Text>
                      <Text style={styles.timeStamp}>{time + " : " + minute}</Text>
                    </View>
                  </View>
                );
              })}
            </ScrollView>
            <TextInput />
            <TouchableOpacity>
              <Text>입력</Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
          {/* </KeyboardAwareScrollView> */}
        </View>
      </Suspense>
    );
  }
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

export default ChatPage;
// export default withSuspense(ChatPage);
