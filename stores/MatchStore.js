import { observable, action, computed } from "mobx";

class MatchStore {
  // (StoreIndex)
  constructor(root) {
    this.root = root;
  }

  // 스테이트
  @observable roomList = [
    {
      image:
        "https://img1.looper.com/img/gallery/why-we-havent-seen-dwayne-the-rock-johnson-in-the-mcu-yet/intro-1563386680.jpg",
      profile: {
        userId: "The Rock",
        tags: ["드라이브", "산책하기", "맛집가기", "와인", "영화보기"],
        distance: "20km",
        companyName: "Google Korea",
      },
      chats: [
        { other: "hi" },
        { other: "hello" },
        { me: "what the f..." },
        {
          me:
            "what the funny friend...what the funny friend...what the funny friend...what the funny friend...what the funny friend...what the funny friend...what the funny friend...what the funny friend...what the funny friend...what the funny friend...what the funny friend...what the funny friend...what the funny friend...what the funny friend...what the funny friend...what the funny friend...",
        },
      ],
    },
    {
      image: "https://i.pinimg.com/736x/ad/86/00/ad86000ae7f18e5ee5589c66a99edf00.jpg",
      profile: {
        userId: "Tom",
        tags: ["연상이 좋아요", "연상보다 연하", "친구같은 편한 연애", "성숙한 연애"],
        distance: "20km",
        companyName: "Google Korea",
      },
      chats: [
        { other: "hi" },
        { other: "hello" },
        { me: "who's there?" },
        { me: "Is anybody here?" },
      ],
    },
    {
      image:
        "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/cf/cfc875aa8b23fac7635556cef53834ecbcf973c8_full.jpg",
      profile: {
        userId: "Adam",
        tags: [
          "사투리 매력",
          "애교 넘쳐요",
          "서운한 건 바로",
          "주말에 만나요",
          "존경할 수 있는 사람 좋아요",
        ],
        distance: "20km",
        companyName: "Google Korea",
      },
      chats: [
        { other: "hi" },
        { other: "hello" },
        { me: "what the f..." },
        { me: "I'm Iron man" },
        { other: "What?" },
      ],
    },
    {
      image:
        "https://static.independent.co.uk/s3fs-public/thumbnails/image/2013/04/29/18/collins-getty.jpg?w968h681",
      profile: {
        userId: "Bobby",
        tags: [
          "인스타 감성 카페투어",
          "커피 한 잔",
          "스포츠 경기 관람",
          "동네 산책",
          "심심할 때 수다",
        ],
        distance: "20km",
        companyName: "Google Korea",
      },
      chats: [
        { other: "hi" },
        { other: "hello" },
        { me: "what the f..." },
        { me: "I'm from America" },
      ],
    },
    {
      image:
        "https://static-cdn.jtvnw.net/jtv_user_pictures/xqcow-profile_image-9298dca608632101-300x300.jpeg",
      profile: {
        userId: "Charlie",
        tags: ["맛집 탐방", "근교 드라이브", "만화카페", "브런치", "코노 메이트"],
        distance: "20km",
        companyName: "Google Korea",
      },
      chats: [
        { other: "hi" },
        { other: "hello" },
        { me: "what the f..." },
        { me: "What is your favorite movie?" },
      ],
    },
    {
      image:
        "https://www.pixelite.co.nz/content/images/2019/09/mateo-avila-chinchilla-x_8oJhYU31k-unsplash.jpg",
      profile: {
        userId: "Eddie",
        tags: ["영화 감상", "솔직한 대화", "골프", "한강에서 치맥", "여행"],
        distance: "20km",
        companyName: "Google Korea",
      },
      chats: [
        { other: "hi" },
        { other: "hello" },
        { me: "what the f..." },
        { me: "I love my job." },
        { other: "hello" },
        { me: "what the f..." },
        { other: "hello" },
        { me: "what the f..." },
        { other: "hello" },
        { me: "what the f..." },
        { other: "hello" },
        { me: "what the f..." },
        { other: "hello" },
        { me: "what the f..." },
        { other: "hello" },
        { me: "what the f..." },
        { other: "hello" },
        { me: "what the f..." },
      ],
    },
    {
      image: "https://i.pinimg.com/originals/61/6b/82/616b825a3784599281d1cab7eb1d359f.jpg",
      profile: {
        userId: "Fran",
        tags: ["아이돌 덕질", "VR체험", "방탈출 도장깨기", "술 한 잔", "요가/필라테스"],
        distance: "20km",
        companyName: "Google Korea",
      },
      chats: [
        { other: "hi" },
        { other: "hello" },
        { me: "what the f..." },
        { me: "wanna meet me today?" },
      ],
    },
    {
      image:
        "https://scontent-yyz1-1.cdninstagram.com/v/t51.2885-15/sh0.08/e35/c0.9.1080.1080a/s640x640/82210185_2545944478983730_7650152097147528907_n.jpg?_nc_ht=scontent-yyz1-1.cdninstagram.com&_nc_cat=110&_nc_ohc=YV2kV2GXH4AAX8ZZOhH&oh=55e430c5c52d26d5e270138d2355ae3d&oe=5ED77E64",
      profile: {
        userId: "Icebear",
        tags: ["피씨방", "러닝", "언어 교환", "반려동물 산책", "쇼핑"],
        distance: "20km",
        companyName: "We Bare Bears",
      },
      chats: [
        { other: "hi" },
        { other: "hello" },
        { me: "what the f..." },
        { other: "Hey, watch your mouth..." },
      ],
    },
    {
      image: "https://i.pinimg.com/736x/39/55/83/395583fcd592ded52b687a48caa8b893.jpg",
      profile: {
        userId: "Grizzly",
        tags: ["전시회 관람", "쇼핑", "새로운 것 배우기", "매일 정시 퇴근"],
        distance: "20km",
        companyName: "We Bare Bears",
      },
      chats: [
        { other: "hi" },
        { other: "hello" },
        { me: "what the f..." },
        { me: "!!!?????????????????" },
      ],
    },
  ]; // 채팅방
  @observable message = ""; // 채팅인풋메세지
  @observable messages = []; // 상대유저 정보

  // 메소드
  @action
  handleInputMsg = e => {
    console.log("매치스토어 메소드 작동");
    this.inputMsg = e;
    console.log("inputMsg : ", inputMsg);
  };

  @action
  matchExer2 = () => {
    console.log("매치스토어 메소드 작동");
    console.log("해당 룸리스트에 채팅을 추가하는 메소드가 되면 될듯");
  };
}

export default MatchStore;
