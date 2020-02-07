import { observable, action, computed, toJS } from "mobx";

class SignupStore {
  // (StoreIndex)
  constructor(root) {
    this.root = root;
  }

  // 스테이트
  @observable gender = ""; // 들어오는 값 확인하고 변경할 것
  @observable email = "";
  @observable password = "";
  @observable emailSecretKey = "";
  @observable emailBoolean = "";
  @observable phone = "";
  @observable phoneVerifyKey = "";
  @observable phoneBoolean = "";
  @observable userId = "";
  @observable birth = "";
  @observable companyName = ""; // 회사명
  @observable companySort = ""; // 업종
  @observable geoLocation = { lat: null, lon: null };
  @observable tags = [];
  @observable imgProfile = null;
  @observable imgProfileUri = null;
  @observable imgIdCard = null;
  @observable imgIdCardUri = null;

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

  // 비밀번호 메소드
  @action
  inputPassWord = e => {
    console.log(e);
    this.password = e;
    console.log("비밀번호", this.password);
  };

  // 맵관련 메소드
  @action
  markerClick = item => {
    console.log("마커", item);
    let lat = item.latitude;
    let lon = item.longitude;
    this.marker.lat = lat;
    this.marker.lon = lon;
    this.geoLocation.lat = lat;
    this.geoLocation.lon = lon;
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

  // // DoLogin
  // @action
  // doLogin = async () => {
  //   const LOG_IN = gql`
  //     mutation signIn($email: String!, $password: String!) {
  //       signIn(email: $email, password: $password)
  //     }
  //   `;

  //   const [logInRes, { data }] = useMutation(LOG_IN);
  //   try {
  //     const {
  //       data: { signIn },
  //     } = await logInRes({
  //       variables: {
  //         email: loginId,
  //         password: loginPW,
  //       },
  //     });
  //     console.log("signIn : ", signIn);
  //     console.log("data : ", data);
  //   } catch {
  //     e => {
  //       console.log("useMutation error in Login.js", e);
  //     };
  //   } finally {
  //     console.log("login data from server : ", data);
  //   }
  //   const isLoggedIn = await AsyncStorage.getItem("isLoggedIn");
  //   console.log("loginId : ", loginId);
  //   console.log("isLoggedIn(local storage) in Login.js : ", isLoggedIn);
  //   if (isLoggedIn === "true") {
  //     props.navigation.navigate("TabNav");
  //   } else {
  //     Alert.alert("isLoggedIn is falsy!!!");
  //   }
  //   // 서버에 로그인 정보 송신 기능 추가 요
  //   console.log("logInRes : ", logInRes);
  // };

  // 전체 signup data 제출
  @action
  submitSigninData = () => {
    const signinData = {
      gender: this.gender,
      email: this.email,
      phone: this.phone,
      userId: this.userId,
      birth: this.birth,
      companyName: this.companyName,
      companySort: this.companySort,
      geoLocation: this.geoLocation,
      tags: this.tags,
      imgProfileUri: this.imgProfileUri,
      imgIdCardUri: this.imgIdCardUri,
    };
    console.log("signinData : ", signinData); // 제출 기능 구현 필요
    this.gender = "";
    this.email = "";
    this.emailSecretKey = "";
    this.emailBoolean = "";
    this.phone = "";
    this.phoneVerifyKey = "";
    this.phoneBoolean = "";
    this.userId = "";
    this.birth = "";
    this.companyName = "";
    this.companySort = "";
    this.geoLocation.lat = null;
    this.geoLocation.lon = null;
    this.tags = [];
    this.imgProfile = null;
    this.imgProfileUri = null;
    this.imgIdCard = null;
    this.imgIdCardUri = null;

    this.isDatePickerVisible = false;

    this.loginId = "";
    this.loginPW = "";

    this.marker.lat = null;
    this.marker.lon = null;
  };
}

export default SignupStore;
