import { createStackNavigator } from "react-navigation-stack";
import MyProfilePage from "./MyProfilePage";
import EditPage from "./EditPage";
import SettingPage from "./SettingPage";

const MyProfilePageStack = createStackNavigator({
  MyProfilePage: {
    screen: MyProfilePage,
  },
  EditPage: {
    screen: EditPage,
  },
  SettingPage: {
    screen: SettingPage,
  },
});

export default MyProfilePageStack;
