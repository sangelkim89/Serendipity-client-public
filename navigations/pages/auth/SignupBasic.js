import React, { Component, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
  Dimensions,
  ImageBackground,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { observer, inject } from "mobx-react";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { SafeAreaView } from "react-native-safe-area-context";
import RadioForm from "react-native-simple-radio-button";
import DatePicker from "react-native-datepicker";
import { Button, Input } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";

import { ALL_USER_EMAIL, CHECK_NICKNAME } from "../../queries";

function SignupBasic(props) {
  const {
    genderBtn,
    inputEmail,
    inputEmailKey,
    sendEmailKey,
    inputPhone,
    sendPhone,
    inputPhoneKey,
    inputID,
    sendID,
    inputPassWord,
    handleConfirm,
    email,
    emailSecretKey,
    phone,
    phoneVerifyKey,
    userId,
    password,
    birth,
    setSecretKey,
    setSecretMobileKey,
    emailBoolean,
    sendPhoneKey,
    phoneBoolean,
  } = props;

  function _doNext() {
    if (emailBoolean === true && phoneBoolean === true) {
      props.navigation.navigate("SignupCompany");
    } else {
      Alert.alert("이메일 인증 및 휴대폰인증이 안되었습니다.");
    }
  }

  // 이메일키 발급을 위한 전송 mutate
  const SEND_EMAIL = gql`
    mutation confirmEmail($email: String!) {
      confirmEmail(email: $email)
    }
  `;
  const [sendEmailSecretKey, { data }] = useMutation(SEND_EMAIL);

  // useQuery - AllUsers
  const { data: userData } = useQuery(ALL_USER_EMAIL);

  // 이메일 전송
  async function sendEmail() {
    try {
      let secretSend = await sendEmailSecretKey({
        variables: {
          email: email,
        },
      });
      // setSecretKey(secretSend.data.confirmEmail);
      const secretMail = secretSend.data.confirmEmail;
      if (secretMail === "Email already exists!") {
        console.log("SECRET_KEY", secretMail);
        Alert.alert("이미 존재하는 메일입니다!");
        // } else if (secretMail === "") {
        //   console.log("SECRET_KEY", secretMail);
        //   Alert.alert("이메일 형식에 맞지 않습니다!");
      } else {
        console.log("SECRET_KEY", secretMail);
        Alert.alert("인증메일이 전송되었습니다!");
      }
    } catch (err) {
      Alert.alert("이메일 형식이 잘못 되었습니다!");
      console.log("SECRET_EMAIL_KEY_ERR", err);
    }
  }

  // 휴대폰키 발급을 위한 전송 mutate
  const SEND_MOBILE = gql`
    mutation confirmText($phone: String!) {
      confirmText(phone: $phone)
    }
  `;
  const [sendMobileSecretKey, { mobileData }] = useMutation(SEND_MOBILE);

  // 휴대폰 전송
  async function sendMobile() {
    try {
      let secretKey = await sendMobileSecretKey({
        variables: {
          phone: phone,
        },
      });
      Alert.alert("인증번호가 전송되었습니다!");
      const secretMobile = await setSecretMobileKey(secretKey.data.confirmText);
      await console.log("휴대폰요청후", secretMobile);
    } catch (err) {
      Alert.alert("휴대폰형식이 잘못 되었습니다. ex)000-0000-0000");
      console.log("트라이캐치에러", err);
    }
  }

  // 닉네임 중복 userId
  const { loading, data: checkNickName } = useQuery(CHECK_NICKNAME, {
    variables: {
      name: userId,
    },
  });
  async function sendNickName() {
    try {
      if (!loading) {
        if (checkNickName.checkUniqueID === false) {
          Alert.alert("이미 사용중인 닉네임입니다.");
        } else {
          Alert.alert("사용하셔도 좋습니다.");
        }
      } else {
        Alert.alert("다시 인증해주세요.");
      }
    } catch (err) {
      console.log("CHECK_NICKNAME_ERR", err);
    }
  }

  var radio_props = [
    { label: "남자", value: "man" },
    { label: "여자", value: "woman" },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require("../../../assets/gradient2.jpg")}
        style={{ width: "100%", height: "100%" }}
      >
        <RadioForm
          buttonSize={15}
          buttonOuterSize={30}
          style={styles.radio}
          radio_props={radio_props}
          animation={true}
          initial={0}
          formHorizontal={true}
          onPress={e => {
            genderBtn(e);
          }}
        />
        <View style={styles.inputContainer}>
          <View style={styles.inputLine}>
            <Input
              placeholder="Email"
              containerStyle={styles.input}
              inputStyle={{ color: "white" }}
              leftIcon={<Icon name="user" size={24} color="white" style={{ marginRight: 10 }} />}
              onChangeText={e => {
                inputEmail(e);
              }}
            />

            <Button
              buttonStyle={styles.btn}
              icon={<Icon name="check" size={15} color="white" />}
              title="이메일전송"
              onPress={() => {
                sendEmail();
              }}
            />
          </View>

          <View style={styles.inputLine}>
            <Input
              placeholder="Email Key"
              containerStyle={styles.input}
              inputStyle={{ color: "white" }}
              leftIcon={
                <Icon name="check-circle" size={24} color="white" style={{ marginRight: 10 }} />
              }
              onChangeText={e => {
                inputEmailKey(e);
              }}
            />

            <Button
              buttonStyle={styles.btn}
              icon={<Icon name="check" size={15} color="white" />}
              title="이메일인증"
              onPress={() => {
                sendEmailKey();
              }}
            />
          </View>

          <View style={styles.inputLine}>
            <Input
              placeholder="Mobile"
              containerStyle={styles.input}
              inputStyle={{ color: "white" }}
              leftIcon={
                <Icon name="envelope-open" size={24} color="white" style={{ marginRight: 10 }} />
              }
              onChangeText={e => {
                inputPhone(e);
              }}
            />
            <Button
              buttonStyle={styles.btn}
              icon={<Icon name="check" size={15} color="white" />}
              title="핸드폰전송"
              onPress={() => {
                sendMobile();
              }}
            />
          </View>

          <View style={styles.inputLine}>
            <Input
              placeholder="Mobile Key"
              containerStyle={styles.input}
              inputStyle={{ color: "white" }}
              leftIcon={
                <Icon name="check-circle" size={24} color="white" style={{ marginRight: 10 }} />
              }
              onChangeText={e => {
                inputPhoneKey(e);
              }}
            />

            <Button
              buttonStyle={styles.btn}
              icon={<Icon name="check" size={15} color="white" />}
              title="핸드폰인증"
              onPress={() => {
                sendPhoneKey();
              }}
            />
          </View>
          <View>
            <View style={styles.inputLine}>
              <Input
                placeholder="NickName"
                containerStyle={styles.input}
                inputStyle={{ color: "white" }}
                leftIcon={<Icon name="child" size={24} color="white" style={{ marginRight: 10 }} />}
                onChangeText={e => {
                  inputID(e);
                }}
              />

              <Button
                buttonStyle={styles.btn}
                icon={<Icon name="check" size={15} color="white" />}
                title="닉네임중복"
                onPress={() => {
                  sendNickName();
                }}
              />
            </View>
          </View>

          <View style={styles.inputLine}>
            <Input
              placeholder="password"
              containerStyle={styles.input}
              inputStyle={{ color: "white" }}
              leftIcon={<Icon name="lock" size={24} color="white" style={{ marginRight: 10 }} />}
              onChangeText={e => {
                inputPassWord(e);
              }}
            />
          </View>

          <DatePicker
            style={styles.date}
            date={"1991-02-20"}
            mode="date"
            placeholder="select date"
            format="YYYY-MM-DD"
            minDate="1950-01-01"
            maxDate="2222-12-31"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateIcon: {
                flexDirection: "row",
              },
              dateInput: {
                // marginLeft: 36,
              },
            }}
            onDateChange={date => {
              handleConfirm(date);
            }}
          />

          <Button
            buttonStyle={{
              width: "80%",
              marginLeft: 45,
              borderRadius: 20,
            }}
            icon={<Icon name="arrow-right" style={{ marginLeft: 10 }} size={15} color="white" />}
            iconRight
            title="NEXT"
            onPress={() => {
              _doNext();
            }}
          />
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    // backgroundColor: "#c44569"
  },
  inputContainer: {
    // backgroundColor: "green",
    flex: 2,
    height: height / 5,
    justifyContent: "center",
  },
  radio: {
    flex: 0,
    padding: 15,
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 20,
    marginBottom: -40,
    height: height / 10,
  },
  input: {
    marginVertical: 5,
    width: 280,
    height: 50,
    // marginLeft: 5,
  },
  input2: {
    backgroundColor: "transparent",
    marginVertical: 5,
    width: 280,
    height: 50,
    marginLeft: 5,
    borderBottomWidth: 2,
    borderColor: "#fff",
    width: "95%",
  },
  inputLine: {
    flexDirection: "row",
    padding: 3,
    margin: 3,
  },
  btn: {
    margin: 8,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "brown",
    // borderColor: "brown",
    // borderWidth: 3,
    width: 100,
    height: 40,
    borderRadius: 50,
  },
  smallBtn: {
    fontWeight: "bold",
    fontSize: 15,
  },
  inputID: {
    margin: 15,
    height: 40,
    borderColor: "#7a42f4",
    borderWidth: 1,
  },
  date: {
    margin: 15,
    width: "95%",
  },
  placeholder: {
    margin: 5,
  },
  nextBtn: {
    // width: "80%",
    alignItems: "center",
  },
  btnTxt: {
    marginTop: 15,
    width: 300,
    fontSize: 30,
    borderColor: "#1e3799",
    borderRadius: 150,
    borderWidth: 3,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default inject(({ signupStore }) => ({
  phoneVerifyKey: signupStore.phoneVerifyKey,
  userId: signupStore.userId,
  email: signupStore.email,
  emailSecretKey: signupStore.emailSecretKey,
  phone: signupStore.phone,
  genderBtn: signupStore.genderBtn,
  inputEmail: signupStore.inputEmail,
  inputEmailKey: signupStore.inputEmailKey,
  sendEmailKey: signupStore.sendEmailKey,
  inputPhone: signupStore.inputPhone,
  sendPhone: signupStore.sendPhone,
  inputPhoneKey: signupStore.inputPhoneKey,
  inputID: signupStore.inputID,
  sendID: signupStore.sendID,
  inputPassWord: signupStore.inputPassWord,
  handleConfirm: signupStore.handleConfirm,
  password: signupStore.password,
  birth: signupStore.birth,
  setSecretKey: signupStore.setSecretKey,
  setSecretMobileKey: signupStore.setSecretMobileKey,
  emailBoolean: signupStore.emailBoolean,
  sendPhoneKey: signupStore.sendPhoneKey,
  phoneBoolean: signupStore.phoneBoolean,
}))(observer(SignupBasic));
