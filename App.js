import React, { Component } from "react";
import { Text, View, AsyncStorage } from "react-native";
import { Provider, inject, observer } from "mobx-react";

import { InMemoryCache } from "apollo-cache-inmemory";
import { persistCache } from "apollo-cache-persist";
// import { ApolloClient } from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import { AppLoading } from "expo";

// subscription 추가된 부분
import { ApolloClient } from "apollo-client"; // 부스트 대체
import { onError } from "apollo-link-error";
import { getMainDefinition } from "apollo-utilities";
import { ApolloLink, split, concat } from "apollo-link";
import { setContext } from "apollo-link-context";
//

import MainStack from "./navigations/Index";
import StoreIndex from "./stores/StoreIndex";
import { httpLink, wsLink } from "./apollo";

const store = new StoreIndex();

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
    const authMiddleWare = setContext(async (_, { headers }) => {
      console.log("request is invoked!");
      const token = await AsyncStorage.getItem("jwt");
      return {
        headers: {
          ...headers,
          authorization: `Bearer ${token}` || "",
        },
      };
    });

    try {
      const cache = new InMemoryCache();
      await persistCache({
        cache,
        storage: AsyncStorage,
      });

      const errLink = onError(({ graphQLErrors, networkError }) => {
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

      const links = ApolloLink.from([authMiddleWare, httpLink, wsLink, errLink]);

      const client = new ApolloClient({
        link: authMiddleWare.concat(links),
        cache,
      });
      this.setState({ loaded: true, client });
    } catch (e) {
      console.log("CLIENT_CATCH", e);
    }
  };

  render() {
    const { loaded, client, isLoggedIn } = this.state;
    console.log("앱_렌더_아폴로_스토어", client);
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
