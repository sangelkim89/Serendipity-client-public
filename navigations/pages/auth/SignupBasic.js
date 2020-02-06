import React, { Component } from "react";
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Button } from "react-native";
import { observer, inject } from "mobx-react";
import { SafeAreaView } from "react-native-safe-area-context";
import RadioForm from "react-native-simple-radio-button";
import DatePicker from "react-native-datepicker";

@inject("signupStore")
@observer
class SignupBasic extends Component {
  static navigationOptions = { headerShown: false };
  state = {};

  _doNext() {
    this.props.navigation.navigate("SignupCompany");
  }

  render() {
    var radio_props = [
      { label: "남자", value: "man" },
      { label: "여자", value: "woman" },
    ];
    const { signupStore } = this.props;

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
            signupStore.genderBtn(e);
          }}
        />

        <View style={styles.emailPhone}>
          <TextInput
            style={styles.inputEmailPhone}
            placeholder="Email"
            value={signupStore.email}
            onChangeText={e => {
              signupStore.inputEmail(e);
            }}
          />
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              signupStore.sendEmail();
            }}
          >
            <Text>이메일전송</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.emailPhone}>
          <TextInput
            style={styles.inputEmailPhone}
            placeholder="EmailKey"
            value={signupStore.emailSecretKey}
            onChangeText={e => {
              signupStore.inputEmailKey(e);
            }}
          />
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              signupStore.sendEmailKey();
            }}
          >
            <Text>이메일인증</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.emailPhone}>
          <TextInput
            style={styles.inputEmailPhone}
            placeholder="Phone"
            value={signupStore.phone}
            onChangeText={e => {
              signupStore.inputPhone(e);
            }}
          />
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              signupStore.sendPhone();
            }}
          >
            <Text>핸드폰전송</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.emailPhone}>
          <TextInput
            style={styles.inputEmailPhone}
            placeholder="PhoneKey"
            value={signupStore.phoneVerifyKey}
            onChangeText={e => {
              signupStore.inputPhoneKey(e);
            }}
          />
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              signupStore.sendPhoneKey();
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
              value={signupStore.userId}
              onChangeText={e => {
                signupStore.inputID(e);
              }}
            />
            <TouchableOpacity
              style={styles.btn}
              onPress={() => {
                signupStore.sendID();
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
            value={signupStore.password}
            onChangeText={e => {
              signupStore.inputPassWord(e);
            }}
          />
        </View>

        <DatePicker
          style={styles.date}
          date={signupStore.birth}
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
            signupStore.handleConfirm(date);
          }}
        />

        <TouchableOpacity onPress={this._doNext.bind(this)}>
          <Text style={{ fontSize: 30, backgroundColor: "blue" }}>Next</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
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

export default SignupBasic;
