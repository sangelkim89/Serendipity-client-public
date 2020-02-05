import React from "react";
import { Text, View, TouchableOpacity } from "react-native";

const SettingPage = ({ navigation }) => (
  <View>
    <Text>SettingPage</Text>
    <TouchableOpacity onPress={() => navigation.navigate("EditPage")}>
      <Text>Go to EditPage!</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => navigation.navigate("MyProfilePage")}>
      <Text>Go to MyProfilePage!</Text>
    </TouchableOpacity>
  </View>
);

export default SettingPage;
