import React from "react";
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createStackNavigator } from "react-navigation-stack";

// 수정되어야 함
import HuntPageStack from "./Hunt/Hunt";
import MatchPageStack from "./Matches/Matches";
import MyProfilePageStack from "./MyProfile/MyProfile";

const HuntStack = createStackNavigator({
  Hunt: {
    screen: HuntPageStack,
  },
});

const MatchesStack = createStackNavigator({
  Matches: {
    screen: MatchPageStack,
  },
});

const MyprofileStack = createStackNavigator({
  Myprofile: {
    screen: MyProfilePageStack,
  },
});

const TabNav = createBottomTabNavigator({
  Hunt: HuntStack,
  Match: MatchesStack,
  Myprofile: MyprofileStack,
});

export default TabNav;
