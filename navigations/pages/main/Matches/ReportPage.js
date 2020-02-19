import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Alert,
  ImageBackground,
} from "react-native";
import { TextInput } from "react-native-paper";
import { inject, observer } from "mobx-react";
import RadioForm from "react-native-simple-radio-button";
import { useMutation } from "@apollo/react-hooks";
import { CREATE_REPORT } from "../../../queries";
import { MaterialCommunityIcons, Feather } from "@expo/vector-icons";

const ReportPage = props => {
  const { id, name } = props.navigation.state.params;
  const { onChangeText, handleReason, navigation, reportMsg, reportReason, emptyText } = props;
  console.log("id - opponent? : ", id);
  const radio_props = [
    { label: "스팸", value: "스팸" },
    { label: "음란", value: "음란" },
    { label: "욕설/비방", value: "욕설비방" },
    { label: "불쾌한 표현", value: "불쾌한 표현" },
  ];

  const moveProfile = () => {
    navigation.navigate("ProfilePage");
    emptyText();
  };

  const [submitMethod, { data }] = useMutation(CREATE_REPORT);

  const onSubmitReport = () => {
    console.log("onSubmitReport invoked in reportPage!!!");
    console.log(id, reportMsg, reportReason);
    if (reportMsg === "") {
      Alert.alert("신고 내용을 작성해주세요!");
    } else if (reportMsg.length < 5) {
      Alert.alert("신고 내용을 5자 이상 작성해주세요!");
    } else {
      submitMethod({
        variables: {
          toId: id,
          text: reportMsg,
          optionText: reportReason,
        },
      });
      Alert.alert("신고가 제출되었습니다");
      navigation.navigate("ProfilePage");
      emptyText();
    }
  };

  return (
    <ImageBackground
      source={require("../../../../assets/gradient2.jpg")}
      style={{ width: "100%", height: "100%", backgroundColor: "black" }}
    >
      <View style={styles.container}>
        <RadioForm
          buttonSize={15}
          buttonOuterSize={30}
          style={styles.radio}
          radio_props={radio_props}
          animation={true}
          initial={0}
          formHorizontal={true}
          onPress={e => {
            handleReason(e);
          }}
        />
        <TextInput
          placeholder={`신고사유를 상세하게 적어주세요`}
          multiline={true}
          numberOfLines={5}
          onChangeText={text => onChangeText(text)}
          value={reportMsg}
          style={styles.textInput}
        ></TextInput>
        <View style={styles.imgContainer}>
          <TouchableOpacity style={styles.button} onPress={onSubmitReport}>
            <Feather name="mail" style={{ color: "#6c5ce7", fontSize: 40 }} />
            <Text>제출</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={moveProfile}>
            <MaterialCommunityIcons name="cancel" style={{ color: "#6c5ce7", fontSize: 40 }} />
            <Text>취소</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  radio: {
    flex: 1,
    padding: 15,
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 20,
    marginBottom: -40,
    height: height / 10,
  },
  textInput: {
    flex: 2,
    padding: 15,
  },
  imgContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  button: {
    flex: 1,
    padding: 15,
    margin: 10,
    // justifyContent: "center",
    alignItems: "center",
  },
});

export default inject(({ reportStore }) => ({
  onChangeText: reportStore.onChangeText,
  reportMsg: reportStore.reportMsg,
  reportReason: reportStore.reportReason,
  handleReason: reportStore.handleReason,
  emptyText: reportStore.emptyText,
}))(observer(ReportPage));
