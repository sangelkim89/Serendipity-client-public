import React from "react";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createStackNavigator } from "react-navigation-stack";
import { Ionicons } from "@expo/vector-icons";

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

const MyprofileStack = createStackNavigator(
  {
    Myprofile: {
      screen: MyProfilePageStack,
    },
  },
  {
    defaultNavigationOptions: {
      headerShown: false,
    },
  },
);

const TabNav = createBottomTabNavigator(
  {
    HUNT: {
      screen: HuntStack,
      navigationOptions: {
        tabBarLabel: "LOVE",
        tabBarIcon: ({ tintColor }) => <Ionicons name="ios-heart" color={tintColor} size={35} />,
      },
    },
    MATCH: {
      screen: MatchesStack,
      navigationOptions: {
        tabBarLabel: "CHAT",
        tabBarIcon: ({ tintColor }) => <Ionicons name="ios-body" color={tintColor} size={35} />,
      },
    },
    Myprofile: {
      screen: MyprofileStack,
      navigationOptions: {
        tabBarLabel: "MY",
        tabBarIcon: ({ tintColor }) => <Ionicons name="ios-settings" color={tintColor} size={35} />,
      },
    },
  },
  //account-heart
  {
    tabBarOptions: {
      activeTintColor: "red",
      inactiveTintColor: "grey",
      showIcon: true,
      style: {
        backgroundColor: "transparent",
        height: 60,
      },
    },
    defaultNavigationOptions: {
      headerShown: false,
    },
  },
);

export default TabNav;
