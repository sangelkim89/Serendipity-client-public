import { createStackNavigator } from "react-navigation-stack";

import HuntPage from "./HuntPage";
import AllSwiped from "./AllSwiped";

const HuntPageStack = createStackNavigator(
  {
    HuntPage: {
      screen: HuntPage,
    },
    AllSwiped: {
      screen: AllSwiped,
    },
  },
  {
    defaultNavigationOptions: {
      headerShown: false,
    },
  },
);

export default HuntPageStack;
