import { observable, action, computed } from "mobx";

class MyProfileStore {
  // (StoreIndex)
  constructor(root) {
    this.root = root;
  }

  // 스테이트
  @observable userId = "";
  @observable birth = "";
  @observable companyName = ""; // 회사명
  @observable companySort = ""; // 업종 룰러
  @observable selectedTags = [];
  @observable allTags = [];
  @observable imgProfile = ""; // 기기경로X S3경로

  // 메소드
  @action
  profileExer = () => {
    console.log("프로필 메소드 작동");
  };
}

export default MyProfileStore;
