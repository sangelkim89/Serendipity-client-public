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
