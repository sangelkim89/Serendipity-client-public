import React from "react";
import { Text, View, TouchableOpacity } from "react-native";

const EditPage = ({ navigation }) => (
  <View>
    <Text>EditPage</Text>
    <TouchableOpacity onPress={() => navigation.navigate("MyProfilePage")}>
      <Text>Go to MyProfilePage!</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => navigation.navigate("SettingPage")}>
      <Text>Go to SettingPage!</Text>
    </TouchableOpacity>
  </View>
);

export default EditPage;
