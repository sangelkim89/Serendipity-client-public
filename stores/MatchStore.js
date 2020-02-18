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

  @action // 라이크로 신규 생성된 채팅방 아이디 추가 메소드
  addLikeRoomId = target => {
    this.likeRoomId = target;
  };

  @action
  refreshRoomList = target => {
    // this.roomList = target;
    // console.log("this.roomList from matchStore : ", this.roomList);
    this.messages = []; // 메세지스 초기화
    // console.log("this.messages after initialization : ", this.messages);
    target.map(room => {
      this.messages.push({ id: room.id, message: room.messages, participants: room.participants });
    });
    // console.log("this.roomList from  : ", this.roomList);
    // console.log("this.messages from matchstore : ", this.messages);
  };

  @action
  subMsgs = target => {
    this.messages.unshift({
      id: target.id,
      message: target.messages,
      participants: target.participants,
    });
    // console.log("this.messages : ", this.messages);
  };

  @action
  subChats = (roomId, userId, toId, chat) => {
    this.messages.forEach(msg => {
      if (msg.id === roomId) {
        console.log("push invoked!", msg);
        console.log("this.messages.indexOf(msg) : ", this.messages.indexOf(msg));
        const combindedMsg = {
          id: chat.id,
          text: chat.text,
          from: { id: chat.from.id },
          to: { id: chat.from.id },
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
  //asdf
  // @observable message = ""; // 채팅인풋메세지 - 각 방의 독립성을 위해 useState로 옮김
}

export default MatchStore;
