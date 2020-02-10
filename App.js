import React, { Component } from "react";
import { Text, View, AsyncStorage } from "react-native";
import { Provider, inject, observer } from "mobx-react";

import { InMemoryCache } from "apollo-cache-inmemory";
import { persistCache } from "apollo-cache-persist";
// import { ApolloClient } from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import { AppLoading } from "expo";
import { observable } from "mobx";

// subscription 추가된 부분
import { ApolloClient } from "apollo-client"; // 부스트 대체
import { onError } from "apollo-link-error";
import { getMainDefinition } from "apollo-utilities";
import { ApolloLink, split } from "apollo-link";
//

import MainStack from "./navigations/Index";
import StoreIndex from "./stores/StoreIndex";
import { httpLink, wsLink } from "./apollo";

const store = new StoreIndex();

// @inject("signupStore")
@observer
class App extends React.Component {
  state = {
    loaded: false,
    client: null,
  };

  async componentDidMount() {
    console.log("APPCOMPONENTDIDMOUNT");
    await this.preLoad();
  }

  preLoad = async () => {
    try {
      // await Asset.loadAsync([require("./assets/logo.png")]); -- 인트로 페이지 구현시
      const cache = new InMemoryCache();
      await persistCache({
        cache,
        storage: AsyncStorage,
      });
      const client = new ApolloClient({
        cache,
        request: async operation => {
          console.log("request is invoked!");
          const token = await AsyncStorage.getItem("jwt");
          return operation.setContext({
            headers: { Authorization: `Bearer ${token}` },
          });
        },
        link: ApolloLink.from([
          onError(({ graphQLErrors, networkError }) => {
            if (graphQLErrors)
              graphQLErrors.map(({ message, locations, path }) =>
                console.log(
                  `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
                ),
              );
            if (networkError) console.log(`[Network error]: ${networkError}`);
          }),
          split(
            // split based on operation type
            ({ query }) => {
              const definition = getMainDefinition(query);
              return (
                definition.kind === "OperationDefinition" && definition.operation === "subscription"
              );
            },
            wsLink,
            httpLink,
          ),
        ]),
      });
      this.setState({ loaded: true, client });
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    console.log("re-started!!!");
    const { loaded, client, isLoggedIn } = this.state;
    console.log("스토어_로그인");
    return client ? (
      <ApolloProvider client={client}>
        <Provider {...store}>
          <MainStack />
        </Provider>
      </ApolloProvider>
    ) : (
      <AppLoading />
    );
  }
}

export default App;
