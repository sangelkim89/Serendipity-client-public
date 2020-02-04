import { createStackNavigator } from "react-navigation-stack";

import HuntPage from "./HuntPage";

const HuntPageStack = createStackNavigator({
  HuntPage: {
    screen: HuntPage,
  },
});

export default HuntPageStack;
