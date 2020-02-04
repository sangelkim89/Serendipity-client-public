import React from "react";
import { Text, View, TouchableOpacity } from "react-native";

const EditPage = ({ navigation }) => (
  <View>
    <Text>EditPage</Text>
    <TouchableOpacity onPress={() => navigation.replace("MyProfilePage")}>
      <Text>Go to MyProfilePage!</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => navigation.replace("SettingPage")}>
      <Text>Go to SettingPage!</Text>
    </TouchableOpacity>
  </View>
);

export default EditPage;
