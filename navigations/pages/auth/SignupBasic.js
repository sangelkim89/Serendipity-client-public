import React, { Component } from "react";
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from "react-native";
import { observer, inject } from "mobx-react";
import { SafeAreaView } from "react-native-safe-area-context";
import RadioForm from "react-native-simple-radio-button";
import DatePicker from "react-native-datepicker";

function SignupBasic(props) {
  // static navigationOptions = { headerShown: false };
  const {
    genderBtn,
    inputEmail,
    sendEmail,
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
  } = props;

  function _doNext() {
    props.navigation.navigate("SignupCompany");
  }

  var radio_props = [
    { label: "남자", value: "man" },
    { label: "여자", value: "woman" },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#ecf0f1" }}>
      <Text> SignupBasic??????????? </Text>

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
            sendPhone();
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  radio: {
    justifyContent: "space-around",
  },
  inputEmailPhone: {
    margin: 15,
    height: 40,
    borderColor: "#7a42f4",
    borderWidth: 1,
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
});

export default inject(({ signupStore }) => ({
  phoneVerifyKey: signupStore.phoneVerifyKey,
  userId: signupStore.userId,
  email: signupStore.email,
  emailSecretKey: signupStore.emailSecretKey,
  phone: signupStore.phone,
  genderBtn: signupStore.genderBtn,
  inputEmail: signupStore.inputEmail,
  sendEmail: signupStore.sendEmail,
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
}))(observer(SignupBasic));

// export default SignupBasic;
