import { observable, action, computed, runInAction } from "mobx";

class HuntStore {
  // (StoreIndex)
  constructor(root) {
    this.root = root;
  }

  // 스테이트
  @observable recommendUser = []; // 추천카드

  // 메소드

  // 로그인 시 데이터를 <<HuntList>> 받아와 스테이트에 저장
  @action
  getCardList = async e => {
    this.recommendUser = [];
    let getData = await JSON.parse(e.data.getHuntList);

    // ! Promise
    // action("fetchSuccess", () => {
    //   this.recommendUser = getData;
    // }),
    //   action("fetchErr", err => {
    //     console.log(err);
    //     alert("정보를 읽어오지 못했습니다.");
    //   });

    console.log("GET_CARD_STATE_BEFORE", this.recommendUser);
    // ! runInAction
    try {
      runInAction(() => {
        getData.map(val => {
          console.log("GET_DATA_MAP", val);
          this.recommendUser.push(val);
        });
        console.log("GET_CARD_STATE_AFTER", this.recommendUser);
      });
    } catch (err) {
      runInAction(() => {
        console.log(err);
        alert("정보를 읽어오지 못했습니다.");
      });
    }

    console.log("GET_CARD_PARSE", getData);
  };
}

export default HuntStore;
