import { gql } from "apollo-boost";

export default EXAM = gql`
  query requestSecret($email: String!) {
    requestSecret(email: $email)
  }
`;
