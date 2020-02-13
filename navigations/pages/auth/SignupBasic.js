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
import { useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { SafeAreaView } from "react-native-safe-area-context";
import RadioForm from "react-native-simple-radio-button";
import DatePicker from "react-native-datepicker";

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

  // 이메일 전송
  async function sendEmail() {
    Alert.alert("인증메일이 전송되었습니다!");
    try {
      let secretSend = await sendEmailSecretKey({
        variables: {
          email: email,
        },
      });
      console.log("SECRET_KEY", secretSend.data.confirmEmail);
      setSecretKey(secretSend.data.confirmEmail);
    } catch (err) {
      console.log("SECRET_KEY_ERR", err);
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
    Alert.alert("인증번호가 전송되었습니다!");

    try {
      let secretKey = await sendMobileSecretKey({
        variables: {
          phone: phone,
        },
      });
      await setSecretMobileKey(secretKey.data.confirmText);
      await console.log("휴대폰요청후", secretKey.data.confirmText);
    } catch (err) {
      console.log("트라이캐치에러", err);
    }
  }

  var radio_props = [
    { label: "남자", value: "man" },
    { label: "여자", value: "woman" },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require("../../../assets/background3.jpg")}
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
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={e => {
                inputEmail(e);
              }}
            />
            <TouchableOpacity
              style={styles.btn}
              onPress={() => {
                sendEmail();
              }}
            >
              <Text style={styles.smallBtn}>이메일전송</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.inputLine}>
            <TextInput
              style={styles.input}
              placeholder="EmailKey"
              value={emailSecretKey}
              onChangeText={e => {
                inputEmailKey(e);
              }}
            />
            <TouchableOpacity
              style={styles.btn}
              onPress={() => {
                sendEmailKey();
              }}
            >
              <Text style={styles.smallBtn}>이메일인증</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.inputLine}>
            <TextInput
              style={styles.input}
              placeholder="Phone"
              value={phone}
              onChangeText={e => {
                inputPhone(e);
              }}
            />
            <TouchableOpacity
              style={styles.btn}
              onPress={() => {
                sendMobile();
              }}
            >
              <Text style={styles.smallBtn}>핸드폰전송</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.inputLine}>
            <TextInput
              keyboardType="number-pad"
              style={styles.input}
              placeholder="PhoneKey"
              value={phoneVerifyKey}
              onChangeText={e => {
                inputPhoneKey(e);
              }}
            />
            <TouchableOpacity
              style={styles.btn}
              onPress={() => {
                sendPhoneKey();
              }}
            >
              <Text style={styles.smallBtn}>핸드폰인증</Text>
            </TouchableOpacity>
          </View>
          <View>
            <View style={styles.inputLine}>
              <TextInput
                style={styles.input2}
                placeholder="Input your NickName"
                value={userId}
                onChangeText={e => {
                  inputID(e);
                }}
              />
              {/* <TouchableOpacity
                style={styles.btn}
                onPress={() => {
                  sendID();
                }}
              >
                <Text style={styles.smallBtn}>ID중복확인</Text>
              </TouchableOpacity> */}
            </View>
          </View>

          <View style={styles.inputLine}>
            <TextInput
              secureTextEntry={true}
              style={styles.input2}
              placeholder="Password"
              value={password}
              onChangeText={e => {
                inputPassWord(e);
              }}
            />
          </View>

          <DatePicker
            style={styles.date}
            date={birth}
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

          <TouchableOpacity
            style={styles.nextBtn}
            onPress={() => {
              _doNext();
            }}
          >
            <Text style={styles.btnTxt}>Next</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: { justifyContent: "space-between", backgroundColor: "#fab1a0" },

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
    backgroundColor: "transparent",
    marginVertical: 5,
    width: 280,
    height: 50,
    marginLeft: 5,
    borderBottomWidth: 2,
    borderColor: "#fff",
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
    borderColor: "brown",
    borderWidth: 3,
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
