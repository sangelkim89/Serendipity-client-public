import React from "react";
import { Text, View, StyleSheet, ScrollView, Image, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const ProfilePage = props => {
  const {
    image,
    profile: { userId, distance, tags, companyName },
  } = props.navigation.state.params;
  return (
    <View style={styles.container}>
      <ScrollView>
        <Image source={{ uri: image }} style={styles.image} />
        <View style={styles.textContainer}>
          <Text style={styles.textId}>{userId}</Text>
          <Text style={styles.text}>{distance}</Text>
          <Text style={styles.text}>{companyName}</Text>
          <View style={styles.tagContainer}>
            {tags.map((tag, i) => {
              return (
                <Text style={styles.textTag} key={i}>
                  {tag}
                </Text>
              );
            })}
          </View>
          <TouchableOpacity style={styles.report}>
            <FontAwesome name="bell" style={{ color: "red", fontSize: 40 }} />
            <Text>신고하기</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: "100%",
    height: 500,
    justifyContent: "flex-end",
  },
  textContainer: {
    padding: 30,
  },
  tagContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 5,
  },
  textId: {
    color: "black",
    fontSize: 35,
  },
  text: {
    color: "black",
  },
  textTag: {
    color: "white",
    backgroundColor: "gray",
    padding: 5,
    borderStyle: "solid",
    borderColor: "white",
    borderRadius: 5,
    margin: 5,
  },
  report: {
    padding: 20,
    alignItems: "center",
  },
});

export default ProfilePage;
