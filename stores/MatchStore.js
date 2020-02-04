import { observable, action, computed } from "mobx";

class MatchStore {
  // (StoreIndex)
  constructor(root) {
    this.root = root;
  }

  // 스테이트
  @observable roomList = []; // 채팅방
  @observable inputMsg = ""; // 채팅인풋메세지
  @observable matchInfo = {}; // 상대유저 정보

  // 메소드
  @action
  matchExer = () => {
    console.log("매치스토어 메소드 작동");
  };
}

export default MatchStore;
