import { observable, action, computed, toJS } from "mobx";
import axios from "axios";

class SignupStore {
  // (StoreIndex)
  constructor(root) {
    this.root = root;
  }

  //==================================================================
  // 남녀 버튼 클릭 후 정보 -> gender 로 저장
  @action
  genderBtn = val => {
    console.log(val);
    this.gender = val;
    console.log("GENDER_STATE", this.gender);
  };
  // 남녀 버튼 클릭 후 저장
  @observable gender = "man"; // 들어오는 값 확인하고 변경할 것
  //==================================================================
  // Email 텍스트인풋 -> email 로 저장
  @action
  inputEmail = e => {
    console.log(e);
    this.email = e;
    console.log("이메일", this.email);
  };
  @observable email = "";
  //==================================================================
  // 이메일키 텍스트 인풋 -> emailSecretKey 로 저장
  @action
  inputEmailKey = e => {
    console.log(e);
    this.emailSecretKey = e;
    console.log("이메일시크릿", this.emailSecretKey);
  };
  @observable emailSecretKey = "";
  //==================================================================
  // emailSecretKey랑 resEmailSecretKey랑 같은지 판단 -> emailBoolean

  @action
  sendEmailKey = () => {
    if (this.emailSecretKey === this.resEmailSecretKey) {
      this.emailBoolean = true;
      alert("이메일 인증에 성공하였습니다.");
    } else {
      this.emailBoolean = false;
      alert("이메일 인증에 실패하였습니다.");
    }
    console.log("인증완료", this.emailBoolean);
  };
  @observable emailBoolean = true;

  //==================================================================
  // 받아온 이메일키를 스토어에 저장
  @action
  setSecretKey = data => {
    console.log("이메일시크릿", data);
    this.resEmailSecretKey = data;
    console.log("스토어시크릿키데이타", this.resEmailSecretKey);
  };
  @observable resEmailSecretKey = "";

  //==================================================================
  // 비밀번호 텍스트 인풋 입력 받아오기
  @action
  inputPassWord = e => {
    console.log(e);
    this.password = e;
    console.log("비밀번호", this.password);
  };

  @observable password = "";

  //==================================================================
  // 인풋인덱스 핸드폰번호 입력 -> 스토어
  @action
  inputPhone = e => {
    console.log(e);
    this.phone = e;
    console.log("폰", this.phone);
  };
  //==================================================================
  // 인풋인덱스 핸드폰번호 입력 -> 스토어
  @action
  sendPhone = () => {
    this.phone = "";
    console.log("폰", this.phone);
  };
  @observable phone = "";
  //==================================================================
  // 인풋인덱스 핸드폰인증키 입력 -> 스토어
  @action
  inputPhoneKey = e => {
    console.log(e);
    this.phoneVerifyKey = e;
    console.log("폰시크릿", this.phoneVerifyKey);
  };
  @observable phoneVerifyKey = "";
  //==================================================================
  // 인풋인덱스 핸드폰인증키 입력 -> 스토어
  @action
  sendPhoneKey = () => {
    if (this.phoneVerifyKey === this.resMobileSecretKey) {
      this.phoneBoolean = true;
      alert("휴대폰 인증에 성공하였습니다.");
    } else {
      this.phoneBoolean = false;
      alert("휴대폰 인증에 실패하였습니다.");
    }
    console.log("인증완료", this.phoneBoolean);
  };
  @observable phoneBoolean = true;

  @action
  setSecretMobileKey = data => {
    console.log("스토어시크릿키데이타", data);
    this.resMobileSecretKey = data;
    console.log("이메일시크릿", this.resMobileSecretKey);
  };

  @observable resMobileSecretKey = "";

  //==================================================================
  // ID입력
  @action
  inputID = e => {
    console.log(e);
    this.userId = e;
    console.log("아이디", this.userId);
  };
  @observable userId = "";

  @action
  sendID = () => {
    this.userId = "";
    console.log("아이디", this.userId);
  };

  //==================================================================
  // 생년월일 달력 메소드
  handleConfirm = date => {
    // this.birth = date;  2020-02-05T12:21:14.845Z
    this.birth = date;
    console.log("BIRTH", this.birth);
  };
  @observable birth = "";

  //==================================================================
  // 회사 이름 입력 메소드
  @action
  inputCompanyName = e => {
    console.log("CompanyName", e);
    this.companyName = e;
    console.log("CN_STATE", this.companyName);
  };
  @observable companyName = ""; // 회사명

  //==================================================================
  //회사 업종 입력 메소드
  @action
  inputCompanySort = e => {
    console.log("companySort", e);
    this.companySort = e;
    console.log("CS_STATE", this.companySort);
  };
  @observable companySort = ""; // 업종

  //==================================================================
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
  @observable geoLocation = { lat: 0, lon: 0 };
  @observable marker = { lat: null, lon: null };

  //==================================================================
  // 로그인 관련 메소드
  @action
  inputId = e => {
    // console.log(e);
    this.loginId = e;
    // console.log("아이디", this.loginId);
  };
  @observable loginId = "";

