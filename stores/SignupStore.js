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

  @observable marker = { lat: null, lon: null };

  @observable selectedItems = []; //태그

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

  //태그 스토어
  @action
  put = name => {
    console.log("태그에서 : ", name);
    // 존재하는지 찾고
    const exists = this.selectedItems.find(item => item.name === name);
    if (!exists) {
      // 존재하지 않는다면 새로 집어넣고
      this.selectedItems.push({
        name,
      });
      console.log("담겨진 태그 : ", this.selectedItems);
      return;
    }
    // 존재한다면
  };

  items = [
    {
      name: "태그1",
    },
    {
      name: "태그2",
    },
    {
      name: "태그3",
    },
    {
      name: "태그4",
    },
    {
      name: "태그5",
    },
  ];
}

export default SignupStore;
