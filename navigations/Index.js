import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import Intro from "./pages/auth/Intro";
import Login from "./pages/auth/Login";
import SignupBasic from "./pages/auth/SignupBasic";
import SignupCompany from "./pages/auth/SignupCompany";
import SignupIdcard from "./pages/auth/SignupIdcard";
import SignupPic from "./pages/auth/SignupPic";
import SignupTag from "./pages/auth/SignupTag";
import TabNav from "./pages/main/Main";
import TagTest from "./pages/auth/TagTest";

const AuthStack = createStackNavigator({
  Login: {
    screen: Login,
  },
  SignupBasic: {
    screen: SignupBasic,
  },
  SignupCompany: {
    screen: SignupCompany,
  },
  SignupIdcard: {
    screen: SignupIdcard,
  },
  SignupPic: {
    screen: SignupPic,
  },
  SignupTag: {
    screen: SignupTag,
  },
  TagTest: {
    screen: TagTest,
  },
});

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

export default createAppContainer(MainStack);
