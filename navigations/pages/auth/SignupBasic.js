import React, { Component, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Dimensions,
} from "react-native";
import { observer, inject } from "mobx-react";
import { useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { SafeAreaView } from "react-native-safe-area-context";
import RadioForm from "react-native-simple-radio-button";
import DatePicker from "react-native-datepicker";

function SignupBasic(props) {
  // static navigationOptions = { headerShown: false };

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
    console.log("이메일전송");
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
    console.log(phone);
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
      <RadioForm
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
        <View style={styles.emailPhone}>
          <TextInput
            style={styles.inputEmailPhone}
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
            <Text>이메일전송</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.emailPhone}>
          <TextInput
            style={styles.inputEmailPhone}
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
            <Text>이메일인증</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.emailPhone}>
          <TextInput
            style={styles.inputEmailPhone}
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
            <Text>핸드폰전송</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.emailPhone}>
          <TextInput
            style={styles.inputEmailPhone}
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
            <Text>핸드폰인증</Text>
          </TouchableOpacity>
        </View>
        <View>
          <View style={styles.emailPhone}>
            <TextInput
              style={styles.inputEmailPhone}
              placeholder="Input your ID"
              value={userId}
              onChangeText={e => {
                inputID(e);
              }}
            />
            <TouchableOpacity
              style={styles.btn}
              onPress={() => {
                sendID();
              }}
            >
              <Text>ID중복확인</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.confirmID}>사용하셔도 좋습니다</Text>
        </View>

        <View style={styles.emailPhone}>
          <TextInput
            secureTextEntry={true}
            style={styles.inputEmailPhone}
            placeholder="PassWord"
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
          onPress={() => {
            _doNext();
          }}
        >
          <Text style={{ fontSize: 30, backgroundColor: "blue" }}>Next</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white" },
  inputContainer: {
    height: height / 3,
  },
  radio: {
    justifyContent: "space-around",
  },
  inputEmailPhone: {
    margin: 15,
    height: 40,
    // backgroundColor:"",
    borderColor: "#ff6183",
    borderWidth: 3,
    borderRadius: 125,
    width: 250,
  },
  emailPhone: {
    flexDirection: "row",
  },
  btn: {
    margin: 15,
    backgroundColor: "brown",
    width: "100%",
    height: 40,
  },
  inputID: {
    margin: 15,
    height: 40,
    borderColor: "#7a42f4",
    borderWidth: 1,
  },
  confirmID: {
    marginTop: -14,
    marginLeft: 15,
    fontSize: 13,
  },
  date: {
    margin: 15,
  },
  placeholder: {
    margin: 5,
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

// export default SignupBasic;
