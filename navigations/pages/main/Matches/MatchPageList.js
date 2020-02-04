import React from "react";
import { Text, View, TouchableOpacity } from "react-native";

const MatchPageList = ({ navigation }) => (
  <View>
    <Text>MatchPageList</Text>
    <TouchableOpacity onPress={() => navigation.replace("ChatPage")}>
      <Text>Go to ChatPage!</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => navigation.replace("ProfilePage")}>
      <Text>Go to ProfilePage!</Text>
    </TouchableOpacity>
  </View>
);

export default MatchPageList;
