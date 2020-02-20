import { AsyncStorage } from "react-native";
import { HttpLink } from "apollo-link-http";
import { WebSocketLink } from "apollo-link-ws";
import { setContext } from "apollo-link-context";
import { onError } from "apollo-link-error";
import { ApolloLink } from "apollo-link";
import { getMainDefinition } from "apollo-utilities";
import { concat, Operation, split } from "apollo-link";
import { SERVER_ENDPOINT, WEBSOCKET_ENDPOINT } from "react-native-dotenv";

const httpLink = new HttpLink({
  uri: `${SERVER_ENDPOINT}`,
});
// 웹소켓 링크 코드 추가
const wsLink = new WebSocketLink({
  uri: `${WEBSOCKET_ENDPOINT}`,
  options: {
    reconnect: true,
  },
});

const errLink = onError(({ graphQLErrors, networkError }) => {
  console.log("에러에서발생");
  if (graphQLErrors)
    graphQLErrors.map(
      ({ message, locations, path }) =>
        console.log(
          `[CLIENT_GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
        ),
      console.log("CLIENT_LINK_OnERR : ", this.state.client),
    );
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

export const authMiddleWare = setContext(async (_, { headers }) => {
  console.log("request is invoked!");
  const token = await AsyncStorage.getItem("jwt");
  return {
    headers: {
      ...headers,
      authorization: `Bearer ${token}` || "",
    },
  };
});
const linkeConcated = authMiddleWare.concat(httpLink);
export const links = split(
  // split based on operation type
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === "OperationDefinition" && operation === "subscription";
  },
  wsLink,
  linkeConcated,
  errLink,
);
