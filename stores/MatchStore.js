import { observable, action, computed } from "mobx";

class MatchStore {
  // (StoreIndex)
  constructor(root) {
    this.root = root;
  }

  // 스테이트
  @observable roomList = []; // 채팅방
  @action
  refreshRoomList = target => {
    this.roomList = target;
    this.roomList.map(room => {
      this.messages.push({ id: room.id, message: room.messages, participants: room.participants });
    });
    // console.log("this.roomList from matchstore : ", this.roomList);
    // console.log("this.messages[0] from matchstore : ", this.messages[0]);
  };
  //asdf
  // @observable message = ""; // 채팅인풋메세지 - 각 방의 독립성을 위해 useState로 옮김
  @observable messages = []; // 채팅방 정보
}

// [
//    {
//     "createdAt": "2020-02-13T15:19:48.549Z",
//     "id": "ck6kw31395yig0b09tpi5o86q",
//     "messages":
//     [
//        {
//         "from":  {
//           "id": "ck6jdltbe3dh30b09mflns07p",
//         },
//         "text": "is it working?",
//       },
//        {
//         "from":  {
//           "id": "ck6jdltbe3dh30b09mflns07p",
//         },
//         "text": "is it working?",
//       },
//        {
//         "from":  {
//           "id": "ck6jdltbe3dh30b09mflns07p",
//         },
//         "text": "is it working?",
//       },
//        {
//         "from":  {
//           "id": "ck6jdltbe3dh30b09mflns07p",
//         },
//         "text": "is it working?",
//       },
//     ],
//     "participants":
//     [
//        {
//         "birth": "2020-02-18",
//         "companyName": "121",
//         "companyRole": "121",
//         "id": "ck6jdftl93d9z0b099yvtfmeq",
//         "name": "121",
//         "profileImgLocation": "https://serendipity-uploads.s3.ap-northeast-2.amazonaws.com/1581515405790",
//         "tags":  ["\"태그2\""],
//       },
//        {
//         "birth": "2020-02-11",
//         "companyName": "1112",
//         "companyRole": "1112",
//         "id": "ck6jdltbe3dh30b09mflns07p",
//         "name": "1112",
//         "profileImgLocation": "https://serendipity-uploads.s3.ap-northeast-2.amazonaws.com/1581515685211",
//         "tags":  ["\"태그2\""],
//       },
//     ],

export default MatchStore;
