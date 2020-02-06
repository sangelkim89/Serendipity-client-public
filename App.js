import React from "react";
import { Text, View } from "react-native";
import { Provider } from "mobx-react";

import MainStack from "./navigations/Index";
import StoreIndex from "./stores/StoreIndex";

const store = new StoreIndex();

export default function App() {
  return (
    <Provider {...store}>
      <MainStack />
    </Provider>
  );
}
