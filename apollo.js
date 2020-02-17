import { AsyncStorage } from "react-native";
import { HttpLink } from "apollo-link-http";
import { WebSocketLink } from "apollo-link-ws";
import { setContext } from "apollo-link-context";
import { onError } from "apollo-link-error";
import { ApolloLink } from "apollo-link";

// 재협IP : 192.168.0.2
// 상욱IP : 192.168.0.33
const httpLink = new HttpLink({
  uri: "http://192.168.0.2:4000",
});

// 웹소켓 링크 코드 추가
const wsLink = new WebSocketLink({
  uri: "http://192.168.0.2:4000",
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

export const links = ApolloLink.from([httpLink, wsLink, errLink]);
