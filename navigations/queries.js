import { gql } from "apollo-boost";

export const EXAM = gql`
  query requestSecret($email: String!) {
    requestSecret(email: $email)
  }
`;

export const CHAT = gql`
  query messages {
    messages {
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
