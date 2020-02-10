import { observable, action, computed, toJS } from "mobx";
import axios from "axios";

class MyprofileStore {
  // (StoreIndex)
  constructor(root) {
    this.root = root;
  }

  tagDATA = [
    //DATA를 ARRAY로 선언을 합니다.
    "태그1",
    "태그2",
    "태그3",
    "태그4",
    "태그5",
  ];

  mockDATA = {
    data: {
      getMe: {
        id: "ck6dcce8fg1w40b00vb097vca",
        gender: "Unicorn",
        email: "sangelkim@yahoo.com",
        password: "1",
        phone: "01038592162",
        name: "sang",
        birth: "1",
        companyName: "1",
        companyRole: "1",
        geoLocation: "1",
        tags: [{ tag1: "tag1" }, { tag1: "tag1" }],
        profileImgLocation: "String",
        cardImgLocation: "String",
      },
    },
  };
}

export default MyprofileStore;
