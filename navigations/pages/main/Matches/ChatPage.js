import React from "react";
import { Text, View, TouchableOpacity } from "react-native";

const ChatPage = ({ navigation }) => (
  <View>
    <Text>ChatPage</Text>
    <TouchableOpacity onPress={() => navigation.replace("MatchPageList")}>
      <Text>Go to MatchPageList!</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => navigation.replace("ProfilePage")}>
      <Text>Go to ProfilePage!</Text>
    </TouchableOpacity>
  </View>
);

export default ChatPage;
