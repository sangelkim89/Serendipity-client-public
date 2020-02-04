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
  huntExer = () => {
    console.log("헌트 메소드 작동");
  };
}

export default HuntStore;
