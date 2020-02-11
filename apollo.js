import { HttpLink } from "apollo-link-http";
// subscription 추가 부분
import { WebSocketLink } from "apollo-link-ws";

export const httpLink = new HttpLink({
  uri: "http://192.168.0.2:4000",
});

// 웹소켓 링크 코드 추가
export const wsLink = new WebSocketLink({
  uri: "http://192.168.0.2:4000",
  options: {
    reconnect: true,
  },
});
