import React from "react";
import { View, Text, Button } from "react-native";
// import MainStack from "../../Index";
import { useMutation, useApolloClient } from "@apollo/react-hooks";
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
  }

  return (
    <View>
      <Button title="login" onPress={handleLogin} />
      <Text>{data}</Text>
    </View>
  );
};

export default Main;
