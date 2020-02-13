import { gql } from "apollo-boost";

export const LOG_IN = gql`
  mutation signIn($email: String!, $password: String!) {
    signIn(email: $email, password: $password)
  }
`;

export const GET_MESSAGES = gql`
  query messages {
    messages {
      id
    }
  }
`;

export const SEND_MESSAGE = gql`
  mutation sendMessage($text: String!) {
    sendMessage(text: $text) {
      id
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

// type Mutation {
//   unlike(selectedId: String!): Boolean!
// }

export const LIKE = gql`
  mutation likeUser($selectedId: String!) {
    likeUser(selectedId: $selectedId)
  }
`;

// type Mutation {
//  likeUser(selectedId: String!): String!
//}
