import { observable, action, computed } from "mobx";

class HuntStore {
  // (StoreIndex)
  constructor(root) {
    this.root = root;
  }

  // 스테이트
  @observable recommendUser = null; // 추천카드

  // 메소드

  // 로그인 시 데이터를 <<HuntList>> 받아와 스테이트에 저장
  @action
  getCardList = e => {
    console.log("받아온 카드", e);
    this.recommendUser = JSON.parse(e.data.getHuntList);
    console.log("저장된 카드", this.recommendUser);
  };
}

export default HuntStore;
