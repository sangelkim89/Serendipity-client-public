import { createStackNavigator } from "react-navigation-stack";

import ChatPage from "./ChatPage";
import MatchPageList from "./MatchPageList";
import ProfilePage from "./ProfilePage";
import ReportPage from "./ReportPage";

const MatchPageStack = createStackNavigator(
  {
    MatchPageList: {
      screen: MatchPageList,
    },
    ChatPage: {
      screen: ChatPage,
    },
    ProfilePage: {
      screen: ProfilePage,
    },
    ReportPage: {
      screen: ReportPage,
    },
  },
  {
    defaultNavigationOptions: {
      headerShown: false,
    },
  },
);

export default MatchPageStack;
