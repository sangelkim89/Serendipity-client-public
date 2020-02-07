import { gql } from "apollo-boost";
// import gql from "graphql-tag"; // ???

export const LOG_IN = gql`
  mutation signIn($email: String!, $password: String!) {
    signIn(email: $email, password: $password)
  }
`;

// export const ???
