import React from "react";
import { Text, View, StyleSheet, ScrollView, Image, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const ProfilePage = props => {
  const {
    image,
    profile: { id, birth, companyName, companyRole, name, profileImgLocation, tags },
  } = props.navigation.state.params;

  const { navigation } = props;

  const moveReport = () => {
    navigation.navigate("ReportPage", { name: name, id: id });
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Image source={{ uri: profileImgLocation }} style={styles.image} />
        <View style={styles.textContainer}>
          <Text style={styles.textId}>{name}</Text>
          <Text style={styles.text}>{birth}</Text>
          <Text style={styles.text}>{companyName}</Text>
          <Text style={styles.text}>{companyRole}</Text>

          <View style={styles.tagContainer}>
            {tags.map((tag, i) => {
              return (
                <Text style={styles.textTag} key={i}>
                  {tag}
                </Text>
              );
            })}
          </View>
          <TouchableOpacity style={styles.report} onPress={moveReport}>
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