  @action
  inputPW = e => {
    this.loginPW = e;
    // console.log("패스워드", this.loginPW);
  };
  @observable loginPW = "";
  //==================================================================
  // 이미지는 사인업에서 넘어온다.

  @observable imgProfile = null;
  @observable imgProfileType = null;
  @observable imgProfileName = null;
  @observable imgProfileUri = null;
  @observable imgIdCard = null;
  @observable imgIdCardType = null;
  @observable imgIdCardName = null;
  @observable imgIdCardUri = null;

  //==================================================================
  //얘는 뭐에요???

  @observable isDatePickerVisible = false;

  //==================================================================
  // 전체 signup data 제출
  @action
  submitSignupData = () => {
    // 폼데이터 생성
    const signupData = new FormData();
    // 폼데이터에 이미지 추가
    signupData.append("cardImg", {
      name: this.imgIdCardName,
      type: `image/${this.imgIdCardType}`,
      uri: this.imgIdCardUri,
    });
    signupData.append("profileImg", {
      name: this.imgProfileName,
      type: `image/${this.imgProfileType}`,
      uri: this.imgProfileUri,
    });

    // 폼데이터에 데이터 추가
    signupData.append("gender", this.gender);
    signupData.append("email", this.email);
    signupData.append("phone", this.phone);
    signupData.append("name", this.userId); // 서버는 name, 클라는 userId
    signupData.append("password", this.password);
    signupData.append("birth", this.birth);
    signupData.append("companyName", this.companyName);
    signupData.append("companyRole", this.companySort); // 서버는 companyRole, 클라는 companySort
    signupData.append(
      "geoLocation",
      JSON.stringify({ lat: this.geoLocation.lat, lon: this.geoLocation.lon }),
    ); // 프록시로 전달되는것 수정
    signupData.append("tags", JSON.stringify(this.tags));
    // signupData.append("bio", this.bio); // 서버는 포함하지만 클라이언트 뷰에 포함되지 않음

    // 생성된 폼데이터 확인
    console.log("formdata not send yet : ", signupData);

    const endPoint = "http://192.168.219.139:4000/api/upload"; // 안드로이드는 localhost(x), ip주소(O)

    // fetch(endPoint, {
    //   method: "POST",
    //   // credentials: "include",
    //   headers: {
    //     "Content-Type": "multipart/form-data",
    //   },
    //   body: signupData,
    // })
    //   .then(res => {
    //     alert("회원가입 성공!!!");
    //   })
    //   .catch(err => {
    //     console.log("err : ", err);
    //     alert("가입 실패... 다시 시도 해주세요");
    //   });

    axios
      .post(endPoint, signupData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(res => {
        console.log("axios response : ", res);
        alert("회원가입이 완료되었습니다.");
      })
      .catch(e => {
        // console.log("axios error issued!");
        console.log("NETWORK_ERR_AXIOS in signupStore : ", e);
        alert("가입 실패... 다시 시도 해주세요");
      });

    // 스토어 초기화
    this.gender = "man"; // 들어오는 값 확인하고 변경할 것
    this.email = "";
    this.password = "";
    this.emailSecretKey = "";
    this.resEmailSecretKey = "";
    this.emailBoolean = true;
    this.phone = "";
    this.phoneVerifyKey = "";
    this.resMobileSecretKey = "";
    this.phoneBoolean = true;
    this.userId = "";
    this.birth = "";
    this.companyName = ""; // 회사명
    this.companySort = ""; // 업종
    this.geoLocation = { lat: 0, lon: 0 };
    this.tags = [];
    this.imgProfile = null;
    this.imgProfileType = null;
    this.imgProfileName = null;
    this.imgProfileUri = null;
    this.imgIdCard = null;
    this.imgIdCardType = null;
    this.imgIdCardName = null;
    this.imgIdCardUri = null;

    this.isDatePickerVisible = false;

    this.loginId = "";
    this.loginPW = "";

    this.marker = { lat: null, lon: null };
  };
  //==================================================================
  //태그 관련 메소드
  @action
  addtagState = f => {
    if (this.tags.indexOf(this.tagDATA[f]) === -1) {
      if (this.tags.length < 5) {
        this.tags.push(this.tagDATA[f]);
      }
    } else {
      this.tags.splice(this.tags.indexOf(this.tagDATA[f]), 1);
    }

    console.log(this.tags);
    console.log("뭐안뜨나", this.changeColorState);
  };

  @observable tags = [];
  @observable changeColorState = [];

  tagSTATE = [];

  tagDATA = [
    //DATA를 ARRAY로 선언을 합니다.
    "태그1",
    "태그2",
    "태그3",
    "태그4",
    "태그5",
    "태그6",
    "태그7",
    "태그8",
    "태그9",
    "태그10",
    "태그11",
    "태그12",
    "태그13",
    "태그14",
    "태그15",
  ];
}

export default SignupStore;
