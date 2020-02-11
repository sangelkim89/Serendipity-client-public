import { observable, action, computed } from "mobx";

class HuntStore {
  // (StoreIndex)
  constructor(root) {
    this.root = root;
  }

  // 스테이트
  @observable recommendUser = []; // 추천카드

  // 메소드
  @action
  getCardList = e => {
    console.log("받아온 카드", e);
    this.recommendUser.push(e);
    console.log("저장된 카드", this.recommendUser);
  };
}

export default HuntStore;
