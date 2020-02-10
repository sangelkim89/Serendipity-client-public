import React from "react";
import { View, Text, Button } from "react-native";
// import MainStack from "../../Index";
import { useMutation, useApolloClient, useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

const Main = props => {
  console.log("props in Main : ", props);
  //   const client = useApolloClient()

  const LOG_IN = gql`
    mutation signIn($email: String!, $password: String!) {
      signIn(email: $email, password: $password)
    }
  `;

  const [signIn, { data }] = useMutation(LOG_IN);

  function handleLogin() {
    signIn({ variables: { email: "1231@gmail.com", password: "111" } });
    console.log("data : ", data);
  }

  // const ALLUSERS = gql`
  //   query allUsers {
  //     id
  //   }
  // `;

  // const { loading, error, data } = useQuery(ALLUSERS);
  // if (loading) {
  //   console.log("data in loading : ", data);
  // }
  // if (!loading) {
  //   console.log("data after loading : ", data);
  // }
  // function handleLogin() {
  //   signIn({ variables: { email: "1231@gmail.com", password: "111" } });
  // }

  return (
    <View>
      <Button title="login" onPress={handleLogin} />
      {/* <Text>{data}</Text> */}
      {/* <Text>{loginInfo}</Text> */}
    </View>
  );
};

export default Main;
