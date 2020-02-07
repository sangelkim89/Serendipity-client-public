import React, { Component } from "react";
import { Text, View, AsyncStorage } from "react-native";
import { Provider } from "mobx-react";

import { InMemoryCache } from "apollo-cache-inmemory";
import { persistCache } from "apollo-cache-persist";
import { ApolloClient } from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import options from "./apollo";
import { AppLoading } from "expo";

import Main from "./navigations/pages/auth/Main";
import StoreIndex from "./stores/StoreIndex";

const store = new StoreIndex();

class App extends Component {
  state = {
    loaded: false,
    client: null,
    isLoggedIn: null,
  };

  async componentDidMount() {
    await this.preLoad();
    await AsyncStorage.setItem("isLoggedIn", `${this.state.isLoggedIn}`);
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
    console.log("options : ", options);
    console.log("re-started!!!");
    const { loaded, client, isLoggedIn } = this.state;
    // console.log("client in app.js : ", client);
    return client ? (
      <ApolloProvider client={client}>
        {/* <Provider {...store}> */}
        <Main />
        {/* </Provider> */}
      </ApolloProvider>
    ) : (
      <AppLoading />
    );
  }
}

export default App;
