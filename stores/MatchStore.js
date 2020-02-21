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
  @observable newOne = null;

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
    console.log("target : ", target);
    this.roomList = []; // 룸 정보 메세지스 초기화
    // console.log("this.roomList after initialization : ", this.roomList);
    target.map(room => {
      console.log("room in matchStore : ", room);
      this.roomList.unshift({
        id: room.id,
        message: room.messages,
        participants: room.participants,
        createdAt: room.createdAt,
      });
      console.log("this.messages in matchStore : ", this.roomList);
    });
  };

  @action
  subMsgs = target => {
    console.log("룸 추가 루트 진입!");
    this.roomList = [
      {
        id: target.id,
        message: target.messages,
        participants: target.participants,
      },
      ...this.roomList,
    ];

    alert("You are matched!!!");
  };

  @action
  subChats = roomFromDB => {
    console.log("roomFromDB", roomFromDB);
    this.roomList = [];
    const newChat = {
      id: roomFromDB.room.id,
      message: roomFromDB.room.messages,
      participants: roomFromDB.room.participants,
      createdAt: roomFromDB.room.createdAt,
    };
    console.log("newChat in subChats : ", newChat);
    const spreader = this.roomList.filter(room => room.id !== roomFromDB.id);
    console.log("spreader in subChats : ", spreader);
    this.roomList = [newChat, ...spreader];
    console.log("roomList in subChats : ", this.roomList);
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
