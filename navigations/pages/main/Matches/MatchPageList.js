import React from "react";
import { Text, View, TouchableOpacity } from "react-native";

const MatchPageList = ({ navigation }) => (
  <View>
    <Text>MatchPageList</Text>
    <TouchableOpacity onPress={() => navigation.navigate("ChatPage")}>
      <Text>Go to ChatPage!</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => navigation.navigate("ProfilePage")}>
      <Text>Go to ProfilePage!</Text>
    </TouchableOpacity>
  </View>
);

export default MatchPageList;
