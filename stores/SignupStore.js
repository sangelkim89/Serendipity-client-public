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

  @observable loginId = "";
  @observable loginPW = "";

  @observable marker = {};

  // 메소드
  @action
  markerClick = async item => {
    console.log("마커", item);
    let coord = item;
    this.marker = coord;
    console.log(this.marker);
  };

  @action
  inputCompanyName = e => {
    console.log("CompanyName", e);
    this.companyName = e;
    console.log("CN_STATE", this.companyName);
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
}

export default SignupStore;
