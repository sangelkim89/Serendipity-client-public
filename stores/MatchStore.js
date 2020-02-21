import { observable, action } from "mobx";

class MatchStore {
  // (StoreIndex)
  constructor(root) {
    this.root = root;
  }

  // 스테이트
  // @observable roomList = []; // 채팅방

  @observable likeRoomId = ""; // 라이크로 신규 생성된 채팅방 아이디
  @observable messages = []; // 기존 생성된 채팅방 정보
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
    this.messages = []; // 룸 정보 메세지스 초기화
    // console.log("this.messages after initialization : ", this.messages);
    target.map(room => {
      console.log("room in matchStore : ", room);
      this.messages.unshift({
        id: room.id,
        message: room.messages,
        participants: room.participants,
        createdAt: room.createdAt,
      });
      console.log("this.messages in matchStore : ", this.messages);
    });
  };

  @action
  subMsgs = target => {
    console.log("룸 추가 루트 진입!");
    this.messages.unshift({
      id: target.id,
      message: target.messages,
      participants: target.participants,
    });
    alert("You are matched!!!");
  };

  @action
  subChats = (roomId, toId, chat) => {
    this.messages.forEach(msg => {
      if (msg.id === roomId) {
        console.log("push invoked!", msg);
        console.log("this.messages.indexOf(msg) : ", this.messages.indexOf(msg));
        const combindedMsg = {
          id: chat.id,
          text: chat.text,
          from: { id: chat.from.id },
          to: { id: toId },
          createdAt: chat.createdAt,
        };
        msg.message.push(combindedMsg);
      }
    });
    // if (msgAddedRoom) {
    //   msgAddedRoom[0].text.push(target);
    // }
    // const targetIndex = this.messages.indexOf(msgAddedRoom);
    // this.messages.splice(targetIndex, 1);
    // this.messages = [msgAddedRoom[0], ...this.messages];
  };

  @action
  delRoomView = roomId => {
    const newRoomView = this.messages.filter(msg => {
      return msg.id !== roomId;
    });
    console.log("newRoomView in delRoomView : ", newRoomView);
    console.log("this.messages in delRoomView : ", this.messages);
    this.messages = newRoomView;
  };

  //asdf
  // @observable message = ""; // 채팅인풋메세지 - 각 방의 독립성을 위해 useState로 옮김
}

export default MatchStore;
