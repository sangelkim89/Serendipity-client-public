import { createStackNavigator } from "react-navigation-stack";

import EditPage from "./EditPage";
import MyProfilePage from "./MyProfilePage";
import SettingPage from "./SettingPage";

const MyProfilePageStack = createStackNavigator({
  EditPage: {
    screen: EditPage,
  },
  MyProfilePage: {
    screen: MyProfilePage,
  },
  SettingPage: {
    screen: SettingPage,
  },
});

export default MyProfilePageStack;
