import React from "react";
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createStackNavigator } from "react-navigation-stack";

// 수정되어야 함
import HuntPageStack from "./Hunt/Hunt";
import MatchPageStack from "./Matches/MatchesIndex";
import MyProfilePageStack from "./MyProfile/MyProfile";

const HuntStack = createStackNavigator(
  {
    Hunt: {
      screen: HuntPageStack,
    },
  },
  {
    defaultNavigationOptions: {
      headerShown: false,
    },
  },
);

const MatchesStack = createStackNavigator(
  {
    Matches: {
      screen: MatchPageStack,
    },
  },
  {
    defaultNavigationOptions: {
      headerShown: false,
    },
  },
);

const MyprofileStack = createStackNavigator({
  Myprofile: {
    screen: MyProfilePageStack,
  },
});

const TabNav = createBottomTabNavigator(
  {
    Hunt: HuntStack,
    Match: MatchesStack,
    Myprofile: MyprofileStack,
  },
  {
    defaultNavigationOptions: {
      headerShown: false,
    },
  },
);

export default TabNav;
