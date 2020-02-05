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
  @observable imgProfile = null;
  @observable imgIdCard = null;

  @observable loginId = "";
  @observable loginPW = "";

  @observable marker = { lat: null, lon: null };

  // 메소드
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
      imgProfile: this.imgProfile,
      imgIdCard: this.imgIdCard,
    };
    console.log("signinData : ", signinData); // 제출 기능 구현 필요
  };
}

export default SignupStore;
