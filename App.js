import React, { Component } from "react";
import { AsyncStorage } from "react-native";
import { Provider } from "mobx-react";
import { InMemoryCache } from "apollo-cache-inmemory";
import { persistCache } from "apollo-cache-persist";
import { ApolloProvider } from "@apollo/react-hooks";
import { AppLoading } from "expo";

// subscription 추가된 부분
import { ApolloClient } from "apollo-client"; // 부스트 대체
//

import MainStack from "./navigations/Index";
import StoreIndex from "./stores/StoreIndex";
import { authMiddleWare, links } from "./apollo";

const store = new StoreIndex();

class App extends Component {
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
      const cache = new InMemoryCache();
      await persistCache({
        cache,
        storage: AsyncStorage,
      });
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
    const { client } = this.state;
    // console.log("앱_렌더_아폴로_클라이언트", client);
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
