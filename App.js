import React, { Component } from "react";
import { Text, View, AsyncStorage } from "react-native";
import { Provider, inject, observer } from "mobx-react";

import { InMemoryCache } from "apollo-cache-inmemory";
import { persistCache } from "apollo-cache-persist";
import { ApolloClient } from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import options from "./apollo";
import { AppLoading } from "expo";

import MainStack from "./navigations/Index";
import StoreIndex from "./stores/StoreIndex";
import { observable } from "mobx";

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
        ...options,
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
