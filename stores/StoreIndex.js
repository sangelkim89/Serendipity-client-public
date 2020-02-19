import HuntStore from "./HuntStore";
import MatchStore from "./MatchStore";
import MyProfileStore from "./MyProfileStore";
import SignupStore from "./SignupStore";
import ReportStore from "./ReportStore";

class StoreIndex {
  constructor() {
    this.huntStore = new HuntStore(this);
    this.matchStore = new MatchStore(this);
    this.myProfileStore = new MyProfileStore(this);
    this.signupStore = new SignupStore(this);
    this.reportStore = new ReportStore(this);
  }
}

export default StoreIndex;
