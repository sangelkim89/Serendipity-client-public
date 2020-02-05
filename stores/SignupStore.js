import { observable, action, computed, toJS } from "mobx";

class SignupStore {
  // (StoreIndex)
  constructor(root) {
    this.root = root;
  }

  // 스테이트
  @observable gender = ""; // 들어오는 값 확인하고 변경할 것
  @observable email = "";
  @observable emailSecretKey = "";
  @observable emailBoolean = "";
  @observable phone = "";
  @observable phoneVerifyKey = "";
  @observable phoneBoolean = "";
  @observable userId = "";
  @observable birth = "";
  @observable companyName = ""; // 회사명
  @observable companySort = ""; // 업종
  @observable geoLocation = "";
  @observable tags = [];
  @observable imgProfile = "";
  @observable imgIdCard = "";

  @observable isDatePickerVisible = false;

  @observable loginId = "";
  @observable loginPW = "";

  @observable marker = { lat: null, lon: null };

  // 메소드
  @action
  genderBtn = val => {
    console.log(val);
    this.gender = val;
    console.log("GENDER_STATE", this.gender);
  };

  // 이메일 관련 메소드
  @action
  inputEmail = e => {
    console.log(e);
    this.email = e;
    console.log("이메일", this.email);
  };

  @action
  sendEmail = () => {
    this.email = "";
    console.log("이메일", this.email);
  };

  @action
  inputEmailKey = e => {
    console.log(e);
    this.emailSecretKey = e;
    console.log("이메일시크릿", this.emailSecretKey);
  };

  @action
  sendEmailKey = e => {
    this.emailSecretKey = "";
    console.log("이메일시크릿", this.emailSecretKey);
  };

  // 핸드폰 관련 메소드
  @action
  inputPhone = e => {
    console.log(e);
    this.phone = e;
    console.log("폰", this.phone);
  };

  @action
  sendPhone = () => {
    this.phone = "";
    console.log("폰", this.phone);
  };

  @action
  inputPhoneKey = e => {
    console.log(e);
    this.phoneVerifyKey = e;
    console.log("폰시크릿", this.phoneVerifyKey);
  };

  @action
  sendPhoneKey = () => {
    this.phoneVerifyKey = "";
    console.log("폰시크릿", this.phoneVerifyKey);
  };

  // ID입력
  @action
  inputID = e => {
    console.log(e);
    this.userId = e;
    console.log("아이디", this.userId);
  };

  @action
  sendID = () => {
    this.userId = "";
    console.log("아이디", this.userId);
  };

  // 맵관련 메소드
  @action
  markerClick = async item => {
    console.log("마커", item);
    let lat = item.latitude;
    let lon = item.longitude;
    this.marker.lat = lat;
    this.marker.lon = lon;
    console.log("MARKER_STATE", this.marker);
    console.log("MARKER_STATE_latlon", this.marker.lat, this.marker.lon);
  };

  // 회사정보 입력 메소드
  @action
  inputCompanyName = e => {
    console.log("CompanyName", e);
    this.companyName = e;
    console.log("CN_STATE", this.companyName);
  };

  @action
  inputCompanySort = e => {
    console.log("companySort", e);
    this.companySort = e;
    console.log("CS_STATE", this.companySort);
  };

  // 생년월일 달력 메소드

  handleConfirm = date => {
    // this.birth = date;  2020-02-05T12:21:14.845Z
    this.birth = date;
    console.log("BIRTH", this.birth);
  };

  // 로그인 관련 메소드
  @action
  inputId = e => {
    console.log(e);
    this.loginId = e;
    console.log("아이디", this.loginId);
  };

  @action
  inputPW = e => {
    this.loginPW = e;
    console.log("패스워드", this.loginPW);
  };
}

export default SignupStore;
