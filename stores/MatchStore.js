import { observable, action } from "mobx";

class MatchStore {
  // (StoreIndex)
  constructor(root) {
    this.root = root;
  }

  // 스테이트
  // @observable roomList = []; // 채팅방

  @observable likeRoomId = ""; // 라이크로 신규 생성된 채팅방 아이디
  @observable roomList = []; // 채팅방 정보
  @observable newOne = [];

  @action
  addNewOne = target => {
    console.log("target : ", target);
    this.newOne = target;
    console.log("this.newOne : ", this.newOne);
  };

  @action // 라이크로 신규 생성된 채팅방 아이디 추가 메소드
  addLikeRoomId = target => {
    this.likeRoomId = target;
  };

  @action
  refreshRoomList = target => {
    console.log("refreshRoomList 작동!");
    this.roomList = []; // 룸 정보 메세지스 초기화
    // console.log("this.roomList after initialization : ", this.roomList);
    this.roomList = target;
    // console.log("this.messages in matchStore : ", this.roomList);
  };

  @action
  subRoomByNewMsg = target => {
    const filtered = this.roomList.filter(room => {
      return room.id !== target.id;
    });
    this.roomList = [target, ...filtered];
  };

  @action
  subMsgs = target => {
    console.log("subMsgs 룸 추가 루트 진입!");
    this.roomList = [target, ...this.roomList];
    alert("You are matched!!!");
  };

  @action
  refreshChat = chat => {
    console.log("REFRESSH_CHATS", chat); // room Object?
  };

  @action
  subChats = roomFromDB => {
    console.log("roomFromDB in subChats : ", roomFromDB);
    const spreader = this.roomList.filter(room => {
      console.log("SPREADER_ROOM_MAP", room.id);
      console.log("SPREADER_ROOM_MAP", roomFromDB.room.id);
      return room.id !== roomFromDB.room.id;
    });
    console.log("spreader in subChats : ", spreader);
    this.roomList = [];
    this.roomList = [roomFromDB.room, ...spreader];
  };

  @action
  delRoomView = roomId => {
    const newRoomView = this.roomList.filter(msg => {
      return msg.id !== roomId;
    });
    console.log("newRoomView in delRoomView : ", newRoomView);
    console.log("this.roomList in delRoomView : ", this.roomList);
    this.roomList = newRoomView;
  };

  //asdf
  // @observable message = ""; // 채팅인풋메세지 - 각 방의 독립성을 위해 useState로 옮김
}

export default MatchStore;
