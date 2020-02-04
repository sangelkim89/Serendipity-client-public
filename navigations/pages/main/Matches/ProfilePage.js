import React from "react";
import { Text, View, TouchableOpacity } from "react-native";

const ProfilePage = ({ navigation }) => (
  <View>
    <Text>ProfilePage</Text>
    <TouchableOpacity onPress={() => navigation.replace("MatchPageList")}>
      <Text>Go to MatchPageList!</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => navigation.replace("ChatPage")}>
      <Text>Go to ChatPage!</Text>
    </TouchableOpacity>
  </View>
);

export default ProfilePage;
