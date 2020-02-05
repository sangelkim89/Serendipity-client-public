import React from "react";
import { Text, View, TouchableOpacity } from "react-native";

const MyProfilePage = ({ navigation }) => (
  <View>
    <Text>MyProfilePage</Text>
    <TouchableOpacity onPress={() => navigation.navigate("EditPage")}>
      <Text>Go to EditPage!</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => navigation.navigate("SettingPage")}>
      <Text>Go to SettingPage!</Text>
    </TouchableOpacity>
  </View>
);

export default MyProfilePage;
