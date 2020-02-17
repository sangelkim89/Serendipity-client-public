import { gql } from "apollo-boost";

export const LOG_IN = gql`
  mutation signIn($email: String!, $password: String!) {
    signIn(email: $email, password: $password)
  }
`;

export const GET_MESSAGES = gql`
  query messages {
    messages {
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
  subscription newMessage {
    newMessage {
      id
      text
    }
  }
`;

export const GET_LIST = gql`
  mutation getHuntList($id: String) {
    getHuntList(id: $id)
  }
`;

export const UN_LIKE = gql`
  mutation unlike($selectedId: String!) {
    unlike(selectedId: $selectedId)
  }
`;

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
      }
      createdAt
    }
  }
`;

export const NEW_ROOM = gql`
  subscription newRoom {
    newRoom {
      id
      participants {
        id
      }
    }
  }
`;

export const GET_ME = gql`
  query {
    getMe {
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
      cardImgLocation
      bio
      distance
    }
  }
`;
