import { observable, action } from "mobx";

class ReportStore {
  constructor(root) {
    this.root = root;
  }

  @observable reportMsg = "";
  @observable reportReason = "스팸";

  @action
  handleReason = e => {
    console.log("reason in reportStore : ", e);
    this.reportReason = e;
    console.log("this.resonReason in handleReason : ", this.reportReason);
  };

  @action
  onChangeText = e => {
    this.reportMsg = e;
    console.log("reportMsg in reportStore : ", this.reportMsg);
  };

  @action
  emptyText = () => {
    this.reportMsg = "";
  };
}

export default ReportStore;
