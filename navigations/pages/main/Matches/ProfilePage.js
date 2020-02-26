import React from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

const ProfilePage = props => {
  const {
    image,
    profile: { id, birth, companyName, companyRole, name, profileImgLocation, tags },
  } = props.navigation.state.params;

  const { navigation } = props;

  const moveReport = () => {
    navigation.navigate("ReportPage", { name: name, id: id });
  };

  const myBirth = birth;
  let birthYear = myBirth.split("-")[0];
  let nowYear = new Date().getFullYear();
  let age = nowYear - birthYear + 1;

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require("../../../../assets/gradient2.jpg")}
        style={{ width: "100%", height: "100%" }}
      >
        <ScrollView>
          <TouchableOpacity
            style={{ marginLeft: 7, marginTop: 7, position: "absolute", flex: 1, zIndex: 100 }}
            onPress={() => {
              props.navigation.navigate("ChatPage");
            }}
          >
            <FontAwesome name="arrow-circle-left" style={styles.backText} />
          </TouchableOpacity>
          <View style={{ alignItems: "center" }}>
            <Image source={{ uri: profileImgLocation }} style={styles.image}></Image>
          </View>
          <View style={styles.textContainer}>
            <View style={styles.etcText}>
              <Text style={styles.textId}>{name}</Text>
              <Text style={styles.textId}>{age}</Text>
            </View>
            <View style={styles.etcText}>
              <Text style={styles.text}>{companyName}</Text>
              <Text style={styles.text}>{companyRole}</Text>
            </View>

            <View style={styles.tagContainer}>
              {tags.map((tag, i) => {
                return (
                  <Text style={styles.textTag} key={i}>
                    {tag}
                  </Text>
                );
              })}
            </View>
          </View>

          <TouchableOpacity style={styles.report} onPress={moveReport}>
            <FontAwesome name="bell" style={{ color: "red", fontSize: 25 }} />
            <Text>신고하기</Text>
          </TouchableOpacity>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    borderWidth: 3,
    borderColor: "#7a42f4",
    width: 350,
    height: 400,
    borderRadius: 20,
    justifyContent: "flex-end",
  },
  textContainer: {
    padding: 30,
    alignItems: "center",
  },
  etcText: {
    flexDirection: "row",
  },
  tagContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 5,
  },
  textId: {
    color: "black",
    fontSize: 30,
    margin: 10,
    marginTop: -10,
    fontWeight: "bold",
  },
  text: {
    color: "black",
    marginTop: -10,
    margin: 10,
    fontSize: 25,
  },
  textTag: {
    fontSize: 20,
    color: "#2c3e50",
    backgroundColor: "pink",
    padding: 5,
    borderWidth: 1,
    borderColor: "#ff6348",
    borderRadius: 5,
    margin: 3,
  },
  report: {
    padding: 20,
    alignItems: "center",
  },
  backText: {
    color: "#f8c6ec",
    fontSize: 30,
  },
});

export default ProfilePage;
