import { observable, action, computed, toJS } from "mobx";
import axios from "axios";

class MyProfileStore {
  // (StoreIndex)
  constructor(root) {
    this.root = root;
  }

  // 회사이름 입력
  @action
  inputCompanyName = e => {
    this.companyName = e;
    console.log("companyName", this.companyName);
  };
  @observable companyName = "";

  // 회사업종 입력

  @action
  inputCompanyRole = e => {
    this.companySort = e;
    console.log("companySort", this.companySort);
  };
  @observable companySort = "";

  // 태그 입력

  @action
  addtagState = e => {
    this.tags = e;
    console.log("tag에는뭐가찍히니", this.tags);
  };

  @observable tags = [];
  @observable tags2 = ["태그1", "태그2", "태그3", "태그4", "태그5"];
  @observable tags3 = [];

  @action
  addtagState2 = f => {
    if (this.tags2.indexOf(this.tagDATA[f]) === -1) {
      if (this.tags2.length < 5) {
        this.tags2.push(this.tagDATA[f]);
        this.tags3 = this.tags2;
      }
    } else {
      this.tags2.splice(this.tags2.indexOf(this.tagDATA[f]), 1);
      this.tags3 = this.tags2;
    }

    console.log("tag2담기는거 : ", this.tags2);
    console.log("tag3새로담기는거 :", this.tags3);
  };

  //   if (this.indexOf(this.mockDATA.getMe.tags[f]) === -1) {
  //     this.tags.push(this.tagDATA[f]);
  //   }
  //   console.log(this.tags);
  // };

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

  @observable imgProfile = null;
  @observable imgProfileType = null;
  @observable imgProfileName = null;
  @observable imgProfileUri = null;

  @action
  submitEditData = () => {
    // 폼데이터 생성
    const editData = new FormData();

    // 폼데이터에 데이터 추가
    editData.append("companyName", this.companyName);
    editData.append("companySort", this.companySort);
    editData.append("tags3", JSON.stringify(this.tags3));
    editData.append("tags2", JSON.stringify(this.tags2));

    // signupData.append("bio", this.bio); // 서버는 포함하지만 클라이언트 뷰에 포함되지 않음

    // 생성된 폼데이터 확인
    console.log("formdata not send yet : ", editData);

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
      .post(endPoint, editData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(res => {
        console.log("axios response : ", res);
        alert("수정이 완료되었습니다.");
      })
      .catch(e => {
        // console.log("axios error issued!");
        console.log(e);
      });
  };

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
        tags: ["재력", "외모", "집안", "직업", "완전속물"],
        profileImgLocation: "String",
        cardImgLocation: "String",
      },
    },
  };
}

export default MyProfileStore;

// 데이터는 이런식으로 들어옵니다. 참고하세영
/*
{
  "data": {
    "getMe": {
      "id": "ck6hfmoi7tzx20975cgds24xf",
      "gender": "man",
      "email": "1@1.1",
      "password": "1",
      "phone": "1",
      "name": "1",
      "birth": "1",
      "companyName": null,
      "companyRole": null,
      "geoLocation": "{\"lat\":12.3,\"lon\":12.1225}",
      "tags": [
        "fuck"
      ],
      "profileImgLocation": null,
      "cardImgLocation": null,
      "bio": null,
      "myLikes": null,
      "likedBy": null,
      "distance": 5
    }
  }
}
*/
