import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Alert } from "react-native";
import { TextInput } from "react-native-paper";
import { inject, observer } from "mobx-react";
import RadioForm from "react-native-simple-radio-button";
import { useMutation } from "@apollo/react-hooks";
import { CREATE_REPORT } from "../../../queries";

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
    <View style={styles.container}>
      <Text>report page</Text>
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
        placeholder={`${name}님 신고사유`}
        multiline={true}
        numberOfLines={4}
        onChangeText={text => onChangeText(text)}
        value={reportMsg}
        style={styles.textInput}
      ></TextInput>
      <TouchableOpacity style={styles.report} onPress={onSubmitReport}>
        <Text>신고하기</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.cancel} onPress={moveProfile}>
        <Text>취소</Text>
      </TouchableOpacity>
    </View>
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
    flex: 1,
    padding: 15,
  },
  report: {
    flex: 1,
    padding: 15,
  },
  cancel: {
    flex: 1,
    padding: 15,
  },
});

export default inject(({ reportStore }) => ({
  onChangeText: reportStore.onChangeText,
  reportMsg: reportStore.reportMsg,
  reportReason: reportStore.reportReason,
  handleReason: reportStore.handleReason,
  emptyText: reportStore.emptyText,
}))(observer(ReportPage));
