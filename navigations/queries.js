import { gql } from "apollo-boost";

export const LOG_IN = gql`
  mutation signIn($email: String!, $password: String!) {
    signIn(email: $email, password: $password)
  }
`;

export const GET_MESSAGE = gql`
  query getMessage($id: String!) {
    getMessage(id: $id) {
      from {
        id
      }
    }
  }
`;

export const SEND_MESSAGE = gql`
  mutation sendMessage($roomId: String, $message: String!, $toId: String) {
    sendMessage(roomId: $roomId, message: $message, toId: $toId) {
      text
    }
  }
`;

export const NEW_MESSAGE = gql`
  subscription newMessage($roomId: String!) {
    newMessage(roomId: $roomId) {
      room {
        id
        messages {
          id
          text
          from {
            id
          }
          to {
            id
          }
          createdAt
        }
        participants {
          id
        }
      }
    }
  }
`;

export const GET_LIST = gql`
  mutation getHuntList($id: String) {
    getHuntList(id: $id)
  }
`;

export const EDIT_NO_PIC = gql`
  mutation editUser(
    $geoLocation: String
    $tags: [String!]
    $distance: Int!
    $companyName: String!
    $companyRole: String
    $bio: String!
    $password: String!
  ) {
    editUser(
      geoLocation: $geoLocation
      tags: $tags
      distance: $distance
      companyName: $companyName
      companyRole: $companyRole
      bio: $bio
      password: $password
    )
  }
`;

export const GET_ME = gql`
  mutation getMe($id: String!) {
    getMe(id: $id) {
      id
      gender
      email
      password
      phone
      name
      birth
      companyName
      companyRole
      geoLocation
      tags
      profileImgLocation
      bio
      distance
    }
  }
`;

export const UN_LIKE = gql`
  mutation unlike($selectedId: String!) {
    unlike(selectedId: $selectedId)
  }
`;

export const CHECK_NICKNAME = gql`
  query checkUniqueID($name: String!) {
    checkUniqueID(name: $name)
  }
`;
// name에는 클라이언트에서 보내기전 저장된 닉네임이 들어가야한다.
/*
 type Query {
  checkUniqueID(name: String!): Boolean!
 }
*/

export const LIKE = gql`
  mutation likeUser($selectedId: String!) {
    likeUser(selectedId: $selectedId)
  }
`;

export const ALL_USER_EMAIL = gql`
  query allUsers {
    allUsers {
      email
    }
  }
`;

export const ALL_USER_PHONE = gql`
  query allUsers {
    allUsers {
      phone
    }
  }
`;

export const GET_ROOM = gql`
  query getRoom($id: String!) {
    getRoom(id: $id) {
      id
      participants {
        id
        name
        birth
        companyName
        companyRole
        tags
        profileImgLocation
      }
      messages {
        text
        from {
          id
        }
        createdAt
      }
      createdAt
    }
  }
`;

export const NEW_ROOM = gql`
  subscription newRoom($id: String) {
    newRoom(id: $id) {
      id
      participants {
        id
        name
        birth
        companyName
        companyRole
        tags
        profileImgLocation
      }
      messages {
        text
        from {
          id
        }
        createdAt
      }
      createdAt
    }
  }
`;

// mutation likeUser($selectedId: String!) {
//   likeUser(selectedId: $selectedId)

export const LOG_OUT = gql`
  mutation logOut {
    logOut
  }
`;

// 수정 필요 --> 수정 완료
export const CREATE_REPORT = gql`
  mutation createReport($toId: String, $text: String, $optionText: String) {
    createReport(toId: $toId, text: $text, optionText: $optionText)
  }
`;

// 수정 필요
export const ROOM_DELETE = gql`
  mutation roomDelete($roomId: String!) {
    roomDelete(roomId: $roomId)
  }
`;
