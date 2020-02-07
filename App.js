import React, { Component } from "react";
import { Text, View, AsyncStorage } from "react-native";
import { Provider } from "mobx-react";

import { InMemoryCache } from "apollo-cache-inmemory";
import { persistCache } from "apollo-cache-persist";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo-hooks";
import options from "./apollo";

import MainStack from "./navigations/Index";
import StoreIndex from "./stores/StoreIndex";

const store = new StoreIndex();

class App extends Component {
  state = {
    loaded: false,
    client: null,
  };

  componentDidMount() {
    this.preLoad();
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
    const { loaded, client } = this.state;
    console.log("loaded : ", loaded);
    console.log("client : ", client);
    return (
      <ApolloProvider client={client}>
        <Provider {...store}>
          <MainStack />
        </Provider>
      </ApolloProvider>
    );
  }
}

export default App;
