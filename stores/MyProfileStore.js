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
        name: "엄대장",
        birth: "32",
        companyName: "코드스테이츠",
        companyRole: "개발업계",
        geoLocation: "1",
        tags: [
          { tag1: "사랑해요" },
          { tag2: "코드스테이츠" },
          { tag3: "이렇게라도" },
          { tag4: "억지로라도" },
          { tag5: "생각해야지" },
        ],
        profileImgLocation: "String",
        cardImgLocation: "String",
      },
    },
  };
}

export default MyprofileStore;
