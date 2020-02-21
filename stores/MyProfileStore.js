import { observable, action } from "mobx";

class MyProfileStore {
  // (StoreIndex)
  constructor(root) {
    this.root = root;
  }

  //로그인시 개인정보 스토어에 저장하기======================================================================

  @action
  saveMyProfile = e => {
    this.myProfile = e;
    this.gender = e.data.getMe.gender;
    this.email = e.data.getMe.email;
    this.phone = e.data.getMe.phone;
    this.name = e.data.getMe.name;
    // this.password = e.data.getMe.password;
    this.birth = e.data.getMe.birth;
    this.bio = e.data.getMe.bio;
    this.distance = e.data.getMe.distance;
    this.companyName = e.data.getMe.companyName;
    this.companySort = e.data.getMe.companyRole;
    this.marker = JSON.parse(e.data.getMe.geoLocation);
    this.tags2 = e.data.getMe.tags;
  };
  @observable myProfile = {};

  @observable gender = "";
  @observable email = "";
  @observable phone = "";
  @observable name = "";
  @observable password = "";
  @observable birth = "";
  @observable bio = "";
  @observable distance = "";

  // 회사이름 입력======================================================================

  @action
  inputCompanyName = e => {
    this.companyName = e;
    console.log("companyName", this.companyName);
  };
  @observable companyName = "";

  // 회사업종 입력======================================================================

  @action
  inputCompanyRole = e => {
    this.companySort = e;
    console.log("companySort", this.companySort);
  };
  @observable companySort = "";

  // 태그2 입력======================================================================

  @action
  addtagState2 = f => {
    if (this.tags2.indexOf(this.tagDATA[f]) === -1) {
      if (this.tags2.length < 5) {
        this.tags2.push(this.tagDATA[f]);
      }
    } else {
      this.tags2.splice(this.tags2.indexOf(this.tagDATA[f]), 1);
    }

    console.log("tag2담기는거 : ", this.tags2);
  };
  @observable tags2 = [];

  // 태그 색 입력(미완성)======================================================================
  @action
  changeColor = f => {
    if (this.changeColorState === this.changeColorState[f]) {
      this.changeColorState[f] = true;
    } else {
      this.changeColorState[f] = false;
    }

    console.log("/changeColorState : ", this.changeColorState);
  };

  @observable changeColorState = "";
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
    console.log("MARKER_STATE_latlon", this.marker.lat, this.marker.lon);
  };
  @observable geoLocation = {};
  @observable marker = {};

  // 이미지 ======================================================================

  @observable imgIdCard = null;
  @observable imgIdCardType = null;
  @observable imgIdCardName = null;
  @observable imgIdCardUri = null;

  // 수정완료보내기 ======================================================================

  @observable id = ""; // userId / 상욱 추가
  @action
  addUserId = id => {
    // 받아온 내 userId 저장 메소드 / 상욱 추가
    this.id = id;
  };

  myProfile = this.myProfile;

  tagDATA = [
    //DATA를 ARRAY로 선언을 합니다.
    "먹방데이트",
    "퇴근 후 치맥",
    "집돌이 / 집순이",
    "스포츠경기 관람",
    "카페데이트",
    "더블데이트",
    "고기데이트",
    "운동하자",
    "만화카페",
    "드라이브",
    "영화보기",
    "브런치",
    "요가/필라테스",
    "쇼핑 FLEX",
    "피씨방",
    "삼쏘는진리",
    "전시회관람",
    "술한잔해요",
    "연상이좋아요",
    "연하가좋아요",
    "술보단커피",
  ];
}

export default MyProfileStore;
