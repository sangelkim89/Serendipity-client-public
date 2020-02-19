import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import Intro from "./pages/auth/Intro";
import Login from "./pages/auth/Login";
import SignupBasic from "./pages/auth/SignupBasic";
import SignupCompany from "./pages/auth/SignupCompany";
import SignupIdcard from "./pages/auth/SignupIdcard";
import SignupPic from "./pages/auth/SignupPic";
import TakeCamera from "./pages/auth/TakeCamera";
import SignupTag from "./pages/auth/SignupTag";
import TabNav from "./pages/main/Main";
import SettingPage from "./pages/main/MyProfile/SettingPage";
import App from "../App";

const AuthStack = createStackNavigator(
  {
    Login: {
      screen: Login,
    },
    SignupBasic: {
      screen: SignupBasic,
    },
    SignupCompany: {
      screen: SignupCompany,
    },
    SignupTag: {
      screen: SignupTag,
    },
    SignupPic: {
      screen: SignupPic,
    },
    SignupIdcard: {
      screen: SignupIdcard,
    },
    TakeCamera: {
      screen: TakeCamera,
    },
  },
  {
    defaultNavigationOptions: {
      headerShown: false,
    },
  },
);

const MainStack = createSwitchNavigator(
  {
    Intro: Intro,
    AuthStack: {
      screen: AuthStack,
    },
    TabNav: {
      screen: TabNav,
    },
  },
  {
    initialRouteName: "Intro",
  },
);

const secessionStack = createStackNavigator(
  {
    Login: {
      screen: Login,
    },

    SettingPage: {
      screen: SettingPage,
    },
  },
  {
    defaultNavigationOptions: {
      headerShown: false,
    },
  },
);

export default createAppContainer(MainStack, secessionStack);
