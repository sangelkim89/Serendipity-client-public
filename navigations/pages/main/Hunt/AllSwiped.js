import React from "react";
import { View, Text, Image, StyleSheet, Dimensions, ImageBackground } from "react-native";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

const AllSwiped = () => {
  return (
    <View activeOpacity={1}>
      <Text>AllSwiped</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default AllSwiped;
