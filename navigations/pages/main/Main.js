import React from "react";
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createStackNavigator } from "react-navigation-stack";

import Hunt from "./Hunt";
import Matches from "./Matches";
import Myprofile from "./Myprofile";

const MatchesStack = createStackNavigator({
  Matches: {
    screen: Matches,
  },
});

const MyprofileStack = createStackNavigator({
  Myprofile: {
    screen: Myprofile,
  },
});

const HuntStack = createStackNavigator({
  Hunt: {
    screen: Hunt,
  },
});

const TabNav = createBottomTabNavigator({
  Hunt: HuntStack,
  Match: MatchesStack,
  Myprofile: MyprofileStack,
});

export default createAppContainer(TabNav);
